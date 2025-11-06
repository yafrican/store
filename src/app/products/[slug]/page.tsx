// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { toast } from 'react-toastify'

// import {
//   PhoneIcon,
//   PaperAirplaneIcon,
//   ChatBubbleLeftRightIcon,
//   ShoppingCartIcon,
//   HeartIcon,
//   TruckIcon,
//   ShieldCheckIcon,
//   ArrowLeftIcon,
// } from '@heroicons/react/24/outline'
// import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
// import { useCart } from '../../contexts/CartContext'
// import { useWishlist } from '../../contexts/WishlistContext'

// type Product = {
//   _id: string
//   name: string
//   description?: string
//   price: number
//   images: string[]
//   slug: string
//   category?: string
//   isNew?: boolean
//   isOnSale?: boolean
//   salePrice?: number
//   stock?: number
//   specifications?: Record<string, string>
//   brand?: string
//   sku?: string
//   image?: string
// }

// export default function ProductDetailPage() {
//   const params = useParams()
//   const router = useRouter()
  
//   const { addToCart } = useCart()
//   const { addToWishlist, removeFromWishlist, isInWishlist: checkWishlist } = useWishlist()
  
//   const productSlug = params.slug as string
  
//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [phone, setPhone] = useState('')
//   const [quantity, setQuantity] = useState(1)
//   const [activeTab, setActiveTab] = useState('description')

//   const isInWishlist = product ? checkWishlist(product._id) : false

//   // WhatsApp and Telegram utility functions
//   const shareOnWhatsApp = (product: Product, phone: string, quantity: number, displayPrice: number) => {
//     const message = `Hello! I would like to order:\n\n📦 *${product.name}*\n💰 Price: ${(displayPrice * quantity).toFixed(2)} Br\n🔢 Quantity: ${quantity}\n📞 My Phone: ${phone}\n\nPlease confirm my order. Thank you!`
//     const encodedMessage = encodeURIComponent(message)
//     return `https://wa.me/251912610850?text=${encodedMessage}`
//   }

//   const shareOnTelegram = (product: Product, phone: string, quantity: number, displayPrice: number) => {
//     const message = `Hello! I would like to order:\n\n📦 *${product.name}*\n💰 Price: ${(displayPrice * quantity).toFixed(2)} Br\n🔢 Quantity: ${quantity}\n📞 My Phone: ${phone}\n\nPlease confirm my order. Thank you!`
//     const encodedMessage = encodeURIComponent(message)
//     return `https://t.me/YafricanStore?text=${encodedMessage}`
//   }

//   // Phone call functions
//   const callPhone1 = () => {
//     window.open('tel:+251912610850', '_self')
//   }

//   const callPhone2 = () => {
//     window.open('tel:+251929922289', '_self')
//   }

//   // Product conversion functions for context compatibility
//   const getCartProduct = (product: Product) => ({
//     _id: product._id,
//     name: product.name,
//     price: product.price,
//     salePrice: product.salePrice,
//     image: product.images?.[0] || product.image || '',
//     stock: product.stock || 10,
//     category: product.category || 'General',
//   })

//   const getWishlistProduct = (product: Product) => ({
//     _id: product._id,
//     name: product.name,
//     price: product.price,
//     image: product.images?.[0] || product.image || '',
//     slug: product.slug,
//     category: product.category,
//     isNew: product.isNew,
//     isOnSale: product.isOnSale,
//     salePrice: product.salePrice,
//     stock: product.stock,
//   })

//   useEffect(() => {
//     if (!productSlug) {
//       setError('No product specified in URL')
//       setLoading(false)
//       return
//     }

//     async function fetchProduct() {
//       try {
//         setLoading(true)
//         setError('')
        
//         const res = await fetch(`/api/products/${productSlug}`)
        
//         if (res.ok) {
//           const data = await res.json()
//           const processedProduct: Product = {
//             ...data,
//             image: data.images?.[0] || '',
//           }
//           setProduct(processedProduct)
//           toast.success(`Product "${processedProduct.name}" loaded successfully!`)
//         } else {
//           throw new Error(`Product not found (${res.status})`)
//         }
//       } catch (err: any) {
//         setError('Product not found. Please check the URL and try again.')
//         toast.error('Product not found. Please check the URL and try again.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//   }, [productSlug])

//   // Recommendations tracking
//   useEffect(() => {
//     if (product) {
//       // Track product view
//       fetch('/api/products/track', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           productSlug: product.slug,
//           action: 'view'
//         }),
//       }).catch(console.error)
//     }
//   }, [product])

//   const handleAddToCart = () => {
//     if (!product) return
//     const cartProduct = getCartProduct(product)
//     addToCart(cartProduct)
//     toast.success(`Added ${quantity} ${product.name} to cart!`)
//   }

//   const handleWishlistToggle = () => {
//     if (!product) return
//     if (isInWishlist) {
//       removeFromWishlist(product._id)
//       toast.info(`Removed ${product.name} from wishlist`)
//     } else {
//       const wishlistProduct = getWishlistProduct(product)
//       addToWishlist(wishlistProduct)
//       toast.success(`Added ${product.name} to wishlist!`)
//     }
//   }

//   const handleOrderAction = () => {
//     if (!product) return
//     toast.success(`Order for ${product.name} received! We'll contact you at ${phone}.`)
//   }

//   const handlePhoneRequired = () => {
//     toast.warning('Please enter your phone number to place an order')
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="animate-pulse">
//             <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
//             <div className="flex flex-col lg:flex-row gap-10">
//               <div className="flex-1">
//                 <div className="w-full h-96 lg:h-[500px] bg-gray-300 rounded-2xl mb-4"></div>
//                 <div className="flex gap-3">
//                   {[1, 2, 3].map(i => (
//                     <div key={i} className="w-20 h-20 bg-gray-300 rounded-xl"></div>
//                   ))}
//                 </div>
//               </div>
//               <div className="flex-1 space-y-6">
//                 <div className="h-8 bg-gray-300 rounded w-3/4"></div>
//                 <div className="h-6 bg-gray-300 rounded w-1/2"></div>
//                 <div className="h-12 bg-gray-300 rounded w-1/3"></div>
//                 <div className="h-4 bg-gray-300 rounded w-full"></div>
//                 <div className="h-4 bg-gray-300 rounded w-full"></div>
//                 <div className="h-4 bg-gray-300 rounded w-2/3"></div>
//                 <div className="h-12 bg-gray-300 rounded w-1/2"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error && !product) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center py-12">
//             <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
//               <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
//               <p className="text-red-600 mb-6">{error}</p>
//               <button
//                 onClick={() => router.push('/')}
//                 className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
//               >
//                 <ArrowLeftIcon className="w-4 h-4" />
//                 Back to Products
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center py-12">
//             <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
//               <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
//               <p className="text-red-600 mb-6">The product you're looking for doesn't exist.</p>
//               <button
//                 onClick={() => router.push('/')}
//                 className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
//               >
//                 <ArrowLeftIcon className="w-4 h-4" />
//                 Back to Products
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const displayPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price
//   const isOutOfStock = product.stock === 0

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Back Button */}
//         <div className="mb-6">
//           <button
//             onClick={() => router.push('/')}
//             className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors font-medium"
//           >
//             <ArrowLeftIcon className="w-4 h-4" />
//             Back to Products
//           </button>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
//           {/* Left: Image Gallery */}
//           <div className="flex-1">
//             {/* Main Image */}
//             <div className="w-full h-80 sm:h-96 lg:h-[500px] bg-white rounded-2xl overflow-hidden flex justify-center items-center mb-4 border border-gray-200 shadow-sm">
//               <img
//                 src={product.images[selectedImage]}
//                 alt={product.name}
//                 className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = '/images/placeholder-product.jpg'
//                 }}
//               />
//             </div>

//             {/* Image Thumbnails */}
//             {product.images.length > 1 && (
//               <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
//                 {product.images.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-xl overflow-hidden transition-all ${
//                       selectedImage === idx 
//                         ? 'border-yellow-500 shadow-lg scale-105' 
//                         : 'border-gray-200 hover:border-yellow-400'
//                     }`}
//                   >
//                     <img
//                       src={img}
//                       alt={`${product.name} view ${idx + 1}`}
//                       className="object-cover w-full h-full"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src = '/images/placeholder-thumbnail.jpg'
//                       }}
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Right: Product Info */}
//           <div className="flex-1 space-y-6">
//             {/* Product Header */}
//             <div className="space-y-3">
//               {product.category && (
//                 <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
//                   {product.category}
//                 </span>
//               )}
              
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
//                 {product.name}
//               </h1>

//               {/* Badges */}
//               <div className="flex flex-wrap gap-2">
//                 {product.isNew && (
//                   <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
//                     NEW
//                   </span>
//                 )}
//                 {product.isOnSale && (
//                   <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
//                     SALE
//                   </span>
//                 )}
//                 {isOutOfStock && (
//                   <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
//                     OUT OF STOCK
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Price */}
//             <div className="space-y-2">
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl sm:text-3xl font-bold text-yellow-600">
//                   {displayPrice.toFixed(2)} Br
//                 </span>
//                 {product.isOnSale && product.salePrice && (
//                   <span className="text-lg sm:text-xl text-gray-500 line-through">
//                     {product.price.toFixed(2)} Br
//                   </span>
//                 )}
//               </div>
//               {product.isOnSale && (
//                 <div className="text-green-600 font-semibold text-sm sm:text-base">
//                   Save {(product.price - product.salePrice!).toFixed(2)} Br!
//                 </div>
//               )}
//             </div>

//             {/* Stock Status */}
//             {product.stock !== undefined && (
//               <div className={`text-sm font-medium ${
//                 product.stock === 0 
//                   ? 'text-red-600' 
//                   : product.stock < 10 
//                     ? 'text-orange-600' 
//                     : 'text-green-600'
//               }`}>
//                 {product.stock === 0 
//                   ? 'Out of Stock' 
//                   : product.stock < 10 
//                     ? `Only ${product.stock} left in stock` 
//                     : 'In Stock'
//                 }
//               </div>
//             )}

//             {/* Description */}
//             <div className="prose prose-gray max-w-none">
//               <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
//                 {product.description}
//               </p>
//             </div>

//             {/* Action Buttons - OPTIMIZED FOR MOBILE & TABLET */}
//             <div className="space-y-4">
//               {/* Quantity Selector */}
//               {!isOutOfStock && (
//                 <div className="flex items-center gap-4">
//                   <span className="font-medium text-gray-700">Quantity:</span>
//                   <div className="flex items-center border border-gray-300 rounded-lg bg-white">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="px-3 sm:px-4 py-2 hover:bg-gray-100 transition-colors text-gray-600"
//                     >
//                       -
//                     </button>
//                     <span className="px-4 sm:px-6 py-2 border-x border-gray-300 font-medium">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="px-3 sm:px-4 py-2 hover:bg-gray-100 transition-colors text-gray-600"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Cart & Wishlist - ALWAYS SIDE BY SIDE */}
//               <div className="grid grid-cols-2 gap-3">
//                 {/* Add to Cart Button */}
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={isOutOfStock}
//                   className={`flex items-center justify-center gap-2 p-3 sm:p-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
//                     isOutOfStock
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-yellow-500 hover:bg-yellow-600 text-white'
//                   }`}
//                 >
//                   <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
//                   <span className="text-sm sm:text-base">Add to Cart</span>
//                 </button>

//                 {/* Wishlist Button */}
//                 <button
//                   onClick={handleWishlistToggle}
//                   className="flex items-center justify-center gap-2 p-3 sm:p-4 border-2 border-gray-300 hover:border-yellow-500 text-gray-700 hover:text-yellow-600 rounded-xl transition-all duration-200 font-semibold hover:shadow-lg"
//                 >
//                   {isInWishlist ? (
//                     <HeartSolidIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
//                   ) : (
//                     <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6" />
//                   )}
//                   <span className="text-sm sm:text-base">Wishlist</span>
//                 </button>
//               </div>
//             </div>

//             {/* Features */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-6 border-t border-gray-200">
//               <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
//                 <TruckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
//                 <span className="font-medium text-sm sm:text-base">Free Shipping</span>
//                 <span className="text-xs sm:text-sm">Over 500 Br</span>
//               </div>
//               <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
//                 <ShieldCheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
//                 <span className="font-medium text-sm sm:text-base">Warranty</span>
//                 <span className="text-xs sm:text-sm">2 Years</span>
//               </div>
//             </div>

//             {/* Contact Methods - FULLY OPTIMIZED */}
//             <div className="pt-6 border-t border-gray-200">
//               <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
//                 Order Directly
//               </h3>
              
//               {/* Phone Call Buttons - Side by Side */}
//               <div className="grid grid-cols-2 gap-3 mb-4">
//                 <button
//                   onClick={callPhone1}
//                   className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
//                 >
//                   <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                   <span className="text-sm sm:text-base">Call Us</span>
//                 </button>
//                 <button
//                   onClick={callPhone2}
//                   className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
//                 >
//                   <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                   <span className="text-sm sm:text-base">Call Us</span>
//                 </button>
//               </div>

//               {/* Messaging Apps - Side by Side */}
//               <div className="grid grid-cols-2 gap-3 mb-4">
//                 <button
//                   onClick={() => {
//                     if (!phone) {
//                       handlePhoneRequired()
//                       return
//                     }
//                     window.open(shareOnTelegram(product, phone, quantity, displayPrice), '_blank')
//                   }}
//                   className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 sm:p-4 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
//                 >
//                   <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                   <span className="text-sm sm:text-base">Telegram</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (!phone) {
//                       handlePhoneRequired()
//                       return
//                     }
//                     window.open(shareOnWhatsApp(product, phone, quantity, displayPrice), '_blank')
//                   }}
//                   className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
//                 >
//                   <ChatBubbleLeftRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                   <span className="text-sm sm:text-base">WhatsApp</span>
//                 </button>
//               </div>

//               {/* Phone Order Form - Side by Side on larger screens */}
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault()
//                   handleOrderAction()
//                 }}
//                 className="flex flex-col md:flex-row gap-3"
//               >
//                 <input
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="Enter your phone"
//                   required
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap text-base"
//                 >
//                   Order by Phone
//                 </button>
//               </form>

//               {/* Checkout Button - Optimized */}
//               <div className="mt-6 pt-6 border-t border-gray-200">
//                 <button
//                   onClick={() => {
//                     const cartProduct = getCartProduct(product)
//                     addToCart(cartProduct)
//                     router.push('/checkout')
//                   }}
//                   disabled={isOutOfStock}
//                   className={`w-full px-4 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
//                     isOutOfStock
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-purple-600 hover:bg-purple-700 text-white'
//                   }`}
//                 >
//                   <span className="text-sm sm:text-base">🛒 Secure Checkout</span>
//                 </button>
//                 <p className="text-xs sm:text-sm text-gray-600 text-center mt-3">
//                   Secure payment • Multiple payment options • Fast delivery
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Product Info Tabs */}
//         <div className="mt-8 sm:mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="border-b border-gray-200">
//             <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
//               {['description', 'specifications'].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`py-4 sm:py-6 px-3 sm:px-4 border-b-2 font-semibold text-sm sm:text-lg capitalize transition-colors whitespace-nowrap ${
//                     activeTab === tab
//                       ? 'border-yellow-500 text-yellow-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700'
//                   }`}
//                 >
//                   {tab === 'description' ? 'Description' : 'Specifications'}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           <div className="p-4 sm:p-8">
//             {activeTab === 'description' && (
//               <div className="prose prose-sm sm:prose-lg max-w-none">
//                 <p className="text-gray-700 leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>
//             )}

//             {activeTab === 'specifications' && product.specifications && (
//               <div className="space-y-4">
//                 <h3 className="text-xl font-bold text-gray-900 mb-4">Product Specifications</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {Object.entries(product.specifications).map(([key, value], index) => (
//                     <div 
//                       key={key} 
//                       className={`flex justify-between items-center p-4 rounded-xl transition-all duration-200 ${
//                         index % 2 === 0 
//                           ? 'bg-blue-50 border border-blue-100' 
//                           : 'bg-green-50 border border-green-100'
//                       } hover:shadow-md`}
//                     >
//                       <span className={`font-semibold text-sm sm:text-base ${
//                         index % 2 === 0 ? 'text-blue-700' : 'text-green-700'
//                       }`}>
//                         {key}
//                       </span>
//                       <span className={`text-right font-medium text-sm sm:text-base ${
//                         index % 2 === 0 ? 'text-blue-900' : 'text-green-900'
//                       }`}>
//                         {value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Additional Info Cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
//                   <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
//                     <div className="flex items-center gap-3">
//                       <ShieldCheckIcon className="w-6 h-6" />
//                       <div>
//                         <h4 className="font-bold text-sm">Quality Guarantee</h4>
//                         <p className="text-xs opacity-90">Premium quality products</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="bg-blue-500 hover:bg-purple-600 text-white  p-4 rounded-xl shadow-lg">
//                     <div className="flex items-center gap-3">
//                       <TruckIcon className="w-6 h-6" />
//                       <div>
//                         <h4 className="font-bold text-sm ">Fast Delivery</h4>
//                         <p className="text-xs opacity-90">Quick shipping</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-lg mb-8">
//                     <div className="flex items-center gap-3">
//                       <PhoneIcon className="w-6 h-6" />
//                       <div>
//                         <h4 className="font-bold text-sm">Support</h4>
//                         <p className="text-xs opacity-90">24/7 customer care</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import {
  PhoneIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  ShoppingCartIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'

type Product = {
  _id: string
  name: string
  description?: string
  price: number
  images: string[]
  slug: string
  category?: string
  isNew?: boolean
  isOnSale?: boolean
  salePrice?: number
  stock?: number
  specifications?: Record<string, string>
  brand?: string
  sku?: string
  image?: string
  freeShipping?: boolean
  discountPercentage?: number
}

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0xMjAgMTgwSDE0MFYyMDBIMTIwVjE4MFpNMTYwIDE4MEgxODBWMjAwSDE2MFYxODBaTTIwMCAxODBIMjIwVjIwMEgyMDBWMTgwWk0xNDAgMTQwSDE2MFYxNjBIMTQwVjE0MFpNMTgwIDE0MEgyMDBWMTYwSDE4MFYxNDBaTTIyMCAxNDBIMjQwVjE2MEgyMjBWMTQwWk0xNjAgMTAwSDE4MFYxMjBIMTYwVjEwMFpNMjAwIDEwMEgyMjBWMTIwSDIwMFYxMDBaIiBmaWxsPSIjQ0VDRUNFIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  
  const { addToCart, cartItems } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist: checkWishlist } = useWishlist()
  
  const productSlug = params.slug as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [phone, setPhone] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const isInWishlist = product ? checkWishlist(product._id) : false
  const isProductInCart = (productId: string) => cartItems.some(item => item.id === productId)

  // Helper functions
  const calculateDiscountPercentage = (product: Product): number | null => {
    if (product.discountPercentage && product.discountPercentage > 0) {
      return product.discountPercentage
    }
    if (product.salePrice && product.price && product.price > product.salePrice) {
      const discount = Math.round(((product.price - product.salePrice) / product.price) * 100)
      return discount > 0 ? discount : null
    }
    return null
  }

  const getDisplayPrice = (product: Product): number => {
    const discountPercent = calculateDiscountPercentage(product)
    if (discountPercent && product.price) {
      return product.price * (1 - discountPercent / 100)
    }
    return product.salePrice || product.price
  }

  // WhatsApp and Telegram utility functions
  const shareOnWhatsApp = (product: Product, phone: string, quantity: number, displayPrice: number) => {
    const message = `Hello! I would like to order:\n\n📦 *${product.name}*\n💰 Price: ${(displayPrice * quantity).toFixed(2)} Br\n🔢 Quantity: ${quantity}\n📞 My Phone: ${phone}\n\nPlease confirm my order. Thank you!`
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/251912610850?text=${encodedMessage}`
  }

  const shareOnTelegram = (product: Product, phone: string, quantity: number, displayPrice: number) => {
    const message = `Hello! I would like to order:\n\n📦 *${product.name}*\n💰 Price: ${(displayPrice * quantity).toFixed(2)} Br\n🔢 Quantity: ${quantity}\n📞 My Phone: ${phone}\n\nPlease confirm my order. Thank you!`
    const encodedMessage = encodeURIComponent(message)
    return `https://t.me/YafricanStore?text=${encodedMessage}`
  }

  // Phone call functions
  const callPhone1 = () => {
    window.open('tel:+251912610850', '_self')
  }

  const callPhone2 = () => {
    window.open('tel:+251929922289', '_self')
  }

  // Product conversion functions for context compatibility
  const getCartProduct = (product: Product) => ({
    _id: product._id,
    name: product.name,
    price: product.price,
    salePrice: product.salePrice,
    image: product.images?.[0] || product.image || PLACEHOLDER_IMAGE,
    stock: product.stock || 10,
    category: product.category || 'General',
  })

  const getWishlistProduct = (product: Product) => ({
    _id: product._id,
    name: product.name,
    price: product.price,
    image: product.images?.[0] || product.image || PLACEHOLDER_IMAGE,
    slug: product.slug,
    category: product.category,
    isNew: product.isNew,
    isOnSale: product.isOnSale,
    salePrice: product.salePrice,
    stock: product.stock,
  })

  useEffect(() => {
    if (!productSlug) {
      setError('No product specified in URL')
      setLoading(false)
      return
    }

    async function fetchProduct() {
      try {
        setLoading(true)
        setError('')
        
        const res = await fetch(`/api/products/${productSlug}`)
        
        if (res.ok) {
          const data = await res.json()
          setProduct(data)
        } else {
          throw new Error(`Product not found (${res.status})`)
        }
      } catch (err: any) {
        setError('Product not found. Please check the URL and try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productSlug])

  const handleAddToCart = () => {
    if (!product) return
    const alreadyInCart = isProductInCart(product._id)
    
    if (alreadyInCart) {
      toast.info('🛒 Already in cart! Check your cart page', {
        autoClose: 2000,
        icon: false
      })
    } else {
      const cartProduct = getCartProduct(product)
      addToCart(cartProduct)
      toast.success(`🛒 Added to cart`, {
        autoClose: 1500,
        icon: false
      })
    }
  }

  const handleWishlistToggle = () => {
    if (!product) return
    if (isInWishlist) {
      removeFromWishlist(product._id)
    } else {
      const wishlistProduct = getWishlistProduct(product)
      addToWishlist(wishlistProduct)
      toast.success(`❤️ Added to wishlist`, {
        autoClose: 1500,
        icon: false
      })
    }
  }

  const handleOrderAction = () => {
    if (!product) return
    toast.success(`Order for ${product.name} received! We'll contact you at ${phone}.`)
  }

  const handlePhoneRequired = () => {
    toast.warning('Please enter your phone number to place an order')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="w-full h-96 lg:h-[500px] bg-gray-300 rounded-2xl mb-4"></div>
                <div className="flex gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-20 h-20 bg-gray-300 rounded-xl"></div>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-12 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-12 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Products
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  const discountPercent = calculateDiscountPercentage(product)
  const displayPrice = getDisplayPrice(product)
  const isOutOfStock = product.stock === 0
  const alreadyInCart = isProductInCart(product._id)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Products
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="flex-1">
            {/* Main Image */}
            <div className="w-full h-80 sm:h-96 lg:h-[500px] bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden flex justify-center items-center mb-4 border border-gray-200 dark:border-gray-700">
              <img
                src={product.images[selectedImage] || PLACEHOLDER_IMAGE}
                alt={product.name}
                className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
                }}
              />
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === idx 
                        ? 'border-black dark:border-white shadow-md scale-105' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 space-y-6">
            {/* Product Header */}
            <div className="space-y-4">
              {product.category && (
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                  {product.category}
                </span>
              )}
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.isNew && (
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    NEW
                  </span>
                )}
                {discountPercent && discountPercent > 0 && (
                  <span className="bg-rose-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    -{discountPercent}% OFF
                  </span>
                )}
                {product.freeShipping && (
                  <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    FREE SHIPPING
                  </span>
                )}
                {isOutOfStock && (
                  <span className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    OUT OF STOCK
                  </span>
                )}
                {alreadyInCart && (
                  <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    IN CART
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {displayPrice.toFixed(2)} Br
                </span>
                {discountPercent && (
                  <span className="text-lg sm:text-xl text-gray-500 line-through">
                    {product.price.toFixed(2)} Br
                  </span>
                )}
              </div>
              {discountPercent && (
                <div className="text-rose-600 font-semibold text-sm">
                  Save {discountPercent}% ({(product.price - displayPrice).toFixed(2)} Br)
                </div>
              )}
            </div>

            {/* Stock Status */}
            {product.stock !== undefined && (
              <div className={`text-sm font-medium ${
                product.stock === 0 
                  ? 'text-rose-600' 
                  : product.stock < 10 
                    ? 'text-amber-600' 
                    : 'text-gray-600'
              }`}>
                {product.stock === 0 
                  ? 'Out of Stock' 
                  : product.stock < 10 
                    ? `Only ${product.stock} left in stock` 
                    : 'In Stock'
                }
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              {!isOutOfStock && (
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x border-gray-300 dark:border-gray-600 font-medium text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Cart & Wishlist */}
              <div className="grid grid-cols-2 gap-4">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg font-semibold transition-all duration-200 ${
                    isOutOfStock
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-400 hover:bg-amber-500 text-black shadow-sm hover:shadow-md'
                  }`}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span>{alreadyInCart ? 'In Cart' : 'Add to Cart'}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  className="flex items-center justify-center gap-2 p-4 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 font-semibold hover:shadow-sm"
                >
                  {isInWishlist ? (
                    <HeartSolidIcon className="w-5 h-5 text-rose-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                  <span>Wishlist</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <TruckIcon className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-sm">Over 500 Br</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <ShieldCheckIcon className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium">Warranty</div>
                  <div className="text-sm">2 Years</div>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
                Order Directly
              </h3>
              
              {/* Phone Call Buttons - Side by Side */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={callPhone1}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Call Us</span>
                </button>
                <button
                  onClick={callPhone2}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Call Us</span>
                </button>
              </div>

              {/* Messaging Apps - Side by Side */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => {
                    if (!phone) {
                      handlePhoneRequired()
                      return
                    }
                    window.open(shareOnTelegram(product, phone, quantity, displayPrice), '_blank')
                  }}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Telegram</span>
                </button>
                <button
                  onClick={() => {
                    if (!phone) {
                      handlePhoneRequired()
                      return
                    }
                    window.open(shareOnWhatsApp(product, phone, quantity, displayPrice), '_blank')
                  }}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  <ChatBubbleLeftRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">WhatsApp</span>
                </button>
              </div>

              {/* Phone Order Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleOrderAction()
                }}
                className="flex flex-col md:flex-row gap-3"
              >
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap text-base"
                >
                  Order by Phone
                </button>
              </form>

              {/* Checkout Button */}
              {/* <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    const cartProduct = getCartProduct(product)
                    addToCart(cartProduct)
                    router.push('/checkout')
                  }}
                  disabled={isOutOfStock}
                  className={`w-full px-4 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
                    isOutOfStock
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-800 text-white'
                  }`}
                >
                  <span className="text-sm sm:text-base">🛒 Secure Checkout</span>
                </button>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center mt-3">
                  Secure payment • Multiple payment options • Fast delivery
                </p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Additional Product Info Tabs */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {['description', 'specifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-6 px-4 border-b-2 font-semibold text-lg capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-black dark:border-white text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab === 'description' ? 'Description' : 'Specifications'}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'description' && product.description && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div 
                      key={key} 
                      className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {key}
                      </span>
                      <span className="text-right font-medium text-gray-900 dark:text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3">
                      <ShieldCheckIcon className="w-6 h-6 text-blue-500" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Quality Guarantee</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Premium quality products</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3">
                      <TruckIcon className="w-6 h-6 text-green-500" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Fast Delivery</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Quick shipping</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3">
                      <ShieldCheckIcon className="w-6 h-6 text-purple-500" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Support</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">24/7 customer care</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}