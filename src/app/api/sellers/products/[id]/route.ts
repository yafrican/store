import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectMongo from "@/lib/mongodb"
import Product from "@/models/Product"

const JWT_SECRET = process.env.JWT_SECRET || 'a8f9d7g6h5j4k3l2m1n0p9q8r7s6t5u4v3w2x1y0z'

function verifyToken(req: Request) {
  try {
    console.log('🔍 Starting token verification for seller product...')
    
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

// ✅ FIXED: Add proper type for params with Promise
interface RouteParams {
  params: Promise<{ id: string }>
}

// GET single product (seller-owned) - FIXED
export async function GET(
  req: Request,
  { params }: RouteParams
) {
  try {
    console.log('🔄 GET single product for seller...')
    
    // ✅ FIXED: Await the params
    const { id } = await params
    const payload = verifyToken(req)
    await connectMongo()

    console.log('🔍 Fetching product:', { productId: id, sellerId: payload.id })

    const product = await Product.findOne({ _id: id, seller: payload.id })
    if (!product) {
      return NextResponse.json({ 
        success: false,
        error: "Product not found" 
      }, { status: 404 })
    }

    console.log('✅ Product found:', product.name)

    return NextResponse.json({
      success: true,
      product: {
        _id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        subcategory: product.subcategory || '',
        images: product.images || [],
        description: product.description || '',
        status: product.status || 'pending',
        inStock: product.inStock,
        stock: product.stock || 0,
            deliveryLocations: product.deliveryLocations || [], // ✅ Add this
    
        deliveryTime: product.deliveryTime || '', // ✅ Add this
freeShipping: product.freeShipping || false,
        warrantyPeriod: product.warrantyPeriod || '',
        warrantyType: product.warrantyType || '',
        specifications: product.specifications || {},
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    })
  } catch (error: any) {
    console.error("❌ GET product error:", error)
    const message = error.message || "Server error"
    const status = message === "Not authenticated" ? 401 : message === "Access denied" ? 403 : 500
    return NextResponse.json({ 
      success: false,
      error: message 
    }, { status })
  }
}

// DELETE product - FIXED
export async function DELETE(
  req: Request,
  { params }: RouteParams
) {
  try {
    console.log('🔄 DELETE product for seller...')
    
    // ✅ FIXED: Await the params
    const { id } = await params
    const payload = verifyToken(req)
    await connectMongo()

    console.log('🔍 Deleting product:', { productId: id, sellerId: payload.id })

    const product = await Product.findOne({ 
      _id: id, 
      seller: payload.id 
    })

    if (!product) {
      return NextResponse.json({ 
        success: false,
        error: "Product not found" 
      }, { status: 404 })
    }

    await Product.findByIdAndDelete(id)

    console.log('✅ Product deleted successfully:', id)

    return NextResponse.json({ 
      success: true,
      message: "Product deleted successfully"
    })
  } catch (error: any) {
    console.error("❌ Product deletion error:", error)
    return NextResponse.json({ 
      success: false,
      error: error.message || "Server error" 
    }, { status: 500 })
  }
}
// PATCH update product fields - UPDATED FOR VARIABLE PRODUCTS
export async function PATCH(
  req: Request,
  { params }: RouteParams
) {
  try {
    console.log('🔄 PATCH update product for seller...')
    
    const { id } = await params
    const payload = verifyToken(req)
    await connectMongo()

    const body = await req.json()
    console.log('🔍 Updating product with data:', { productId: id, updateData: body })

    const update: any = { updatedAt: new Date() }

    // Basic fields
    const basicFields = [
      'name', 'price', 'originalPrice', 'category', 'subcategory', 'description',
      'specifications', 'productType'
    ]
    
    basicFields.forEach(field => {
      if (body[field] !== undefined) {
        if (typeof body[field] === 'string') {
          update[field] = body[field].trim()
        } else {
          update[field] = body[field]
        }
      }
    })

    // Stock handling based on product type
    if (body.productType === 'simple') {
      if (body.stock !== undefined) {
        const stockVal = parseInt(body.stock)
        update.stock = stockVal
        update.inStock = body.inStock !== undefined ? Boolean(body.inStock) : stockVal > 0
        
        // Clear variable product fields if switching from variable to simple
        update.attributes = []
        update.variations = []
      }
    } else if (body.productType === 'variable') {
      // Handle variable product updates
      if (body.attributes !== undefined) {
        update.attributes = body.attributes
      }
      
      if (body.variations !== undefined) {
        update.variations = body.variations
        
        // Calculate total stock and inStock status
        const totalStock = body.variations.reduce((total: number, v: any) => 
          total + parseInt(v.stock || '0'), 0)
        const hasStock = body.variations.some((v: any) => parseInt(v.stock || '0') > 0)
        
        update.stock = 0 // Main stock is 0 for variable products
        update.totalStock = totalStock
        update.inStock = hasStock
      }
    }

    // Additional fields
    if (body.inStock !== undefined) {
      update.inStock = Boolean(body.inStock)
    }
    
    if (body.deliveryLocations !== undefined) {
      update.deliveryLocations = Array.isArray(body.deliveryLocations) ? body.deliveryLocations : []
    }
    
    if (typeof body.deliveryTime === 'string') {
      update.deliveryTime = body.deliveryTime.trim()
    }
    
    if (body.freeShipping !== undefined) {
      update.freeShipping = Boolean(body.freeShipping)
    }
    
    if (typeof body.warrantyPeriod === 'string') {
      update.warrantyPeriod = body.warrantyPeriod.trim()
    }
    
    if (typeof body.warrantyType === 'string') {
      update.warrantyType = body.warrantyType.trim()
    }

    const updated = await Product.findOneAndUpdate(
      { _id: id, seller: payload.id },
      update,
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ 
        success: false,
        error: 'Product not found' 
      }, { status: 404 })
    }

    console.log('✅ Product updated successfully:', updated.name)

    return NextResponse.json({
      success: true,
      product: {
        _id: updated._id,
        name: updated.name,
        price: updated.price,
        category: updated.category,
        subcategory: updated.subcategory || '',
        images: updated.images || [],
        description: updated.description || '',
        productType: updated.productType || 'simple',
        status: updated.status || 'pending',
        inStock: updated.inStock,
        stock: updated.stock || 0,
        totalStock: updated.totalStock || (updated.productType === 'simple' ? updated.stock : 0),
        deliveryLocations: updated.deliveryLocations || [],
        deliveryTime: updated.deliveryTime || '',
        freeShipping: updated.freeShipping || false,
        warrantyPeriod: updated.warrantyPeriod || '',
        warrantyType: updated.warrantyType || '',
        specifications: updated.specifications || {},
        attributes: updated.attributes || [],
        variations: updated.variations || [],
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt
      }
    })
  } catch (error: any) {
    console.error("❌ PATCH product error:", error)
    const message = error.message || 'Server error'
    const status = message === 'Not authenticated' ? 401 : message === 'Access denied' ? 403 : 500
    return NextResponse.json({ 
      success: false,
      error: message 
    }, { status })
  }
}
// // PATCH update product fields (seller-owned) - FIXED
// export async function PATCH(
//   req: Request,
//   { params }: RouteParams
// ) {
//   try {
//     console.log('🔄 PATCH update product for seller...')
    
//     // ✅ FIXED: Await the params
//     const { id } = await params
//     const payload = verifyToken(req)
//     await connectMongo()

//     const body = await req.json()
//     console.log('🔍 Updating product with data:', { productId: id, updateData: body })

//     const update: any = { updatedAt: new Date() }

//     if (typeof body.name === 'string') update.name = body.name.trim()
//     if (body.price !== undefined) update.price = parseFloat(body.price)
//     if (typeof body.category === 'string') update.category = body.category.trim()
//     if (typeof body.subcategory === 'string') update.subcategory = body.subcategory.trim()
//     if (typeof body.description === 'string') update.description = body.description.trim()
//     if (body.stock !== undefined) {
//       const stockVal = parseInt(body.stock)
//       update.stock = stockVal
//       if (body.inStock === undefined) update.inStock = stockVal > 0
//     }
//     if (body.inStock !== undefined) update.inStock = Boolean(body.inStock)
//     // ✅ Add delivery fields handling
// if (body.deliveryLocations !== undefined) {
//   update.deliveryLocations = Array.isArray(body.deliveryLocations) ? body.deliveryLocations : []
// }
// if (typeof body.deliveryTime === 'string') {
//   update.deliveryTime = body.deliveryTime.trim()
// }
// // ✅ ADD FREE SHIPPING & WARRANTY FIELDS HANDLING
//     if (body.freeShipping !== undefined) {
//       update.freeShipping = Boolean(body.freeShipping)
//     }
//     if (typeof body.warrantyPeriod === 'string') {
//       update.warrantyPeriod = body.warrantyPeriod.trim()
//     }
//     if (typeof body.warrantyType === 'string') {
//       update.warrantyType = body.warrantyType.trim()
//     }
//     // ✅ FIX: Handle specifications update
//     if (body.specifications !== undefined) {
//       update.specifications = body.specifications
//     }

//     const updated = await Product.findOneAndUpdate(
//       { _id: id, seller: payload.id },
//       update,
//       { new: true }
//     )

//     if (!updated) {
//       return NextResponse.json({ 
//         success: false,
//         error: 'Product not found' 
//       }, { status: 404 })
//     }

//     console.log('✅ Product updated successfully:', updated.name)

//     return NextResponse.json({
//       success: true,
//       product: {
//         _id: updated._id,
//         name: updated.name,
//         price: updated.price,
//         category: updated.category,
//         subcategory: updated.subcategory || '',
//         images: updated.images || [],
//         description: updated.description || '',
//         status: updated.status || 'pending',
//         inStock: updated.inStock,
//         stock: updated.stock || 0,
//         deliveryLocations: updated.deliveryLocations || [], // ✅ Add this
//     deliveryTime: updated.deliveryTime || '', // ✅ Add this
//     freeShipping: updated.freeShipping || false,
//         warrantyPeriod: updated.warrantyPeriod || '',
//         warrantyType: updated.warrantyType || '',
//         specifications: updated.specifications || {},
//         createdAt: updated.createdAt,
//         updatedAt: updated.updatedAt
//       }
//     })
//   } catch (error: any) {
//     console.error("❌ PATCH product error:", error)
//     const message = error.message || 'Server error'
//     const status = message === 'Not authenticated' ? 401 : message === 'Access denied' ? 403 : 500
//     return NextResponse.json({ 
//       success: false,
//       error: message 
//     }, { status })
//   }
// }