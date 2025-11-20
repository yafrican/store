import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

// ---------------- GET: fetch all approved products with proper formatting ----------------
export async function GET(request: Request) {
  try {
    console.log('🚀 Starting GET /api/products...')
    
    await connectMongo()
    console.log('✅ MongoDB connected')

    // Get URL parameters for filtering
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const limit = url.searchParams.get('limit')
    
    console.log('🔍 Fetching APPROVED products from database...')
    
    // Build query - only approved products
    let query: any = { status: 'approved' }
    
    // Add category filter if provided
    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(category, 'i') }
    }
    
    console.log('📋 Query:', query)

    // Build find operation
    let findOperation = Product.find(query)
    
    // Apply sorting - newest first
    findOperation = findOperation.sort({ createdAt: -1 })
    
    // Apply limit if provided
    if (limit) {
      findOperation = findOperation.limit(parseInt(limit))
    }

    // Execute query
    const products = await findOperation.exec()
    
    console.log(`✅ Found ${products.length} approved products`)

    // Log sample products for debugging
    if (products.length > 0) {
      console.log('📦 Sample products found:')
      products.slice(0, 3).forEach((product, index) => {
        console.log(`  Product ${index + 1}:`, {
          _id: product._id,
          name: product.name,
          category: product.category,
          status: product.status,
          inStock: product.inStock,
          stock: product.stock,
          images: product.images?.length || 0,
          price: product.price
        })
      })
    } else {
      console.warn('⚠️ No approved products found in database!')
      
      // Let's check what products exist in database
      const allProducts = await Product.find({})
      console.log('📊 All products in database (any status):', allProducts.length)
      allProducts.forEach((p, idx) => {
        console.log(`  ${idx + 1}. ${p.name} - Status: ${p.status} - Category: ${p.category}`)
      })
    }

    // ✅ FIXED: Enhanced product formatting with proper image handling
    const formattedProducts = products.map((product) => {
      // Handle images array properly
      let images: string[] = []
      
      if (Array.isArray(product.images)) {
        images = product.images
      } else if (typeof product.images === 'string') {
        images = [product.images]
      } else if (product.image) { // Fallback to single image field
        images = [product.image]
      }

      // Ensure absolute URLs for images
      const processedImages = images.map(img => {
        if (!img) return ''
        
        if (img.startsWith('http')) {
          return img // Already absolute URL
        } else if (img.startsWith('/')) {
          // Convert relative path to absolute URL
          return `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${img}`
        } else {
          // Handle other cases - assume it's a full URL or use as-is
          return img
        }
      }).filter(img => img) // Remove empty strings

      // Calculate stock status properly
      const hasStock = product.stock > 0
      const isInStock = product.inStock !== undefined ? product.inStock && hasStock : hasStock

      // Format category for display
      const displayCategory = product.category 
        ? product.category.charAt(0).toUpperCase() + product.category.slice(1).toLowerCase()
        : 'Uncategorized'

      return {
        _id: product._id.toString(),
        name: product.name,
        slug: product.slug || product._id.toString(),
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        category: displayCategory,
        subcategory: product.subcategory || '',
        description: product.description || '',
        images: processedImages,
        image: processedImages[0] || '', // For backward compatibility
        status: product.status || 'approved',
        inStock: isInStock,
        stock: product.stock || 0,
        isDemo: false,
        rating: product.rating || 4.0, // Default rating
        reviewCount: product.reviewCount || 0,
        isNew: product.isNew || false,
        isOnSale: product.isOnSale || false,
        salePrice: product.salePrice || null,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }
    })

    console.log('📊 Total formatted products:', formattedProducts.length)
    console.log('🚀 Sending response with', formattedProducts.length, 'products')

    // Return as array (not object)
    return NextResponse.json(formattedProducts)

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

// ---------------- POST: create a new product ----------------
export async function POST(request: Request) {
  try {
    console.log('🚀 Starting POST /api/products...')
    
    await connectMongo()
    console.log('✅ MongoDB connected')

    const formData = await request.formData()
    console.log('📦 Form data received')

    // Extract product data
    const name = formData.get('name') as string
    const price = formData.get('price') as string
    const originalPrice = formData.get('originalPrice') as string
    const category = formData.get('category') as string
    const subcategory = formData.get('subcategory') as string
    const description = formData.get('description') as string
    const stock = formData.get('stock') as string
    const imageFiles = formData.getAll('images') as File[]

    console.log('📋 Product data:', { 
      name, 
      price, 
      originalPrice, 
      category, 
      subcategory, 
      stock 
    })
    console.log('🖼️ Image files:', imageFiles.length)

    // Validation
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

    // Create product using Mongoose model
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
      seller: null, // This should come from authenticated user in real scenario
    })

    console.log('💾 Saving product to database...')
    const savedProduct = await newProduct.save()
    console.log('✅ Product saved successfully:', savedProduct._id)

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