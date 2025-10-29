// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    await connectMongo()

    const { name, email, password, phone, storeName } = await req.json()
    
    if (!name || !email || !password) {
      return NextResponse.json({ 
        error: 'Name, email, and password are required' 
      }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ 
        error: 'User already exists with this email' 
      }, { status: 409 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user (default role is 'seller' for registration)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      phone: phone || '',
      storeName: storeName || '',
      role: 'seller', // Default to seller for registration
      status: 'active'
    })

    return NextResponse.json({
      success: true,
      message: 'Seller registered successfully',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        storeName: user.storeName
      }
    }, { status: 201 })

  } catch (err: any) {
    console.error('Registration error:', err)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}