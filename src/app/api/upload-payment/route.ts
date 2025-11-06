// src/app/api/upload-payment/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Order from '@/models/Order'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('paymentProof') as File
    const orderNumber = formData.get('orderNumber') as string

    if (!file || !orderNumber) {
      return NextResponse.json({ error: 'Missing file or order number' }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')
    const imageUrl = `data:${file.type};base64,${base64Image}`

    await connectMongo()

    // Update order with payment proof
    const updatedOrder = await Order.findOneAndUpdate(
  { orderNumber },
  { 
    paymentProof: {
      imageUrl,
      uploadedAt: new Date(),
      verified: false
    },
    status: 'pending', // Set to pending for admin verification
    updatedAt: new Date()
  },
  { new: true }
)
    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Notify admin about payment proof upload
    await notifyAdminAboutPaymentProof(updatedOrder)

    return NextResponse.json({ 
      success: true, 
      imageUrl,
      message: 'Payment proof uploaded successfully' 
    })

  } catch (error: any) {
    console.error('Payment upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload payment proof' },
      { status: 500 }
    )
  }
}

// Function to notify admin about payment proof
async function notifyAdminAboutPaymentProof(order: any) {
  try {
    console.log('📸 PAYMENT PROOF UPLOADED:')
    console.log('📦 Order Number:', order.orderNumber)
    console.log('👤 Customer:', order.customerInfo.fullName)
    console.log('💰 Total Amount:', order.totalAmount)
    console.log('🏦 Payment Method:', order.paymentMethod)
    console.log('⏰ Uploaded:', order.updatedAt)
    console.log('🔗 Payment Proof Available for Review')
    
    // TODO: Implement other notification methods
    // - Email to admin with payment proof image
    // - WhatsApp message to admin
    // - Push notification to admin dashboard

  } catch (error) {
    console.error('Payment proof notification error:', error)
  }
}