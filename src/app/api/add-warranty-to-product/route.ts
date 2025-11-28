import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    // Add warranty and free shipping to your specific product
    const result = await Product.findByIdAndUpdate(
      '69285463a6ccf9f712dff2dc', // Your shoes product ID
      { 
        $set: { 
          freeShipping: true,
          warrantyPeriod: "6",
          warrantyType: "Product replacement warranty",
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
      message: 'Added warranty and free shipping to product',
      product: {
        name: result.name,
        freeShipping: result.freeShipping,
        warrantyPeriod: result.warrantyPeriod,
        warrantyType: result.warrantyType
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}