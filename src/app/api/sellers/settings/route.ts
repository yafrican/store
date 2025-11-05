import { NextResponse } from "next/server"
import connectMongo from "@/lib/mongodb"
import User from "@/models/User"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || 'a8f9d7g6h5j4k3l2m1n0p9q8r7s6t5u4v3w2x1y0z'

export async function POST(req: Request) {
  try {
    console.log('🔄 Starting seller settings update...')
    
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

    if (!token) {
      return NextResponse.json({ 
        success: false,
        error: "Not authenticated" 
      }, { status: 401 })
    }

    // ✅ FIX: Validate it's a JWT token (should start with eyJ)
    if (!token.startsWith('eyJ')) {
      console.error('❌ Wrong token type extracted. Expected JWT token starting with "eyJ"')
      return NextResponse.json({ 
        success: false,
        error: "Invalid token format" 
      }, { status: 401 })
    }

    const cleanToken = token.trim()
    
    let payload;
    try {
      payload = jwt.verify(cleanToken, JWT_SECRET) as { id: string; role: string; email: string }
      console.log('✅ Token verified successfully, payload:', {
        id: payload.id,
        role: payload.role,
        email: payload.email
      })
    } catch (jwtError: any) {
      console.error('❌ JWT verification failed:', jwtError.message)
      return NextResponse.json({ 
        success: false,
        error: "Authentication failed" 
      }, { status: 401 })
    }

    if (payload.role !== "seller") {
      return NextResponse.json({ 
        success: false,
        error: "Access denied - Seller access required" 
      }, { status: 403 })
    }

    const data = await req.json()
    console.log('📝 Update data received:', data)

    await connectMongo()

    const user = await User.findById(payload.id)
    if (!user) {
      return NextResponse.json({ 
        success: false,
        error: "User not found" 
      }, { status: 404 })
    }

    // Only update fields that are provided (non-undefined)
    const fields: (keyof typeof data)[] = ["storeName", "email", "phone", "address", "paymentMethod"]
    let updatedFields: (string | number | symbol)[] = []
    
    fields.forEach(field => {
      if (data[field] !== undefined) {
        user[field] = data[field]
        updatedFields.push(field)
      }
    })

    await user.save()

    console.log("✅ Updated user fields:", updatedFields)

    return NextResponse.json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        storeName: user.storeName,
        phone: user.phone,
        address: user.address,
        paymentMethod: user.paymentMethod,
        role: user.role
      },
      message: "Settings updated successfully"
    })
  } catch (err: any) {
    console.error("❌ Settings update error:", err)
    return NextResponse.json({ 
      success: false,
      error: err.message || "Server error" 
    }, { status: 500 })
  }
}