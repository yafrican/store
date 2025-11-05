// src/app/api/admin/users/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/adminAuth'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'
import Product from '@/models/Product'

export async function GET(req: NextRequest) {
  try {
    console.log('👥 ADMIN USERS API CALLED')
    
    const admin = await verifyAdmin(req)
    console.log('✅ Admin verified:', admin.email)
    
    await connectMongo()
    console.log('✅ MongoDB connected')

    const { searchParams } = new URL(req.url)
    const role = searchParams.get('role')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    console.log('📋 Query params:', { role, page, limit })

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

    console.log(`✅ Found ${users.length} users`)

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
          totalProducts: 0,
          phone: user.phone || 'No Phone'
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
    console.log(`📊 Total users matching query: ${total}`)

    return NextResponse.json({
      success: true, // ✅ ADD THIS
      users: usersWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    console.error('❌ ADMIN USERS ERROR:', error)
    
    if (error.message.includes('Not authenticated') || error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' }, // ✅ FIXED FORMAT
        { status: 401 }
      )
    }
    
    if (error.message.includes('Access denied')) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' }, // ✅ FIXED FORMAT
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' }, // ✅ FIXED FORMAT
      { status: 500 }
    )
  }
}