// src/app/api/sellers/products/route.ts - FIXED TOKEN EXTRACTION
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import connectMongo from "@/lib/mongodb"
import Product from "@/models/Product"

const JWT_SECRET = process.env.JWT_SECRET || 'a8f9d7g6h5j4k3l2m1n0p9q8r7s6t5u4v3w2x1y0z'

function verifyToken(req: Request) {
  try {
    console.log('🔍 Starting token verification for seller...')
    
    const cookieHeader = req.headers.get("cookie") || ""
    console.log('🔍 Raw cookie header:', cookieHeader)
    
    // ✅ FIX: Extract ALL cookies properly and find the JWT token
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim())
    console.log('🔍 All cookies:', cookies)
    
    let token = null
    for (const cookie of cookies) {
      if (cookie.startsWith('token=')) {
        token = cookie.substring(6) // Remove 'token='
        break
      }
    }

    console.log('🔍 JWT Token extracted:', token ? `${token.substring(0, 50)}...` : 'No JWT token found')
    console.log('🔍 Token starts with eyJ?:', token ? token.startsWith('eyJ') : false)

    if (!token) {
      throw new Error("Not authenticated - No token found")
    }

    // ✅ FIX: Validate it's a JWT token (should start with eyJ)
    if (!token.startsWith('eyJ')) {
      console.error('❌ Wrong token type extracted. Expected JWT token starting with "eyJ"')
      console.error('❌ Actual token starts with:', token.substring(0, 20))
      throw new Error("Invalid token format")
    }

    // ✅ FIX: Trim whitespace
    const cleanToken = token.trim()
    console.log('🔍 Clean token length:', cleanToken.length)
    console.log('🔍 JWT_SECRET exists:', !!JWT_SECRET)

    // ✅ FIX: Debug token structure
    try {
      const tokenParts = cleanToken.split('.')
      console.log('🔍 Token parts:', tokenParts.length)
      if (tokenParts.length === 3) {
        const header = JSON.parse(Buffer.from(tokenParts[0], 'base64').toString())
        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString())
        console.log('🔍 Token algorithm:', header.alg)
        console.log('🔍 Token payload role:', payload.role)
      } else {
        console.error('❌ Invalid JWT structure - expected 3 parts, got:', tokenParts.length)
        throw new Error("Invalid JWT structure")
      }
    } catch (debugError) {
      console.error('❌ Token debug failed:', debugError)
      throw new Error("Invalid token format")
    }

    // ✅ FIX: JWT verification
    let payload;
    try {
      payload = jwt.verify(cleanToken, JWT_SECRET) as { id: string; role: string; email: string }
      console.log('✅ Token verified successfully, payload:', {
        id: payload.id,
        role: payload.role,
        email: payload.email
      })
    } catch (jwtError: any) {
      console.error('❌ JWT verification failed:', {
        error: jwtError.message,
        name: jwtError.name
      })
      throw new Error(`Authentication failed: ${jwtError.message}`)
    }
    
    if (payload.role !== "seller") {
      console.error('❌ Access denied - user role:', payload.role)
      throw new Error("Access denied - Seller access required")
    }
    
    console.log('✅ Seller access granted for user:', payload.id)
    return payload
    
  } catch (error: any) {
    console.error('❌ Token verification error:', error.message)
    throw error
  }
}

// GET seller products with status filtering - FIXED
export async function GET(req: Request) {
  try {
    console.log('🔄 Starting GET /api/sellers/products...')
    
    const payload = verifyToken(req)
    await connectMongo()

    // Get query parameters for filtering
    const url = new URL(req.url)
    const status = url.searchParams.get('status')
    
    let query: any = { seller: new mongoose.Types.ObjectId(payload.id) }
    
    // If status specified, filter by status
    if (status && status !== 'all') {
      query.status = status
    }

    console.log('🔍 Fetching seller products with query:', query)

    const products = await Product.find(query).sort({ createdAt: -1 })

    console.log('📦 Raw products from DB:', products.length)

    // Enhanced product formatting
    const formattedProducts = products.map(product => {
      const hasStock = product.stock > 0
      const isInStock = product.inStock !== undefined ? product.inStock && hasStock : hasStock
      
      const normalizedCategory = product.category ? product.category.toUpperCase() : 'UNCATEGORIZED'

      const safeSpecifications = product.specifications && typeof product.specifications === 'object' 
        ? product.specifications 
        : {}

      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        category: normalizedCategory,
        subcategory: product.subcategory || '',
        images: product.images || [],
        description: product.description || '',
        status: product.status || 'pending',
        inStock: isInStock,
        stock: product.stock || 0,
        seller: product.seller,
        specifications: safeSpecifications,
            deliveryLocations: product.deliveryLocations || [], // ✅ ADD THIS LINE

        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    })

    console.log('✅ Successfully formatted', formattedProducts.length, 'products')

    return NextResponse.json({ 
      success: true, 
      products: formattedProducts
    })
    
  } catch (error: any) {
    console.error("❌ Products fetch error:", error)
    return NextResponse.json({ 
      success: false,
      error: error.message || "Server error" 
    }, { 
      status: error.message.includes("Not authenticated") ? 401 : 
            error.message.includes("Access denied") ? 403 : 500 
    })
  }
}

// POST create new product
// POST create new product - ADD VALIDATION
export async function POST(req: Request) {
  try {
    console.log('🔄 Starting POST /api/sellers/products...')
    
    const payload = verifyToken(req)
    await connectMongo()

    const data = await req.json()
    console.log('📦 Received product data:', data)

    // ✅ ADD: Valid category enum values
    // AFTER (CORRECT - matches your MongoDB schema):
const validCategories = [
  'ELECTRONICS', 'CLOTHING', 'HOME_FURNITURE_APPLIANCES', 'BEAUTY_PERSONAL_CARE',
  'LEISURE_ACTIVITIES', 'BABIES_KIDS', 'AUTOMOTIVE', 'BOOKS_MEDIA',
  'JEWELRY_ACCESSORIES', 'FOOD_AGRICULTURE_FARMING', 'SERVICES', 'PROPERTY',
  'VEHICLES', 'COMMERCIAL_EQUIPMENT', 'REPAIR_CONSTRUCTION', 'ANIMALS_PETS'
]

    // Validation
    if (!data.name?.trim()) {
      return NextResponse.json({
        success: false,
        error: "Product name is required"
      }, { status: 400 })
    }

    if (!data.price || isNaN(parseFloat(data.price)) || parseFloat(data.price) <= 0) {
      return NextResponse.json({
        success: false,
        error: "Valid price is required"
      }, { status: 400 })
    }

    if (!data.category?.trim()) {
      return NextResponse.json({
        success: false,
        error: "Category is required"
      }, { status: 400 })
    }

    // ✅ FIX: Validate category against allowed enum values
    const category = data.category.trim().toUpperCase()
    console.log('🔍 Validating category:', category)
    console.log('🔍 Valid categories:', validCategories)

    if (!validCategories.includes(category)) {
      return NextResponse.json({
        success: false,
        error: `Invalid category: "${category}". Must be one of: ${validCategories.join(', ')}`
      }, { status: 400 })
    }

    const stock = data.stock ? parseInt(data.stock) : 1
    if (stock < 0) {
      return NextResponse.json({
        success: false,
        error: "Stock cannot be negative"
      }, { status: 400 })
    }

    const safeSpecifications = data.specifications && typeof data.specifications === 'object' 
      ? data.specifications 
      : {}

    const productData = {
      name: data.name.trim(),
      price: parseFloat(data.price),
      originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : parseFloat(data.price),
      category: category, // ✅ Use the validated category
      subcategory: data.subcategory ? data.subcategory.trim() : "",
      images: Array.isArray(data.images) ? data.images : [],
      description: data.description ? data.description.trim() : "",
      seller: new mongoose.Types.ObjectId(payload.id),
      status: 'pending',
      inStock: stock > 0,
      stock: stock,
      specifications: safeSpecifications,
       deliveryLocations: Array.isArray(data.deliveryLocations) ? data.deliveryLocations : [] // ✅ ADD THIS LINE
    }

    console.log('📦 Creating product with validated data:', productData)

    const product = await Product.create(productData)

    const createdSpecifications = product.specifications && typeof product.specifications === 'object' 
      ? product.specifications 
      : {}

    const formattedProduct = {
      _id: product._id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      subcategory: product.subcategory,
      images: product.images,
      description: product.description,
      status: product.status,
      inStock: product.inStock,
      stock: product.stock,
      seller: product.seller,
      specifications: createdSpecifications,
        deliveryLocations: product.deliveryLocations || [], // ✅ ADD THIS LINE
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }

    return NextResponse.json({
      success: true,
      product: formattedProduct,
      message: "Product created successfully! It is now pending admin approval."
    }, { status: 201 })

  } catch (error: any) {
    console.error("❌ Product creation error:", error)
    
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: "Product with this name already exists"
      }, { status: 400 })
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({
        success: false,
        error: errors.join(', ')
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: error.message || "Internal server error"
    }, { status: 500 })
  }
}

// PATCH update product stock
export async function PATCH(req: Request) {
  try {
    const payload = verifyToken(req)
    await connectMongo()

    const { productId, inStock, stock } = await req.json()

    if (!productId) {
      return NextResponse.json({
        success: false,
        error: "Product ID is required"
      }, { status: 400 })
    }

    const product = await Product.findOne({ 
      _id: productId, 
      seller: payload.id 
    })

    if (!product) {
      return NextResponse.json({
        success: false,
        error: "Product not found or access denied"
      }, { status: 404 })
    }

    const updateData: any = { updatedAt: new Date() }
    
    if (inStock !== undefined) {
      updateData.inStock = Boolean(inStock)
    }
    
    if (stock !== undefined) {
      const stockValue = parseInt(stock)
      updateData.stock = stockValue
      if (inStock === undefined) {
        updateData.inStock = stockValue > 0
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return NextResponse.json({
        success: false,
        error: "Failed to update product"
      }, { status: 500 })
    }

    const safeSpecifications = updatedProduct.specifications && typeof updatedProduct.specifications === 'object' 
      ? updatedProduct.specifications 
      : {}

    const formattedProduct = {
      _id: updatedProduct._id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      originalPrice: updatedProduct.originalPrice,
      category: updatedProduct.category.toUpperCase(),
      subcategory: updatedProduct.subcategory,
      images: updatedProduct.images,
      description: updatedProduct.description,
      status: updatedProduct.status,
      inStock: updatedProduct.inStock,
      stock: updatedProduct.stock,
      seller: updatedProduct.seller,
      specifications: safeSpecifications,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt
    }

    return NextResponse.json({
      success: true,
      product: formattedProduct,
      message: "Product updated successfully"
    })

  } catch (error: any) {
    console.error("❌ Product update error:", error)
    return NextResponse.json({
      success: false,
      error: error.message || "Internal server error"
    }, { status: 500 })
  }
}

// DELETE product
export async function DELETE(req: Request) {
  try {
    const payload = verifyToken(req)
    await connectMongo()

    const url = new URL(req.url)
    const productId = url.searchParams.get('id')

    if (!productId) {
      return NextResponse.json({
        success: false,
        error: "Product ID is required"
      }, { status: 400 })
    }

    const product = await Product.findOne({ 
      _id: productId, 
      seller: payload.id 
    })

    if (!product) {
      return NextResponse.json({
        success: false,
        error: "Product not found or access denied"
      }, { status: 404 })
    }

    await Product.findByIdAndDelete(productId)

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully"
    })

  } catch (error: any) {
    console.error("❌ Product deletion error:", error)
    return NextResponse.json({
      success: false,
      error: error.message || "Internal server error"
    }, { status: 500 })
  }
}

// // src/app/api/sellers/products/route.ts - COMPLETELY FIXED
// import { NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import mongoose from "mongoose"
// import connectMongo from "@/lib/mongodb"
// import Product from "@/models/Product"

// const JWT_SECRET = process.env.JWT_SECRET!

// function verifyToken(req: Request) {
//   const cookieHeader = req.headers.get("cookie") || ""
//   const match = cookieHeader.match(/token=([^;]+)/)
//   const token = match ? match[1] : null

//   if (!token) throw new Error("Not authenticated")
  
//   const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string }
//   if (payload.role !== "seller") throw new Error("Access denied")
  
//   return payload
// }

// // GET seller products with status filtering - COMPLETELY FIXED
// export async function GET(req: Request) {
//   try {
//     const payload = verifyToken(req)
//     await connectMongo()

//     // Get query parameters for filtering
//     const url = new URL(req.url)
//     const status = url.searchParams.get('status')
    
//     let query: any = { seller: payload.id }
    
//     // If status specified, filter by status
//     if (status) {
//       query.status = status
//     }

//     console.log('🔍 Fetching seller products with query:', query)

//     const products = await Product.find(query).sort({ createdAt: -1 })

//     // ✅ FIXED: Enhanced product formatting with proper stock logic
//     const formattedProducts = products.map(product => {
//       // ✅ FIX: Calculate inStock based on both inStock field AND stock quantity
//       const hasStock = product.stock > 0
//       const isInStock = product.inStock !== undefined ? product.inStock && hasStock : hasStock
      
//       // ✅ FIX: Normalize category to uppercase for consistency
//       const normalizedCategory = product.category ? product.category.toUpperCase() : 'UNCATEGORIZED'

//       return {
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         originalPrice: product.originalPrice || product.price,
//         category: normalizedCategory, // ✅ Normalized category
//         subcategory: product.subcategory || '',
//         images: product.images || [],
//         description: product.description || '',
//         status: product.status || 'pending',
//         inStock: isInStock, // ✅ Properly calculated stock status
//         stock: product.stock || 0,
//         seller: product.seller,
//         createdAt: product.createdAt,
//         updatedAt: product.updatedAt
//       }
//     })

//     console.log('📦 Formatted products response:', formattedProducts.length, 'products')
//     console.log('📦 Sample product:', formattedProducts[0] || 'No products')

//     return NextResponse.json({ 
//       success: true, 
//       products: formattedProducts
//     })
//   } catch (error: any) {
//     console.error("Products fetch error:", error)
//     return NextResponse.json({ 
//       error: error.message || "Server error" 
//     }, { 
//       status: error.message === "Not authenticated" ? 401 : 
//             error.message === "Access denied" ? 403 : 500 
//     })
//   }
// }

// // POST create new product - COMPLETELY FIXED
// export async function POST(req: Request) {
//   try {
//     const payload = verifyToken(req)
//     await connectMongo()

//     console.log('🔍 Seller ID:', payload.id)

//     const data = await req.json()
//     console.log('🔄 Creating product with data:', data)

//     // ✅ FIX: Enhanced validation
//     if (!data.name?.trim()) {
//       return NextResponse.json({
//         success: false,
//         error: "Product name is required"
//       }, { status: 400 })
//     }

//     if (!data.price || isNaN(parseFloat(data.price)) || parseFloat(data.price) <= 0) {
//       return NextResponse.json({
//         success: false,
//         error: "Valid price is required"
//       }, { status: 400 })
//     }

//     if (!data.category?.trim()) {
//       return NextResponse.json({
//         success: false,
//         error: "Category is required"
//       }, { status: 400 })
//     }

//     // ✅ FIX: Validate stock
//     const stock = data.stock ? parseInt(data.stock) : 1
//     if (stock < 0) {
//       return NextResponse.json({
//         success: false,
//         error: "Stock cannot be negative"
//       }, { status: 400 })
//     }

//     // ✅ FIX: Create product with ALL required fields and proper defaults
//     const productData = {
//       name: data.name.trim(),
//       price: parseFloat(data.price),
//       originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : parseFloat(data.price),
//       category: data.category.trim().toUpperCase(), // ✅ Normalize to uppercase
//       subcategory: data.subcategory ? data.subcategory.trim() : "",
//       images: Array.isArray(data.images) ? data.images : [],
//       description: data.description ? data.description.trim() : "",
//       seller: new mongoose.Types.ObjectId(payload.id),
//       status: 'pending',
//       inStock: stock > 0, // ✅ Auto-set inStock based on stock quantity
//       stock: stock
//     }

//     console.log('📦 Final product data to save:', productData)

//     // ✅ FIX: Use create() for better error handling
//     const product = await Product.create(productData)

//     console.log('✅ Product saved successfully:', {
//       _id: product._id,
//       name: product.name,
//       price: product.price,
//       originalPrice: product.originalPrice,
//       category: product.category,
//       status: product.status,
//       inStock: product.inStock,
//       stock: product.stock,
//       seller: product.seller
//     })

//     // ✅ FIX: Return complete product data with normalized category
//     const formattedProduct = {
//       _id: product._id,
//       name: product.name,
//       price: product.price,
//       originalPrice: product.originalPrice,
//       category: product.category.toUpperCase(), // ✅ Ensure uppercase in response
//       subcategory: product.subcategory,
//       images: product.images,
//       description: product.description,
//       status: product.status,
//       inStock: product.inStock,
//       stock: product.stock,
//       seller: product.seller,
//       createdAt: product.createdAt,
//       updatedAt: product.updatedAt
//     }

//     return NextResponse.json({
//       success: true,
//       product: formattedProduct,
//       message: "Product created successfully! It is now pending admin approval."
//     }, { status: 201 })

//   } catch (error: any) {
//     console.error("❌ Product creation error:", error)
    
//     if (error.code === 11000) {
//       return NextResponse.json({
//         success: false,
//         error: "Product with this name already exists"
//       }, { status: 400 })
//     }
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map((err: any) => err.message)
//       return NextResponse.json({
//         success: false,
//         error: errors.join(', ')
//       }, { status: 400 })
//     }

//     return NextResponse.json({
//       success: false,
//       error: error.message || "Internal server error"
//     }, { status: 500 })
//   }
// }

// // PATCH update product stock - ADD THIS METHOD
// export async function PATCH(req: Request) {
//   try {
//     const payload = verifyToken(req)
//     await connectMongo()

//     const { productId, inStock, stock } = await req.json()

//     if (!productId) {
//       return NextResponse.json({
//         success: false,
//         error: "Product ID is required"
//       }, { status: 400 })
//     }

//     // ✅ FIX: Find product by seller to ensure ownership
//     const product = await Product.findOne({ 
//       _id: productId, 
//       seller: payload.id 
//     })

//     if (!product) {
//       return NextResponse.json({
//         success: false,
//         error: "Product not found or access denied"
//       }, { status: 404 })
//     }

//     // ✅ FIX: Update fields
//     const updateData: any = { updatedAt: new Date() }
    
//     if (inStock !== undefined) {
//       updateData.inStock = Boolean(inStock)
//     }
    
//     if (stock !== undefined) {
//       const stockValue = parseInt(stock)
//       updateData.stock = stockValue
//       // Auto-update inStock based on stock quantity if not explicitly set
//       if (inStock === undefined) {
//         updateData.inStock = stockValue > 0
//       }
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       updateData,
//       { new: true, runValidators: true }
//     )

//     // ✅ FIX: Return normalized product data
//     const formattedProduct = {
//       _id: updatedProduct._id,
//       name: updatedProduct.name,
//       price: updatedProduct.price,
//       originalPrice: updatedProduct.originalPrice,
//       category: updatedProduct.category.toUpperCase(),
//       subcategory: updatedProduct.subcategory,
//       images: updatedProduct.images,
//       description: updatedProduct.description,
//       status: updatedProduct.status,
//       inStock: updatedProduct.inStock,
//       stock: updatedProduct.stock,
//       seller: updatedProduct.seller,
//       createdAt: updatedProduct.createdAt,
//       updatedAt: updatedProduct.updatedAt
//     }

//     return NextResponse.json({
//       success: true,
//       product: formattedProduct,
//       message: "Product updated successfully"
//     })

//   } catch (error: any) {
//     console.error("❌ Product update error:", error)
//     return NextResponse.json({
//       success: false,
//       error: error.message || "Internal server error"
//     }, { status: 500 })
//   }
// }