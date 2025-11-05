// import { NextResponse } from 'next/server'
// import connectMongo from '@/lib/mongodb'
// import User from '@/models/User'
// import jwt from 'jsonwebtoken'

// const JWT_SECRET = process.env.JWT_SECRET!

// function getUserIdFromToken(req: Request) {
//   const cookieHeader = req.headers.get('cookie') || ''
//   const tokenMatch = cookieHeader.match(/token=([^;]+)/)
//   const token = tokenMatch ? tokenMatch[1] : null

//   if (!token) throw new Error('Not authenticated')
  
//   const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string }
//   return payload.id
// }

// // GET user profile
// export async function GET(req: Request) {
//   try {
//     const userId = getUserIdFromToken(req)
//     await connectMongo()

//     const user = await User.findById(userId).select('-passwordHash')
    
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }

//     return NextResponse.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         storeName: user.storeName,
//         address: user.address,
//         paymentMethod: user.paymentMethod,
//         role: user.role,
//         status: user.status,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt
//       }
//     })

//   } catch (error: any) {
//     console.error('Profile fetch error:', error)
    
//     if (error.message === 'Not authenticated') {
//       return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
//     }
    
//     return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
//   }
// }

// // UPDATE user profile
// export async function PUT(req: Request) {
//   try {
//     const userId = getUserIdFromToken(req)
//     await connectMongo()

//     const data = await req.json()
    
//     // Fields that can be updated
//     const allowedFields = ['name', 'phone', 'storeName', 'address', 'paymentMethod']
//     const updateData: any = {}
    
//     allowedFields.forEach(field => {
//       if (data[field] !== undefined) {
//         updateData[field] = data[field]
//       }
//     })

//     const user = await User.findByIdAndUpdate(
//       userId,
//       updateData,
//       { new: true, runValidators: true }
//     ).select('-passwordHash')

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }

//     return NextResponse.json({
//       success: true,
//       message: 'Profile updated successfully',
//       user
//     })

//   } catch (error: any) {
//     console.error('Profile update error:', error)
    
//     if (error.message === 'Not authenticated') {
//       return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
//     }
    
//     return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
//   }
// }
// src/app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret'

// Helper function to get user ID from token
function getUserIdFromToken(request: NextRequest): string {
  // Try to get token from Authorization header first
  const authHeader = request.headers.get('authorization')
  let token = authHeader?.replace('Bearer ', '')
  
  // If no Authorization header, try getting from cookies
  if (!token) {
    const cookieHeader = request.headers.get('cookie')
    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split('; ').map(c => c.split('='))
      )
      token = cookies.token || cookies.jwt
    }
  }
  
  if (!token) {
    throw new Error('Not authenticated')
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string }
    return payload.id
  } catch (error) {
    console.error('JWT verification error:', error)
    throw new Error('Invalid token')
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectMongo()
    
    const userId = getUserIdFromToken(request)
    
    const user = await User.findById(userId).select('-password')
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        storeName: user.storeName || '',
        address: user.address || '',
        paymentMethod: user.paymentMethod || '',
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })

  } catch (error: any) {
    console.error('Profile fetch error:', error)
    
    if (error.message === 'Not authenticated' || error.message === 'Invalid token') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectMongo()
    
    const userId = getUserIdFromToken(request)
    const body = await request.json()
    
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: body.name,
          phone: body.phone,
          storeName: body.storeName,
          address: body.address,
          paymentMethod: body.paymentMethod,
          updatedAt: new Date()
        }
      },
      { new: true }
    ).select('-password')

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        storeName: user.storeName || '',
        address: user.address || '',
        paymentMethod: user.paymentMethod || '',
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })

  } catch (error: any) {
    console.error('Profile update error:', error)
    
    if (error.message === 'Not authenticated' || error.message === 'Invalid token') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}