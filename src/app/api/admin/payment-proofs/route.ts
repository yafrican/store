// src/app/api/admin/payment-proofs/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Order from '@/models/Order'
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

    const { searchParams } = new URL(req.url)
    const filter = searchParams.get('filter') || 'pending'

    // Build query based on filter
    let query: any = { paymentProof: { $exists: true, $ne: null } }
    
    switch (filter) {
      case 'pending':
        query.status = 'pending'
        query['paymentProof.verified'] = false
        break
      case 'verified':
        query['paymentProof.verified'] = true
        break
      case 'rejected':
        query.status = 'cancelled'
        break
      case 'all':
        // No additional filters for 'all'
        break
    }

    const paymentProofs = await Order.find(query)
      .sort({ createdAt: -1 })
      .select('-items') // Exclude items to reduce payload size
      .lean()

    return NextResponse.json({ paymentProofs })

  } catch (error: any) {
    console.error('Payment proofs fetch error:', error)
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to fetch payment proofs' }, { status: 500 })
  }
}