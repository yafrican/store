// app/api/add-delivery-time/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    // Update only your specific product
    const result = await Product.findByIdAndUpdate(
      '692819e765023432ec923cb8',
      { $set: { deliveryTime: '30 minutes' } },
      { new: true }
    )
    
    return NextResponse.json({
      success: true,
      message: 'Added delivery time to product',
      product: {
        name: result.name,
        deliveryTime: result.deliveryTime,
        deliveryLocations: result.deliveryLocations
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}