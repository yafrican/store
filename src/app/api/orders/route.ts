// src/app/api/orders/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Order from '@/models/Order'

export async function POST(req: Request) {
  try {
    const { ticket, customerInfo, cartItems, totalPrice, paymentMethod, bankDetails } = await req.json()

    await connectMongo()

    // Save order to database
    const order = new Order({
      orderNumber: ticket.orderNumber,
      customerInfo,
      items: cartItems,
      totalAmount: totalPrice,
      paymentMethod,
      bankDetails,
      status: 'pending',
      paymentProof: null,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await order.save()

    // Notify admin (you can implement various notification methods)
    await notifyAdminAboutNewOrder(order)

    return NextResponse.json({ 
      success: true, 
      orderId: order._id,
      ticket 
    })

  } catch (error: any) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// Function to notify admin about new order
async function notifyAdminAboutNewOrder(order: any) {
  try {
    // You can implement various notification methods:
    
    // 1. Log to console (for development)
    console.log('🆕 NEW ORDER CREATED:')
    console.log('📦 Order Number:', order.orderNumber)
    console.log('👤 Customer:', order.customerInfo.fullName)
    console.log('📞 Phone:', order.customerInfo.phone)
    console.log('💰 Total Amount:', order.totalAmount)
    console.log('🏦 Payment Method:', order.paymentMethod)
    console.log('⏰ Created:', order.createdAt)
    
    // 2. Send email to admin (implement with your email service)
    // await sendAdminEmail(order)
    
    // 3. Send WhatsApp message (implement with WhatsApp API)
    // await sendAdminWhatsApp(order)
    
    // 4. Save to admin notifications collection
    // await createAdminNotification(order)

  } catch (error) {
    console.error('Admin notification error:', error)
  }
}