// src/app/api/admin/stats/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET(req: Request) {
  try {
    // Check admin authentication
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string }
    
    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    await connectMongo()

    // Get today's date range
    const today = new Date()
    const startOfToday = new Date(today.setHours(0, 0, 0, 0))
    const endOfToday = new Date(today.setHours(23, 59, 59, 999))

    // Get statistics
    const [
      totalOrders,
      pendingOrders,
      confirmedOrders,
      totalRevenue,
      todayOrders,
      todayRevenue,
      totalCustomers
    ] = await Promise.all([
      // Total orders
      Order.countDocuments(),
      
      // Pending orders
      Order.countDocuments({ status: 'pending' }),
      
      // Confirmed orders
      Order.countDocuments({ status: 'confirmed' }),
      
      // Total revenue (only from completed orders)
      Order.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Today's orders
      Order.countDocuments({ 
        createdAt: { $gte: startOfToday, $lte: endOfToday } 
      }),
      
      // Today's revenue
      Order.aggregate([
        { 
          $match: { 
            status: 'completed',
            createdAt: { $gte: startOfToday, $lte: endOfToday }
          } 
        },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Total customers
      User.countDocuments({ role: 'customer' })
    ])

    // Get recent orders for dashboard
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber customerInfo totalAmount status createdAt')
      .lean()

    // Get order status distribution
    const statusDistribution = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    return NextResponse.json({
      stats: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        todayOrders,
        todayRevenue: todayRevenue[0]?.total || 0,
        totalCustomers
      },
      recentOrders,
      statusDistribution,
      chartData: {
        labels: statusDistribution.map((item: { _id: any }) => item._id),
        data: statusDistribution.map((item: { count: any }) => item.count)
      }
    })

  } catch (error: any) {
    console.error('Admin stats fetch error:', error)
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}