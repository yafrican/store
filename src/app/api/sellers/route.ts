import { NextResponse } from 'next/server'
import Seller from '@/models/Seller'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const MONGODB_URI = process.env.MONGODB_URI as string
const JWT_SECRET = process.env.JWT_SECRET as string

async function connectDB() {
  if (mongoose.connection.readyState === 1) return
  await mongoose.connect(MONGODB_URI)
}

// Utility: verify JWT from cookies
async function verifyToken(req: Request) {
  const token = req.headers
    .get('cookie')
    ?.split('; ')
    .find((c) => c.startsWith('token='))
    ?.split('=')[1]

  if (!token) throw new Error('No token provided')
  return jwt.verify(token, JWT_SECRET)
}

// -------------------- GET: list sellers (auth required) --------------------
export async function GET(req: Request) {
  try {
    await connectDB()
    await verifyToken(req)

    const sellers = await Seller.find().select('-passwordHash').lean()
    return NextResponse.json(sellers)
  } catch (error: any) {
    console.error('❌ Failed to fetch sellers:', error)
    return NextResponse.json(
      { error: error.message || 'Unauthorized' },
      { status: error.message === 'No token provided' ? 401 : 500 }
    )
  }
}

// -------------------- POST: create seller (no token required) --------------------
export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const { name, email, phone, password } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
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
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // ✅ NEW: Create seller with pending approval
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
    return NextResponse.json(sellerData, { status: 201 })
  } catch (error: any) {
    console.error('❌ Failed to create seller:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}