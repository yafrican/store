
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
//     XMarkIcon, // ← ADD THIS LINE

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
//     deliveryLocations?: string[] // ✅ ADD THIS
//   deliveryTime?: string // ✅ ADD THIS

//   brand?: string
//   sku?: string
//   image?: string
// freeShipping?: boolean
//   warrantyPeriod?: string
//   warrantyType?: string
//   discountPercentage?: number
  
// }

// type RelatedProduct = {
//   _id: string
//   name: string
//   price: number
//   images: string[]
//   slug: string
//   category?: string
//   displayCategory?: string
//   isNew?: boolean
//   isOnSale?: boolean
//   salePrice?: number
//   stock?: number
//   specifications?: Record<string, string>
//     deliveryLocations?: string[] // ✅ ADD THIS
//   deliveryTime?: string // ✅ ADD THIS

//   brand?: string
//   identifier?: string // Add this
// }
// const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0xMjAgMTgwSDE0MFYyMDBIMTIwVjE4MFpNMTYwIDE4MEgxODBWMjAwSDE2MFYxODBaTTIwMCAxODBIMjIwVjIwMEgyMDBWMTgwWk0xNDAgMTQwSDE2MFYxNjBIMTQwVjE0MFpNMTgwIDE0MEgyMDBWMTYwSDE4MFYxNDBaTTIyMCAxNDBIMjQwVjE2MEgyMjBWMTQwWk0xNjAgMTAwSDE4MFYxMjBIMTYwVjEwMFpNMjAwIDEwMEgyMjBWMTIwSDIwMFYxMDBaIiBmaWxsPSIjQ0VDRUNFIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+'

// export default function ProductDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
//   const [relatedLoading, setRelatedLoading] = useState(false)
//   const { addToCart, cartItems } = useCart()
//   const { addToWishlist, removeFromWishlist, isInWishlist: checkWishlist } = useWishlist()
  
//   const productSlug = params.slug as string
  
//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [phone, setPhone] = useState('')
//   const [quantity, setQuantity] = useState(1)
//   const [activeTab, setActiveTab] = useState('description')
// const [showOrderModal, setShowOrderModal] = useState(false) // ← ADD THIS LINE

//   const isInWishlist = product ? checkWishlist(product._id) : false
//   const isProductInCart = (productId: string) => cartItems.some(item => item.id === productId)

//   // Helper functions
//   const calculateDiscountPercentage = (product: Product): number | null => {
//     if (product.discountPercentage && product.discountPercentage > 0) {
//       return product.discountPercentage
//     }
//     if (product.salePrice && product.price && product.price > product.salePrice) {
//       const discount = Math.round(((product.price - product.salePrice) / product.price) * 100)
//       return discount > 0 ? discount : null
//     }
//     return null
//   }

//   const getDisplayPrice = (product: Product): number => {
//     const discountPercent = calculateDiscountPercentage(product)
//     if (discountPercent && product.price) {
//       return product.price * (1 - discountPercent / 100)
//     }
//     return product.salePrice || product.price
//   }

// // WhatsApp and Telegram utility functions with product link
// const shareOnWhatsApp = (product: Product, phone: string, quantity: number, displayPrice: number) => {
//   const productUrl = `https://www.yafrican.com/products/${product.slug}`
//   const message = `Hello! I would like to order:\n\n *${product.name}*\n Price: ${(displayPrice * quantity).toFixed(2)} Br\n Quantity: ${quantity}\n📞 My Phone: ${phone}\n🔗 Product Link: ${productUrl}\n\nPlease confirm my order. Thank you!`
//   const encodedMessage = encodeURIComponent(message)
//   return `https://wa.me/251929922289?text=${encodedMessage}`
// }

// const shareOnTelegram = (product: Product, phone: string, quantity: number, displayPrice: number) => {
//   const productUrl = `https://www.yafrican.com/products/${product.slug}`
//   const message = `Hello! I would like to order:\n\n *${product.name}*\n Price: ${(displayPrice * quantity).toFixed(2)} Br\n Quantity: ${quantity}\n📞 My Phone: ${phone}\n🔗 Product Link: ${productUrl}\n\nPlease confirm my order. Thank you!`
//   const encodedMessage = encodeURIComponent(message)
//   return `https://t.me/dagitf?text=${encodedMessage}`
// }

//   // Phone call functions
//   const callPhone1 = () => {
//     window.open('tel:+251929922289', '_self')
//   }

//   const callPhone2 = () => {
//     window.open('tel:+251912610850', '_self')
//   }

//   // Product conversion functions for context compatibility
//   const getCartProduct = (product: Product) => ({
//     _id: product._id,
//     name: product.name,
//     price: product.price,
//     salePrice: product.salePrice,
//     image: product.images?.[0] || product.image || PLACEHOLDER_IMAGE,
//     stock: product.stock || 10,
//     category: product.category || 'General',
//   })
// // In your product detail page, add this useEffect
// useEffect(() => {
//   if (product) {
//     console.log('📦 Product data from API:', {
//       name: product.name,
//       deliveryLocations: product.deliveryLocations,
//       hasDeliveryLocations: !!product.deliveryLocations,
//       deliveryLocationsLength: product.deliveryLocations?.length || 0,
//             hasDeliveryTime: !!product.deliveryTime // ✅ ADD THIS

//     })
//   }
// }, [product])
//   const getWishlistProduct = (product: Product) => ({
//     _id: product._id,
//     name: product.name,
//     price: product.price,
//     image: product.images?.[0] || product.image || PLACEHOLDER_IMAGE,
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
//           setProduct(data)
//         } else {
//           throw new Error(`Product not found (${res.status})`)
//         }
//       } catch (err: any) {
//         setError('Product not found. Please check the URL and try again.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//   }, [productSlug])

//   // Fetch related products when product loads
//   useEffect(() => {
//     if (product) {
//       fetchRelatedProducts()
//     }
//   }, [product])

//   // Function to fetch related products
//  // In your fetchRelatedProducts function, add this:
// const fetchRelatedProducts = async () => {
//   if (!product) return
  
//   try {
//     setRelatedLoading(true)
    
//     const params = new URLSearchParams({
//       productId: product._id,
//       category: product.category || '',
//       limit: '8'
//     })
    
//     if (product.specifications?.brand) {
//       params.set('brand', product.specifications.brand)
//     }
    
//     const res = await fetch(`/api/products/related?${params.toString()}`)
    
//     if (res.ok) {
//       const data = await res.json()
//       console.log('📦 Related products data:', data.products) // Debug log
//       if (data.success) {
//         setRelatedProducts(data.products || [])
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching related products:', error)
//   } finally {
//     setRelatedLoading(false)
//   }
// }

//   const handleAddToCart = () => {
//     if (!product) return
//     const alreadyInCart = isProductInCart(product._id)
    
//     if (alreadyInCart) {
//       toast.info('🛒 Already in cart! Check your cart page', {
//         autoClose: 2000,
//         icon: false
//       })
//     } else {
//       const cartProduct = getCartProduct(product)
//       addToCart(cartProduct)
//       toast.success(`🛒 Added to cart`, {
//         autoClose: 1500,
//         icon: false
//       })
//     }
//   }

//   const handleWishlistToggle = () => {
//     if (!product) return
//     if (isInWishlist) {
//       removeFromWishlist(product._id)
//     } else {
//       const wishlistProduct = getWishlistProduct(product)
//       addToWishlist(wishlistProduct)
//       toast.success(`❤️ Added to wishlist`, {
//         autoClose: 1500,
//         icon: false
//       })
//     }
//   }

//   const handleOrderAction = () => {
//     if (!product) return
//     toast.success(`Order for ${product.name} received! We'll contact you at ${phone}.`)
//   }

//   const handlePhoneRequired = () => {
//     toast.warning('Please enter your phone number to place an order')
//   }

//   // Related Products Component
//  // In your ProductDetailPage component, update the RelatedProductsSection:

// const RelatedProductsSection = () => {
//   if (relatedLoading) {
//     return (
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//           Related Products
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
//           {[1, 2, 3, 4].map(i => (
//             <div key={i} className="animate-pulse">
//               <div className="w-full h-48 bg-gray-300 rounded-lg mb-3"></div>
//               <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//               <div className="h-6 bg-gray-300 rounded w-1/2"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   if (relatedProducts.length === 0) {
//     return (
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//           Discover More Products
//         </h2>
//         <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
//           <div className="max-w-md mx-auto">
//             <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
//               <ShoppingCartIcon className="w-8 h-8 text-amber-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//               No related products found
//             </h3>
//             <p className="text-gray-600 dark:text-gray-400 mb-6">
//               Check out our other amazing products in different categories
//             </p>
//             <button
//               onClick={() => router.push('/search')}
//               className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
//             >
//               <ShoppingCartIcon className="w-4 h-4" />
//               Browse All Products
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Safe navigation function - Use _id directly since your API accepts ObjectId
//   const navigateToProduct = (relatedProduct: RelatedProduct) => {
//     if (!relatedProduct._id) {
//       console.error('No _id found for product:', relatedProduct)
//       toast.error('Product link not available')
//       return
//     }
    
//     // Use the _id directly since your main product API accepts ObjectId
//     router.push(`/products/${relatedProduct._id}`)
//   }

//   return (
//     <div className="mt-12">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           You May Also Like
//         </h2>
//         <button
//           onClick={() => router.push(`/search?category=${product?.category || ''}`)}
//           className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
//         >
//           View All
//         </button>
//       </div>
      
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
//         {relatedProducts.map((relatedProduct) => {
//           const relatedDisplayPrice = relatedProduct.isOnSale && relatedProduct.salePrice 
//             ? relatedProduct.salePrice 
//             : relatedProduct.price
          
//           const relatedDiscountPercent = relatedProduct.isOnSale && relatedProduct.salePrice && relatedProduct.price
//             ? Math.round(((relatedProduct.price - relatedProduct.salePrice) / relatedProduct.price) * 100)
//             : null

//           const isRelatedInWishlist = checkWishlist(relatedProduct._id)
//           const isRelatedInCart = isProductInCart(relatedProduct._id)

//           return (
//             <div
//               key={relatedProduct._id}
//               className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden mb-16"
//             >
//               {/* Badges */}
//               <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
//                 {relatedProduct.isNew && (
//                   <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                     NEW
//                   </span>
//                 )}
//                 {relatedDiscountPercent && (
//                   <span className="bg-rose-600 text-white text-xs px-2 py-1 rounded-full font-bold">
//                     -{relatedDiscountPercent}%
//                   </span>
//                 )}
//               </div>

//               {/* Wishlist Button */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   if (isRelatedInWishlist) {
//                     removeFromWishlist(relatedProduct._id)
//                   } else {
//                     addToWishlist({
//                       _id: relatedProduct._id,
//                       name: relatedProduct.name,
//                       price: relatedProduct.price,
//                       image: relatedProduct.images?.[0] || '',
//                       slug: relatedProduct.slug,
//                       category: relatedProduct.category,
//                       isNew: relatedProduct.isNew,
//                       isOnSale: relatedProduct.isOnSale,
//                       salePrice: relatedProduct.salePrice,
//                       stock: relatedProduct.stock,
//                     })
//                     toast.success(`❤️ Added to wishlist`, {
//                       autoClose: 1500,
//                       icon: false
//                     })
//                   }
//                 }}
//                 className="absolute top-2 right-2 z-10 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110"
//               >
//                 {isRelatedInWishlist ? (
//                   <HeartSolidIcon className="w-4 h-4 text-rose-500" />
//                 ) : (
//                   <HeartIcon className="w-4 h-4 text-gray-400 hover:text-rose-500" />
//                 )}
//               </button>

//               {/* Product Image & Name - Clickable Area */}
//               <div 
//                 className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-t-lg cursor-pointer"
//                 onClick={() => navigateToProduct(relatedProduct)}
//               >
//                 <img
//                   src={relatedProduct.images?.[0] || PLACEHOLDER_IMAGE}
//                   alt={relatedProduct.name}
//                   className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-105"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
//                   }}
//                 />
//               </div>

//               {/* Product Info */}
//               <div className="p-3 flex flex-col flex-1">
//                 <div className="space-y-2 flex-1">
//                   {/* Product Name - Clickable */}
//                   <h3 
//                     className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer"
//                     onClick={() => navigateToProduct(relatedProduct)}
//                   >
//                     {relatedProduct.name}
//                   </h3>

//                   {/* Brand */}
//                   {relatedProduct.specifications?.brand && (
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {relatedProduct.specifications.brand}
//                     </p>
//                   )}

//                   {/* Price */}
//                   <div className="flex items-center gap-2">
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">
//                       {relatedDisplayPrice.toFixed(2)} Br
//                     </span>
//                     {relatedDiscountPercent && (
//                       <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
//                         {relatedProduct.price.toFixed(2)} Br
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-3 space-y-2">
//                   <button
//                     onClick={() => {
//                       const cartProduct = {
//                         _id: relatedProduct._id,
//                         name: relatedProduct.name,
//                         price: relatedProduct.price,
//                         salePrice: relatedProduct.salePrice,
//                         image: relatedProduct.images?.[0] || PLACEHOLDER_IMAGE,
//                         stock: relatedProduct.stock || 10,
//                         category: relatedProduct.category || 'General',
//                       }
                      
//                       if (isRelatedInCart) {
//                         toast.info('🛒 Already in cart!', {
//                           autoClose: 2000,
//                           icon: false
//                         })
//                       } else {
//                         addToCart(cartProduct)
//                         toast.success(`🛒 Added to cart`, {
//                           autoClose: 1500,
//                           icon: false
//                         })
//                       }
//                     }}
//                     className={`w-full text-sm px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
//                       isRelatedInCart
//                         ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600'
//                         : 'bg-amber-400 hover:bg-amber-500 text-black shadow-sm hover:shadow-md'
//                     }`}
//                   >
//                     {isRelatedInCart ? 'In Cart' : 'Add to Cart'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }
// // Order Modal Component
// const OrderModal = ({ 
//   isOpen, 
//   onClose, 
//   product, 
//   quantity, 
//   displayPrice 
// }: {
//   isOpen: boolean
//   onClose: () => void
//   product: Product
//   quantity: number
//   displayPrice: number
// }) => {
//   const [phone, setPhone] = useState('')
//   const [selectedPlatform, setSelectedPlatform] = useState<'whatsapp' | 'telegram' | null>(null)

//   // Generate product URL
//   const productUrl = `https://www.yafrican.com/products/${product.slug}`

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!phone.trim()) {
//       toast.warning('Please enter your phone number')
//       return
//     }

//     if (!selectedPlatform) {
//       toast.warning('Please select a messaging platform')
//       return
//     }

//     // Enhanced message with product link
//     const message = `Hello! I would like to order:\n\n *${product.name}*\n Price: ${(displayPrice * quantity).toFixed(2)} Br\n Quantity: ${quantity}\n📞 My Phone: ${phone}\n🔗 Product Link: ${productUrl}\n\nPlease confirm my order. Thank you!`

//     const encodedMessage = encodeURIComponent(message)

//     if (selectedPlatform === 'whatsapp') {
//       window.open(`https://wa.me/251929922289?text=${encodedMessage}`, '_blank')
//     } else if (selectedPlatform === 'telegram') {
//       window.open(`https://t.me/dagitf?text=${encodedMessage}`, '_blank')
//     }
    
//     onClose()
//     setPhone('')
//     setSelectedPlatform(null)
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//             Order via Message
//           </h3>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
//           >
//             <XMarkIcon className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Product Info */}
//         <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
//           <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
//             {product.name}
//           </h4>
//           <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
//             <span>Quantity: {quantity}</span>
//             <span>Total: {(displayPrice * quantity).toFixed(2)} Br</span>
//           </div>
//           <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 break-all">
//             🔗 {productUrl}
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Phone Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Your Phone Number *
//             </label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Enter your phone number"
//               required
//               className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//             />
//           </div>

//           {/* Platform Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Choose Platform *
//             </label>
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => setSelectedPlatform('whatsapp')}
//                 className={`p-4 border-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
//                   selectedPlatform === 'whatsapp'
//                     ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
//                     : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                 }`}
//               >
//                 <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-500" />
//                 <span className="font-medium">WhatsApp</span>
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setSelectedPlatform('telegram')}
//                 className={`p-4 border-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
//                   selectedPlatform === 'telegram'
//                     ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
//                     : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
//                 }`}
//               >
//                 <PaperAirplaneIcon className="w-5 h-5 text-blue-500" />
//                 <span className="font-medium">Telegram</span>
//               </button>
//             </div>
//           </div>

//           {/* Selected Platform Indicator */}
//           {selectedPlatform && (
//             <div className={`p-3 rounded-lg text-center ${
//               selectedPlatform === 'whatsapp' 
//                 ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
//                 : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
//             }`}>
//               <div className="flex items-center justify-center gap-2">
//                 {selectedPlatform === 'whatsapp' ? (
//                   <>
//                     <ChatBubbleLeftRightIcon className="w-4 h-4" />
//                     <span className="font-medium">Ready to send via WhatsApp</span>
//                   </>
//                 ) : (
//                   <>
//                     <PaperAirplaneIcon className="w-4 h-4" />
//                     <span className="font-medium">Ready to send via Telegram</span>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={!phone.trim() || !selectedPlatform}
//               className="flex-1 px-4 py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black rounded-lg font-semibold transition-colors"
//             >
//               Send Message
//             </button>
//           </div>
//         </form>

//         {/* Info Text */}
//         <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
//           You'll be redirected to {selectedPlatform || 'the selected platform'} to complete your order
//         </div>
//       </div>
//     </div>
//   )
// }
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
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
//       <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center py-12">
//             <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
//               <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
//               <p className="text-red-600 mb-6">{error}</p>
//               <button
//                 onClick={() => router.push('/')}
//                 className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
//     return null
//   }

//   const discountPercent = calculateDiscountPercentage(product)
//   const displayPrice = getDisplayPrice(product)
//   const isOutOfStock = product.stock === 0
//   const alreadyInCart = isProductInCart(product._id)

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Back Button */}
//         <div className="mb-6">
//           <button
//             onClick={() => router.push('/')}
//             className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
//           >
//             <ArrowLeftIcon className="w-4 h-4" />
//             Back to Products
//           </button>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
//           {/* Left: Image Gallery */}
//           <div className="flex-1">
//             {/* Main Image */}
//             <div className="w-full h-80 sm:h-96 lg:h-[500px] bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden flex justify-center items-center mb-4 border border-gray-200 dark:border-gray-700">
//               <img
//                 src={product.images[selectedImage] || PLACEHOLDER_IMAGE}
//                 alt={product.name}
//                 className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
//                 }}
//               />
//             </div>

//             {/* Image Thumbnails */}
//             {product.images.length > 1 && (
//               <div className="flex gap-3 overflow-x-auto pb-2">
//                 {product.images.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-lg overflow-hidden transition-all ${
//                       selectedImage === idx 
//                         ? 'border-black dark:border-white shadow-md scale-105' 
//                         : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
//                     }`}
//                   >
//                     <img
//                       src={img}
//                       alt={`${product.name} view ${idx + 1}`}
//                       className="object-cover w-full h-full"
//                       onError={(e) => {
//                         (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
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
//             <div className="space-y-4">
//               {product.category && (
//                 <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
//                   {product.category}
//                 </span>
//               )}
              
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
//                 {product.name}
//               </h1>

//               {/* Badges */}
//               <div className="flex flex-wrap gap-2">
//                 {product.isNew && (
//                   <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
//                     NEW
//                   </span>
//                 )}
//                 {discountPercent && discountPercent > 0 && (
//                   <span className="bg-rose-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
//                     -{discountPercent}% OFF
//                   </span>
//                 )}
//                  {/* ✅ DYNAMIC FREE SHIPPING BADGE */}
//   {product.freeShipping && (
//     <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
//       🚚 FREE SHIPPING
//     </span>
//   )}
//   {/* ✅ DYNAMIC WARRANTY BADGE */}
//   {product.warrantyPeriod && product.warrantyPeriod !== '' && (
//     <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
//       🛡️ {product.warrantyPeriod} {product.warrantyPeriod === 'lifetime' ? '' : product.warrantyPeriod === '1' ? 'month' : 'months'} warranty
//     </span>
//   )}
//                 {isOutOfStock && (
//                   <span className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
//                     OUT OF STOCK
//                   </span>
//                 )}
//                 {alreadyInCart && (
//                   <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
//                     IN CART
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Price */}
//             <div className="space-y-2">
//               <div className="flex items-center gap-3">
//                 <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
//                   {displayPrice.toFixed(2)} Br
//                 </span>
//                 {discountPercent && (
//                   <span className="text-lg sm:text-xl text-gray-500 line-through">
//                     {product.price.toFixed(2)} Br
//                   </span>
//                 )}
//               </div>
//               {discountPercent && (
//                 <div className="text-rose-600 font-semibold text-sm">
//                   Save {discountPercent}% ({(product.price - displayPrice).toFixed(2)} Br)
//                 </div>
//               )}
//             </div>

//             {/* Stock Status */}
//             {product.stock !== undefined && (
//               <div className={`text-sm font-medium ${
//                 product.stock === 0 
//                   ? 'text-rose-600' 
//                   : product.stock < 10 
//                     ? 'text-amber-600' 
//                     : 'text-gray-600'
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
//             {product.description && (
//               <div className="prose prose-gray max-w-none">
//                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>
//             )}
// {/* Delivery Locations
// {product.deliveryLocations && product.deliveryLocations.length > 0 && (
//   <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
//     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
//       📦 Available Delivery Areas
//     </h3>
//     <div className="flex flex-wrap gap-2">
//       {product.deliveryLocations.map((location, index) => (
//         <span 
//           key={index}
//           className="inline-flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium border border-green-200 dark:border-green-800"
//         >
//           🚚 {location}
//         </span>
//       ))}
//     </div>
//     <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
//       We deliver to these locations
//     </p>
//   </div>
// )} */}
//             {/* Action Buttons */}
//             <div className="space-y-4">
//               {/* Quantity Selector */}
//               {!isOutOfStock && (
//                 <div className="flex items-center gap-4">
//                   <span className="font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
//                   <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
//                     >
//                       -
//                     </button>
//                     <span className="px-6 py-2 border-x border-gray-300 dark:border-gray-600 font-medium text-gray-900 dark:text-white">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Cart & Wishlist */}
//               <div className="grid grid-cols-2 gap-4">
//                 {/* Add to Cart Button */}
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={isOutOfStock}
//                   className={`flex items-center justify-center gap-2 p-4 rounded-lg font-semibold transition-all duration-200 ${
//                     isOutOfStock
//                       ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
//                       : 'bg-amber-400 hover:bg-amber-500 text-black shadow-sm hover:shadow-md'
//                   }`}
//                 >
//                   <ShoppingCartIcon className="w-5 h-5" />
//                   <span>{alreadyInCart ? 'In Cart' : 'Add to Cart'}</span>
//                 </button>

//                 {/* Wishlist Button */}
//                 <button
//                   onClick={handleWishlistToggle}
//                   className="flex items-center justify-center gap-2 p-4 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 font-semibold hover:shadow-sm"
//                 >
//                   {isInWishlist ? (
//                     <HeartSolidIcon className="w-5 h-5 text-rose-500" />
//                   ) : (
//                     <HeartIcon className="w-5 h-5" />
//                   )}
//                   <span>Wishlist</span>
//                 </button>
//               </div>
//             </div>

//             {/* Features */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//               <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//     <TruckIcon className="w-5 h-5 text-green-500" />
//     <div>
//       <div className="font-medium">
//         {product.freeShipping ? 'Free Shipping' : 'Shipping Available'}
//       </div>
//       <div className="text-sm">
//         {product.freeShipping ? 'Free delivery' : 'Contact for shipping'}
//       </div>
//     </div>
//   </div>
//               <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//     <ShieldCheckIcon className="w-5 h-5 text-blue-500" />
//     <div>
//       <div className="font-medium">
//         {product.warrantyPeriod ? 'Warranty' : 'No Warranty'}
//       </div>
//       <div className="text-sm">
//         {product.warrantyPeriod ? 
//           `${product.warrantyPeriod} ${product.warrantyPeriod === 'lifetime' ? 'warranty' : product.warrantyPeriod === '1' ? 'month' : 'months'}` 
//           : 'No warranty included'
//         }
//       </div>
//     </div>
//   </div>
// </div>
//             {/* Contact Methods */}
//             <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
//               <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
//                 Order Directly
//               </h3>
              
//               {/* Phone Call Buttons - Side by Side */}
//               <div className="grid grid-cols-2 gap-3 mb-4">
//                 <button
//                   onClick={callPhone1}
//                   className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
//                 >
//                   <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                   <span className="text-sm sm:text-base">Call Us</span>
//                 </button>
//                 <button
//                   onClick={callPhone2}
//                   className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
//                 >
//                   <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//                   <span className="text-sm sm:text-base">Call Us</span>
//                 </button>
//               </div>
// {/* Messaging Apps - Side by Side */}
// <div className="grid grid-cols-2 gap-3 mb-4">
//   <button
//     onClick={() => setShowOrderModal(true)}
//     className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
//   >
//     <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//     <span className="text-sm sm:text-base">Telegram</span>
//   </button>
//   <button
//     onClick={() => setShowOrderModal(true)}
//     className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
//   >
//     <ChatBubbleLeftRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//     <span className="text-sm sm:text-base">WhatsApp</span>
//   </button>
// </div>

//               {/* Phone Order Form */}
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
//                   className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap text-base"
//                 >
//                   Order by Phone
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Additional Product Info Tabs */}
//         <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//           <div className="border-b border-gray-200 dark:border-gray-700">
//   <nav className="flex space-x-8">
//   {['description', 'specifications', 'delivery'].map((tab) => (
//     <button
//       key={tab}
//       onClick={() => setActiveTab(tab)}
//       className={`py-6 px-4 border-b-2 font-semibold text-lg capitalize transition-colors ${
//         activeTab === tab
//           ? 'border-black dark:border-white text-gray-900 dark:text-white'
//           : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
//       }`}
//     >
//       {tab === 'description' ? 'Description' : 
//        tab === 'specifications' ? 'Specifications' : 
//        'Delivery Info'}
//     </button>
//   ))}
// </nav>
//           </div>

//           <div className="p-8">
//             {activeTab === 'description' && product.description && (
//               <div className="prose prose-lg max-w-none">
//                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>
//             )}

//             {activeTab === 'specifications' && product.specifications && (
//               <div className="space-y-6">
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white">Product Specifications</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {Object.entries(product.specifications).map(([key, value], index) => (
//                     <div 
//                       key={key} 
//                       className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
//                     >
//                       <span className="font-medium text-gray-700 dark:text-gray-300">
//                         {key}
//                       </span>
//                       <span className="text-right font-medium text-gray-900 dark:text-white">
//                         {value}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Additional Info Cards */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
//                   <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
//                     <div className="flex items-center gap-3">
//                       <ShieldCheckIcon className="w-6 h-6 text-blue-500" />
//                       <div>
//                         <h4 className="font-bold text-gray-900 dark:text-white">Quality Guarantee</h4>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">Premium quality products</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
//                     <div className="flex items-center gap-3">
//                       <TruckIcon className="w-6 h-6 text-green-500" />
//                       <div>
//                         <h4 className="font-bold text-gray-900 dark:text-white">Fast Delivery</h4>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">Quick shipping</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
//                     <div className="flex items-center gap-3">
//                       <ShieldCheckIcon className="w-6 h-6 text-purple-500" />
//                       <div>
//                         <h4 className="font-bold text-gray-900 dark:text-white">Support</h4>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">24/7 customer care</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             {/* ✅ MOVE THE DELIVERY TAB CONTENT HERE - INSIDE THE TAB CONTAINER */}
//    {activeTab === 'delivery' && (
//   <div className="space-y-6">
//     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
//       🚚 Delivery Information
//     </h3>
    
//     {/* Delivery Time */}
//     {product.deliveryTime && (
//       <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center shrink-0">
//             <TruckIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
//           </div>
//           <div>
//             <h4 className="font-bold text-blue-900 dark:text-blue-300 text-lg mb-1">
//               Estimated Delivery Time
//             </h4>
//             <p className="text-blue-800 dark:text-blue-200 text-base font-medium">
//               {product.deliveryTime}
//             </p>
//           </div>
//         </div>
//       </div>
//     )}
    
//     {/* Delivery Locations */}
//     {product.deliveryLocations && product.deliveryLocations.length > 0 ? (
//       <div className="space-y-4">
//         <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//           📍 Available Delivery Areas
//         </h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//           {product.deliveryLocations.map((location, index) => (
//             <div 
//               key={index}
//               className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
//             >
//               <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
//                 <TruckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
//               </div>
//               <span className="font-medium text-green-800 dark:text-green-300">
//                 {location}
//               </span>
//             </div>
//           ))}
//         </div>
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           We deliver to these locations. Contact us for delivery outside these areas.
//         </p>
//       </div>
//     ) : (
//       <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
//         <TruckIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//         <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//           No Delivery Information Available
//         </h4>
//         <p className="text-gray-600 dark:text-gray-400">
//           Please contact the seller for delivery options.
//         </p>
//       </div>
//     )}

//     {/* Additional Delivery Info */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
//       <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
//         <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//     <TruckIcon className="w-5 h-5 text-green-500" />
//     <div>
//       <div className="font-medium">
//         {product.freeShipping ? 'Free Shipping' : 'Shipping Available'}
//       </div>
//       <div className="text-sm">
//         {product.freeShipping ? 'Free delivery' : 'Contact for shipping'}
//       </div>
//     </div>
//   </div>
//       </div>

//       <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
//         <div className="flex items-center gap-3 mb-3">
//           <ShieldCheckIcon className="w-6 h-6 text-amber-500" />
//           <h4 className="font-bold text-amber-900 dark:text-amber-300">Delivery Support</h4>
//         </div>
//         <p className="text-amber-800 dark:text-amber-200 text-sm">
//           Need help with delivery? Contact our support team for assistance.
//         </p>
//       </div>
//     </div>
//   </div>
// )}

//          </div>
//                   </div>

 

//         {/* Related Products Section */}
//         <RelatedProductsSection />
//          {/* Order Modal */}
//         <OrderModal
//           isOpen={showOrderModal}
//           onClose={() => setShowOrderModal(false)}
//           product={product}
//           quantity={quantity}
//           displayPrice={displayPrice}
//         />
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
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'

type Product = {
  _id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  images: string[]
  slug: string
  category?: string
  subcategory?: string
  isNew?: boolean
  isOnSale?: boolean
  salePrice?: number
  stock?: number
  specifications?: Record<string, string>
  deliveryLocations?: string[]
  deliveryTime?: string
  brand?: string
  sku?: string
  image?: string
  freeShipping?: boolean
  warrantyPeriod?: string
  warrantyType?: string
  discountPercentage?: number
  productType?: 'simple' | 'variable'
  variations?: Variation[]
  attributes?: any[]
}

type Variation = {
  _id: string
  sku: string
  attributes: Record<string, string>
  price: number
  stock: number
  image?: string
}

type RelatedProduct = {
  _id: string
  name: string
  price: number
  images: string[]
  slug: string
  category?: string
  displayCategory?: string
  isNew?: boolean
  isOnSale?: boolean
  salePrice?: number
  stock?: number
  specifications?: Record<string, string>
  deliveryLocations?: string[]
  deliveryTime?: string
  brand?: string
  identifier?: string
  productType?: 'simple' | 'variable'
}

type VariableAttribute = {
  name: string
  values: string[]
  type: 'select' | 'color' | 'radio'
  required: boolean
}

type SelectedAttributes = Record<string, string>

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0xMjAgMTgwSDE0MFYyMDBIMTIwVjE4MFpNMTYwIDE4MEgxODBWMjAwSDE2MFYxODBaTTIwMCAxODBIMjIwVjIwMEgyMDBWMTgwWk0xNDAgMTQwSDE2MFYxNjBIMTQwVjE0MFpNMTgwIDE0MEgyMDBWMTYwSDE4MFYxNDBaTTIyMCAxNDBIMjQwVjE2MEgyMjBWMTQwWk0xNjAgMTAwSDE4MFYxMjBIMTYwVjEwMFpNMjAwIDEwMEgyMjBWMTIwSDIwMFYxMDBaIiBmaWxsPSIjQ0VDRUNFIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [relatedLoading, setRelatedLoading] = useState(false)
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
  const [showOrderModal, setShowOrderModal] = useState(false)
  
  // New state for variable product handling
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributes>({})
  const [variableAttributes, setVariableAttributes] = useState<VariableAttribute[]>([])
  const [availableVariations, setAvailableVariations] = useState<Variation[]>([])
  const [currentVariation, setCurrentVariation] = useState<Variation | null>(null)

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
    // If a variation is selected, use variation price
    if (currentVariation) {
      return currentVariation.price
    }
    
    // If product has sale price, use that
    if (product.salePrice && product.salePrice < product.price) {
      return product.salePrice
    }
    
    // Otherwise use base price
    return product.price
  }

  // Initialize variable product selection
  const initializeVariableProduct = (product: Product) => {
    if (product.productType === 'variable' && product.variations) {
      console.log('📦 Initializing variable product:', {
        name: product.name,
        basePrice: product.price,
        variationsCount: product.variations.length,
        variations: product.variations
      })
      
      setAvailableVariations(product.variations)
      
      // Extract unique attributes from variations
      const attributes: VariableAttribute[] = []
      const attributeMap: Record<string, Set<string>> = {}
      
      product.variations.forEach(variation => {
        Object.entries(variation.attributes).forEach(([key, value]) => {
          if (!attributeMap[key]) {
            attributeMap[key] = new Set()
          }
          attributeMap[key].add(value)
        })
      })
      
      // Convert to VariableAttribute format
      Object.entries(attributeMap).forEach(([name, valuesSet]) => {
        const values = Array.from(valuesSet)
        // Determine type based on attribute name
        const type = name.toLowerCase().includes('color') ? 'color' : 'select'
        
        attributes.push({
          name,
          values,
          type,
          required: true
        })
      })
      
      console.log('📦 Extracted attributes:', attributes)
      setVariableAttributes(attributes)
      
      // DON'T auto-select first variation - let user choose
      // Show base price first, then update when user selects
      setCurrentVariation(null)
      setSelectedAttributes({})
    }
  }

  // Check if variation exists for selected attributes
  const findVariation = (attributes: SelectedAttributes): Variation | null => {
    if (!availableVariations || availableVariations.length === 0) return null
    
    // Check if all selected attributes match a variation
    return availableVariations.find(variation => {
      return Object.keys(attributes).every(key => 
        variation.attributes[key] === attributes[key]
      )
    }) || null
  }

  // Handle attribute selection
  const handleAttributeSelect = (attributeName: string, value: string) => {
    const newAttributes = {
      ...selectedAttributes,
      [attributeName]: value
    }
    
    setSelectedAttributes(newAttributes)
    
    // Check if variation exists
    const variation = findVariation(newAttributes)
    setCurrentVariation(variation)
    
    if (variation) {
      console.log('✅ Variation found:', {
        sku: variation.sku,
        price: variation.price,
        stock: variation.stock,
        attributes: variation.attributes
      })
      
      toast.success(`✅ ${attributeName}: ${value} selected`, {
        autoClose: 1500
      })
    } else {
      console.log('❌ No matching variation for:', newAttributes)
      toast.info(`❌ This combination is not available`, {
        autoClose: 1500
      })
    }
  }

  // Check if attribute value is available
  const isAttributeAvailable = (attributeName: string, value: string): boolean => {
    const testAttributes = { ...selectedAttributes, [attributeName]: value }
    return !!findVariation(testAttributes)
  }

  // Check if current selection is valid (variation exists)
  const isValidSelection = (): boolean => {
    if (product?.productType !== 'variable') return true
    if (variableAttributes.length === 0) return true
    return !!currentVariation
  }

  // Get the current stock based on selection
  const getCurrentStock = (): number => {
    if (currentVariation) {
      return currentVariation.stock
    }
    return product?.stock || 0
  }

  // Render attribute selectors
  const renderAttributeSelectors = () => {
    if (product?.productType !== 'variable') {
      return null
    }

    if (variableAttributes.length === 0) {
      return (
        <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Product Options
          </h3>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <h4 className="font-semibold text-amber-800 dark:text-amber-300">
                  Variable Product Options
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                  Loading available options...
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Select Options
        </h3>
        
        <div className="space-y-6">
          {variableAttributes.map((attribute) => (
            <div key={attribute.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                  {attribute.name} {attribute.required && <span className="text-rose-500">*</span>}
                </label>
                {selectedAttributes[attribute.name] && (
                  <span className="text-sm text-green-600 dark:text-green-400">
                    Selected: {selectedAttributes[attribute.name]}
                  </span>
                )}
              </div>
              
              {attribute.type === 'color' ? (
                <div className="flex flex-wrap gap-3">
                  {attribute.values.map((value) => {
                    const isAvailable = isAttributeAvailable(attribute.name, value)
                    const isSelected = selectedAttributes[attribute.name] === value
                    
                    return (
                      <button
                        key={value}
                        onClick={() => handleAttributeSelect(attribute.name, value)}
                        disabled={!isAvailable}
                        className={`
                          relative w-10 h-10 rounded-full border-2 flex items-center justify-center
                          ${isSelected 
                            ? 'border-black dark:border-white ring-2 ring-offset-2 ring-black dark:ring-white' 
                            : 'border-gray-300 dark:border-gray-600'
                          }
                          ${isAvailable 
                            ? 'hover:border-gray-500 dark:hover:border-gray-400 cursor-pointer' 
                            : 'opacity-40 cursor-not-allowed'
                          }
                        `}
                        style={{ 
                          backgroundColor: value.toLowerCase() === 'black' ? '#000000' :
                                         value.toLowerCase() === 'white' ? '#ffffff' :
                                         value.toLowerCase() === 'blue' ? '#2563eb' :
                                         value.toLowerCase() === 'red' ? '#dc2626' :
                                         value.toLowerCase() === 'green' ? '#16a34a' :
                                         value.toLowerCase() === 'silver' ? '#9ca3af' :
                                         value.toLowerCase() === 'gold' ? '#fbbf24' :
                                         value.toLowerCase() === 'gray' ? '#6b7280' :
                                         value.toLowerCase() === 'brown' ? '#92400e' :
                                         value.toLowerCase() === 'navy' ? '#1e3a8a' :
                                         value.toLowerCase() === 'beige' ? '#f5f5dc' :
                                         value.toLowerCase() === 'pink' ? '#ec4899' :
                                         value.toLowerCase() === 'purple' ? '#7c3aed' :
                                         value.toLowerCase() === 'yellow' ? '#fbbf24' :
                                         value.toLowerCase() === 'multi' ? 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)' :
                                         value.toLowerCase() === 'rose gold' ? '#b76e79' :
                                         value.toLowerCase() === 'space gray' ? '#71717a' :
                                         value 
                        }}
                        title={`${value} ${!isAvailable ? '(Out of stock)' : ''}`}
                      >
                        {isSelected && (
                          <CheckCircleIcon className="w-5 h-5 text-white absolute -top-1 -right-1 bg-black rounded-full" />
                        )}
                        {!isAvailable && (
                          <XCircleIcon className="w-4 h-4 text-rose-500 absolute" />
                        )}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {attribute.values.map((value) => {
                    const isAvailable = isAttributeAvailable(attribute.name, value)
                    const isSelected = selectedAttributes[attribute.name] === value
                    
                    return (
                      <button
                        key={value}
                        onClick={() => handleAttributeSelect(attribute.name, value)}
                        disabled={!isAvailable}
                        className={`
                          px-4 py-2 rounded-lg border font-medium transition-all
                          ${isSelected 
                            ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' 
                            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                          }
                          ${isAvailable 
                            ? 'hover:border-gray-500 dark:hover:border-gray-400 cursor-pointer' 
                            : 'opacity-40 cursor-not-allowed line-through'
                          }
                        `}
                      >
                        {value}
                        {!isAvailable && (
                          <span className="ml-1 text-xs text-rose-500">✗</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
              
              {/* Show availability status */}
              <div className="flex items-center gap-2 text-sm">
                {selectedAttributes[attribute.name] ? (
                  isAttributeAvailable(attribute.name, selectedAttributes[attribute.name]) ? (
                    <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                      <CheckCircleIcon className="w-4 h-4" />
                      Available
                    </span>
                  ) : (
                    <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <XCircleIcon className="w-4 h-4" />
                      Not available with current selection
                    </span>
                  )
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">
                    Please select {attribute.name.toLowerCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Current variation info */}
        {currentVariation && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-300 flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5" />
                  Selected Variation
                </h4>
                <div className="text-sm text-green-700 dark:text-green-400 mt-1">
                  SKU: {currentVariation.sku} • Stock: {currentVariation.stock} available
                </div>
                <div className="mt-2 space-y-1">
                  {Object.entries(currentVariation.attributes).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{key}:</span>
                      <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-300 dark:border-gray-600">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-900 dark:text-green-300">
                  {currentVariation.price.toFixed(2)} Br
                </div>
                {currentVariation.stock < 5 && (
                  <div className="text-sm text-amber-600 dark:text-amber-400 font-medium mt-1">
                    Only {currentVariation.stock} left!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Base price info when no variation selected */}
        {product.productType === 'variable' && !currentVariation && variableAttributes.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                  Base Price Shown
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Select options above to see specific variation price and stock
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* No matching variation warning */}
        {product.productType === 'variable' && !currentVariation && Object.keys(selectedAttributes).length > 0 && (
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <XCircleIcon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <div>
                <h4 className="font-semibold text-rose-800 dark:text-rose-300">
                  Product Not Available
                </h4>
                <p className="text-sm text-rose-700 dark:text-rose-400 mt-1">
                  This combination is out of stock. Please select different options.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

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
          console.log('📦 Product data loaded:', {
            name: data.name,
            productType: data.productType,
            basePrice: data.price,
            originalPrice: data.originalPrice,
            variationsCount: data.variations?.length || 0,
            attributes: data.attributes?.length || 0,
            category: data.category,
            subcategory: data.subcategory
          })
          setProduct(data)
          initializeVariableProduct(data)
          
          // Fetch related products after product is loaded
          fetchRelatedProducts(data.category, data._id)
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

  // Function to fetch related products
// Replace the existing fetchRelatedProducts function with this:
const fetchRelatedProducts = async () => {
  if (!product) return
  
  try {
    setRelatedLoading(true)
    
    const params = new URLSearchParams({
      productId: product._id,
      category: product.category || '',
      limit: '8'
    })
    
    if (product.specifications?.brand) {
      params.set('brand', product.specifications.brand)
    }
    
    const res = await fetch(`/api/products/related?${params.toString()}`)
    
    if (res.ok) {
      const data = await res.json()
      console.log('📦 Related products data:', data.products)
      if (data.success) {
        setRelatedProducts(data.products || [])
      }
    }
  } catch (error) {
    console.error('Error fetching related products:', error)
  } finally {
    setRelatedLoading(false)
  }
}

// Then update the useEffect that calls it to match:
useEffect(() => {
  if (product) {
    fetchRelatedProducts()
  }
}, [product])

  const handleAddToCart = () => {
    if (!product) return
    
    const cartProductId = currentVariation ? `${product._id}-${currentVariation._id}` : product._id
    const alreadyInCart = isProductInCart(cartProductId)
    
    if (alreadyInCart) {
      toast.info('🛒 Already in cart! Check your cart page', {
        autoClose: 2000,
        icon: false
      })
    } else {
      const cartProduct = {
        _id: cartProductId,
        name: product.name,
        price: currentVariation ? currentVariation.price : product.price,
        salePrice: product.salePrice,
        image: product.images?.[0] || product.image || PLACEHOLDER_IMAGE,
        stock: currentVariation ? currentVariation.stock : product.stock || 10,
        category: product.category || 'General',
        variation: currentVariation ? {
          id: currentVariation._id,
          sku: currentVariation.sku,
          attributes: currentVariation.attributes
        } : undefined
      }
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
      const wishlistProduct = {
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
      }
      addToWishlist(wishlistProduct)
      toast.success(`❤️ Added to wishlist`, {
        autoClose: 1500,
        icon: false
      })
    }
  }
// Replace the renderRelatedProducts function with this corrected version:
const renderRelatedProducts = () => {
  if (relatedLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse">
              <div className="w-full h-48 bg-gray-300 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedProducts.length === 0) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Discover More Products
        </h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCartIcon className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No related products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Check out our other amazing products in different categories
            </p>
            <button
              onClick={() => router.push('/search')}
              className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              Browse All Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Safe navigation function - Use _id directly since your API accepts ObjectId
  const navigateToProduct = (relatedProduct: RelatedProduct) => {
    if (!relatedProduct._id) {
      console.error('No _id found for product:', relatedProduct)
      toast.error('Product link not available')
      return
    }
    
    // Use the _id directly since your main product API accepts ObjectId
    router.push(`/products/${relatedProduct._id}`)
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          You May Also Like
        </h2>
        <button
          onClick={() => router.push(`/search?category=${product?.category || ''}`)}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
        >
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {relatedProducts.map((relatedProduct) => {
          const relatedDisplayPrice = relatedProduct.isOnSale && relatedProduct.salePrice 
            ? relatedProduct.salePrice 
            : relatedProduct.price
          
          const relatedDiscountPercent = relatedProduct.isOnSale && relatedProduct.salePrice && relatedProduct.price
            ? Math.round(((relatedProduct.price - relatedProduct.salePrice) / relatedProduct.price) * 100)
            : null

          const isRelatedInWishlist = checkWishlist(relatedProduct._id)
          const isRelatedInCart = isProductInCart(relatedProduct._id)

          return (
            <div
              key={relatedProduct._id}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative overflow-hidden mb-16"
            >
              {/* Badges */}
              <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                {relatedProduct.isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    NEW
                  </span>
                )}
                {relatedDiscountPercent && (
                  <span className="bg-rose-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                    -{relatedDiscountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (isRelatedInWishlist) {
                    removeFromWishlist(relatedProduct._id)
                  } else {
                    addToWishlist({
                      _id: relatedProduct._id,
                      name: relatedProduct.name,
                      price: relatedProduct.price,
                      image: relatedProduct.images?.[0] || '',
                      slug: relatedProduct.slug,
                      category: relatedProduct.category,
                      isNew: relatedProduct.isNew,
                      isOnSale: relatedProduct.isOnSale,
                      salePrice: relatedProduct.salePrice,
                      stock: relatedProduct.stock,
                    })
                    toast.success(`❤️ Added to wishlist`, {
                      autoClose: 1500,
                      icon: false
                    })
                  }
                }}
                className="absolute top-2 right-2 z-10 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110"
              >
                {isRelatedInWishlist ? (
                  <HeartSolidIcon className="w-4 h-4 text-rose-500" />
                ) : (
                  <HeartIcon className="w-4 h-4 text-gray-400 hover:text-rose-500" />
                )}
              </button>

              {/* Product Image & Name - Clickable Area */}
              <div 
                className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-t-lg cursor-pointer"
                onClick={() => navigateToProduct(relatedProduct)}
              >
                <img
                  src={relatedProduct.images?.[0] || PLACEHOLDER_IMAGE}
                  alt={relatedProduct.name}
                  className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="p-3 flex flex-col flex-1">
                <div className="space-y-2 flex-1">
                  {/* Product Name - Clickable */}
                  <h3 
                    className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors cursor-pointer"
                    onClick={() => navigateToProduct(relatedProduct)}
                  >
                    {relatedProduct.name}
                  </h3>

                  {/* Brand */}
                  {relatedProduct.specifications?.brand && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {relatedProduct.specifications.brand}
                    </p>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {relatedDisplayPrice.toFixed(2)} Br
                    </span>
                    {relatedDiscountPercent && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {relatedProduct.price.toFixed(2)} Br
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 space-y-2">
                  <button
                    onClick={() => {
                      const cartProduct = {
                        _id: relatedProduct._id,
                        name: relatedProduct.name,
                        price: relatedProduct.price,
                        salePrice: relatedProduct.salePrice,
                        image: relatedProduct.images?.[0] || PLACEHOLDER_IMAGE,
                        stock: relatedProduct.stock || 10,
                        category: relatedProduct.category || 'General',
                      }
                      
                      if (isRelatedInCart) {
                        toast.info('🛒 Already in cart!', {
                          autoClose: 2000,
                          icon: false
                        })
                      } else {
                        addToCart(cartProduct)
                        toast.success(`🛒 Added to cart`, {
                          autoClose: 1500,
                          icon: false
                        })
                      }
                    }}
                    className={`w-full text-sm px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isRelatedInCart
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600'
                        : 'bg-amber-400 hover:bg-amber-500 text-black shadow-sm hover:shadow-md'
                    }`}
                  >
                    {isRelatedInCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
        
        {/* View All Button */}
        {product?.category && (
          <div className="text-center mt-6">
            <button
              onClick={() => router.push(`/search?category=${product.category}`)}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
            >
              View all products in {product.category}
              <ArrowLeftIcon className="w-4 h-4 rotate-180" />
            </button>
          </div>
        )}
     

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
  const currentStock = getCurrentStock()
  const isOutOfStock = currentStock === 0
  const cartProductId = currentVariation ? `${product._id}-${currentVariation._id}` : product._id
  const alreadyInCart = isProductInCart(cartProductId)

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
                    className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 border-2 rounded-lg overflow-hidden transition-all ${
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
                  {product.category} {product.subcategory && `› ${product.subcategory}`}
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
                    🚚 FREE SHIPPING
                  </span>
                )}
                {product.warrantyPeriod && product.warrantyPeriod !== '' && (
                  <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    🛡️ {product.warrantyPeriod} {product.warrantyPeriod === 'lifetime' ? '' : product.warrantyPeriod === '1' ? 'month' : 'months'} warranty
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
                {product.productType === 'variable' && (
                  <span className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    VARIABLE OPTIONS
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
                
                {/* Show original price if there's a discount */}
                {discountPercent && (
                  <span className="text-lg sm:text-xl text-gray-500 line-through">
                    {product.price.toFixed(2)} Br
                  </span>
                )}
                
                {/* Show variation price difference if applicable */}
                {currentVariation && currentVariation.price !== product.price && (
                  <span className="text-sm text-gray-500">
                    (Base: {product.price.toFixed(2)} Br)
                  </span>
                )}
              </div>
              
              {/* Discount info */}
              {discountPercent && (
                <div className="text-rose-600 font-semibold text-sm">
                  Save {discountPercent}% ({(product.price - displayPrice).toFixed(2)} Br)
                </div>
              )}
              
              {/* Variation price change info */}
              {currentVariation && currentVariation.price !== product.price && (
                <div className="text-green-600 font-semibold text-sm">
                  +{(currentVariation.price - product.price).toFixed(2)} Br for selected options
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className={`text-sm font-medium ${
              isOutOfStock 
                ? 'text-rose-600' 
                : currentStock < 10 
                  ? 'text-amber-600' 
                  : 'text-gray-600'
            }`}>
              {isOutOfStock 
                ? 'Out of Stock' 
                : currentStock < 10 
                  ? `Only ${currentStock} left in stock` 
                  : 'In Stock'
              }
              {product.productType === 'variable' && !currentVariation && (
                <span className="text-gray-500 ml-2">(Select options for exact stock)</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Variable Attributes Selectors */}
            {renderAttributeSelectors()}

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
                  disabled={isOutOfStock || (product.productType === 'variable' && !isValidSelection())}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg font-semibold transition-all duration-200 ${
                    isOutOfStock || (product.productType === 'variable' && !isValidSelection())
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-amber-400 hover:bg-amber-500 text-black shadow-sm hover:shadow-md'
                  }`}
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span>
                    {product.productType === 'variable' && !isValidSelection() 
                      ? 'Select Options' 
                      : alreadyInCart ? 'In Cart' : 'Add to Cart'
                    }
                  </span>
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
                  <div className="font-medium">
                    {product.freeShipping ? 'Free Shipping' : 'Shipping Available'}
                  </div>
                  <div className="text-sm">
                    {product.freeShipping ? 'Free delivery' : 'Contact for shipping'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <ShieldCheckIcon className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium">
                    {product.warrantyPeriod ? 'Warranty' : 'No Warranty'}
                  </div>
                  <div className="text-sm">
                    {product.warrantyPeriod ? 
                      `${product.warrantyPeriod} ${product.warrantyPeriod === 'lifetime' ? 'warranty' : product.warrantyPeriod === '1' ? 'month' : 'months'}` 
                      : 'No warranty included'
                    }
                  </div>
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
                  onClick={() => window.open('tel:+251929922289', '_self')}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Call Us</span>
                </button>
                <button
                  onClick={() => window.open('tel:+251912610850', '_self')}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Call Us</span>
                </button>
              </div>

              {/* Messaging Apps - Side by Side */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setShowOrderModal(true)}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 sm:p-4 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Telegram</span>
                </button>
                <button
                  onClick={() => setShowOrderModal(true)}
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
                  toast.success(`Order for ${product.name} received! We'll contact you at ${phone}.`)
                  setPhone('')
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
            </div>
          </div>
        </div>

        {/* Additional Product Info Tabs */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'delivery'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-6 px-4 border-b-2 font-semibold text-lg capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-black dark:border-white text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab === 'description' ? 'Description' : 
                   tab === 'specifications' ? 'Specifications' : 
                   'Delivery Info'}
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
              </div>
            )}
            
            {activeTab === 'delivery' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  🚚 Delivery Information
                </h3>
                
                {/* Delivery Time */}
                {product.deliveryTime && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center shrink-0">
                        <TruckIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 dark:text-blue-300 text-lg mb-1">
                          Estimated Delivery Time
                        </h4>
                        <p className="text-blue-800 dark:text-blue-200 text-base font-medium">
                          {product.deliveryTime}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Delivery Locations */}
                {product.deliveryLocations && product.deliveryLocations.length > 0 ? (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      📍 Available Delivery Areas
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {product.deliveryLocations.map((location, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
                        >
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                            <TruckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="font-medium text-green-800 dark:text-green-300">
                            {location}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We deliver to these locations. Contact us for delivery outside these areas.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <TruckIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No Delivery Information Available
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Please contact the seller for delivery options.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {renderRelatedProducts()}

        {/* Order Modal */}
        <OrderModal
          isOpen={showOrderModal}
          onClose={() => setShowOrderModal(false)}
          product={product}
          quantity={quantity}
          displayPrice={displayPrice}
          currentVariation={currentVariation}
        />
      </div>
    </div>
  )
}

// Order Modal Component
function OrderModal({ 
  isOpen, 
  onClose, 
  product, 
  quantity, 
  displayPrice,
  currentVariation
}: {
  isOpen: boolean
  onClose: () => void
  product: Product
  quantity: number
  displayPrice: number
  currentVariation: Variation | null
}) {
  const [phone, setPhone] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<'whatsapp' | 'telegram' | null>(null)

  const productUrl = `https://www.yafrican.com/products/${product.slug}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) {
      toast.warning('Please enter your phone number')
      return
    }

    if (!selectedPlatform) {
      toast.warning('Please select a messaging platform')
      return
    }

    // Add variation details to message if applicable
    const variationDetails = currentVariation 
      ? `\n📦 Selected Variation:\n${Object.entries(currentVariation.attributes)
          .map(([key, value]) => `   • ${key}: ${value}`)
          .join('\n')}`
      : ''

    const message = `Hello! I would like to order:\n\n *${product.name}*${variationDetails}\n Price: ${(displayPrice * quantity).toFixed(2)} Br\n Quantity: ${quantity}\n📞 My Phone: ${phone}\n🔗 Product Link: ${productUrl}\n\nPlease confirm my order. Thank you!`

    const encodedMessage = encodeURIComponent(message)

    if (selectedPlatform === 'whatsapp') {
      window.open(`https://wa.me/251929922289?text=${encodedMessage}`, '_blank')
    } else if (selectedPlatform === 'telegram') {
      window.open(`https://t.me/dagitf?text=${encodedMessage}`, '_blank')
    }
    
    onClose()
    setPhone('')
    setSelectedPlatform(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Order via Message
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h4>
          
          {/* Show selected variation if any */}
          {currentVariation && (
            <div className="mb-2 text-sm">
              <div className="font-medium">Selected Options:</div>
              <div className="mt-1 space-y-1">
                {Object.entries(currentVariation.attributes).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Quantity: {quantity}</span>
            <span>Total: {(displayPrice * quantity).toFixed(2)} Br</span>
          </div>
          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 break-all">
            🔗 {productUrl}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Phone Number *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Choose Platform *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlatform('whatsapp')}
                className={`p-4 border-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedPlatform === 'whatsapp'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-500" />
                <span className="font-medium">WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPlatform('telegram')}
                className={`p-4 border-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedPlatform === 'telegram'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <PaperAirplaneIcon className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Telegram</span>
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!phone.trim() || !selectedPlatform}
              className="flex-1 px-4 py-3 bg-amber-400 hover:bg-amber-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black rounded-lg font-semibold transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}