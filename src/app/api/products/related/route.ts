// app/api/products/related/route.ts
import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Product from '@/models/Product'
import connectDB from '@/lib/mongodb'
import { toDatabaseCategory } from '@/lib/category-utils'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const brand = searchParams.get('brand')
    const limit = parseInt(searchParams.get('limit') || '8')

    if (!productId || !category) {
      return NextResponse.json({ 
        success: false, 
        error: 'Product ID and category are required' 
      }, { status: 400 })
    }

    console.log('🔍 Fetching related products:', {
      productId,
      category,
      subcategory,
      brand,
      limit
    })

    // Build priority-based queries
    const categoryQuery = {
      $or: [
        { category: toDatabaseCategory(category) },
        { category: category }
      ]
    }

    const baseQuery = {
      _id: { $ne: new mongoose.Types.ObjectId(productId) },
      status: 'approved',
      inStock: true
    }

    // Select all necessary fields including slug
    const selectFields = '_id name price images slug category isNew isOnSale salePrice stock specifications'

    // Try multiple query strategies
    let relatedProducts: any[] = []

    // Strategy 1: Same category + same brand
    if (brand) {
      const brandQuery = {
        ...baseQuery,
        ...categoryQuery,
        'specifications.brand': { $regex: brand, $options: 'i' }
      }
      const brandResults = await Product.find(brandQuery)
        .select(selectFields)
        .limit(limit)
        .sort({ popularityScore: -1, viewCount: -1 })
        .lean()
      
      relatedProducts = [...relatedProducts, ...brandResults]
    }

    // Strategy 2: Same category only
    if (relatedProducts.length < limit) {
      const categoryOnlyQuery = {
        ...baseQuery,
        ...categoryQuery
      }
      const categoryResults = await Product.find(categoryOnlyQuery)
        .select(selectFields)
        .limit(limit - relatedProducts.length)
        .sort({ popularityScore: -1, viewCount: -1 })
        .lean()
      
      // Fix: Add type assertions
      const existingIds = new Set(relatedProducts.map((p: any) => p._id.toString()))
      const newResults = categoryResults.filter((p: any) => !existingIds.has((p as any)._id.toString()))
      relatedProducts = [...relatedProducts, ...newResults]
    }

    // Strategy 3: Fallback - any approved products
    if (relatedProducts.length === 0) {
      const fallbackResults = await Product.find({
        _id: { $ne: new mongoose.Types.ObjectId(productId) },
        status: 'approved'
      })
        .select(selectFields)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean()
      
      relatedProducts = fallbackResults
    }

    console.log(`✅ Found ${relatedProducts.length} related products`)
    console.log('📦 Related products slugs:', relatedProducts.map((p: any) => ({ 
      name: p.name, 
      slug: p.slug,
      hasSlug: !!p.slug 
    })))

    // Process results - IMPORTANT: Use _id as the identifier, not slug
    const processedProducts = relatedProducts
      .slice(0, limit)
      .map((product: any) => ({
        ...product,
        // Use _id as the primary identifier since some products might not have slugs
        identifier: product.slug || product._id.toString(),
        displayCategory: product.category
      }))

    return NextResponse.json({
      success: true,
      products: processedProducts,
      count: processedProducts.length
    })

  } catch (error) {
    console.error('Error fetching related products:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch related products',
      products: []
    }, { status: 500 })
  }
}