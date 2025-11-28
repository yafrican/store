// app/api/debug-middleware/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    // Test the Amharic product specifically
    const amharicProduct = await Product.findById('69283d689c26992b98042779')
    
    if (!amharicProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Test slugify directly
    const testSlug = require('slugify')(amharicProduct.name, {
      lower: true,
      strict: false,
      locale: 'am',
      remove: /[*+~.()'"!:@]/g
    })

    // Check if name is considered modified
    const isNameModified = amharicProduct.isModified('name')
    
    // Test manual save
    const oldSlug = amharicProduct.slug
    amharicProduct.markModified('name')
    const wouldBeModified = amharicProduct.isModified('name')

    return NextResponse.json({
      success: true,
      product: {
        id: amharicProduct._id.toString(),
        name: amharicProduct.name,
        currentSlug: amharicProduct.slug,
        isNameModified: isNameModified,
        wouldBeModified: wouldBeModified
      },
      slugifyTest: {
        input: amharicProduct.name,
        output: testSlug,
        working: !!testSlug && testSlug !== '4'
      },
      analysis: {
        hasAmharic: /[\u1200-\u137F]/.test(amharicProduct.name),
        isNumericSlug: /^[0-9]+$/.test(amharicProduct.slug),
        expectedSlug: testSlug
      }
    })

  } catch (error: any) {
    console.error('Debug middleware error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}