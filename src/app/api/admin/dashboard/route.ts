// src/app/api/admin/dashboard/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/adminAuth'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'
import Product from '@/models/Product'

export async function GET(req: NextRequest) {
  try {
    console.log('📊 ADMIN DASHBOARD API CALLED')
    
    const admin = await verifyAdmin(req)
    console.log('✅ Admin verified:', admin.email)
    
    await connectMongo()
    console.log('✅ MongoDB connected')

    // Get all counts in parallel for better performance
    const [
      totalUsers,
      totalSellers,
      totalProducts,
      pendingApprovals
    ] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ role: 'seller' }),
      Product.countDocuments({}),
      // FIXED: Use correct status query
      Product.countDocuments({
        $or: [
          { status: 'pending' },
          { status: { $exists: false } }
        ]
      })
    ])

    const stats = {
      totalUsers,
      totalSellers,
      totalProducts,
      pendingApprovals,
      totalRevenue: 0,
      monthlySales: 0
    }

    console.log('📈 Stats calculated:', stats)

    return NextResponse.json({ 
      success: true, // ✅ ADD THIS
      stats 
    })
  } catch (error: any) {
    console.error('❌ ADMIN DASHBOARD ERROR:', error)
    
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