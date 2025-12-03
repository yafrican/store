import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'
// ---------------- GET: fetch all products ----------------
// GET: fetch all products - UPDATED FOR VARIABLE PRODUCTS
export async function GET(request: Request) {
  try {
    console.log('🚀 Starting GET /api/products...')
    
    await connectMongo()
    console.log('✅ MongoDB connected for GET')

    const products = await Product.find({ 
  status: 'approved', // ✅ Only show approved products
  inStock: true // Optional: Also filter by inStock

})
    .select('-__v')
    .sort({ createdAt: -1 })
    .lean()

    console.log(`✅ Found ${products.length} products`)

    const transformedProducts = products.map((product: any) => {
      // Calculate stock for variable products
      let totalStock = product.stock || 0
      let hasStock = product.stock > 0
      
      if (product.productType === 'variable' && product.variations) {
        totalStock = product.variations.reduce((total: number, v: any) => total + (v.stock || 0), 0)
        hasStock = product.variations.some((v: any) => v.stock > 0)
      }

      const inStock = product.inStock !== undefined ? product.inStock && hasStock : hasStock
      
      const baseProduct = {
        _id: product._id.toString(),
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        images: product.images || [],
        image: product.images?.[0] || '',
        slug: product.slug,
        category: product.category,
        productType: product.productType || 'simple',
        stock: product.stock,
        totalStock: totalStock,
        inStock: inStock,
        isNew: product.isNew || false,
        isOnSale: product.originalPrice && product.originalPrice > product.price,
        salePrice: product.originalPrice && product.originalPrice > product.price ? product.price : undefined,
        discountPercentage: product.originalPrice && product.originalPrice > product.price 
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : 0,
        rating: product.rating || Math.random() * 2 + 3,
        reviews: product.reviews || Math.floor(Math.random() * 500) + 10,
        freeShipping: product.freeShipping || false,
        deliveryTime: product.deliveryTime,
        status: product.status,
      }

      // Add variable product specific fields
      if (product.productType === 'variable') {
        // Calculate price range
        let lowestPrice = product.price
        let highestPrice = product.price
        
        if (product.variations && product.variations.length > 0) {
          const prices = product.variations.map((v: any) => v.price || product.price)
          lowestPrice = Math.min(...prices)
          highestPrice = Math.max(...prices)
        }

        return {
          ...baseProduct,
          priceRange: {
            lowest: lowestPrice,
            highest: highestPrice
          },
          variationsCount: product.variations?.length || 0,
          hasVariations: true
        }
      }

      return baseProduct
    })

    return NextResponse.json(transformedProducts)

  } catch (error: any) {
    console.error('❌ GET /api/products error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch products',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
// export async function GET(request: Request) {
//   try {
//     console.log('🚀 Starting GET /api/products...')
    
//     await connectMongo()
//     console.log('✅ MongoDB connected for GET')

//     const products = await Product.find({ 
//       status: { $ne: 'rejected' }
//     })
//     .select('-__v')
//     .sort({ createdAt: -1 })
//     .lean()

//     console.log(`✅ Found ${products.length} products`)

//     const transformedProducts = products.map(product => ({
//       _id: product._id.toString(),
//       id: product._id.toString(),
//       name: product.name,
//       price: product.price,
//       originalPrice: product.originalPrice || product.price,
//       images: product.images || [],
//       image: product.images?.[0] || '',
//       slug: product.slug,
//       category: product.category,
//       stock: product.stock,
//       inStock: product.inStock,
//       isNew: product.isNew || false,
//       isOnSale: product.originalPrice && product.originalPrice > product.price,
//       salePrice: product.originalPrice && product.originalPrice > product.price ? product.price : undefined,
//       discountPercentage: product.originalPrice && product.originalPrice > product.price 
//         ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
//         : 0,
//       rating: product.rating || Math.random() * 2 + 3,
//       reviews: product.reviews || Math.floor(Math.random() * 500) + 10,
//       freeShipping: product.freeShipping || false,
//       deliveryTime: product.deliveryTime,
//       status: product.status,
//     }))

//     return NextResponse.json(transformedProducts)

//   } catch (error: any) {
//     console.error('❌ GET /api/products error:', error)
    
//     return NextResponse.json(
//       { 
//         error: 'Failed to fetch products',
//         details: error.message 
//       },
//       { status: 500 }
//     )
//   }
// }
// ---------------- POST: create a new product ----------------
export async function POST(request: Request) {
  try {
    console.log('🚀 Starting POST /api/products...')
    
    await connectMongo()
    console.log('✅ MongoDB connected')

    const formData = await request.formData()
    console.log('📦 Form data received')

    // Extract product data - ADD THE NEW FIELDS
    const name = formData.get('name') as string
    const price = formData.get('price') as string
    const originalPrice = formData.get('originalPrice') as string
    const category = formData.get('category') as string
    const subcategory = formData.get('subcategory') as string
    const description = formData.get('description') as string
    const stock = formData.get('stock') as string
    const imageFiles = formData.getAll('images') as File[]
    
    // ✅ ADD THESE LINES - Extract the new fields
    const deliveryLocationsInput = formData.get('deliveryLocations') as string
    const deliveryLocations = deliveryLocationsInput ? JSON.parse(deliveryLocationsInput) : []
    const deliveryTime = formData.get('deliveryTime') as string
    const freeShipping = formData.get('freeShipping') === 'true' // Convert string to boolean
    const warrantyPeriod = formData.get('warrantyPeriod') as string
    const warrantyType = formData.get('warrantyType') as string

    console.log('📋 Product data:', { 
      name, 
      price, 
      originalPrice, 
      category, 
      subcategory, 
      stock,
      // ✅ ADD LOGS FOR NEW FIELDS
      deliveryTime,
      freeShipping,
      warrantyPeriod,
      warrantyType,
      deliveryLocations
    })
    console.log('🖼️ Image files:', imageFiles.length)

    // Validation - ADD VALIDATION FOR NEW FIELDS
    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      )
    }

    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      return NextResponse.json(
        { error: 'Valid price is required' },
        { status: 400 }
      )
    }

    if (!category?.trim()) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      )
    }

    // ✅ ADD VALIDATION FOR DELIVERY TIME
    if (!deliveryTime?.trim()) {
      return NextResponse.json(
        { error: 'Delivery time is required' },
        { status: 400 }
      )
    }

    // Generate slug
    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    let slug = baseSlug
    let counter = 1

    // Check for existing slug
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Handle image uploads
    let imageUrls: string[] = []
    
    if (imageFiles && imageFiles.length > 0) {
      console.log('📤 Uploading images...')
      
      try {
        const uploadFormData = new FormData()
        imageFiles.forEach(file => uploadFormData.append('images', file))

        const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
        const uploadResponse = await fetch(`${baseUrl}/api/upload`, {
          method: 'POST',
          body: uploadFormData,
        })

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          imageUrls = uploadData.urls || uploadData.images || []
          console.log('✅ Images uploaded:', imageUrls)
        } else {
          console.warn('⚠️ Image upload failed, using placeholders')
          // Fallback to placeholder images
          imageUrls = imageFiles.map((_, index) => 
            `https://via.placeholder.com/400x400/007bff/ffffff?text=Product+${index + 1}`
          )
        }
      } catch (uploadError) {
        console.error('❌ Image upload error:', uploadError)
        // Fallback to placeholder images
        imageUrls = imageFiles.map((_, index) => 
          `https://via.placeholder.com/400x400/007bff/ffffff?text=Product+${index + 1}`
        )
      }
    }

    // Calculate stock status
    const stockQuantity = stock ? parseInt(stock) : 1
    const inStock = stockQuantity > 0

    // Create product using Mongoose model - ✅ INCLUDE ALL FIELDS
    const newProduct = new Product({
      name: name.trim(),
      slug,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price),
      category: category.trim().toUpperCase(), // Normalize to uppercase
      subcategory: subcategory ? subcategory.trim() : '',
      description: description ? description.trim() : '',
      images: imageUrls,
      stock: stockQuantity,
      inStock: inStock,
      status: 'pending', // New products require admin approval
      seller: null, 
      // ✅ INCLUDE ALL THE NEW FIELDS
      deliveryLocations: deliveryLocations,
      deliveryTime: deliveryTime.trim(),
      freeShipping: freeShipping,
      warrantyPeriod: warrantyPeriod || '',
      warrantyType: warrantyType || ''
    })

    console.log('💾 Saving product to database...')
    const savedProduct = await newProduct.save()
    console.log('✅ Product saved successfully:', savedProduct._id)

    // ✅ RETURN ALL FIELDS IN RESPONSE FOR DEBUGGING
    return NextResponse.json({
      success: true,
      message: '✅ Product created successfully! Awaiting admin approval.',
      product: {
        _id: savedProduct._id.toString(),
        name: savedProduct.name,
        slug: savedProduct.slug,
        price: savedProduct.price,
        category: savedProduct.category,
        status: savedProduct.status,
        images: savedProduct.images,
        inStock: savedProduct.inStock,
        stock: savedProduct.stock,
        // ✅ RETURN NEW FIELDS
        deliveryLocations: savedProduct.deliveryLocations,
        deliveryTime: savedProduct.deliveryTime,
        freeShipping: savedProduct.freeShipping,
        warrantyPeriod: savedProduct.warrantyPeriod,
        warrantyType: savedProduct.warrantyType
      }
    }, { status: 201 })

  } catch (error: any) {
    console.error('❌ POST /api/products error:', error)
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      )
    }
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Product with this name already exists' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    )
  }

}