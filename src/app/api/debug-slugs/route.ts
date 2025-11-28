// app/api/debug-slugs/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    // Get all products with their slugs and names
    const products = await Product.find({})
      .select('name slug category status createdAt deliveryTime freeShipping warrantyPeriod warrantyType')
      .sort({ createdAt: -1 })
      .lean()

    // Count products without slugs
    const productsWithoutSlugs = products.filter(p => !p.slug)
    
    // Check for Amharic products specifically
    const amharicProducts = products.filter(p => {
      const amharicRegex = /[\u1200-\u137F]/
      return amharicRegex.test(p.name)
    })

    // Products with numeric slugs (old system)
    const productsWithNumericSlugs = products.filter(p => p.slug && /^[0-9]+$/.test(p.slug))

    return NextResponse.json({
      success: true,
      data: {
        totalProducts: products.length,
        productsWithoutSlugs: productsWithoutSlugs.length,
        amharicProductsCount: amharicProducts.length,
        productsWithNumericSlugs: productsWithNumericSlugs.length,
        recentProducts: products.slice(0, 10), // Show last 10 products
        amharicProducts: amharicProducts.slice(0, 10), // Show Amharic products
        productsWithoutSlugsList: productsWithoutSlugs.slice(0, 10),
        productsWithNumericSlugsList: productsWithNumericSlugs.slice(0, 10)
      }
    })

  } catch (error: any) {
    console.error('Debug slugs error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}