'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useWishlist } from '../app/contexts/WishlistContext'
import { useCart } from '../app/contexts/CartContext'
import {
  UserIcon,
  ShoppingBagIcon,
  XMarkIcon,
  Bars3Icon,
  TagIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline'
import {
  FaMobileAlt,
  FaTshirt,
  FaGamepad,
  FaHome,
  FaSmile,
  FaFutbol,
  FaBook
} from 'react-icons/fa'

// Updated categories to match the search page structure
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

// Category icons mapping
const categoryIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'Electronics': FaMobileAlt,
  'Clothing': FaTshirt,
  'Toys': FaGamepad,
  'Home & Kitchen': FaHome,
  'Beauty': FaSmile,
  'Sports': FaFutbol,
  'Books': FaBook
}

type Theme = 'light' | 'dark' | 'system'

export default function Navbar() {
  const { wishlistCount } = useWishlist()
  const { cartCount } = useCart() // This should be cartCount, not cartItemsCount
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')

  const trendingProducts = [
    'Smartphones',
    'Wireless Earbuds',
    'Gaming Laptops',
    'Fitness Trackers',
    '4K TVs',
    'Bluetooth Speakers',
    'Smart Watches',
    'Action Figures',
  ]
  
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const settingsRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)
  const themeRef = useRef<HTMLDivElement>(null)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme('system')
      applyTheme(systemTheme)
    }
  }, [])

  // Apply theme to document
  const applyTheme = (selectedTheme: Theme) => {
    const root = document.documentElement
    const actualTheme = selectedTheme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : selectedTheme

    if (actualTheme === 'light') {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    } else {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    }
  }

  // Handle theme change
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    setIsThemeOpen(false)
  }

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch logged-in user from MongoDB
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/check', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        }
      } catch (err) {
        console.error('Auth check failed', err)
      }
    }
    fetchUser()
  }, [])

  // Trending placeholder animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % trendingProducts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false)
      }
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to search page with query parameters
    const searchParams = new URLSearchParams({
      q: searchTerm,
      category: selectedCategory === 'All Categories' ? '' : selectedCategory
    })
    window.location.href = `/search?${searchParams.toString()}`
  }

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName)
    setIsCategoryOpen(false)
    
    // Always navigate to search page when category is selected, even without search term
    const searchParams = new URLSearchParams({
      q: searchTerm || '', // Include current search term or empty
      category: categoryName === 'All Categories' ? '' : categoryName
    })
    window.location.href = `/search?${searchParams.toString()}`
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setUser(null)
      window.location.href = '/'
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  const isSeller = user?.role === 'seller'

  // Function to get display name for selected category
  const getDisplayCategory = (category: string) => {
    return category === 'All Categories' ? 'All' : category
  }

  // Function to get theme icon
  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="w-5 h-5" />
      case 'dark':
        return <MoonIcon className="w-5 h-5" />
      case 'system':
        return <ComputerDesktopIcon className="w-5 h-5" />
      default:
        return <ComputerDesktopIcon className="w-5 h-5" />
    }
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 text-sm py-2 px-4 text-center font-semibold">
        🚚 Free shipping on orders over $50! Limited time offer.
      </div>

      {/* Main Navigation */}
      <nav className={`bg-gray-900 sticky top-0 z-50 select-none transition-all duration-300 ${
        isScrolled ? 'shadow-2xl border-b border-gray-700' : 'shadow-lg'
      }`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main header row */}
          <div className="flex items-center justify-between h-20">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-6 lg:space-x-10">
              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0">
                <div className="relative w-40 lg:w-48 h-10 lg:h-12">
                  <Image
                    src="/logo.png"
                    alt="Yafrican Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                <Link 
                  href="/products" 
                  className="text-gray-300 hover:text-yellow-400 font-medium transition-colors duration-200 relative group text-sm"
                >
                  Products
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-200 group-hover:w-full"></span>
                </Link>
                
                <Link 
                  href="/deals" 
                  className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-200 flex items-center gap-1 bg-yellow-500/10 px-3 py-1 rounded-full text-sm"
                >
                  <span> Hot Deals</span>
                </Link>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-4xl mx-6 lg:mx-8">
              <form onSubmit={handleSearch} className="flex w-full" role="search">
                <div className="flex w-full bg-white rounded-xl border-2 border-gray-600 focus-within:border-yellow-500 focus-within:ring-4 focus-within:ring-yellow-500/20 transition-all duration-300 group hover:border-yellow-400 shadow-lg">
                  {/* Compact Category Dropdown */}
                  <div className="relative flex-shrink-0" ref={categoryRef}>
                    <button
                      type="button"
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      className="flex items-center gap-1 px-3 py-4 text-gray-700 hover:text-gray-900 border-r border-gray-300 transition-colors duration-200 min-w-[120px] justify-center hover:bg-gray-50 rounded-l-xl"
                    >
                      <span className="font-medium text-sm">{getDisplayCategory(selectedCategory)}</span>
                      <ChevronDownIcon className={`w-3 h-3 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isCategoryOpen && (
                      <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 py-2 max-h-96 overflow-y-auto">
                        {categories.map((category) => {
                          const IconComponent = categoryIcons[category]
                          return (
                            <button
                              key={category}
                              type="button"
                              onClick={() => handleCategorySelect(category)}
                              className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center gap-3 ${
                                selectedCategory === category ? 'bg-yellow-50 text-yellow-700 font-medium' : 'text-gray-700'
                              }`}
                            >
                              {IconComponent && (
                                <IconComponent className="w-4 h-4 text-gray-500" />
                              )}
                              <span className="flex-1">{category}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Search Input */}
                  <div className="relative flex-1">
                    <input
                      type="search"
                      aria-label="Search products"
                      placeholder={`Search "${trendingProducts[placeholderIndex]}"...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-4 pr-4 py-4 text-gray-900 bg-transparent focus:outline-none text-lg placeholder-gray-500"
                    />
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="px-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-r-xl transition-colors duration-200 flex items-center gap-2 text-lg hover:shadow-lg"
                  >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-3 lg:space-x-4 flex-shrink-0">
              {/* Theme Toggle */}
              <div className="relative" ref={themeRef}>
                <button
                  onClick={() => setIsThemeOpen(!isThemeOpen)}
                  className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                  aria-label="Theme toggle"
                >
                  {getThemeIcon()}
                </button>

                {isThemeOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-2xl shadow-2xl z-50 py-2 transform transition-all duration-200">
                    <button
                      onClick={() => handleThemeChange('light')}
                      className={`flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-700 transition-colors duration-200 ${
                        theme === 'light' ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <SunIcon className="w-5 h-5" />
                      <span>Light</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange('dark')}
                      className={`flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-700 transition-colors duration-200 ${
                        theme === 'dark' ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <MoonIcon className="w-5 h-5" />
                      <span>Dark</span>
                    </button>
                    <button
                      onClick={() => handleThemeChange('system')}
                      className={`flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-700 transition-colors duration-200 ${
                        theme === 'system' ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <ComputerDesktopIcon className="w-5 h-5" />
                      <span>System</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Wishlist with Counter */}
              <Link
                href="/wishlist"
                className="hidden md:flex items-center gap-1 text-gray-300 hover:text-yellow-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800 relative"
              >
                <HeartIcon className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart with Counter - FIXED */}
              <Link
                href="/cart"
                className="hidden md:flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800 relative"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                <span className="font-medium text-sm">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Sell Button */}
              {!isSeller && (
                <Link
                  href="/sell"
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-yellow-400 text-sm"
                >
                  <TagIcon className="w-5 h-5" />
                  Sell
                </Link>
              )}

              {/* User Account */}
              {user ? (
                <div className="relative" ref={settingsRef}>
                  <button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-xl transition-all duration-200 border border-gray-600">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-gray-900 font-semibold text-sm">
  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
</div>
                      <span className="font-semibold max-w-20 lg:max-w-24 truncate text-sm">{user.name}</span>
                    </div>
                  </button>

                  {isSettingsOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-gray-800 border border-gray-600 rounded-2xl shadow-2xl z-50 py-3 transform transition-all duration-200">
                      <div className="px-4 py-3 border-b border-gray-700 bg-gray-900">
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-sm text-gray-400 capitalize">{user.role}</p>
                      </div>
                      <div className="space-y-1 p-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors duration-200"
                        >
                          <UserIcon className="w-5 h-5" />
                          My Profile
                        </Link>
                        <Link
                          href="/cart"
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors duration-200 relative"
                        >
                          <ShoppingBagIcon className="w-5 h-5" />
                          My Cart
                          {cartCount > 0 && (
                            <span className="absolute right-3 bg-yellow-500 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                              {cartCount}
                            </span>
                          )}
                        </Link>
                        <Link
                          href="/wishlist"
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors duration-200 relative"
                        >
                          <HeartIcon className="w-5 h-5" />
                          My Wishlist
                          {wishlistCount > 0 && (
                            <span className="absolute right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                              {wishlistCount}
                            </span>
                          )}
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors duration-200"
                        >
                          <Cog6ToothIcon className="w-5 h-5" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-3 py-2 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors duration-200"
                        >
                          <ArrowRightOnRectangleIcon className="w-5 h-5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="hidden md:flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 border border-gray-600 hover:border-yellow-400 text-sm"
                >
                  <UserIcon className="w-5 h-5" />
                  Sign In
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                aria-label="Toggle menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-300"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-7 h-7" />
                ) : (
                  <Bars3Icon className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mb-4">
            <form onSubmit={handleSearch} className="flex flex-col gap-2" role="search">
              {/* Category Select for Mobile */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  // Auto-search when category changes on mobile
                  const searchParams = new URLSearchParams({
                    q: searchTerm || '',
                    category: e.target.value === 'All Categories' ? '' : e.target.value
                  })
                  window.location.href = `/search?${searchParams.toString()}`
                }}
                className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-600 rounded-xl focus:outline-none focus:border-yellow-500 text-base"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <div className="relative flex-1 group">
                <input
                  type="search"
                  aria-label="Search products"
                  placeholder={`Search "${trendingProducts[placeholderIndex]}"...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white border-2 border-gray-600 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300 text-base"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </div>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800 border-t border-gray-700 shadow-2xl">
            <div className="px-4 py-6 space-y-6">
              {/* Theme Selector in Mobile Menu */}
              <div className="space-y-2">
                <p className="text-gray-400 text-sm font-medium px-2">Theme</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl border transition-colors duration-200 ${
                      theme === 'light' 
                        ? 'bg-yellow-500 text-gray-900 border-yellow-400' 
                        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    <SunIcon className="w-4 h-4" />
                    <span className="text-sm">Light</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl border transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-yellow-500 text-gray-900 border-yellow-400' 
                        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    <MoonIcon className="w-4 h-4" />
                    <span className="text-sm">Dark</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl border transition-colors duration-200 ${
                      theme === 'system' 
                        ? 'bg-yellow-500 text-gray-900 border-yellow-400' 
                        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    <ComputerDesktopIcon className="w-4 h-4" />
                    <span className="text-sm">System</span>
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Link 
                  href="/products" 
                  className="text-center font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200 py-3 bg-gray-700 rounded-xl hover:bg-gray-600 border border-gray-600"
                >
                  Products
                </Link>
               
              </div>

              {/* User Section */}
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-xl border border-gray-600">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-gray-900 font-semibold text-lg">
  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
</div>
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-gray-400 capitalize">{user.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors duration-200 border border-gray-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserIcon className="w-5 h-5" />
                      My Profile
                    </Link>
                    
                    <Link
                      href="/cart"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors duration-200 border border-gray-600 relative"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ShoppingBagIcon className="w-5 h-5" />
                      My Cart
                      {cartCount > 0 && (
                        <span className="absolute right-4 bg-yellow-500 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {cartCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      href="/wishlist"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors duration-200 border border-gray-600 relative"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <HeartIcon className="w-5 h-5" />
                      My Wishlist
                      {wishlistCount > 0 && (
                        <span className="absolute right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>

                    {!isSeller && (
                      <Link
                        href="/sell"
                        className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 rounded-xl font-semibold transition-all duration-200 shadow-lg justify-center border border-yellow-400"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <TagIcon className="w-5 h-5" />
                        Sell on Yafrican
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-900/30 text-red-400 rounded-xl transition-colors duration-200 border border-red-800"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link
                    href="/signin"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl font-semibold transition-all duration-200 border border-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="w-5 h-5" />
                    Sign In
                  </Link>
                  
                  {!isSeller && (
                    <Link
                      href="/sell"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 rounded-xl font-semibold transition-all duration-200 shadow-lg border border-yellow-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <TagIcon className="w-5 h-5" />
                      Sell on Yafrican
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}