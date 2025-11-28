// app/api/fix-amharic-get/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import mongoose from 'mongoose'
import slugify from 'slugify'

export async function GET() {
  try {
    await connectMongo()
    
    console.log('🚨 GET: FORCE FIXING AMHARIC SLUGS...')
    
    const db = mongoose.connection.db
    if (!db) {
      throw new Error('Database not connected')
    }
    
    const productsCollection = db.collection('products')
    
    // Get ALL products first, then filter for Amharic in JavaScript
    const allProducts = await productsCollection.find({}).toArray()
    
    // Filter for Amharic products in JavaScript (not MongoDB)
    const amharicProducts = allProducts.filter(product => {
      const hasAmharic = /[\u1200-\u137F]/.test(product.name);
      const hasBadSlug = !product.slug || /^[0-9]+$/.test(product.slug);
      return hasAmharic && hasBadSlug;
    });

    console.log(`Found ${amharicProducts.length} Amharic products to fix`)

    let fixedCount = 0
    const results = []

    for (const product of amharicProducts) {
      try {
        const oldSlug = product.slug
        
        const baseSlug = slugify(product.name, {
          lower: true,
          strict: false,
          locale: 'am',
          remove: /[*+~.()'"!:@]/g
        }) || 'product'

        console.log(`Generating slug: "${product.name}" -> ${baseSlug}`)

        let newSlug = baseSlug
        let counter = 1

        // Check for duplicates
        const existing = await productsCollection.findOne({ 
          slug: newSlug, 
          _id: { $ne: product._id } 
        })
        
        if (existing) {
          while (await productsCollection.findOne({ 
            slug: `${baseSlug}-${counter}`, 
            _id: { $ne: product._id } 
          })) {
            counter++
            if (counter > 100) break
          }
          newSlug = `${baseSlug}-${counter}`
        }

        // Update the slug
        await productsCollection.updateOne(
          { _id: product._id },
          { $set: { slug: newSlug } }
        )

        results.push({
          id: product._id.toString(),
          name: product.name,
          oldSlug: oldSlug,
          newSlug: newSlug,
          success: true,
          url: `http://localhost:3000/products/${newSlug}`
        })
        fixedCount++

        console.log(`✅ Fixed: "${product.name}" ${oldSlug} -> ${newSlug}`)

      } catch (error: any) {
        console.error(`❌ Error with product ${product._id}:`, error)
        results.push({
          id: product._id.toString(),
          name: product.name,
          error: error.message
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Fixed ${fixedCount} Amharic product slugs`,
      fixedCount,
      totalAmharicProducts: amharicProducts.length,
      results
    })

  } catch (error: any) {
    console.error('GET Fix error:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}