import { NextResponse } from 'next/server'
import { verifyAdmin } from '@/lib/adminAuth'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await verifyAdmin(req)
    await connectMongo()

    // ✅ FIX: Direct access to params in Next.js 15
    const { id } = params

    console.log('🔍 Finding product with ID:', id)
    const product = await Product.findById(id)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if product is already approved
    if (product.status === 'approved') {
      return NextResponse.json(
        { error: 'Product is already approved' },
        { status: 400 }
      )
    }

    console.log('📦 Product before update:', {
      id: product._id,
      name: product.name,
      seller: product.seller,
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

    // TODO: Send notification to seller about product approval
    // This would be implemented with a notification system

    return NextResponse.json({
      success: true,
      message: 'Product approved successfully',
      product: updatedProduct
    })
  } catch (error: any) {
    console.error('❌ Product approval error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error' }, 
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    )
  }
}