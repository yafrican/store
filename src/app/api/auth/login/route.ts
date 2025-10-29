// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
if (!JWT_SECRET) throw new Error('JWT_SECRET not set in environment variables')

export async function POST(req: Request) {
  try {
    await connectMongo()

    const { email, password } = await req.json()
    console.log('🔐 Login attempt for:', email)
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      console.log('❌ User not found:', email)
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    console.log('👤 User found:', {
      id: user._id,
      email: user.email,
      role: user.role,
      hasPasswordHash: !!user.passwordHash
    })

    // FIX: Use user.passwordHash (matches your User model)
    if (!user.passwordHash) {
      console.log('❌ No passwordHash field found for user')
      return NextResponse.json({ error: 'Invalid user configuration' }, { status: 500 })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    console.log('🔑 Password match:', isMatch)

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Check if user is active (add this field to your schema if needed)
    // if (user.status !== 'active') {
    //   return NextResponse.json({ error: 'Your account has been suspended' }, { status: 401 })
    // }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user._id.toString(), 
        role: user.role,
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        // status: user.status // Remove if status field doesn't exist
      },
    })

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    console.log('✅ Login successful for:', user.email)
    return response

  } catch (err: any) {
    console.error('❌ Login error:', err.message || err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}