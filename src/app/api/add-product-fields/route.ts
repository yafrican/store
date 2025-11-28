import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectMongo()
    
    console.log('🔄 Adding product fields to all products...')
    
    // Add all missing fields in one query
    const result = await Product.updateMany(
      {}, // Update ALL products
      {
        $set: {
          freeShipping: false,
          warrantyPeriod: "",
          warrantyType: "",
          deliveryTime: "Contact seller for delivery time",
          updatedAt: new Date()
        }
      }
    )
    
    console.log(`✅ Updated ${result.modifiedCount} products with all fields`)
    
    return NextResponse.json({
      success: true,
      message: `Added product fields to ${result.modifiedCount} products`,
      modifiedCount: result.modifiedCount,
      fieldsAdded: [
        'freeShipping (default: false)',
        'warrantyPeriod (default: empty)', 
        'warrantyType (default: empty)',
        'deliveryTime (default: "Contact seller for delivery time")'
      ]
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}