// app/api/check-product-model/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import mongoose from 'mongoose'

export async function GET() {
  try {
    await connectMongo()
    
    // Check if we have multiple Product models
    const modelNames = Object.keys(mongoose.models)
    const productModels = modelNames.filter(name => 
      name.toLowerCase().includes('product')
    )
    
    // Get the actual Product model being used
    const ProductModel = mongoose.models.Product
    const modelSource = ProductModel ? 'Found Product model' : 'No Product model found'
    
    // Check the schema paths to see what fields exist
    const schemaPaths = ProductModel ? Object.keys(ProductModel.schema.paths) : []
    
    // Check for middleware using a safer approach
    let hasSaveMiddleware = false
    let middlewareCount = 0
    
    if (ProductModel) {
      // Access middleware through any to avoid TypeScript errors
      const schemaAny = ProductModel.schema as any
      if (schemaAny._pre && schemaAny._pre.save) {
        hasSaveMiddleware = true
        middlewareCount = schemaAny._pre.save.length
      }
    }
    
    return NextResponse.json({
      success: true,
      modelInfo: {
        allModels: modelNames,
        productModels: productModels,
        modelSource: modelSource,
        hasSlugField: schemaPaths.includes('slug'),
        hasSaveMiddleware: hasSaveMiddleware,
        saveMiddlewareCount: middlewareCount,
        totalSchemaPaths: schemaPaths.length,
        sampleSchemaPaths: schemaPaths.slice(0, 10) // First 10 fields
      }
    })

  } catch (error: any) {
    console.error('Check product model error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}