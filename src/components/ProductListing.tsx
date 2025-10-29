'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { EyeIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useWishlist } from '../app/contexts/WishlistContext'
import { useCart } from '../app/contexts/CartContext'

type Product = {
  _id: string
  name: string
  price: number
  image: string
  slug?: string
  category?: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isOnSale?: boolean
  salePrice?: number
  stock?: number
  isDemo?: boolean
}

// Comprehensive dummy data
const dummyProducts: Product[] = [
  {
    _id: 'demo-1',
    name: 'iPhone 15 Pro Max - 256GB',
    price: 1299.99,
    salePrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    slug: 'iphone-15-pro-max-256gb',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 1247,
    isNew: true,
    isOnSale: true,
    stock: 15,
    isDemo: true
  },
  {
    _id: 'demo-2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    slug: 'samsung-galaxy-s24-ultra',
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 892,
    isNew: true,
    stock: 8,
    isDemo: true
  },
  {
    _id: 'demo-3',
    name: 'MacBook Pro 16-inch M3',
    price: 2399.99,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    slug: 'macbook-pro-16-inch-m3',
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 567,
    isNew: false,
    stock: 12,
    isDemo: true
  },
  {
    _id: 'demo-4',
    name: 'Sony WH-1000XM5 Headphones',
    price: 399.99,
    salePrice: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    slug: 'sony-wh-1000xm5-headphones',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 2341,
    isNew: false,
    isOnSale: true,
    stock: 25,
    isDemo: true
  },
  {
    _id: 'demo-5',
    name: 'Nike Air Jordan 1 Retro',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    slug: 'nike-air-jordan-1-retro',
    category: 'Clothing',
    rating: 4.5,
    reviewCount: 892,
    isNew: true,
    stock: 0,
    isDemo: true
  },
  {
    _id: 'demo-6',
    name: 'Adidas Ultraboost 22 Running Shoes',
    price: 189.99,
    salePrice: 159.99,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
    slug: 'adidas-ultraboost-22-running-shoes',
    category: 'Clothing',
    rating: 4.4,
    reviewCount: 567,
    isNew: false,
    isOnSale: true,
    stock: 7,
    isDemo: true
  }
]

// Create a proper placeholder image URL that actually exists
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
  const [usingDemoData, setUsingDemoData] = useState(false)

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
          console.warn(`❌ API returned ${res.status}, using demo data`)
          throw new Error(`Failed to fetch products: ${res.status}`)
        }

        const data = await res.json()
        
        if (data && Array.isArray(data) && data.length > 0) {
          const processedProducts = data.map((product: any) => ({
            _id: product._id || product.id,
            name: product.name || product.title || 'Unnamed Product',
            price: product.price || 0,
            image: product.image || product.imageUrl || product.images?.[0] || product.img || PLACEHOLDER_IMAGE,
            slug: product.slug || product._id,
            category: product.category || 'Uncategorized',
            rating: product.rating || 0,
            reviewCount: product.reviewCount || 0,
            isNew: product.isNew || false,
            isOnSale: product.isOnSale || false,
            salePrice: product.salePrice || null,
            stock: product.stock || product.quantity || 0,
            isDemo: false
          }))
          
          console.log(`✅ Loaded ${processedProducts.length} real products from API`)
          setProducts(processedProducts)
          setUsingDemoData(false)
          setError('')
        } else {
          throw new Error('No products found in API response')
        }
      } catch (err: any) {
        console.log('🎭 Using DEMO PRODUCTS due to:', err.message)
        setError(err.message || 'Connection issue - showing demo products')
        setProducts([...dummyProducts])
        setUsingDemoData(true)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])
//debugging
// Add this enhanced debug component to your ProductListing
const DebugInfo = () => {
  const [apiProducts, setApiProducts] = useState<any[]>([])
  const [rawResponse, setRawResponse] = useState<any>(null)
  const [dbStats, setDbStats] = useState<any>(null)

  useEffect(() => {
    async function fetchDebugInfo() {
      try {
        // Fetch products from API
        const res = await fetch('/api/products')
        const data = await res.json()
        setApiProducts(Array.isArray(data) ? data : [])
        setRawResponse(data)

        // Fetch database stats
        const statsRes = await fetch('/api/debug/products-stats')
        if (statsRes.ok) {
          const stats = await statsRes.json()
          setDbStats(stats)
        }
      } catch (error) {
        console.error('Debug fetch error:', error)
      }
    }
    
    fetchDebugInfo()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg z-50 max-w-md max-h-96 overflow-auto text-xs">
      <h3 className="font-bold mb-2">🔧 Debug Info</h3>
      
      <div className="space-y-2">
        <div>
          <strong>API Response Type:</strong> {Array.isArray(rawResponse) ? 'Array' : typeof rawResponse}
        </div>
        
        <div>
          <strong>API Products:</strong> {apiProducts.length}
        </div>

        {dbStats && (
          <>
            <div className="border-t pt-2">
              <strong>Database Stats:</strong>
              <div>Total Products: {dbStats.total}</div>
              <div>Approved: {dbStats.approved}</div>
              <div>Pending: {dbStats.pending}</div>
              <div>Rejected: {dbStats.rejected}</div>
            </div>
          </>
        )}

        {apiProducts.slice(0, 3).map((p: any, index: number) => (
          <div key={p._id || index} className="border-t pt-2">
            <div><strong>Product {index + 1}:</strong></div>
            <div>Name: {p.name}</div>
            <div>Category: {p.category}</div>
            <div>Status: {p.status}</div>
            <div>Stock: {p.stock}</div>
            <div>inStock: {p.inStock ? 'Yes' : 'No'}</div>
            <div>Images: {p.images?.length || 0}</div>
          </div>
        ))}

        {!Array.isArray(rawResponse) && rawResponse && (
          <div className="border-t pt-2 text-red-400">
            <strong>Error Response:</strong>
            <pre>{JSON.stringify(rawResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
// Add <DebugInfo /> to your return statement
  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product)
      if (product.isDemo || usingDemoData) {
        alert(`Demo: "${product.name}" added to wishlist!`)
      }
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    if (product.isDemo || usingDemoData) {
      alert(`Demo: "${product.name}" added to cart!`)
    } else {
      alert(`Added ${product.name} to cart!`)
    }
  }

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PRODUCTS_PER_LOAD, products.length))
  }

  const handleProductAction = (product: Product, action: 'view' | 'cart') => {
    if (action === 'view') {
      const productSlug = product.slug || product._id
      router.push(`/products/${productSlug}`)
    } else if (action === 'cart') {
      handleAddToCart(product)
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <section className="max-w-8xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
            Trending Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Discover amazing products just for you</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-t-2xl"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-8xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
          {usingDemoData ? 'Demo Products' : 'Trending Products'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {usingDemoData 
            ? 'Showing sample products. Real products will appear when database is connected.'
            : 'Discover the latest and most popular products in our collection'
          }
        </p>
        
        {usingDemoData && (
          <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300">
              <span className="font-semibold">Demo Mode Active</span>
            </div>
            <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">
              These are sample products for demonstration
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 max-w-md mx-auto">
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Products Grid - COMPLETELY REDESIGNED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {products.slice(0, visibleCount).map((product) => {
          const isInWishlistState = isInWishlist(product._id)
          const isOutOfStock = product.stock === 0
          const displayPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price
          const originalPrice = product.isOnSale ? product.price : null
          const isDemoProduct = product.isDemo || usingDemoData

          return (
            <div
              key={product._id}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden"
            >
              {/* Badges */}
              <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                {isDemoProduct && (
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    DEMO
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    NEW
                  </span>
                )}
                {product.isOnSale && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    SALE
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
                className="absolute top-3 right-3 z-20 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                {isInWishlistState ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
                )}
              </button>

              {/* Product Image - COMPLETELY REDESIGNED */}
              <div 
                className="w-full aspect-square flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative cursor-pointer p-4"
                onClick={() => handleProductAction(product, 'view')}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    console.warn(`❌ Image failed to load: ${product.image}`)
                    const target = e.target as HTMLImageElement
                    target.src = PLACEHOLDER_IMAGE
                  }}
                />
                
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-10">
                    <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-semibold text-sm">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1 space-y-3">
                <div className="space-y-2 flex-1">
                  {/* Category */}
                  {product.category && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide block truncate">
                      {product.category}
                    </span>
                  )}

                  {/* Product Name */}
                  <h3 
                    className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight min-h-[2.8rem] group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors cursor-pointer"
                    onClick={() => handleProductAction(product, 'view')}
                  >
                    {product.name}
                  </h3>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400 text-sm">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({product.reviewCount || 0})
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                      {displayPrice.toFixed(2)} Br
                    </span>
                    {originalPrice && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        {originalPrice.toFixed(2)} Br
                      </span>
                    )}
                  </div>

                  {/* Stock Indicator */}
                  {product.stock !== undefined && product.stock > 0 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {product.stock < 10 ? (
                        <span className="text-orange-500">Only {product.stock} left</span>
                      ) : (
                        <span className="text-green-500">In Stock</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleProductAction(product, 'view')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-gray-900 text-sm px-4 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                  >
                    <EyeIcon className="w-4 h-4" />
                    {isDemoProduct ? 'View Demo' : 'View Details'}
                  </button>
                  
                  {!isOutOfStock && (
                    <button 
                      className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-400 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 text-sm px-4 py-2 rounded-xl transition-all duration-200 font-medium"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBagIcon className="w-4 h-4" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Load More Button */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-16">
          <button
            onClick={loadMore}
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            Load More Products ({products.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Showing {Math.min(visibleCount, products.length)} of {products.length} products
          {usingDemoData && ' (Demo Data)'}
        </p>
      </div>
      {process.env.NEXT_PUBLIC_DEBUG_PRODUCTS === 'true' && <DebugInfo />}
    </section>
  )
}





// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { EyeIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
// import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
// import { useWishlist } from '../app/contexts/WishlistContext'
// import { useCart } from '../app/contexts/CartContext'

// type Product = {
//   _id: string
//   name: string
//   price: number
//   image: string
//   slug?: string
//   category?: string
//   rating?: number
//   reviewCount?: number
//   isNew?: boolean
//   isOnSale?: boolean
//   salePrice?: number
//   stock?: number
//   isDemo?: boolean
// }

// // Comprehensive dummy data - MUST match detail page
// const dummyProducts: Product[] = [
//   {
//     _id: '1',
//     name: 'iPhone 15 Pro Max - 256GB',
//     price: 1299.99,
//     salePrice: 1199.99,
//     image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
//     slug: 'iphone-15-pro-max-256gb',
//     category: 'Electronics',
//     rating: 4.8,
//     reviewCount: 1247,
//     isNew: true,
//     isOnSale: true,
//     stock: 15,
//     isDemo: true
//   },
//   {
//     _id: '2',
//     name: 'Samsung Galaxy S24 Ultra',
//     price: 1199.99,
//     image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop',
//     slug: 'samsung-galaxy-s24-ultra',
//     category: 'Electronics',
//     rating: 4.7,
//     reviewCount: 892,
//     isNew: true,
//     stock: 8,
//     isDemo: true
//   },
//   {
//     _id: '3',
//     name: 'MacBook Pro 16-inch M3',
//     price: 2399.99,
//     image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop',
//     slug: 'macbook-pro-16-inch-m3',
//     category: 'Electronics',
//     rating: 4.9,
//     reviewCount: 567,
//     isNew: false,
//     stock: 12,
//     isDemo: true
//   },
//   {
//     _id: '4',
//     name: 'Sony WH-1000XM5 Headphones',
//     price: 399.99,
//     salePrice: 349.99,
//     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
//     slug: 'sony-wh-1000xm5-headphones',
//     category: 'Electronics',
//     rating: 4.6,
//     reviewCount: 2341,
//     isNew: false,
//     isOnSale: true,
//     stock: 25,
//     isDemo: true
//   },
//   {
//     _id: '5',
//     name: 'Nike Air Jordan 1 Retro',
//     price: 179.99,
//     image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
//     slug: 'nike-air-jordan-1-retro',
//     category: 'Clothing',
//     rating: 4.5,
//     reviewCount: 892,
//     isNew: true,
//     stock: 0,
//     isDemo: true
//   },
//   {
//     _id: '6',
//     name: 'Adidas Ultraboost 22 Running Shoes',
//     price: 189.99,
//     salePrice: 159.99,
//     image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
//     slug: 'adidas-ultraboost-22-running-shoes',
//     category: 'Clothing',
//     rating: 4.4,
//     reviewCount: 567,
//     isNew: false,
//     isOnSale: true,
//     stock: 7,
//     isDemo: true
//   }
// ]

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
//   const [usingDemoData, setUsingDemoData] = useState(false)

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         console.log('🔄 Fetching products from API...')
//         const res = await fetch('/api/products', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })
        
//         if (!res.ok) {
//           console.warn(`API returned ${res.status}, using demo data`)
//           throw new Error(`Failed to fetch products: ${res.status}`)
//         }

//         const data = await res.json()
        
//         if (data && data.length > 0) {
//           console.log(`✅ Loaded ${data.length} real products`)
//           setProducts(data)
//           setUsingDemoData(false)
//           setError('')
//         } else {
//           console.log('📝 No real products found, using demo data')
//           throw new Error('No products found in response')
//         }
//       } catch (err: any) {
//         console.log('🎭 Using demo products due to:', err.message)
//         setError(err.message || 'Connection issue - showing demo products')
//         setProducts(dummyProducts)
//         setUsingDemoData(true)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchProducts()
//   }, [])

//   const toggleWishlist = (product: Product) => {
//     if (isInWishlist(product._id)) {
//       removeFromWishlist(product._id)
//     } else {
//       addToWishlist(product)
//       if (product.isDemo || usingDemoData) {
//         alert(`Demo: "${product.name}" added to wishlist!`)
//       }
//     }
//   }

//   const handleAddToCart = (product: Product) => {
//     addToCart(product)
//     if (product.isDemo || usingDemoData) {
//       alert(`Demo: "${product.name}" added to cart!`)
//     } else {
//       alert(`Added ${product.name} to cart!`)
//     }
//   }

//   const loadMore = () => {
//     setVisibleCount((prev) => Math.min(prev + PRODUCTS_PER_LOAD, products.length))
//   }

//   const handleProductAction = (product: Product, action: 'view' | 'cart') => {
//     if (action === 'view') {
//       // Always navigate to detail page using slug
//       const productSlug = product.slug || product._id
//       console.log(`🔗 Navigating to product: /products/${productSlug}`)
//       router.push(`/products/${productSlug}`)
//     } else if (action === 'cart') {
//       handleAddToCart(product)
//     }
//   }

//   // Loading skeleton
//   if (loading) {
//     return (
//       <section className="max-w-8xl mx-auto px-4 py-12">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
//              Trending Products
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400">Discover amazing products just for you</p>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//           {Array.from({ length: 12 }).map((_, index) => (
//             <div
//               key={index}
//               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm animate-pulse"
//             >
//               <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-t-2xl"></div>
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
//     <section className="max-w-8xl mx-auto px-4 py-12">
//       {/* Header with Demo Data Indicator */}
//       <div className="text-center mb-12">
//         <h2 className="text-3xl lg:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
//           {usingDemoData ? ' Demo Products' : ' Trending Products'}
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
//           {usingDemoData 
//             ? 'Showing sample products. Real products will appear when database is connected.'
//             : 'Discover the latest and most popular products in our collection'
//           }
//         </p>
        
//         {usingDemoData && (
//           <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 max-w-md mx-auto">
//             <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300">
//               <span className="font-semibold">Demo Mode Active</span>
//             </div>
//             <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">
//               These are sample products for demonstration
//             </p>
//           </div>
//         )}

//         {error && (
//           <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 max-w-md mx-auto">
//             <p className="text-blue-700 dark:text-blue-300 text-sm">
//               {error}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//         {products.slice(0, visibleCount).map((product) => {
//           const isInWishlistState = isInWishlist(product._id)
//           const isOutOfStock = product.stock === 0
//           const displayPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price
//           const originalPrice = product.isOnSale ? product.price : null
//           const isDemoProduct = product.isDemo || usingDemoData

//           return (
//             <div
//               key={product._id}
//               className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden"
//             >
//               {/* Demo Badge for demo products */}
//               {isDemoProduct && (
//                 <div className="absolute top-3 left-3 z-20">
//                   <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                     DEMO
//                   </span>
//                 </div>
//               )}

//               {/* Badges */}
//               <div className={`absolute top-3 z-20 flex flex-col gap-2 ${isDemoProduct ? 'left-12' : 'left-3'}`}>
//                 {product.isNew && (
//                   <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                     NEW
//                   </span>
//                 )}
//                 {product.isOnSale && (
//                   <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                     SALE
//                   </span>
//                 )}
//                 {isOutOfStock && (
//                   <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                     OUT OF STOCK
//                   </span>
//                 )}
//               </div>

//               {/* Wishlist Button */}
//               <button
//                 onClick={() => toggleWishlist(product)}
//                 className="absolute top-3 right-3 z-20 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
//               >
//                 {isInWishlistState ? (
//                   <HeartSolidIcon className="w-5 h-5 text-red-500" />
//                 ) : (
//                   <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
//                 )}
//               </button>

//               {/* Product Image with Professional Watermark */}
//               <div 
//                 className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-t-2xl relative cursor-pointer"
//                 onClick={() => handleProductAction(product, 'view')}
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop&auto=format'
//                   }}
//                 />
                
//                 {/* Professional Watermark Overlay */}
//                 <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent">
//                   <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm border border-yellow-500/30 shadow-lg">
//                     yafrican.com
//                   </div>
//                 </div>
                
//                 {isOutOfStock && (
//                   <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-10">
//                     <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-semibold">
//                       Out of Stock
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Product Info */}
//               <div className="p-4 flex flex-col justify-between flex-1">
//                 <div className="space-y-2">
//                   {/* Category */}
//                   {product.category && (
//                     <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
//                       {product.category}
//                     </span>
//                   )}

//                   {/* Product Name */}
//                   <h3 
//                     className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors cursor-pointer"
//                     onClick={() => handleProductAction(product, 'view')}
//                   >
//                     {product.name}
//                   </h3>

//                   {/* Rating */}
//                   {product.rating && (
//                     <div className="flex items-center gap-1">
//                       <div className="flex text-yellow-400">
//                         {'★'.repeat(Math.floor(product.rating))}
//                         {'☆'.repeat(5 - Math.floor(product.rating))}
//                       </div>
//                       <span className="text-xs text-gray-500 dark:text-gray-400">
//                         ({product.reviewCount || 0})
//                       </span>
//                     </div>
//                   )}

//                   {/* Price */}
//                   <div className="flex items-center gap-2">
//                     <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
//                       {displayPrice.toFixed(2)} Br
//                     </span>
//                     {originalPrice && (
//                       <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
//                         {originalPrice.toFixed(2)} Br
//                       </span>
//                     )}
//                   </div>

//                   {/* Stock Indicator */}
//                   {product.stock !== undefined && product.stock > 0 && (
//                     <div className="text-xs text-gray-500 dark:text-gray-400">
//                       {product.stock < 10 ? (
//                         <span className="text-orange-500">Only {product.stock} left</span>
//                       ) : (
//                         <span className="text-green-500">In Stock</span>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-4 space-y-2">
//                   <button
//                     onClick={() => handleProductAction(product, 'view')}
//                     className="w-full inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-gray-900 text-sm px-4 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-semibold group/btn"
//                   >
//                     <EyeIcon className="w-4 h-4" />
//                     {isDemoProduct ? 'View Demo' : 'View Details'}
//                   </button>
                  
//                   {!isOutOfStock && (
//                     <button 
//                       className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-400 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 text-sm px-4 py-2 rounded-xl transition-all duration-200 font-medium group/cart"
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       <ShoppingBagIcon className="w-4 h-4" />
//                       Add to Cart
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       {/* Load More Button */}
//       {visibleCount < products.length && (
//         <div className="flex justify-center mt-16">
//           <button
//             onClick={loadMore}
//             className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
//           >
//             Load More Products ({products.length - visibleCount} remaining)
//           </button>
//         </div>
//       )}

//       {/* Results Count */}
//       <div className="text-center mt-12">
//         <p className="text-gray-600 dark:text-gray-400 text-sm">
//           Showing {Math.min(visibleCount, products.length)} of {products.length} products
//           {usingDemoData && ' (Demo Data)'}
//         </p>
//       </div>
//     </section>
//   )
// }



// imageshownhere
// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { EyeIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
// import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
// import { useWishlist } from '../app/contexts/WishlistContext'
// import { useCart } from '../app/contexts/CartContext'

// type Product = {
//   _id: string
//   name: string
//   price: number
//   image: string
//   slug?: string
//   category?: string
//   rating?: number
//   reviewCount?: number
//   isNew?: boolean
//   isOnSale?: boolean
//   salePrice?: number
//   stock?: number
//   isDemo?: boolean
// }

// // Demo fallback
// const dummyProducts: Product[] = [
//   {
//     _id: '1',
//     name: 'iPhone 15 Pro Max - 256GB',
//     price: 1299.99,
//     salePrice: 1199.99,
//     image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
//     slug: 'iphone-15-pro-max-256gb',
//     category: 'Electronics',
//     rating: 4.8,
//     reviewCount: 1247,
//     isNew: true,
//     isOnSale: true,
//     stock: 15,
//     isDemo: true
//   },
//   {
//     _id: '2',
//     name: 'Samsung Galaxy S24 Ultra',
//     price: 1199.99,
//     image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop',
//     slug: 'samsung-galaxy-s24-ultra',
//     category: 'Electronics',
//     rating: 4.7,
//     reviewCount: 892,
//     isNew: true,
//     stock: 8,
//     isDemo: true
//   },
//   {
//     _id: '3',
//     name: 'MacBook Pro 16-inch M3',
//     price: 2399.99,
//     image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop',
//     slug: 'macbook-pro-16-inch-m3',
//     category: 'Electronics',
//     rating: 4.9,
//     reviewCount: 567,
//     isNew: false,
//     stock: 12,
//     isDemo: true
//   },
//   {
//     _id: '4',
//     name: 'Sony WH-1000XM5 Headphones',
//     price: 399.99,
//     salePrice: 349.99,
//     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
//     slug: 'sony-wh-1000xm5-headphones',
//     category: 'Electronics',
//     rating: 4.6,
//     reviewCount: 2341,
//     isOnSale: true,
//     stock: 25,
//     isDemo: true
//   },
//   {
//     _id: '5',
//     name: 'Nike Air Jordan 1 Retro',
//     price: 179.99,
//     image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
//     slug: 'nike-air-jordan-1-retro',
//     category: 'Clothing',
//     rating: 4.5,
//     reviewCount: 892,
//     isNew: true,
//     stock: 0,
//     isDemo: true
//   },
//   {
//     _id: '6',
//     name: 'Adidas Ultraboost 22 Running Shoes',
//     price: 189.99,
//     salePrice: 159.99,
//     image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
//     slug: 'adidas-ultraboost-22-running-shoes',
//     category: 'Clothing',
//     rating: 4.4,
//     reviewCount: 567,
//     isOnSale: true,
//     stock: 7,
//     isDemo: true
//   }
// ]

// export default function ProductListing() {
//   const router = useRouter()
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
//   const { addToCart } = useCart()

//   const PRODUCTS_PER_LOAD = 12
//   const [products, setProducts] = useState<Product[]>([])
//   const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [usingDemoData, setUsingDemoData] = useState(false)

//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '' // e.g., https://your-domain.com

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const res = await fetch('/api/products', { method: 'GET' })
//         if (!res.ok) throw new Error(`Failed: ${res.status}`)
//         const data = await res.json()

//         if (!data || data.length === 0) throw new Error('No products found')

//         // ✅ Normalize image URLs
//         const normalized = data.map((p: Product) => ({
//           ...p,
//           image: p.image?.startsWith('http')
//             ? p.image
//             : `${BASE_URL}${p.image?.startsWith('/') ? p.image : '/' + p.image}`
//         }))

//         setProducts(normalized)
//         setUsingDemoData(false)
//       } catch (err: any) {
//         console.warn('⚠️ Fallback to demo data:', err.message)
//         setProducts(dummyProducts)
//         setUsingDemoData(true)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchProducts()
//   }, [])

//   const toggleWishlist = (product: Product) => {
//     isInWishlist(product._id)
//       ? removeFromWishlist(product._id)
//       : addToWishlist(product)
//   }

//   const handleAddToCart = (product: Product) => {
//     addToCart(product)
//     if (product.isDemo || usingDemoData) {
//       alert(`Demo: "${product.name}" added to cart!`)
//     }
//   }

//   const loadMore = () => {
//     setVisibleCount((prev) => Math.min(prev + PRODUCTS_PER_LOAD, products.length))
//   }

//   const handleProductAction = (product: Product) => {
//     router.push(`/products/${product.slug || product._id}`)
//   }

//   if (loading)
//     return (
//       <section className="max-w-8xl mx-auto px-4 py-12">
//         <h2 className="text-3xl font-bold text-yellow-600 text-center mb-6">
//           Loading Products...
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {Array.from({ length: 8 }).map((_, i) => (
//             <div
//               key={i}
//               className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
//             ></div>
//           ))}
//         </div>
//       </section>
//     )

//   return (
//     <section className="max-w-8xl mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl lg:text-4xl font-bold text-yellow-600 dark:text-yellow-400">
//           {usingDemoData ? 'Demo Products' : 'Trending Products'}
//         </h2>
//         {error && (
//           <p className="text-red-500 text-sm mt-2">
//             {error} – showing demo data
//           </p>
//         )}
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {products.slice(0, visibleCount).map((product) => {
//           const isOut = product.stock === 0
//           const price = product.isOnSale ? product.salePrice ?? product.price : product.price
//           const original = product.isOnSale ? product.price : null

//           return (
//             <div
//               key={product._id}
//               className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
//             >
//               <div
//                 className="relative cursor-pointer w-full h-52 bg-gray-50 dark:bg-gray-900 flex items-center justify-center overflow-hidden"
//                 onClick={() => handleProductAction(product)}
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src =
//                       'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop'
//                   }}
//                 />
//                 {isOut && (
//                   <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                     <span className="bg-white text-black px-3 py-1 rounded-lg font-semibold">
//                       Out of Stock
//                     </span>
//                   </div>
//                 )}
//               </div>

//               <div className="p-4 space-y-2">
//                 <h3
//                   className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 hover:text-yellow-600 cursor-pointer"
//                   onClick={() => handleProductAction(product)}
//                 >
//                   {product.name}
//                 </h3>

//                 <div className="flex items-center gap-2">
//                   <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
//                     {price.toFixed(2)} Br
//                   </span>
//                   {original && (
//                     <span className="text-sm text-gray-400 line-through">
//                       {original.toFixed(2)} Br
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={() => handleProductAction(product)}
//                     className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-3 py-2 rounded-lg"
//                   >
//                     <EyeIcon className="w-4 h-4" />
//                     View
//                   </button>

//                   {!isOut && (
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className="flex-1 flex items-center justify-center gap-1 border border-gray-300 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-400 text-gray-700 dark:text-gray-300 hover:text-yellow-500 rounded-lg px-3 py-2"
//                     >
//                       <ShoppingBagIcon className="w-4 h-4" />
//                       Cart
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       {visibleCount < products.length && (
//         <div className="flex justify-center mt-10">
//           <button
//             onClick={loadMore}
//             className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-xl shadow-lg"
//           >
//             Load More ({products.length - visibleCount})
//           </button>
//         </div>
//       )}
//     </section>
//   )
// }
