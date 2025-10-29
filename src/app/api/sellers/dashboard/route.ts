import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectMongo from "@/lib/mongodb"
import Product from "@/models/Product"
import User from "@/models/User"

const JWT_SECRET = process.env.JWT_SECRET!

function verifyToken(req: Request) {
  const cookieHeader = req.headers.get("cookie") || ""
  const match = cookieHeader.match(/authToken=([^;]+)/)
  const token = match ? match[1] : null

  if (!token) throw new Error("Not authenticated")
  
  const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string }
  if (payload.role !== "seller") throw new Error("Access denied")
  
  return payload
}

export async function GET(req: Request) {
  try {
    const payload = verifyToken(req)
    await connectMongo()

    // ✅ FIXED: Use 'seller' field instead of 'sellerId'
    const products = await Product.find({ seller: payload.id })
    
    // Calculate dashboard stats
    const stats = {
      totalProducts: products.length,
      pendingApproval: products.filter(p => p.status === 'pending').length,
      activeProducts: products.filter(p => p.status === 'approved').length,
      outOfStock: products.filter(p => !p.inStock).length,
      totalRevenue: 0,
      monthlySales: 0
    }

    return NextResponse.json({ 
      success: true, 
      stats,
      recentProducts: products.slice(0, 5).map(product => ({
        _id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        status: product.status, // ✅ Ensure status is included
        inStock: product.inStock,
        images: product.images,
        description: product.description,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }))
    })
  } catch (error: any) {
    console.error("Dashboard error:", error)
    return NextResponse.json({ 
      error: error.message || "Server error" 
    }, { 
      status: error.message === "Not authenticated" ? 401 : 
            error.message === "Access denied" ? 403 : 500 
    })
  }
}