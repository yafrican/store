// src/app/api/admin/orders/[id]/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Order from '@/models/Order'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

// GET single order details
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const order = await Order.findById(params.id)

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ order })

  } catch (error: any) {
    console.error('Admin order fetch error:', error)
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}

// UPDATE order status (approve/reject)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string; name: string }
    
    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { status, adminNotes } = await req.json()

    if (!['pending', 'confirmed', 'processing', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    await connectMongo()

    const updateData: any = { 
      status,
      updatedAt: new Date()
    }

    if (adminNotes) {
      updateData.adminNotes = adminNotes
    }

    // If confirming payment, mark payment as verified
    if (status === 'confirmed') {
  updateData.$set = {
    'paymentProof.verified': true,
    'paymentProof.verifiedBy': payload.name,
    'paymentProof.verifiedAt': new Date()
  }
  updateData.adminVerified = true
  updateData.adminVerifiedAt = new Date()
}

    const order = await Order.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    )

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // TODO: Send notification to customer about status update

    return NextResponse.json({ 
      success: true, 
      order,
      message: `Order ${status} successfully` 
    })

  } catch (error: any) {
    console.error('Admin order update error:', error)
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}