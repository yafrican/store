import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

// Helper function to get user ID from token
function getUserIdFromToken(req: Request): string {
  const cookieHeader = req.headers.get('cookie') || ''
  const cookies = cookieHeader.split(';').map(cookie => cookie.trim())
  let token: string | null = null
  
  for (const cookie of cookies) {
    if (cookie.startsWith('token=')) {
      token = cookie.substring('token='.length)
      break
    }
  }

  if (!token) {
    throw new Error('Not authenticated')
  }

  const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string; email: string }
  return payload.id
}

export async function PUT(req: Request) {
  try {
    await connectMongo()

    // Get user ID from token
    const userId = getUserIdFromToken(req)
    
    const { currentPassword, newPassword } = await req.json()
    
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ 
        success: false, 
        error: 'Current password and new password are required' 
      }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ 
        success: false, 
        error: 'New password must be at least 6 characters long' 
      }, { status: 400 })
    }

    // Find user
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 404 })
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        error: 'Current password is incorrect' 
      }, { status: 401 })
    }

    // Hash new password
    const saltRounds = 12
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds)

    // Update password
    user.passwordHash = newPasswordHash
    user.updatedAt = new Date()
    await user.save()

    console.log('✅ Password updated for user:', user.email)

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    })

  } catch (error: any) {
    console.error('❌ Password update error:', error)
    
    if (error.message === 'Not authenticated') {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication required' 
      }, { status: 401 })
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update password' 
    }, { status: 500 })
  }
}