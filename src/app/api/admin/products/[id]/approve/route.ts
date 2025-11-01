// app/api/admin/products/[id]/approve/route.ts
import { NextRequest, NextResponse } from 'next/server' // ✅ Import NextRequest
import { verifyAdmin } from '@/lib/adminAuth'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'

export async function PATCH(
  req: NextRequest, // ✅ Change from Request to NextRequest
  context: { params: Promise<{ id: string }> }
) {
  try {
    await verifyAdmin(req) // ✅ Now this will work
    await connectMongo()

    const { id } = await context.params

    console.log('🔍 Finding product with ID:', id)
    const product = await Product.findById(id)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

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
    console.error('❌ Product approval error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error' }, 
      { status: error.message === 'Authentication failed' ? 401 : 500 }
    )
  }
}