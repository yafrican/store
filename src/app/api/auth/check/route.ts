// src/app/api/auth/check/route.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || ''
    
    // Check for both possible cookie names
    const tokenMatch = cookieHeader.match(/token=([^;]+)/)
    const authTokenMatch = cookieHeader.match(/authToken=([^;]+)/)
    const token = tokenMatch ? tokenMatch[1] : (authTokenMatch ? authTokenMatch[1] : null)

    if (!token) {
      return NextResponse.json({ loggedIn: false }, { status: 200 })
    }

    const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string; email: string }
    
    await connectMongo()
    const user = await User.findById(payload.id).select('-password')
    
    if (!user) {
      return NextResponse.json({ loggedIn: false }, { status: 200 })
    }

    return NextResponse.json({
      loggedIn: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    })
  } catch (error) {
    return NextResponse.json({ loggedIn: false }, { status: 200 })
  }
}