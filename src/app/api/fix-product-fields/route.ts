// This one script handles everything
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    const result = await Product.updateMany(
      { 
        $or: [
          { freeShipping: { $exists: false } },
          { warrantyPeriod: { $exists: false } },
          { warrantyType: { $exists: false } },
          { deliveryTime: { $exists: false } },
          { deliveryTime: null }
        ]
      },
      { 
        $set: { 
          freeShipping: false,
          warrantyPeriod: "",
          warrantyType: "",
          deliveryTime: "Contact seller for delivery time"
        } 
      }
    )
    
    return NextResponse.json({
      success: true,
      message: `Updated ${result.modifiedCount} products with all new fields`,
      modifiedCount: result.modifiedCount
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}