// src/app/api/auth/check/route.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || ''
    console.log('🔍 All cookies:', cookieHeader)
    
    // FIXED: Better token extraction that handles multiple cookies properly
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim())
    let token: string | null = null
    
    for (const cookie of cookies) {
      if (cookie.startsWith('token=')) {
        token = cookie.substring('token='.length)
        break
      }
    }

    console.log('🔍 Token exists:', !!token)
    console.log('🔍 Token value (first 20 chars):', token ? token.substring(0, 20) + '...' : 'No token')
    
    // Debug: Check what we're actually extracting
    if (token) {
      console.log('🔍 Full token for verification:', token)
    }

    if (!token) {
      console.log('❌ No token found in cookies')
      return NextResponse.json({ 
        loggedIn: false,
        debug: { reason: 'No token found', cookies: cookieHeader }
      }, { status: 200 })
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string; email: string }
      console.log('✅ Token verified, user ID:', payload.id)
      
      await connectMongo()
      const user = await User.findById(payload.id).select('-password')
      
      if (!user) {
        console.log('❌ User not found in database')
        return NextResponse.json({ 
          loggedIn: false,
          debug: { reason: 'User not found in database', userId: payload.id }
        }, { status: 200 })
      }

      console.log('✅ User found:', user.name)
      return NextResponse.json({
        loggedIn: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone, // Make sure this is included

          status: user.status || 'active'
        }
      })

    } catch (jwtError: any) {
      console.log('❌ JWT verification failed:', jwtError)
      return NextResponse.json({ 
        loggedIn: false,
        debug: { reason: 'JWT verification failed', error: jwtError.message }
      }, { status: 200 })
    }

  } catch (error: any) {
    console.error('🚨 Auth check error:', error)
    return NextResponse.json({ 
      loggedIn: false,
      debug: { reason: 'Server error', error: error.message }
    }, { status: 200 })
  }
}