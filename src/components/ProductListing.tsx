// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { EyeIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
// import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
// import { useWishlist } from '../app/contexts/WishlistContext'
// import { useCart } from '../app/contexts/CartContext'
// import { toast } from 'react-toastify'

// type Product = {
//   _id: string
//   name: string
//   price: number
//   image: string
//   slug?: string
//   category?: string
//   isNew?: boolean
//   isOnSale?: boolean
//   salePrice?: number
//   stock?: number
// }

// const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0xMjAgMTgwSDE0MFYyMDBIMTIwVjE4MFpNMTYwIDE4MEgxODBWMjAwSDE2MFYxODBaTTIwMCAxODBIMjIwVjIwMEgyMDBWMTgwWk0xNDAgMTQwSDE2MFYxNjBIMTQwVjE0MFpNMTgwIDE0MEgyMDBWMTYwSDE4MFYxNDBaTTIyMCAxNDBIMjQwVjE2MEgyMjBWMTQwWk0xNjAgMTAwSDE4MFYxMjBIMTYwVjEwMFpNMjAwIDEwMEgyMjBWMTIwSDIwMFYxMDBaIiBmaWxsPSIjQ0VDRUNFIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+'

// export default function ProductListing() {
//   const router = useRouter()
//   const { 
//     addToWishlist, 
//     removeFromWishlist, 
//     isInWishlist 
//   } = useWishlist()
  
//   const { addToCart } = useCart()
  
//   const PRODUCTS_PER_LOAD = 12
//   const [products, setProducts] = useState<Product[]>([])
//   const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         console.log('🔄 Fetching products from API...')
//         const res = await fetch('/api/products', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           cache: 'no-cache'
//         })
        
//         if (!res.ok) {
//           console.warn(`❌ API returned ${res.status}`)
//           throw new Error(`Failed to fetch products: ${res.status}`)
//         }

//         const data = await res.json()
        
//         if (data && Array.isArray(data) && data.length > 0) {
//           const processedProducts = data.map((product: any) => ({
//             _id: product._id || product.id,
//             name: product.name || product.title || 'Unnamed Product',
//             price: product.price || 0,
//             image: product.image || product.imageUrl || product.images?.[0] || product.img || PLACEHOLDER_IMAGE,
//             slug: product.slug || product._id,
//             category: product.category || 'Uncategorized',
//             isNew: product.isNew || false,
//             isOnSale: product.isOnSale || false,
//             salePrice: product.salePrice || null,
//             stock: product.stock || product.quantity || 0,
//           }))
          
//           console.log(`✅ Loaded ${processedProducts.length} products from API`)
//           setProducts(processedProducts)
//           setError('')
          
//           // Show success toast
//           toast.success(`Loaded ${processedProducts.length} products!`)
//         } else {
//           throw new Error('No products found in API response')
//         }
//       } catch (err: any) {
//         console.log('❌ Error fetching products:', err.message)
//         setError(err.message || 'Failed to load products')
//         setProducts([])
        
//         // Show error toast
//         toast.error('Failed to load products. Please try again.')
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     fetchProducts()
//   }, [])

//   const toggleWishlist = (product: Product) => {
//     if (isInWishlist(product._id)) {
//       removeFromWishlist(product._id)
//       toast.info(`Removed ${product.name} from wishlist`)
//     } else {
//       addToWishlist(product)
//       toast.success(`Added ${product.name} to wishlist!`)
//     }
//   }

//   const handleAddToCart = (product: Product) => {
//     addToCart(product)
//     toast.success(`Added ${product.name} to cart!`)
//   }

//   const loadMore = () => {
//     const newCount = Math.min(visibleCount + PRODUCTS_PER_LOAD, products.length)
//     setVisibleCount(newCount)
    
//     if (newCount > visibleCount) {
//       toast.info(`Showing ${newCount} of ${products.length} products`)
//     } else {
//       toast.info('You have reached the end of the product list')
//     }
//   }

//   const handleProductAction = (product: Product, action: 'view' | 'cart') => {
//     if (action === 'view') {
//       const productSlug = product.slug || product._id
//       router.push(`/products/${productSlug}`)
//     } else if (action === 'cart') {
//       handleAddToCart(product)
//     }
//   }

//   // Loading skeleton
//   if (loading) {
//     return (
//       <section className="max-w-7xl mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
//             Our Products
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400">Loading amazing products for you...</p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
//           {Array.from({ length: 10 }).map((_, index) => (
//             <div
//               key={index}
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm animate-pulse"
//             >
//               <div className="w-full aspect-square bg-gray-300 dark:bg-gray-600 rounded-t-2xl"></div>
//               <div className="p-4 space-y-3">
//                 <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
//                 <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
//                 <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-12">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <h2 className="text-3xl lg:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
//           Our Products
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
//           Discover the latest and most popular products in our collection
//         </p>
        
//         {error && (
//           <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 max-w-md mx-auto">
//             <p className="text-red-700 dark:text-red-300 text-sm">
//               {error}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Products Grid - OPTIMIZED FOR MOBILE & CENTERED */}
//       {products.length > 0 ? (
//         <>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
//             {products.slice(0, visibleCount).map((product) => {
//               const isInWishlistState = isInWishlist(product._id)
//               const isOutOfStock = product.stock === 0
//               const displayPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price
//               const originalPrice = product.isOnSale ? product.price : null

//               return (
//                 <div
//                   key={product._id}
//                   className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden"
//                 >
//                   {/* Badges */}
//                   <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
//                     {product.isNew && (
//                       <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                         NEW
//                       </span>
//                     )}
//                     {product.isOnSale && (
//                       <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                         SALE
//                       </span>
//                     )}
//                     {isOutOfStock && (
//                       <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                         OUT OF STOCK
//                       </span>
//                     )}
//                   </div>

//                   {/* Wishlist Button */}
//                   <button
//                     onClick={() => toggleWishlist(product)}
//                     className="absolute top-3 right-3 z-20 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
//                   >
//                     {isInWishlistState ? (
//                       <HeartSolidIcon className="w-5 h-5 text-red-500" />
//                     ) : (
//                       <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
//                     )}
//                   </button>

//                   {/* Product Image */}
//                   <div 
//                     className="w-full aspect-square flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative cursor-pointer p-4"
//                     onClick={() => handleProductAction(product, 'view')}
//                   >
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
//                       onError={(e) => {
//                         console.warn(`❌ Image failed to load: ${product.image}`)
//                         const target = e.target as HTMLImageElement
//                         target.src = PLACEHOLDER_IMAGE
//                       }}
//                     />
                    
//                     {isOutOfStock && (
//                       <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-10">
//                         <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-semibold text-sm">
//                           Out of Stock
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Product Info */}
//                   <div className="p-4 flex flex-col flex-1 space-y-3">
//                     <div className="space-y-2 flex-1">
//                       {/* Category */}
//                       {product.category && (
//                         <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide block truncate">
//                           {product.category}
//                         </span>
//                       )}

//                       {/* Product Name */}
//                       <h3 
//                         className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight min-h-[2.8rem] group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors cursor-pointer"
//                         onClick={() => handleProductAction(product, 'view')}
//                       >
//                         {product.name}
//                       </h3>

//                       {/* Price */}
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
//                           {displayPrice.toFixed(2)} Br
//                         </span>
//                         {originalPrice && (
//                           <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
//                             {originalPrice.toFixed(2)} Br
//                           </span>
//                         )}
//                       </div>

//                       {/* Stock Indicator */}
//                       {product.stock !== undefined && product.stock > 0 && (
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                           {product.stock < 10 ? (
//                             <span className="text-orange-500">Only {product.stock} left</span>
//                           ) : (
//                             <span className="text-green-500">In Stock</span>
//                           )}
//                         </div>
//                       )}
//                     </div>

//                     {/* Action Buttons - ICONS ON MOBILE, TEXT ON DESKTOP */}
//                     <div className="space-y-2">
//                       {/* View Details Button - Icon only on mobile */}
//                       <button
//                         onClick={() => handleProductAction(product, 'view')}
//                         className="w-full inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-gray-900 text-sm px-3 md:px-4 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
//                         title="View Details"
//                       >
//                         <EyeIcon className="w-4 h-4 md:w-5 md:h-5" />
//                         <span className="hidden md:inline">View Details</span>
//                       </button>
                      
//                       {/* Add to Cart Button - Icon only on mobile */}
//                       {!isOutOfStock && (
//                         <button 
//                           className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-400 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 text-sm px-3 md:px-4 py-2 rounded-xl transition-all duration-200 font-medium"
//                           onClick={() => handleAddToCart(product)}
//                           title="Add to Cart"
//                         >
//                           <ShoppingBagIcon className="w-4 h-4 md:w-5 md:h-5" />
//                           <span className="hidden md:inline">Add to Cart</span>
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>

//           {/* Load More Button */}
//           {visibleCount < products.length && (
//             <div className="flex justify-center mt-16">
//               <button
//                 onClick={loadMore}
//                 className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
//               >
//                 Load More Products ({products.length - visibleCount} remaining)
//               </button>
//             </div>
//           )}

//           {/* Results Count */}
//           <div className="text-center mt-12">
//             <p className="text-gray-600 dark:text-gray-400 text-sm">
//               Showing {Math.min(visibleCount, products.length)} of {products.length} products
//             </p>
//           </div>
//         </>
//       ) : (
//         /* No Products State */
//         <div className="text-center py-16">
//           <div className="max-w-md mx-auto">
//             <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
//               <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//               No Products Found
//             </h3>
//             <p className="text-gray-600 dark:text-gray-400 mb-6">
//               {error ? 'There was an error loading products.' : 'No products are available at the moment.'}
//             </p>
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { EyeIcon, HeartIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { useWishlist } from '../app/contexts/WishlistContext'
import { useCart } from '../app/contexts/CartContext'
import { toast } from 'react-toastify'

type Product = {
  _id: string
  name: string
  price: number
  image: string
  slug?: string
  category?: string
  isNew?: boolean
  isOnSale?: boolean
  salePrice?: number
  stock?: number
  rating?: number
  reviews?: number
  freeShipping?: boolean
  discountPercentage?: number
}

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik0xMjAgMTgwSDE0MFYyMDBIMTIwVjE4MFpNMTYwIDE4MEgxODBWMjAwSDE2MFYxODBaTTIwMCAxODBIMjIwVjIwMEgyMDBWMTgwWk0xNDAgMTQwSDE2MFYxNjBIMTQwVjE0MFpNMTgwIDE0MEgyMDBWMTYwSDE4MFYxNDBaTTIyMCAxNDBIMjQwVjE2MEgyMjBWMTQwWk0xNjAgMTAwSDE4MFYxMjBIMTYwVjEwMFpNMjAwIDEwMEgyMjBWMTIwSDIwMFYxMDBaIiBmaWxsPSIjQ0VDRUNFIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+'

export default function ProductListing() {
  const router = useRouter()
  const { 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist 
  } = useWishlist()
  
  const { addToCart } = useCart()
  
  const PRODUCTS_PER_LOAD = 12
  const [products, setProducts] = useState<Product[]>([])
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Generate random rating and reviews for demo
  const generateRandomProductData = () => {
    return {
      rating: Math.floor(Math.random() * 2) + 3 + Math.random(), // 3.0 - 5.0
      reviews: Math.floor(Math.random() * 1000) + 50,
      freeShipping: Math.random() > 0.5,
      discountPercentage: Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 10 : 0
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('🔄 Fetching products from API...')
        const res = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache'
        })
        
        if (!res.ok) {
          console.warn(`❌ API returned ${res.status}`)
          throw new Error(`Failed to fetch products: ${res.status}`)
        }

        const data = await res.json()
        
        if (data && Array.isArray(data) && data.length > 0) {
          const processedProducts = data.map((product: any) => {
            const randomData = generateRandomProductData()
            const stock = product.stock || product.quantity || Math.floor(Math.random() * 100) + 1
            const isOutOfStock = stock === 0
            
            // Auto-set badges based on product data
            const isNew = product.isNew !== undefined ? product.isNew : Math.random() > 0.7
            const isOnSale = product.isOnSale !== undefined ? product.isOnSale : 
                           (!isOutOfStock && (Math.random() > 0.5 || product.salePrice))
            
            // Calculate sale price if not provided
            let salePrice = product.salePrice
            if (isOnSale && !salePrice && !isOutOfStock) {
              const discount = randomData.discountPercentage || Math.floor(Math.random() * 40) + 10
              salePrice = product.price * (1 - discount / 100)
            }

            return {
              _id: product._id || product.id,
              name: product.name || product.title || 'Unnamed Product',
              price: product.price || 0,
              image: product.image || product.imageUrl || product.images?.[0] || product.img || PLACEHOLDER_IMAGE,
              slug: product.slug || product._id,
              category: product.category || 'Uncategorized',
              isNew,
              isOnSale,
              salePrice,
              stock,
              rating: randomData.rating,
              reviews: randomData.reviews,
              freeShipping: randomData.freeShipping,
              discountPercentage: randomData.discountPercentage
            }
          })
          
          console.log(`✅ Loaded ${processedProducts.length} products from API`)
          setProducts(processedProducts)
          setError('')
          
          // Show success toast
          toast.success(`Loaded ${processedProducts.length} products!`)
        } else {
          throw new Error('No products found in API response')
        }
      } catch (err: any) {
        console.log('❌ Error fetching products:', err.message)
        setError(err.message || 'Failed to load products')
        setProducts([])
        
        // Show error toast
        toast.error('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
      toast.info(`Removed ${product.name} from wishlist`)
    } else {
      addToWishlist(product)
      toast.success(`Added ${product.name} to wishlist!`)
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast.success(`Added ${product.name} to cart!`)
  }

  const loadMore = () => {
    const newCount = Math.min(visibleCount + PRODUCTS_PER_LOAD, products.length)
    setVisibleCount(newCount)
    
    if (newCount > visibleCount) {
      toast.info(`Showing ${newCount} of ${products.length} products`)
    } else {
      toast.info('You have reached the end of the product list')
    }
  }

  const handleProductAction = (product: Product, action: 'view' | 'cart') => {
    if (action === 'view') {
      const productSlug = product.slug || product._id
      router.push(`/products/${productSlug}`)
    } else if (action === 'cart') {
      handleAddToCart(product)
    }
  }

  // Render star rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          star <= Math.floor(rating) ? (
            <StarSolidIcon key={star} className="w-3 h-3 text-yellow-400" />
          ) : (
            <StarIcon key={star} className="w-3 h-3 text-gray-300" />
          )
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating.toFixed(1)}</span>
      </div>
    )
  }

  // Loading skeleton
  if (loading) {
    return (
      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="text-center mb-8 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm animate-pulse"
              >
                <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-t-xl"></div>
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Featured Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base max-w-2xl mx-auto">
            Discover amazing deals and popular items loved by thousands of customers
          </p>
          
          {error && (
            <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-700 dark:text-red-300 text-sm">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Products Grid - ALIEXPRESS STYLE */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
              {products.slice(0, visibleCount).map((product) => {
                const isInWishlistState = isInWishlist(product._id)
                const isOutOfStock = product.stock === 0
                const displayPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price
                const originalPrice = product.isOnSale ? product.price : null
                const discountPercent = product.discountPercentage || 
                  (originalPrice ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) : 0)

                return (
                  <div
                    key={product._id}
                    className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative overflow-hidden"
                  >
                    {/* Discount Badge */}
                    {discountPercent > 0 && (
                      <div className="absolute top-2 left-2 z-20">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          -{discountPercent}%
                        </span>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          NEW
                        </span>
                      )}
                      {product.freeShipping && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          FREE SHIPPING
                        </span>
                      )}
                      {isOutOfStock && (
                        <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                          OUT OF STOCK
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-2 right-2 z-20 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                    >
                      {isInWishlistState ? (
                        <HeartSolidIcon className="w-4 h-4 text-red-500" />
                      ) : (
                        <HeartIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
                      )}
                    </button>

                    {/* Product Image */}
                    <div 
                      className="w-full aspect-square flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative cursor-pointer p-3"
                      onClick={() => handleProductAction(product, 'view')}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          console.warn(`❌ Image failed to load: ${product.image}`)
                          const target = e.target as HTMLImageElement
                          target.src = PLACEHOLDER_IMAGE
                        }}
                      />
                      
                      {isOutOfStock && (
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-10">
                          <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg font-semibold text-xs">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-3 flex flex-col flex-1 space-y-2">
                      {/* Product Name */}
                      <h3 
                        className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight min-h-[2.5rem] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                        onClick={() => handleProductAction(product, 'view')}
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Rating and Reviews */}
                      {product.rating && (
                        <div className="flex items-center justify-between">
                          {renderRating(product.rating)}
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({product.reviews?.toLocaleString()})
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-red-600 dark:text-red-400">
                            {displayPrice.toFixed(2)} Br
                          </span>
                          {originalPrice && (
                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                              {originalPrice.toFixed(2)} Br
                            </span>
                          )}
                        </div>

                        {/* Shipping */}
                        {product.freeShipping && (
                          <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                            ✓ Free Shipping
                          </div>
                        )}
                      </div>

                      {/* Stock Indicator */}
                      {product.stock !== undefined && product.stock > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {product.stock < 10 ? (
                            <span className="text-orange-500 font-medium">Only {product.stock} left!</span>
                          ) : product.stock < 20 ? (
                            <span className="text-green-500 font-medium">Almost gone!</span>
                          ) : (
                            <span className="text-green-500 font-medium">In Stock</span>
                          )}
                        </div>
                      )}

                      {/* Sold Counter (AliExpress Style) */}
                      {product.reviews && product.reviews > 100 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.floor(product.reviews / 10)}+ sold
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-3 pt-0 space-y-2">
                      {/* Add to Cart Button - Full width on mobile */}
                      {!isOutOfStock && (
                        <button 
                          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2.5 rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingBagIcon className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      )}
                      
                      {/* View Details Button - Secondary */}
                      <button
                        onClick={() => handleProductAction(product, 'view')}
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Load More Button */}
            {visibleCount < products.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Load More ({products.length - visibleCount} more)
                </button>
              </div>
            )}

            {/* Results Count */}
            <div className="text-center mt-8">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Showing {Math.min(visibleCount, products.length)} of {products.length} products
              </p>
            </div>
          </>
        ) : (
          /* No Products State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error ? 'There was an error loading products.' : 'Check back soon for new arrivals!'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                Refresh Products
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}