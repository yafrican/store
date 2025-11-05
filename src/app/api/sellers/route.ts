import { NextResponse } from 'next/server'
import Seller from '@/models/Seller'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const MONGODB_URI = process.env.MONGODB_URI!
const JWT_SECRET = process.env.JWT_SECRET || 'a8f9d7g6h5j4k3l2m1n0p9q8r7s6t5u4v3w2x1y0z'

async function connectDB() {
  if (mongoose.connection.readyState === 1) return
  await mongoose.connect(MONGODB_URI)
}

// Utility: verify JWT from cookies - FIXED
async function verifyToken(req: Request) {
  try {
    console.log('🔍 Starting token verification for sellers API...')
    
    const cookieHeader = req.headers.get('cookie') || ''
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
      throw new Error('No token provided')
    }

    // ✅ FIX: Validate it's a JWT token (should start with eyJ)
    if (!token.startsWith('eyJ')) {
      console.error('❌ Wrong token type extracted. Expected JWT token starting with "eyJ"')
      throw new Error('Invalid token format')
    }

    const cleanToken = token.trim()
    
    const payload = jwt.verify(cleanToken, JWT_SECRET) as { id: string; role: string }
    console.log('✅ Token verified successfully, role:', payload.role)
    
    return payload
  } catch (error: any) {
    console.error('❌ Token verification failed:', error.message)
    throw new Error(`Authentication failed: ${error.message}`)
  }
}

// -------------------- GET: list sellers (auth required) - FIXED --------------------
export async function GET(req: Request) {
  try {
    console.log('🔄 GET /api/sellers - Fetching sellers list...')
    
    await connectDB()
    const payload = await verifyToken(req)

    // ✅ FIX: Check if user is admin
    if (payload.role !== 'admin') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Access denied - Admin access required' 
        }, 
        { status: 403 }
      )
    }

    const sellers = await Seller.find().select('-passwordHash').lean()
    
    console.log(`✅ Found ${sellers.length} sellers`)

    return NextResponse.json({
      success: true,
      sellers: sellers,
      count: sellers.length
    })
  } catch (error: any) {
    console.error('❌ Failed to fetch sellers:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Internal server error' 
      }, 
      { 
        status: error.message.includes('Authentication') ? 401 : 
               error.message.includes('Access denied') ? 403 : 500 
      }
    )
  }
}

// -------------------- POST: create seller (no token required) - FIXED --------------------
export async function POST(req: Request) {
  try {
    console.log('🔄 POST /api/sellers - Creating new seller...')
    
    await connectDB()
    const body = await req.json()
    const { name, email, phone, password } = body

    console.log('📝 Seller registration data:', { name, email, phone, hasPassword: !!password })

    if (!name || !email || !password) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Name, email, and password are required' 
        }, 
        { status: 400 }
      )
    }

    // Hash password
    const bcrypt = (await import('bcryptjs')).default
    const passwordHash = await bcrypt.hash(password, 10)

    // Ensure email is unique
    const existingSeller = await Seller.findOne({ email })
    if (existingSeller) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email already registered' 
        }, 
        { status: 409 }
      )
    }

    // Create seller with pending approval
    const newSeller = new Seller({ 
      name, 
      email, 
      phone, 
      passwordHash,
      isApproved: false,
      status: 'pending'
    })
    await newSeller.save()

    const { passwordHash: _, ...sellerData } = newSeller.toObject()
    
    console.log('✅ Seller created successfully:', sellerData.email)

    return NextResponse.json({
      success: true,
      seller: sellerData,
      message: 'Seller registration successful! Waiting for admin approval.'
    }, { status: 201 })
  } catch (error: any) {
    console.error('❌ Failed to create seller:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Internal server error' 
      }, 
      { status: 500 }
    )
  }
}