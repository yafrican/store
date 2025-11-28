// app/api/ensure-slugs/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import mongoose from 'mongoose'
import slugify from 'slugify'

export async function POST() {
  try {
    await connectMongo()
    
    const db = mongoose.connection.db
    const productsCollection = db.collection('products')
    
    // Find products with bad slugs
    const badSlugProducts = await productsCollection.find({
      $or: [
        { slug: { $regex: /^[0-9]+$/ } }, // Numeric slugs
        { slug: { $exists: false } },
        { slug: null }
      ]
    }).toArray()

    let fixedCount = 0

    for (const product of badSlugProducts) {
      const baseSlug = slugify(product.name, {
        lower: true,
        strict: false,
        locale: 'am',
        remove: /[*+~.()'"!:@]/g
      }) || 'product'

      let newSlug = baseSlug
      let counter = 1

      while (await productsCollection.findOne({ 
        slug: newSlug, 
        _id: { $ne: product._id } 
      })) {
        newSlug = `${baseSlug}-${counter}`
        counter++
        if (counter > 100) break
      }

      await productsCollection.updateOne(
        { _id: product._id },
        { $set: { slug: newSlug } }
      )
      fixedCount++
    }

    return NextResponse.json({
      success: true,
      message: `Ensured ${fixedCount} product slugs are valid`,
      fixedCount
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}