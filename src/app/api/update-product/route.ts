// app/api/update-product/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function POST(req: Request) {
  try {
    const { productId, deliveryTime } = await req.json()
    
    await connectMongo()
    
    const result = await Product.findByIdAndUpdate(
      productId,
      { 
        $set: { 
          deliveryTime: deliveryTime
        } 
      },
      { new: true }
    )
    
    return NextResponse.json({
      success: true,
      message: `Updated product delivery time to: ${deliveryTime}`,
      product: {
        _id: result._id,
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