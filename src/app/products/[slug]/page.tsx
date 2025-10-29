'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  PhoneIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  ShoppingCartIcon,
  StarIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'

// Unified Product type that matches both contexts
type Product = {
  _id: string
  name: string
  description?: string
  price: number
  images: string[]
  slug: string
  category?: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isOnSale?: boolean
  salePrice?: number
  stock?: number
  specifications?: Record<string, string>
  brand?: string
  sku?: string
  isDemo?: boolean
  // Compatibility fields for contexts
  image?: string
}

// Dummy data with correct slugs and compatibility fields
const dummyProducts: Product[] = [
  {
    _id: '1',
    name: 'iPhone 15 Pro Max - 256GB',
    description: 'The most powerful iPhone ever with Titanium design, A17 Pro chip, and advanced camera system. Experience the future of smartphone technology with revolutionary features and unparalleled performance.',
    price: 1299.99,
    salePrice: 1199.99,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=800&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop',
    slug: 'iphone-15-pro-max-256gb',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 1247,
    isNew: true,
    isOnSale: true,
    stock: 15,
    brand: 'Apple',
    sku: 'APL-IP15PM-256',
    isDemo: true,
    specifications: {
      'Display': '6.7-inch Super Retina XDR',
      'Chip': 'A17 Pro chip',
      'Storage': '256GB',
      'Camera': '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      'Battery': 'Up to 29 hours video playback',
      'Connectivity': '5G, Wi-Fi 6E, Bluetooth 5.3'
    }
  },
  {
    _id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'The ultimate smartphone with AI capabilities, stunning display, and professional-grade camera system. Experience the next level of mobile innovation with cutting-edge technology.',
    price: 1199.99,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop',
    slug: 'samsung-galaxy-s24-ultra',
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 892,
    isNew: true,
    stock: 8,
    brand: 'Samsung',
    sku: 'SAM-S24U-256',
    isDemo: true,
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Chip': 'Snapdragon 8 Gen 3',
      'Storage': '256GB',
      'Camera': '200MP Main, 50MP Telephoto, 12MP Ultra Wide',
      'Battery': '5000mAh',
      'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.3'
    }
  },
  {
    _id: '3',
    name: 'MacBook Pro 16-inch M3',
    description: 'The most powerful MacBook Pro ever with M3 chip, stunning Liquid Retina XDR display, and all-day battery life. Perfect for professionals and creatives.',
    price: 2399.99,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop',
    slug: 'macbook-pro-16-inch-m3',
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 567,
    isNew: false,
    stock: 12,
    brand: 'Apple',
    sku: 'APL-MBP16-M3',
    isDemo: true,
    specifications: {
      'Display': '16.2-inch Liquid Retina XDR',
      'Chip': 'Apple M3 Pro',
      'Memory': '18GB Unified Memory',
      'Storage': '512GB SSD',
      'Battery': 'Up to 22 hours',
      'Ports': 'Three Thunderbolt 4 ports, HDMI, SDXC card slot'
    }
  },
  {
    _id: '4',
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation with 30-hour battery life and exceptional sound quality. The ultimate wireless headphones for music lovers.',
    price: 399.99,
    salePrice: 349.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
    slug: 'sony-wh-1000xm5-headphones',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 2341,
    isNew: false,
    isOnSale: true,
    stock: 25,
    brand: 'Sony',
    sku: 'SON-WH1000XM5',
    isDemo: true,
    specifications: {
      'Noise Canceling': 'Industry-leading noise cancellation',
      'Battery Life': 'Up to 30 hours',
      'Quick Charge': '3 minutes charge for 3 hours playback',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.2, NFC',
      'Voice Assistant': 'Google Assistant & Amazon Alexa'
    }
  },
  {
    _id: '5',
    name: 'Nike Air Jordan 1 Retro',
    description: 'Classic basketball sneakers with modern comfort technology. The iconic design that started it all, now with improved cushioning and durability.',
    price: 179.99,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
    slug: 'nike-air-jordan-1-retro',
    category: 'Clothing',
    rating: 4.5,
    reviewCount: 892,
    isNew: true,
    stock: 0,
    brand: 'Nike',
    sku: 'NIKE-AJ1-RETRO',
    isDemo: true,
    specifications: {
      'Material': 'Premium leather and synthetic',
      'Closure': 'Lace-up',
      'Style': 'High-top',
      'Color': 'Black/Red',
      'Fit': 'True to size',
      'Care': 'Wipe with damp cloth'
    }
  },
  {
    _id: '6',
    name: 'Adidas Ultraboost 22 Running Shoes',
    description: 'High-performance running shoes with Boost™ technology for maximum energy return. Perfect for long-distance runners and daily training.',
    price: 189.99,
    salePrice: 159.99,
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'
    ],
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
    slug: 'adidas-ultraboost-22-running-shoes',
    category: 'Clothing',
    rating: 4.4,
    reviewCount: 567,
    isNew: false,
    isOnSale: true,
    stock: 7,
    brand: 'Adidas',
    sku: 'ADID-UB22-RUN',
    isDemo: true,
    specifications: {
      'Technology': 'Boost™ midsole, Primeknit upper',
      'Drop': '10mm',
      'Weight': '310g (size 9)',
      'Fit': 'Regular',
      'Surface': 'Road running',
      'Sustainability': 'Made with recycled materials'
    }
  }
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist: checkWishlist } = useWishlist()
  
  const productSlug = params.slug as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [phone, setPhone] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [dataSource, setDataSource] = useState<'real' | 'demo' | 'unknown'>('unknown')

  const isInWishlist = product ? checkWishlist(product._id) : false

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

  // Product conversion functions for context compatibility
  const getCartProduct = (product: Product) => ({
    _id: product._id,
    name: product.name,
    price: product.price,
    salePrice: product.salePrice,
    image: product.images?.[0] || product.image || '',
    stock: product.stock || 10,
    category: product.category || 'General',
    isDemo: product.isDemo
  })

  const getWishlistProduct = (product: Product) => ({
    _id: product._id,
    name: product.name,
    price: product.price,
    image: product.images?.[0] || product.image || '',
    slug: product.slug,
    category: product.category,
    rating: product.rating,
    reviewCount: product.reviewCount,
    isNew: product.isNew,
    isOnSale: product.isOnSale,
    salePrice: product.salePrice,
    stock: product.stock,
    isDemo: product.isDemo
  })

  useEffect(() => {
    console.log('🔍 URL Parameters:', params)
    console.log('🔍 Extracted product identifier:', productSlug)

    if (!productSlug) {
      setError('No product specified in URL')
      setLoading(false)
      return
    }

    async function fetchProduct() {
      try {
        setLoading(true)
        setError('')
        
        // Use the unified API route that handles both IDs and slugs
        console.log('🌐 Fetching product from API...')
        const res = await fetch(`/api/products/${productSlug}`)
        
        if (res.ok) {
          const data = await res.json()
          console.log('✅ Real product data loaded:', data.name)
          
          // Ensure the product has the required fields for contexts
          const processedProduct: Product = {
            ...data,
            image: data.images?.[0] || '', // Add image field for WishlistContext
          }
          
          setProduct(processedProduct)
          setDataSource('real')
        } else {
          throw new Error(`Product not found (${res.status})`)
        }
      } catch (err: any) {
        console.log('❌ API failed, checking demo data...', err.message)
        
        // Fallback to demo data
        const demoProduct = dummyProducts.find(p => 
          p.slug === productSlug || 
          p._id === productSlug
        )
        
        if (demoProduct) {
          console.log('🎭 Demo product successfully loaded:', demoProduct.name)
          setProduct(demoProduct)
          setDataSource('demo')
          setError('')
        } else {
          console.log('❌ Product not found in demo data')
          setError(`Product "${productSlug}" not found.`)
          setDataSource('unknown')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productSlug, params])

  // Debug info
  useEffect(() => {
    if (product) {
      console.log('📦 Current product state:', { 
        name: product.name, 
        slug: product.slug,
        dataSource,
        loading 
      })
    }
  }, [product, dataSource, loading])

  // ✅ Fixed cart integration with proper type conversion
  const handleAddToCart = () => {
    if (!product) return
    
    if (isDemoProduct) {
      alert(`Demo: "${product.name}" would be added to cart in a real application.`)
    } else {
      const cartProduct = getCartProduct(product)
      addToCart(cartProduct)
      alert(`Added ${quantity} ${product.name} to cart!`)
    }
  }

  // ✅ Fixed wishlist integration with proper type conversion
  const handleWishlistToggle = () => {
    if (!product) return
    
    if (isInWishlist) {
      removeFromWishlist(product._id)
      alert('Removed from wishlist!')
    } else {
      const wishlistProduct = getWishlistProduct(product)
      addToWishlist(wishlistProduct)
      alert('Added to wishlist!')
    }
  }

  const handleOrderAction = () => {
    if (isDemoProduct) {
      alert(`Demo: Order for "${product?.name}" would be processed in a real application.`)
    } else {
      alert(`Order placed for ${product?.name}! We'll contact you at ${phone}.`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-8xl mx-auto px-4">
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-8xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
              <p className="text-red-600 mb-6">{error}</p>
              <p className="text-sm text-gray-600 mb-4">Available demo products:</p>
              <ul className="text-sm text-gray-600 mb-6 space-y-1">
                {dummyProducts.map(p => (
                  <li key={p._id}>
                    • {p.name} (<code className="text-xs">/products/{p.slug}</code>)
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-colors"
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
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-8xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
              <p className="text-red-600 mb-6">The product you're looking for doesn't exist.</p>
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-colors"
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

  const displayPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price
  const isOutOfStock = product.stock === 0
  const isDemoProduct = dataSource === 'demo' || product.isDemo

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-8xl mx-auto px-4">
        {/* Debug info - remove in production */}
        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs">
          <div>Debug: Slug = {productSlug}</div>
          <div>Product: {product?.name}</div>
          <div>DataSource: {dataSource}</div>
        </div>

        {/* Data Source Indicator */}
        {dataSource === 'demo' && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">i</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-blue-800">Demo Product Showcase</span>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    SAMPLE
                  </span>
                </div>
                <p className="text-blue-700 text-sm">
                  This is a sample product demonstrating our platform's features. All product details, images, and specifications are for demonstration purposes.
                </p>
              </div>
            </div>
          </div>
        )}

        {dataSource === 'real' && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">Live Product Data</span>
              <span className="text-sm">Connected to database</span>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Products
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Image Gallery */}
          <div className="flex-1">
            {/* Main Image */}
            <div className="w-full h-96 lg:h-[500px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden flex justify-center items-center mb-4 border border-gray-200 dark:border-gray-700">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="object-contain h-full w-full transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=800&fit=crop&auto=format'
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
                    className={`flex-shrink-0 w-20 h-20 border-2 rounded-xl overflow-hidden transition-all ${
                      selectedImage === idx 
                        ? 'border-yellow-500 shadow-lg' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-yellow-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&auto=format'
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
            <div className="space-y-3">
              {product.category && (
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                  {product.category}
                </span>
              )}
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
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
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {displayPrice.toFixed(2)} Br
                </span>
                {product.isOnSale && product.salePrice && (
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    {product.price.toFixed(2)} Br
                  </span>
                )}
              </div>
              {product.isOnSale && (
                <div className="text-green-600 dark:text-green-400 font-semibold">
                  Save {(product.price - product.salePrice!).toFixed(2)} Br!
                </div>
              )}
            </div>

            {/* Stock Status */}
            {product.stock !== undefined && (
              <div className={`text-sm font-medium ${
                product.stock === 0 
                  ? 'text-red-600' 
                  : product.stock < 10 
                    ? 'text-orange-600' 
                    : 'text-green-600'
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
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              {!isOutOfStock && (
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300 dark:border-gray-600">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {!isOutOfStock ? (
                  <>
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                      {isDemoProduct ? 'Add to Cart (Demo)' : `Add to Cart - ${(displayPrice * quantity).toFixed(2)} Br`}
                    </button>
                    
                    <button
                      onClick={handleWishlistToggle}
                      className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-400 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 px-6 py-3 rounded-xl transition-all duration-200 font-medium"
                    >
                      {isInWishlist ? (
                        <HeartSolidIcon className="w-5 h-5 text-red-500" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      {isDemoProduct ? 'Wishlist (Demo)' : 'Wishlist'}
                    </button>
                  </>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center">
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      This product is currently out of stock
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <TruckIcon className="w-5 h-5 text-green-500" />
                <span>Free shipping on orders over 50 Br</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <ShieldCheckIcon className="w-5 h-5 text-blue-500" />
                <span>2-year warranty included</span>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {isDemoProduct ? 'Demo Order Methods' : 'Order Directly'}
              </h3>
              
              {/* Call Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  onClick={handleOrderAction}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl transition-colors font-semibold"
                >
                  <PhoneIcon className="w-5 h-5" />
                  {isDemoProduct ? 'Call (Demo)' : 'Call 0912 61 08 50'}
                </button>
                <button
                  onClick={handleOrderAction}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl transition-colors font-semibold"
                >
                  <PhoneIcon className="w-5 h-5" />
                  {isDemoProduct ? 'Call (Demo)' : 'Call 0929 92 22 89'}
                </button>
              </div>

              {/* Messaging Apps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    if (isDemoProduct) {
                      handleOrderAction()
                    } else {
                      if (!phone) {
                        alert('Please enter your phone number first')
                        return
                      }
                      window.open(shareOnTelegram(product, phone, quantity, displayPrice), '_blank')
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl transition-colors font-semibold"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  {isDemoProduct ? 'Telegram (Demo)' : 'Order on Telegram'}
                </button>
                <button
                  onClick={() => {
                    if (isDemoProduct) {
                      handleOrderAction()
                    } else {
                      if (!phone) {
                        alert('Please enter your phone number first')
                        return
                      }
                      window.open(shareOnWhatsApp(product, phone, quantity, displayPrice), '_blank')
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl transition-colors font-semibold"
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                  {isDemoProduct ? 'WhatsApp (Demo)' : 'Order on WhatsApp'}
                </button>
              </div>

              {/* Phone Order Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleOrderAction()
                }}
                className="mt-4 flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-colors whitespace-nowrap"
                >
                  {isDemoProduct ? 'Demo Order' : 'Order by Phone'}
                </button>
              </form>

              {/* Checkout Button for Real Products */}
              {!isDemoProduct && dataSource === 'real' && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      // Add to cart first, then redirect to checkout
                      const cartProduct = getCartProduct(product)
                      addToCart(cartProduct)
                      router.push('/checkout')
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-colors text-lg shadow-lg hover:shadow-xl"
                  >
                    🛒 Proceed to Secure Checkout
                  </button>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                    Secure payment • Multiple payment options • Fast delivery
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Product Info Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8">
              {['description', 'specifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-yellow-500 text-yellow-600 dark:text-yellow-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
                {isDemoProduct && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      <strong>Demo Content:</strong> This product description showcases how real products will appear on our platform.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && product.specifications && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="font-medium text-gray-600 dark:text-gray-400">{key}</span>
                    <span className="text-gray-900 dark:text-white">{value}</span>
                  </div>
                ))}
                {isDemoProduct && (
                  <div className="col-span-2 mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      <strong>Demo Specifications:</strong> These specifications demonstrate the level of detail available for products on our platform.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}