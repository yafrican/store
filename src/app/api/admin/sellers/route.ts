import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/adminAuth'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'
import Product from '@/models/Product'

export async function GET(req: NextRequest) {
  try {
    console.log('👥 ADMIN SELLERS API CALLED')
    
    const admin = await verifyAdmin(req)
    console.log('✅ Admin verified:', admin.email)
    
    await connectMongo()
    console.log('✅ MongoDB connected')

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    console.log('📋 Query params:', { page, limit })

    // Get sellers with product counts
    const sellers = await User.find({ role: 'seller' })
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    console.log(`✅ Found ${sellers.length} sellers`)

    // Add product counts for each seller
    const sellersWithStats = await Promise.all(
      sellers.map(async (seller: any) => {
        const sellerId = seller._id ? seller._id.toString() : 'unknown-id'
        
        try {
          // Count products for this seller
          const productCounts = await Product.aggregate([
            { $match: { seller: seller._id } },
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 }
              }
            }
          ])

          // Convert array to object
          const statusCounts: any = {}
          productCounts.forEach((item: any) => {
            statusCounts[item._id || 'pending'] = item.count
          })

          const totalProducts = productCounts.reduce((sum: number, item: any) => sum + item.count, 0)

          return {
            _id: sellerId,
            name: seller.name || 'Unknown Seller',
            email: seller.email || 'No email',
            storeName: seller.storeName || 'No Store Name',
            phone: seller.phone || 'No Phone',
            status: seller.status || 'active',
            createdAt: seller.createdAt ? new Date(seller.createdAt).toISOString() : new Date().toISOString(),
            totalProducts,
            approvedProducts: statusCounts.approved || 0,
            pendingProducts: statusCounts.pending || 0,
            rejectedProducts: statusCounts.rejected || 0
          }
        } catch (error) {
          console.error(`Error counting products for seller ${sellerId}:`, error)
          return {
            _id: sellerId,
            name: seller.name || 'Unknown Seller',
            email: seller.email || 'No email',
            storeName: seller.storeName || 'No Store Name',
            phone: seller.phone || 'No Phone',
            status: seller.status || 'active',
            createdAt: seller.createdAt ? new Date(seller.createdAt).toISOString() : new Date().toISOString(),
            totalProducts: 0,
            approvedProducts: 0,
            pendingProducts: 0,
            rejectedProducts: 0
          }
        }
      })
    )

    const total = await User.countDocuments({ role: 'seller' })
    console.log(`📊 Total sellers: ${total}`)

    return NextResponse.json({
      success: true,
      sellers: sellersWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error: any) {
    console.error('❌ ADMIN SELLERS ERROR:', error.message)
    
    if (error.message.includes('Not authenticated') || error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    if (error.message.includes('Access denied')) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}