// app/api/test-slug-generation/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'
import mongoose from 'mongoose'

export async function GET() {
  try {
    await connectMongo()
    
    // Test slug generation with a sample Amharic product
    const testProduct = new Product({
      name: 'አዲስ አማርኛ ምርት ሙከራ',
      price: 1000,
      category: 'ELECTRONICS',
      seller: new mongoose.Types.ObjectId(), // dummy ID
      deliveryTime: '2 days'
    })

    // This should trigger the slug middleware
    await testProduct.save()
    
    // Delete the test product
    await Product.findByIdAndDelete(testProduct._id)

    return NextResponse.json({
      success: true,
      test: {
        inputName: 'አዲስ አማርኛ ምርት ሙከራ',
        generatedSlug: testProduct.slug,
        working: testProduct.slug && !/^[0-9]+$/.test(testProduct.slug)
      },
      message: testProduct.slug && !/^[0-9]+$/.test(testProduct.slug) 
        ? '✅ Slug generation is working!' 
        : '❌ Slug generation failed!'
    })

  } catch (error: any) {
    console.error('Test error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}