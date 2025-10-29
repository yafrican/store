'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  EyeIcon, 
  HeartIcon, 
  ShoppingBagIcon, 
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useWishlist } from '../contexts/WishlistContext'

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
    _id: '1',
    name: 'iPhone 15 Pro Max - 256GB',
    price: 1299.99,
    salePrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
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
    _id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop',
    slug: 'samsung-galaxy-s24-ultra',
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 892,
    isNew: true,
    stock: 8,
    isDemo: true
  },
  {
    _id: '3',
    name: 'MacBook Pro 16-inch M3',
    price: 2399.99,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop',
    slug: 'macbook-pro-16-inch-m3',
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 567,
    isNew: false,
    stock: 12,
    isDemo: true
  },
  {
    _id: '4',
    name: 'Sony WH-1000XM5 Headphones',
    price: 399.99,
    salePrice: 349.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
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
    _id: '5',
    name: 'Nike Air Jordan 1 Retro',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
    slug: 'nike-air-jordan-1-retro',
    category: 'Clothing',
    rating: 4.5,
    reviewCount: 892,
    isNew: true,
    stock: 0,
    isDemo: true
  },
  {
    _id: '6',
    name: 'Adidas Ultraboost 22 Running Shoes',
    price: 189.99,
    salePrice: 159.99,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
    slug: 'adidas-ultraboost-22-running-shoes',
    category: 'Clothing',
    rating: 4.4,
    reviewCount: 567,
    isNew: false,
    isOnSale: true,
    stock: 7,
    isDemo: true
  },
  {
    _id: '7',
    name: 'Canon EOS R5 Camera',
    price: 3899.99,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop',
    slug: 'canon-eos-r5-camera',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 342,
    isNew: true,
    stock: 5,
    isDemo: true
  },
  {
    _id: '8',
    name: 'PlayStation 5 Console',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop',
    slug: 'playstation-5-console',
    category: 'Electronics',
    rating: 4.9,
    reviewCount: 2156,
    isNew: false,
    stock: 3,
    isDemo: true
  }
]

// Categories for filtering
const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Beauty',
  'Sports',
  'Books',
  'Toys'
]

const priceRanges = [
  { label: 'All Prices', min: 0, max: 10000 },
  { label: 'Under 100 Br', min: 0, max: 100 },
  { label: '100 - 500 Br', min: 100, max: 500 },
  { label: '500 - 1000 Br', min: 500, max: 1000 },
  { label: '1000+ Br', min: 1000, max: 10000 }
]

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'name', label: 'Name: A to Z' }
]

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  // State for search and filters
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [usingDemoData, setUsingDemoData] = useState(false)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [priceRange, setPriceRange] = useState(priceRanges[0])
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  // Get initial search parameters from URL
  useEffect(() => {
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || 'All Categories'
    
    setSearchQuery(query)
    setSelectedCategory(category)
  }, [searchParams])

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('🔄 Fetching products from API...')
        const res = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!res.ok) {
          console.warn(`API returned ${res.status}, using demo data`)
          throw new Error(`Failed to fetch products: ${res.status}`)
        }

        const data = await res.json()
        
        if (data && data.length > 0) {
          console.log(`✅ Loaded ${data.length} real products`)
          setProducts(data)
          setUsingDemoData(false)
        } else {
          console.log('📝 No real products found, using demo data')
          throw new Error('No products found in response')
        }
      } catch (err: any) {
        console.log('🎭 Using demo products due to:', err.message)
        setProducts(dummyProducts)
        setUsingDemoData(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Apply filters whenever dependencies change
  useEffect(() => {
    if (products.length === 0) return

    let filtered = [...products]

    // Apply search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Apply price range filter
    if (priceRange.min !== 0 || priceRange.max !== 10000) {
      filtered = filtered.filter(product => {
        const price = product.isOnSale && product.salePrice ? product.salePrice : product.price
        return price >= priceRange.min && price <= priceRange.max
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.isOnSale ? a.salePrice! : a.price) - (b.isOnSale ? b.salePrice! : b.price)
        case 'price-high':
          return (b.isOnSale ? b.salePrice! : b.price) - (a.isOnSale ? a.salePrice! : a.price)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'relevance':
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, priceRange, sortBy])

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

  const handleProductAction = (product: Product, action: 'view' | 'cart') => {
    if (action === 'view') {
      const productSlug = product.slug || product._id
      router.push(`/products/${productSlug}`)
    } else if (action === 'cart') {
      if (product.isDemo || usingDemoData) {
        alert('This is a demo product. Add to cart functionality will be available with real products.')
      } else {
        alert(`Added ${product.name} to cart!`)
      }
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Categories')
    setPriceRange(priceRanges[0])
    setSortBy('relevance')
  }

  const activeFiltersCount = [
    searchQuery ? 1 : 0,
    selectedCategory !== 'All Categories' ? 1 : 0,
    priceRange.min !== 0 || priceRange.max !== 10000 ? 1 : 0
  ].reduce((a, b) => a + b, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-8xl mx-auto px-4">
          {/* Header Skeleton */}
          <div className="text-center mb-12 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
          </div>

          <div className="flex gap-8">
            {/* Filters Skeleton */}
            <div className="hidden lg:block w-80 space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map(j => (
                      <div key={j} className="h-4 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Products Grid Skeleton */}
            <div className="flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
                    <div className="w-full h-48 bg-gray-300 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-8xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
            Search Results
          </h1>
          
          {searchQuery && (
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Showing results for "<span className="font-semibold text-yellow-600">{searchQuery}</span>"
            </p>
          )}

          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {usingDemoData && ' (Demo Data)'}
            </p>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:border-yellow-500 dark:hover:border-yellow-400 transition-colors"
            >
              <FunnelIcon className="w-5 h-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-yellow-500 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRanges.findIndex(range => range.min === priceRange.min && range.max === priceRange.max)}
                  onChange={(e) => setPriceRange(priceRanges[parseInt(e.target.value)])}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={index}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile Filter Content */}
                  <div className="space-y-6">
                    {/* Search Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Search
                      </label>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price Range
                      </label>
                      <select
                        value={priceRanges.findIndex(range => range.min === priceRange.min && range.max === priceRange.max)}
                        onChange={(e) => setPriceRange(priceRanges[parseInt(e.target.value)])}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                      >
                        {priceRanges.map((range, index) => (
                          <option key={index} value={index}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Apply Filters Button */}
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-3 rounded-xl font-semibold transition-colors"
                    >
                      Apply Filters
                    </button>

                    {/* Clear Filters Button */}
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium transition-colors hover:border-yellow-500 dark:hover:border-yellow-400"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-yellow-600"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'All Categories' && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('All Categories')}
                      className="hover:text-blue-600"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {(priceRange.min !== 0 || priceRange.max !== 10000) && (
                  <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                    Price: {priceRange.label}
                    <button
                      onClick={() => setPriceRange(priceRanges[0])}
                      className="hover:text-green-600"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AdjustmentsHorizontalIcon className="w-16 h-16 text-gray-400" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    No Products Found
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Try adjusting your search criteria or browse all categories.
                  </p>

                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
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
                      {/* Demo Badge for demo products */}
                      {isDemoProduct && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            DEMO
                          </span>
                        </div>
                      )}

                      {/* Badges */}
                      <div className={`absolute top-3 z-10 flex flex-col gap-2 ${isDemoProduct ? 'left-12' : 'left-3'}`}>
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
                        className="absolute top-3 right-3 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                      >
                        {isInWishlistState ? (
                          <HeartSolidIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <HeartIcon className="w-5 h-5 text-gray-400 hover:text-red-500" />
                        )}
                      </button>

                      {/* Product Image */}
                      <div 
                        className="w-full h-48 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-t-2xl relative cursor-pointer"
                        onClick={() => handleProductAction(product, 'view')}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop&auto=format'
                          }}
                        />
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
                            <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-semibold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                          {/* Category */}
                          {product.category && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                              {product.category}
                            </span>
                          )}

                          {/* Product Name */}
                          <h3 
                            className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-tight group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors cursor-pointer"
                            onClick={() => handleProductAction(product, 'view')}
                          >
                            {product.name}
                          </h3>

                          {/* Rating */}
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <div className="flex text-yellow-400">
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
                        <div className="mt-4 space-y-2">
                          <button
                            onClick={() => handleProductAction(product, 'view')}
                            className="w-full inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-gray-900 text-sm px-4 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-semibold group/btn"
                          >
                            <EyeIcon className="w-4 h-4" />
                            {isDemoProduct ? 'View Demo' : 'View Details'}
                          </button>
                          
                          {!isOutOfStock && (
                            <button 
                              className="w-full inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-yellow-500 dark:hover:border-yellow-400 text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 text-sm px-4 py-2 rounded-xl transition-all duration-200 font-medium group/cart"
                              onClick={() => handleProductAction(product, 'cart')}
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}