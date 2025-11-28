import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    // Update your specific product with ALL missing fields
    const result = await Product.findByIdAndUpdate(
      '69283d689c26992b98042779', // Your bread maker product
      { 
        $set: { 
          freeShipping: false,
          warrantyPeriod: "12",
          warrantyType: "Manufacturer warranty",
          deliveryTime: '2-3 days',
          updatedAt: new Date()
        }
      },
      { new: true }
    )
    
    if (!result) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Added all missing fields to product',
      product: {
        name: result.name,
        freeShipping: result.freeShipping,
        warrantyPeriod: result.warrantyPeriod,
        warrantyType: result.warrantyType,
        deliveryTime: result.deliveryTime
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}