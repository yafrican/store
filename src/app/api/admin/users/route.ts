// src/app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/adminAuth'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'
import Product from '@/models/Product'

export async function GET(req: NextRequest) { // ✅ Change parameter type to NextRequest
  try {
    await verifyAdmin(req) // ✅ Pass 'req' directly, not 'req.NextRequest'
    await connectMongo()

    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const query: any = {}
    if (role && role !== 'all') {
      query.role = role
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // FIXED: Use 'seller' field for product count
    const usersWithStats = await Promise.all(
      users.map(async (user: any) => {
        const userId = user._id ? user._id.toString() : 'unknown-id'
        
        const userObj = {
          _id: userId,
          name: user.name || 'Unknown User',
          email: user.email || 'No email',
          role: user.role || 'customer',
          status: user.status || 'active',
          createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : new Date().toISOString(),
          storeName: user.storeName || '',
          totalProducts: 0
        }

        if (user.role === 'seller') {
          try {
            // CHANGED: sellerId → seller
            const productCount = await Product.countDocuments({ seller: user._id })
            userObj.totalProducts = productCount
          } catch (error) {
            console.error('Error counting products for user:', userId, error)
            userObj.totalProducts = 0
          }
        }

        return userObj
      })
    )

    const total = await User.countDocuments(query)

    return NextResponse.json({
      users: usersWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('Admin users fetch error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error' }, 
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    )
  }
}