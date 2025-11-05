import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectMongo from "@/lib/mongodb"
import Product from "@/models/Product"

const JWT_SECRET = process.env.JWT_SECRET || 'a8f9d7g6h5j4k3l2m1n0p9q8r7s6t5u4v3w2x1y0z'

function verifyToken(req: Request) {
  try {
    console.log('🔍 Starting token verification for seller stock update...')
    
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

// ✅ FIXED: Proper type for Next.js 15
interface RouteParams {
  params: Promise<{ id: string }>
}

// PATCH update product stock - FIXED
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    // ✅ FIXED: Properly await params
    const { id } = await params
    
    const payload = verifyToken(request)
    await connectMongo()

    const { inStock, stock } = await request.json()

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Product ID is required"
      }, { status: 400 })
    }

    console.log('🔧 Updating product stock:', { id, inStock, stock })

    const product = await Product.findOne({
      _id: id,
      seller: payload.id
    })

    if (!product) {
      return NextResponse.json({
        success: false,
        error: "Product not found or access denied"
      }, { status: 404 })
    }

    // Build update object
    const update: any = { updatedAt: new Date() }
    
    if (inStock !== undefined) {
      update.inStock = Boolean(inStock)
    }
    
    if (stock !== undefined) {
      const stockValue = parseInt(stock)
      update.stock = stockValue
      // Auto-update inStock based on stock quantity if not explicitly set
      if (inStock === undefined) {
        update.inStock = stockValue > 0
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      update,
      { new: true, runValidators: true }
    )

    if (!updatedProduct) {
      return NextResponse.json({
        success: false,
        error: "Failed to update product"
      }, { status: 500 })
    }

    // Return normalized product data with specifications
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
      specifications: updatedProduct.specifications || {},
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt
    }

    console.log('✅ Product stock updated successfully:', {
      id: formattedProduct._id,
      name: formattedProduct.name,
      inStock: formattedProduct.inStock,
      stock: formattedProduct.stock
    })

    return NextResponse.json({
      success: true,
      product: formattedProduct,
      message: "Product stock updated successfully"
    })

  } catch (error: any) {
    console.error("❌ Product stock update error:", error)
    return NextResponse.json({
      success: false,
      error: error.message || "Internal server error"
    }, { status: 500 })
  }
}

// GET product stock - FIXED
export async function GET(request: Request, { params }: RouteParams) {
  try {
    // ✅ FIXED: Properly await params
    const { id } = await params
    
    const payload = verifyToken(request)
    await connectMongo()

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Product ID is required"
      }, { status: 400 })
    }

    const product = await Product.findOne({
      _id: id,
      seller: payload.id
    })

    if (!product) {
      return NextResponse.json({
        success: false,
        error: "Product not found or access denied"
      }, { status: 404 })
    }

    const formattedProduct = {
      _id: product._id,
      name: product.name,
      inStock: product.inStock,
      stock: product.stock,
      status: product.status
    }

    return NextResponse.json({
      success: true,
      product: formattedProduct
    })

  } catch (error: any) {
    console.error("❌ Product stock fetch error:", error)
    return NextResponse.json({
      success: false,
      error: error.message || "Internal server error"
    }, { status: 500 })
  }
}