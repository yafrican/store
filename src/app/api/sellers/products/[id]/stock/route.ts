import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectMongo from "@/lib/mongodb"
import Product from "@/models/Product"

const JWT_SECRET = process.env.JWT_SECRET!

function verifyToken(req: Request) {
  const cookieHeader = req.headers.get("cookie") || ""
  // Use same cookie name as other seller routes
  const match = cookieHeader.match(/token=([^;]+)/)
  const token = match ? match[1] : null

  if (!token) throw new Error("Not authenticated")
  
  const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string }
  if (payload.role !== "seller") throw new Error("Access denied")
  
  return payload
}

// PATCH update stock status
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = verifyToken(req)
    await connectMongo()

    const { inStock } = await req.json()

    // ✅ FIXED: Use 'seller' field instead of 'sellerId'
    const product = await Product.findOne({ 
      _id: params.id, 
      seller: payload.id 
    })

    if (!product) {
      return NextResponse.json({ 
        error: "Product not found" 
      }, { status: 404 })
    }

    // When marking out of stock, also zero stock so public listing reflects it.
    // When marking back to in stock and stock is 0, set to 1 as a minimal placeholder.
    const update: any = { inStock, updatedAt: new Date() }
    if (inStock === false) {
      update.stock = 0
    } else if (inStock === true && (product.stock === 0 || product.stock === undefined || product.stock === null)) {
      update.stock = 1
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      update,
      { new: true }
    )

    return NextResponse.json({ 
      success: true, 
      product: updatedProduct 
    })
  } catch (error: any) {
    console.error("Stock update error:", error)
    const message = error.message || "Server error"
    const status = message === "Not authenticated" ? 401
      : message === "Access denied" ? 403
      : 500
    return NextResponse.json({ 
      error: message 
    }, { status })
  }
}