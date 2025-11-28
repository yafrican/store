import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    console.log('🔍 Verifying product fields...')
    
    // Get a specific product to check
    const product = await Product.findById('69283d689c26992b98042779')
    
    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 })
    }
    
    const productData = product.toObject()
    
    return NextResponse.json({
      success: true,
      product: {
        _id: productData._id,
        name: productData.name,
        // Check if fields exist and their values
        freeShipping: productData.freeShipping,
        warrantyPeriod: productData.warrantyPeriod,
        warrantyType: productData.warrantyType,
        deliveryTime: productData.deliveryTime,
        // Field existence check
        fieldExistence: {
          freeShipping: 'freeShipping' in productData,
          warrantyPeriod: 'warrantyPeriod' in productData,
          warrantyType: 'warrantyType' in productData,
          deliveryTime: 'deliveryTime' in productData
        }
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}