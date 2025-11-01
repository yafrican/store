// src/app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server' // ✅ Import NextRequest
import { verifyAdmin } from '@/lib/adminAuth'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET(req: NextRequest) { // ✅ Change from Request to NextRequest
  console.log('🔄 ADMIN PRODUCTS API CALLED')
  
  try {
    console.log('1. Verifying admin...')
    const admin = await verifyAdmin(req)
    console.log('✅ Admin verified successfully:', admin.email)

    console.log('2. Connecting to MongoDB...')
    await connectMongo()
    console.log('✅ MongoDB connected')

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    console.log('📋 Query params:', { status, page, limit })

    // Build query - Include products with undefined status
    const query: any = {}
    if (status && status !== 'all') {
      if (status === 'pending') {
        query.$or = [
          { status: 'pending' },
          { status: { $exists: false } },
          { status: undefined },
          { status: null },
          { status: '' }
        ]
      } else {
        query.status = status
      }
    }

    console.log('🔍 Final query:', JSON.stringify(query, null, 2))

    console.log('📦 Fetching products from database...')
    
    const products = await Product.find(query)
      .populate({
        path: 'seller',
        select: 'name email storeName phone',
        model: 'User'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    console.log(`✅ Found ${products.length} products`)

    // If no products found, check what's in the database
    if (products.length === 0) {
      console.log('⚠️ No products found with query, checking all products...')
      const allProducts = await Product.find({})
        .populate({
          path: 'seller',
          select: 'name email storeName phone',
          model: 'User'
        })
        .limit(5)
        .lean()
      console.log('📊 First 5 products in DB:', allProducts.map((p: any) => ({
        _id: p._id?.toString(),
        name: p.name,
        status: p.status,
        hasSeller: !!p.seller,
        sellerName: p.seller?.name
      })))
    }

    // Transform products for frontend with CDN image handling
    const safeProducts = products.map((product: any) => {
      const productId = product._id ? product._id.toString() : 'unknown-product-id'
      
      // Handle seller population safely
      let sellerInfo = {
        _id: '',
        storeName: 'Unknown Seller',
        email: 'No Email',
        phone: 'No Phone'
      }

      if (product.seller && product.seller._id) {
        sellerInfo = {
          _id: product.seller._id.toString(),
          storeName: product.seller.storeName || 'No Store Name',
          email: product.seller.email || 'No Email',
          phone: product.seller.phone || 'No Phone'
        }
      }

      // Ensure status is never undefined
      const productStatus = product.status || 'pending'

      // Process images for CDN - ensure proper URLs
      const processedImages = (product.images || []).map((img: string) => {
        if (!img) return ''
        
        // If already absolute URL (CDN), return as is
        if (img.startsWith('http')) {
          return img
        }
        
        // If using BunnyCDN format without full URL, construct it
        if (img.startsWith('/')) {
          // Remove leading slash if present and construct full CDN URL
          const cleanPath = img.startsWith('/') ? img.substring(1) : img
          return `https://yafrican.b-cdn.net/${cleanPath}`
        }
        
        // For any other case, assume it's a filename and construct CDN URL
        return `https://yafrican.b-cdn.net/${img}`
      }).filter((img: string) => img !== '')

      return {
        _id: productId,
        name: product.name || 'Unnamed Product',
        price: product.price || 0,
        category: product.category || 'Uncategorized',
        status: productStatus,
        inStock: product.inStock !== undefined ? product.inStock : true,
        images: processedImages,
        description: product.description || '',
        sellerId: sellerInfo,
        createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : new Date().toISOString(),
        updatedAt: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString()
      }
    })

    const total = await Product.countDocuments(query)
    console.log(`📊 Total products matching query: ${total}`)

    console.log('🚀 Sending response with', safeProducts.length, 'products')
    
    if (safeProducts.length > 0) {
      console.log('📦 Sample product in response:', {
        _id: safeProducts[0]._id,
        name: safeProducts[0].name,
        status: safeProducts[0].status,
        seller: safeProducts[0].sellerId.storeName,
        imagesCount: safeProducts[0].images.length,
        firstImage: safeProducts[0].images[0]?.substring(0, 50) + '...'
      })
    }

    return NextResponse.json({
      success: true,
      products: safeProducts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error: any) {
    console.error('❌ ADMIN PRODUCTS API ERROR:', error.message)
    
    // Return proper error status based on error type
    if (error.message.includes('Not authenticated') || error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Authentication required' 
        }, 
        { status: 401 }
      )
    }
    
    if (error.message.includes('Access denied')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Admin access required' 
        }, 
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Server error' 
      }, 
      { status: 500 }
    )
  }
}