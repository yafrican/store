import { NextRequest, NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/adminAuth'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('✅ PRODUCT APPROVAL API CALLED')
    
    const admin = await verifyAdmin(req)
    console.log('✅ Admin verified:', admin.email)
    
    await connectMongo()
    console.log('✅ MongoDB connected')

    // ✅ FIX: Await params for Next.js 15
    const { id } = await params

    console.log('🔍 Finding product with ID:', id)
    const product = await Product.findById(id)
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    console.log('📦 Product before update:', {
      id: product._id,
      name: product.name,
      status: product.status
    })

    // Update product status to approved
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { 
        status: 'approved',
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    )

    console.log('✅ Product after update:', {
      id: updatedProduct._id,
      name: updatedProduct.name,
      status: updatedProduct.status
    })

    return NextResponse.json({
      success: true,
      message: 'Product approved successfully',
      product: updatedProduct
    })
  } catch (error: any) {
    console.error('❌ PRODUCT APPROVAL ERROR:', error)
    
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