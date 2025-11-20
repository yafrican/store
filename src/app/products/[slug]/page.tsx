
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
  brand?: string
  identifier?: string // Add this
}
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

  // Fetch related products when product loads
  useEffect(() => {
    if (product) {
      fetchRelatedProducts()
    }
  }, [product])

  // Function to fetch related products
 // In your fetchRelatedProducts function, add this:
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
      console.log('📦 Related products data:', data.products) // Debug log
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

  // Related Products Component
 // In your ProductDetailPage component, update the RelatedProductsSection:

const RelatedProductsSection = () => {
  if (relatedLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Related Products
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

        {/* Related Products Section */}
        <RelatedProductsSection />
      </div>
    </div>
  )
}