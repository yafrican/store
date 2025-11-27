// app/api/fix-delivery-time/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    // Add deliveryTime field to all products that don't have it
    const result = await Product.updateMany(
      { 
        $or: [
          { deliveryTime: { $exists: false } },
          { deliveryTime: null }
        ]
      },
      { $set: { deliveryTime: "Contact seller for delivery time" } }
    )
    
    return NextResponse.json({
      success: true,
      message: `Updated ${result.modifiedCount} products with deliveryTime field`,
      modifiedCount: result.modifiedCount
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}