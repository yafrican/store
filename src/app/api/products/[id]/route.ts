import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Product from '@/models/Product'
import User from '@/models/User' // Import User model
import { ObjectId } from 'mongodb'
// GET product by ID or slug - UPDATED FOR VARIABLE PRODUCTS
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 })
    }

    console.log('🔄 Fetching product:', id)
    
    await connectMongo()

    let product

    if (ObjectId.isValid(id)) {
      console.log('🔍 Searching by ObjectId...')
      product = await Product.findById(id).populate({
        path: 'seller',
        select: 'name email storeName phone',
        model: User
      })
    }

    if (!product) {
      console.log('🔍 Searching by slug...')
      product = await Product.findOne({ slug: id }).populate({
        path: 'seller',
        select: 'name email storeName phone',
        model: User
      })
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    console.log('✅ Product found:', product.name)

    // Process images for CDN
    let images: string[] = []
    
    if (Array.isArray(product.images)) {
      images = product.images
    } else if (typeof product.images === 'string') {
      images = [product.images]
    } else if (product.image) {
      images = [product.image]
    }

    const processedImages = images.map((img: string) => {
      if (!img) return ''
      if (img.startsWith('http')) return img
      if (img.startsWith('/')) {
        return `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${img}`
      }
      if (img.startsWith('//')) return `https:${img}`
      return img
    }).filter((img: string) => img !== '')

    // Calculate total stock
    let totalStock = product.stock || 0
    if (product.productType === 'variable' && product.variations) {
      totalStock = product.variations.reduce((total: number, v: any) => total + (v.stock || 0), 0)
    }

    const processedProduct: any = {
      ...product.toObject(),
      _id: product._id.toString(),
      images: processedImages,
      deliveryLocations: product.deliveryLocations || [],
      deliveryTime: product.deliveryTime || 'Contact seller for delivery time',
      freeShipping: product.freeShipping || false,
      warrantyPeriod: product.warrantyPeriod || '',
      warrantyType: product.warrantyType || '',
      productType: product.productType || 'simple',
      totalStock: totalStock,
      image: processedImages[0] || '',
      isDemo: false,
    }

    // Add variable product data
    if (product.productType === 'variable') {
      processedProduct.attributes = product.attributes || []
      processedProduct.variations = product.variations || []
      
      // Calculate price range
      if (product.variations && product.variations.length > 0) {
        const prices = product.variations.map((v: any) => v.price || product.price)
        processedProduct.lowestPrice = Math.min(...prices)
        processedProduct.highestPrice = Math.max(...prices)
        processedProduct.priceRange = {
          lowest: Math.min(...prices),
          highest: Math.max(...prices)
        }
      }
    }

    console.log('📦 Processed product:', {
      name: processedProduct.name,
      productType: processedProduct.productType,
      variationsCount: processedProduct.variations?.length || 0,
      totalStock: processedProduct.totalStock
    })

    return NextResponse.json(processedProduct)
  } catch (error) {
    console.error('❌ Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}
// GET product by ID or slug with proper CDN image handling
// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params

//     if (!id) {
//       return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 })
//     }

//     console.log('🔄 Fetching product:', id)
    
//     // Connect to MongoDB
//     await connectMongo()

//     let product

//     // Try to find by MongoDB ObjectId first
//     if (ObjectId.isValid(id)) {
//       console.log('🔍 Searching by ObjectId...')
//       product = await Product.findById(id).populate({
//         path: 'seller',
//         select: 'name email storeName phone',
//         model: User // Use the imported User model directly
//       })
//     }

//     // If not found by ID, try by slug
//     if (!product) {
//       console.log('🔍 Searching by slug...')
//       product = await Product.findOne({ slug: id }).populate({
//         path: 'seller',
//         select: 'name email storeName phone',
//         model: User // Use the imported User model directly
//       })
//     }

//     if (!product) {
//       return NextResponse.json({ error: 'Product not found' }, { status: 404 })
//     }

//     console.log('✅ Product found:', product.name)

//     // Process images for CDN
//     let images: string[] = []
    
//     if (Array.isArray(product.images)) {
//       images = product.images
//     } else if (typeof product.images === 'string') {
//       images = [product.images]
//     } else if (product.image) { // Fallback to single image field
//       images = [product.image]
//     }

//     // Process images for CDN - ensure absolute URLs
//     const processedImages = images.map((img: string) => {
//       if (!img) return ''
      
//       // If already absolute URL (CDN), return as is
//       if (img.startsWith('http')) {
//         return img
//       }
      
//       // If relative path, construct absolute URL
//       if (img.startsWith('/')) {
//         return `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${img}`
//       }
      
//       // For CDN paths without protocol, add https
//       if (img.startsWith('//')) {
//         return `https:${img}`
//       }
      
//       return img
//     }).filter((img: string) => img !== '')

//     const processedProduct = {
//       ...product.toObject(),
//       _id: product._id.toString(),
//       images: processedImages,
//             deliveryLocations: product.deliveryLocations || [],
//   deliveryTime: product.deliveryTime || 'Contact seller for delivery time', // ✅ ADD THIS
//   freeShipping: product.freeShipping || false,
//   warrantyPeriod: product.warrantyPeriod || '',
//   warrantyType: product.warrantyType || '',
//       // Ensure compatibility fields
//       image: processedImages[0] || '', // For WishlistContext compatibility
//       isDemo: false, // Mark as real product
//     }

//     console.log('📦 Processed product:', {
//       name: processedProduct.name,
//       imagesCount: processedProduct.images.length,
//       firstImage: processedProduct.images[0]?.substring(0, 50) + '...',
//       seller: processedProduct.seller?.storeName || 'No seller',
//       deliveryLocationsCount: processedProduct.deliveryLocations?.length || 0 ,// ✅ Add this log
// freeShipping: processedProduct.freeShipping,
//   warrantyPeriod: processedProduct.warrantyPeriod,
//   warrantyType: processedProduct.warrantyType
//     })

//     return NextResponse.json(processedProduct)
//   } catch (error) {
//     console.error('❌ Error fetching product:', error)
//     return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
//   }
// }
// import { NextResponse } from 'next/server'
// import connectMongo from '@/lib/mongodb'
// import Product from '@/models/Product'
// import { getToken } from 'next-auth/jwt'

// export async function PATCH(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params
    
//     if (!id) {
//       return NextResponse.json({ 
//         success: false,
//         error: 'Product ID is required' 
//       }, { status: 400 })
//     }

//     console.log('🔄 PATCH request for product:', id)

//     // Connect to MongoDB
//     await connectMongo()

//     // Verify authentication
//     const token = await getToken({ 
//       req: request as any,
//       secret: process.env.NEXTAUTH_SECRET
//     })

//     if (!token || !token.id) {
//       return NextResponse.json({ 
//         success: false,
//         error: 'Unauthorized' 
//       }, { status: 401 })
//     }

//     const body = await request.json()
//     console.log('📦 PATCH request body:', {
//       imagesCount: body.images?.length || 0,
//       images: body.images,
//       name: body.name,
//       category: body.category
//     })

//     // Build update object
//     const updateData: any = {
//       updatedAt: new Date()
//     }

//     // ✅ CRITICAL: Handle images array properly
//     if (body.images !== undefined) {
//       console.log('📸 Processing images update:', body.images)
//       // Ensure images is always an array
//       updateData.images = Array.isArray(body.images) ? body.images : [body.images]
//       console.log('✅ Final images array:', updateData.images)
//     }

//     // Handle other fields
//     const fields = [
//       'name', 'price', 'originalPrice', 'category', 'subcategory', 
//       'description', 'stock', 'inStock', 'specifications',
//       'deliveryLocations', 'deliveryTime', 'freeShipping',
//       'warrantyPeriod', 'warrantyType'
//     ]

//     fields.forEach(field => {
//       if (body[field] !== undefined) {
//         updateData[field] = body[field]
//       }
//     })

//     console.log('📝 Final update data:', {
//       images: updateData.images,
//       imagesCount: updateData.images?.length || 0,
//       otherFields: Object.keys(updateData).filter(key => key !== 'images')
//     })

//     // Update the product
//     const updatedProduct = await Product.findOneAndUpdate(
//       { 
//         _id: id, 
//         seller: token.id // Ensure seller owns the product
//       },
//       { $set: updateData },
//       { 
//         new: true, // Return updated document
//         runValidators: true 
//       }
//     )

//     if (!updatedProduct) {
//       console.log('❌ Product not found or unauthorized')
//       return NextResponse.json({ 
//         success: false,
//         error: 'Product not found or you do not have permission to edit this product' 
//       }, { status: 404 })
//     }

//     console.log('✅ Product updated successfully:', {
//       id: updatedProduct._id,
//       name: updatedProduct.name,
//       imagesCount: updatedProduct.images?.length || 0,
//       images: updatedProduct.images
//     })

//     return NextResponse.json({
//       success: true,
//       product: {
//         _id: updatedProduct._id.toString(),
//         name: updatedProduct.name,
//         price: updatedProduct.price,
//         originalPrice: updatedProduct.originalPrice,
//         category: updatedProduct.category,
//         subcategory: updatedProduct.subcategory,
//         description: updatedProduct.description,
//         stock: updatedProduct.stock,
//         inStock: updatedProduct.inStock,
//         images: updatedProduct.images || [],
//         specifications: updatedProduct.specifications || {},
//         deliveryLocations: updatedProduct.deliveryLocations || [],
//         deliveryTime: updatedProduct.deliveryTime,
//         freeShipping: updatedProduct.freeShipping,
//         warrantyPeriod: updatedProduct.warrantyPeriod,
//         warrantyType: updatedProduct.warrantyType,
//         seller: updatedProduct.seller
//       }
//     })

//   } catch (error: any) {
//     console.error('❌ PATCH error:', error)
//     return NextResponse.json({ 
//       success: false,
//       error: error.message || 'Failed to update product' 
//     }, { status: 500 })
//   }
// }