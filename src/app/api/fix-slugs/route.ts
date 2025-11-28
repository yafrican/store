// app/api/fix-slugs/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function POST() {
  try {
    await connectMongo()
    
    // Get all products without slugs or with numeric slugs
    const products = await Product.find({
      $or: [
        { slug: { $exists: false } },
        { slug: null },
        { slug: /^[0-9]+$/ } // Products with only numbers as slugs
      ]
    })

    let fixedCount = 0
    const results = []

    for (const product of products) {
      const oldSlug = product.slug
      
      // Trigger slug generation by marking name as modified
      product.markModified('name')
      await product.save()
      
      results.push({
        id: product._id.toString(),
        name: product.name,
        oldSlug: oldSlug,
        newSlug: product.slug,
        category: product.category,
        url: `http://localhost:3000/products/${product.slug}`
      })
      fixedCount++
    }

    return NextResponse.json({
      success: true,
      message: `Fixed ${fixedCount} product slugs`,
      fixedCount,
      results
    })

  } catch (error: any) {
    console.error('Fix slugs error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}