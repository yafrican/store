'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Package, ShoppingBag, BarChart, Settings, Users, LogOut, 
  Plus, Eye, Edit, Trash2, TrendingUp, DollarSign, 
  CheckCircle, Clock, AlertCircle, Home, ChevronRight,
  Search, Filter, Download, Upload
} from 'lucide-react'

// =========================
// Types
// =========================
interface Product {
  _id: string
  name: string
  price: number
  category: string
  status: 'pending' | 'approved' | 'rejected'
  inStock: boolean
  images: string[]
  description?: string
  createdAt: string
  updatedAt: string
}

interface DashboardStats {
  totalProducts: number
  pendingApproval: number
  activeProducts: number
  outOfStock: number
  totalRevenue: number
  monthlySales: number
}

// =========================
// Professional Sidebar Component
// =========================
function SellerSidebar({ activeSection, setActiveSection }: { 
  activeSection: string
  setActiveSection: (section: string) => void 
}) {
  const [collapsed, setCollapsed] = useState(false)
  
  useEffect(() => {
    const updateCollapsed = () => {
      try {
        if (typeof window !== 'undefined') {
          setCollapsed(window.innerWidth < 640)
        }
      } catch {}
    }
    updateCollapsed()
    window.addEventListener('resize', updateCollapsed)
    return () => window.removeEventListener('resize', updateCollapsed)
  }, [])

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart className="w-5 h-5" /> },
    { id: 'add-product', label: 'Add Product', icon: <Plus className="w-5 h-5" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col ${
        collapsed ? 'w-16' : 'w-80'
      } transition-all duration-300 shadow-lg`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">SellerPro</h1>
                <p className="text-gray-500 text-sm">Dashboard</p>
              </div>
            </motion.div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              activeSection === item.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}>
              {item.icon}
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-sm"
              >
                {item.label}
              </motion.span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </motion.div>
  )
}

// =========================
// Stats Cards Component
// =========================
function StatsCards({ stats }: { stats: DashboardStats }) {
  const statItems = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      change: '+12%',
      trend: 'up',
      icon: <Package className="w-6 h-6" />,
      color: 'blue'
    },
    {
      label: 'Pending Approval',
      value: stats.pendingApproval,
      change: '-3%',
      trend: 'down',
      icon: <Clock className="w-6 h-6" />,
      color: 'amber'
    },
    {
      label: 'Active Products',
      value: stats.activeProducts,
      change: '+8%',
      trend: 'up',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'green'
    },
    {
      label: 'Monthly Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+23%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'purple'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      amber: 'from-amber-500 to-amber-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(item.color)}`}>
              {item.icon}
            </div>
            <span className={`text-sm font-medium ${
              item.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.value}</h3>
          <p className="text-gray-600 text-sm">{item.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

// =========================
// Products Table Component (FIXED WITH SAFETY CHECKS)
// =========================
function ProductsTable({ 
  products, 
  onEdit, 
  onDelete, 
  onStockUpdate 
}: { 
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
  onStockUpdate: (productId: string, inStock: boolean) => void
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // FIXED: Added safety checks to prevent undefined errors
  const filteredProducts = products.filter(product => {
    // Safety check for undefined product
    if (!product) return false
    
    const productName = product.name || ''
    const productCategory = product.category || ''
    
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         productCategory.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || (product.status || 'pending') === statusFilter
    return matchesSearch && matchesStatus
  })

  // FIXED: Handle undefined status
  const getStatusBadge = (status: string | undefined) => {
    const safeStatus = status || 'pending'
    
    const statusConfig = {
      pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: <Clock className="w-3 h-3" /> },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', icon: <CheckCircle className="w-3 h-3" /> },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: <AlertCircle className="w-3 h-3" /> }
    }
    
    const config = statusConfig[safeStatus as keyof typeof statusConfig] || statusConfig.pending
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.icon}
        {safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}
      </span>
    )
  }
console.log('📦 Products in seller dashboard:', products.map(p => ({
  _id: p._id,
  name: p.name,
  status: p.status,
  statusType: typeof p.status
})))
  // FIXED: Handle undefined inStock
  const getStockBadge = (inStock: boolean | undefined) => {
    const safeInStock = inStock ?? true
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
        safeInStock ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
      }`}>
        {safeInStock ? 'In Stock' : 'Out of Stock'}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      {/* Table Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Product Management</h3>
            <p className="text-gray-600 text-sm">Manage your product listings and inventory</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th className="px-3 py-3 sm:px-6 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={product.images?.[0] || '/api/placeholder/40/40'} 
                      alt={product.name || 'Product image'}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name || 'Unnamed Product'}</div>
                      <div className="text-sm text-gray-500">{product.category || 'Uncategorized'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">${product.price || 0}</div>
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                  {getStatusBadge(product.status)}
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                  {getStockBadge(product.inStock)}
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'Unknown date'}
                </td>
                <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onStockUpdate(product._id, !(product.inStock ?? true))}
                      className={`p-2 rounded-lg transition-colors ${
                        (product.inStock ?? true)
                          ? 'text-amber-600 hover:bg-amber-50' 
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      title={(product.inStock ?? true) ? 'Mark Out of Stock' : 'Mark In Stock'}
                    >
                      {(product.inStock ?? true) ? 'Out of Stock' : 'In Stock'}
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}

// =========================
// Main Dashboard Component (FIXED WITH SAFETY CHECKS)
// =========================
export default function ProfessionalSellerDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileError, setProfileError] = useState('')
  const [profile, setProfile] = useState<any>({
    name: '',
    phone: '',
    storeName: '',
    address: '',
    paymentMethod: ''
  })
  
  // Real-time state
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    pendingApproval: 0,
    activeProducts: 0,
    outOfStock: 0,
    totalRevenue: 0,
    monthlySales: 0
  })

  const [products, setProducts] = useState<Product[]>([])

  // Real-time data fetching (FIXED: Added safety checks)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products with credentials
        const productsRes = await fetch('/api/sellers/products', {
          credentials: 'include'
        })
        const productsData = await productsRes.json()
        
        if (productsData.success) {
          // FIXED: Ensure products is always an array
          const safeProducts = Array.isArray(productsData.products) ? productsData.products : []
          setProducts(safeProducts)
          
          // Calculate real-time stats with safety checks
          const totalProducts = safeProducts.length
          const pendingApproval = safeProducts.filter((p: Product) => (p.status || 'pending') === 'pending').length
          const activeProducts = safeProducts.filter((p: Product) => (p.status || 'pending') === 'approved').length
          const outOfStock = safeProducts.filter((p: Product) => !(p.inStock ?? true)).length
          
          setStats(prev => ({
            ...prev,
            totalProducts,
            pendingApproval,
            activeProducts,
            outOfStock
          }))
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
        // FIXED: Set empty array on error
        setProducts([])
      }
    }

    // Initial fetch
    fetchData()

    // Real-time polling every 30 seconds
    const interval = setInterval(fetchData, 30000)

    return () => clearInterval(interval)
  }, [])

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check', { 
          method: 'GET', 
          credentials: 'include' 
        })
        if (!res.ok) throw new Error('Not authenticated')
        const data = await res.json()
        if (data.user?.role !== 'seller') throw new Error('Not a seller')
        setAuthenticated(true)
      } catch (err) {
        router.push('/signin')
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  // Load seller profile when opening Settings
  useEffect(() => {
    const loadProfile = async () => {
      if (activeSection !== 'settings') return
      setProfileLoading(true)
      setProfileError('')
      try {
        const res = await fetch('/api/profile', { credentials: 'include' })
        if (!res.ok) throw new Error(`Failed to load profile (${res.status})`)
        const data = await res.json()
        if (data.success) {
          setProfile({
            name: data.user.name || '',
            phone: data.user.phone || '',
            storeName: data.user.storeName || '',
            address: data.user.address || '',
            paymentMethod: data.user.paymentMethod || ''
          })
        }
      } catch (e: any) {
        setProfileError(e.message || 'Failed to load profile')
      } finally {
        setProfileLoading(false)
      }
    }
    loadProfile()
  }, [activeSection])

  const handleProfileSave = async () => {
    try {
      setProfileSaving(true)
      setProfileError('')
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profile)
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error || `Failed to update profile (${res.status})`)
      }
    } catch (e: any) {
      setProfileError(e.message || 'Failed to update profile')
    } finally {
      setProfileSaving(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    // Navigate to product edit page
    router.push(`/seller/products/${product._id}/edit`)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        const res = await fetch(`/api/sellers/products/${productId}`, {
          method: 'DELETE',
          credentials: 'include'
        })
        
        if (res.ok) {
          setProducts(prev => prev.filter(p => p._id !== productId))
          // Update stats in real-time
          setStats(prev => ({ ...prev, totalProducts: prev.totalProducts - 1 }))
        }
      } catch (error) {
        console.error('Failed to delete product:', error)
      }
    }
  }

  const handleStockUpdate = async (productId: string, inStock: boolean) => {
    try {
      const res = await fetch(`/api/sellers/products/${productId}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock }),
        credentials: 'include'
      })
      
      if (res.ok) {
        setProducts(prev => 
          prev.map(p => p._id === productId ? { ...p, inStock } : p)
        )
        // Update stats in real-time
        setStats(prev => ({
          ...prev,
          outOfStock: inStock ? prev.outOfStock - 1 : prev.outOfStock + 1
        }))
      }
    } catch (error) {
      console.error('Failed to update stock:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Professional Dashboard...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) return null

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {activeSection === 'overview' && 'Dashboard Overview'}
                {activeSection === 'products' && 'Product Management'}
                {activeSection === 'analytics' && 'Sales Analytics'}
                {activeSection === 'add-product' && 'Add New Product'}
                {activeSection === 'customers' && 'Customer Insights'}
                {activeSection === 'settings' && 'Account Settings'}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {activeSection === 'overview' && 'Real-time overview of your business performance'}
                {activeSection === 'products' && 'Manage your product catalog and inventory'}
                {activeSection === 'analytics' && 'Track your sales and performance metrics'}
                {activeSection === 'add-product' && 'Create new product listings'}
                {activeSection === 'customers' && 'View customer insights and behavior'}
                {activeSection === 'settings' && 'Manage your account preferences'}
              </p>
            </div>

            {/* Content Sections */}
            {activeSection === 'overview' && (
              <div>
                <StatsCards stats={stats} />
                <ProductsTable
                  products={products}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onStockUpdate={handleStockUpdate}
                />
              </div>
            )}

            {activeSection === 'products' && (
              <ProductsTable
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onStockUpdate={handleStockUpdate}
              />
            )}

            {activeSection === 'analytics' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <div className="text-center py-8 sm:py-12">
                  <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Coming Soon</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Advanced analytics dashboard with real-time sales data, customer insights, 
                    and performance metrics will be available in the next update.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'add-product' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <div className="text-center py-8 sm:py-12">
                  <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Add New Product</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
                    Create new product listings that will be submitted for admin approval before going live.
                  </p>
                  <button
                    onClick={() => router.push('/seller/products/new')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Create Product
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'settings' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200 max-w-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h3>
                {profileError && (
                  <div className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm">{profileError}</div>
                )}
                {profileLoading ? (
                  <p className="text-gray-500">Loading profile...</p>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Store Name</label>
                      <input
                        value={profile.storeName}
                        onChange={(e) => setProfile((p: any) => ({ ...p, storeName: e.target.value }))}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                          value={profile.name}
                          onChange={(e) => setProfile((p: any) => ({ ...p, name: e.target.value }))}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                          value={profile.phone}
                          onChange={(e) => setProfile((p: any) => ({ ...p, phone: e.target.value }))}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <textarea
                        value={profile.address}
                        onChange={(e) => setProfile((p: any) => ({ ...p, address: e.target.value }))}
                        className="w-full border rounded px-3 py-2"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Payment Method</label>
                      <input
                        value={profile.paymentMethod}
                        onChange={(e) => setProfile((p: any) => ({ ...p, paymentMethod: e.target.value }))}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleProfileSave}
                        disabled={profileSaving}
                        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {profileSaving ? 'Saving...' : 'Save Settings'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}