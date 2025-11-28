import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    const product = await Product.findById('69285463a6ccf9f712dff2dc')
    
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
        freeShipping: productData.freeShipping,
        warrantyPeriod: productData.warrantyPeriod,
        warrantyType: productData.warrantyType,
        deliveryTime: productData.deliveryTime,
        // Check field existence
        hasFreeShipping: 'freeShipping' in productData,
        hasWarrantyPeriod: 'warrantyPeriod' in productData,
        hasWarrantyType: 'warrantyType' in productData
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}