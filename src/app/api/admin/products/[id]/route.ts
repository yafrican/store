// src/app/api/admin/products/[id]/route.ts
import { NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/adminAuth'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await verifyAdmin(request)
    await connectMongo()

    const product = await Product.findById(params.id)
      .populate({ path: 'seller', select: 'name email storeName phone', model: 'User' })
      .lean()

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, product })
  } catch (error: any) {
    if (error.message?.includes('Authentication failed') || error.message?.includes('Not authenticated')) {
      return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 401 })
    }
    if (error.message?.includes('Access denied')) {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🗑️ ADMIN PRODUCT DELETE API CALLED')
    
    // Verify admin
    const admin = await verifyAdmin(request)
    console.log('✅ Admin verified:', admin.email)

    // Connect to database
    await connectMongo()
    console.log('✅ MongoDB connected')

    // Get product ID from params
    const { id } = params
    console.log('📝 Deleting product ID:', id)

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Find and delete the product
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      console.log('❌ Product not found:', id)
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    console.log('✅ Product deleted successfully:', {
      id: product._id,
      name: product.name
    })

    return NextResponse.json({
      success: true,
      message: 'Product deleted permanently',
      deletedProduct: {
        _id: product._id,
        name: product.name
      }
    })

  } catch (error: any) {
    console.error('❌ PRODUCT DELETE ERROR:', error)
    
    // Handle specific error cases
    if (error.message.includes('Authentication failed') || error.message.includes('Not authenticated')) {
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
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
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}