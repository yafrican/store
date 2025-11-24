// app/api/fix-delivery/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    const result = await Product.updateMany(
      { deliveryLocations: { $exists: false } },
      { $set: { deliveryLocations: [] } }
    )
    
    return NextResponse.json({
      success: true,
      message: `Updated ${result.modifiedCount} products with empty deliveryLocations`,
      modifiedCount: result.modifiedCount
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}