// src/app/admin/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Package, ShoppingBag, BarChart, Settings, LogOut,
  CheckCircle, XCircle, Eye, Edit, Trash2, TrendingUp,
  DollarSign, ShoppingCart, UserCheck, AlertCircle,
  Home, ChevronRight, Search, Filter, Download, Plus,
  Mail, Phone
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
  description: string
  sellerId: {
    _id: string
    storeName: string
    email: string
    phone: string
  }
  createdAt: string
  updatedAt: string
}

interface User {
  _id: string
  name: string
  email: string
  role: 'admin' | 'seller' | 'customer'
  status: 'active' | 'suspended'
  createdAt: string
  storeName?: string
  totalProducts?: number
  phone?: string
}

interface DashboardStats {
  totalUsers: number
  totalSellers: number
  totalProducts: number
  pendingApprovals: number
  totalRevenue: number
  monthlySales: number
}

// =========================
// Professional Sidebar Component
// =========================
function AdminSidebar({ 
  activeSection, 
  setActiveSection,
  onLogout 
}: {
  activeSection: string
  setActiveSection: (section: string) => void
  onLogout: () => void
}) {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'products', label: 'Product Management', icon: <Package className="w-5 h-5" /> },
    { id: 'sellers', label: 'Seller Management', icon: <Users className="w-5 h-5" /> },
    { id: 'users', label: 'User Management', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ]

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`bg-gray-900 text-white h-screen sticky top-0 flex flex-col ${
        collapsed ? 'w-20' : 'w-80'
      } transition-all duration-300 shadow-xl`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-white text-lg">AdminPro</h1>
                <p className="text-gray-400 text-sm">Dashboard</p>
              </div>
            </motion.div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
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
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              activeSection === item.id ? 'bg-blue-500' : 'bg-gray-700'
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
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-900 hover:text-red-300 rounded-xl transition-colors"
        >
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
      label: 'Total Users',
      value: stats.totalUsers,
      change: '+12%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'blue'
    },
    {
      label: 'Total Sellers',
      value: stats.totalSellers,
      change: '+8%',
      trend: 'up',
      icon: <UserCheck className="w-6 h-6" />,
      color: 'green'
    },
    {
      label: 'Pending Approvals',
      value: stats.pendingApprovals,
      change: '+5',
      trend: 'up',
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'amber'
    },
    {
      label: 'Total Revenue',
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
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(item.color)} text-white shadow-lg`}>
              {item.icon}
            </div>
            <span className={`text-sm font-semibold ${
              item.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.value}</h3>
          <p className="text-gray-600 text-sm font-medium">{item.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

// =========================
// Product Management Table Component
// =========================
function ProductManagementTable({ 
  products, 
  onApprove, 
  onReject,
  onDelete,
  onView 
}: { 
  products: Product[]
  onApprove: (productId: string) => void
  onReject: (productId: string) => void
  onDelete: (productId: string) => void
  onView: (product: Product) => void
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredProducts = products.filter(product => {
    if (!product) return false
    
    const productName = product.name || ''
    const storeName = product.sellerId?.storeName || ''
    
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         storeName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string | undefined) => {
    const safeStatus = status || 'pending'
    const statusConfig = {
      pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: <AlertCircle className="w-3 h-3" /> },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', icon: <CheckCircle className="w-3 h-3" /> },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: <XCircle className="w-3 h-3" /> }
    }
    
    const config = statusConfig[safeStatus as keyof typeof statusConfig] || statusConfig.pending
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.icon}
        {safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}
      </span>
    )
  }

  const handleBulkDeleteRejected = () => {
    const rejectedProducts = filteredProducts.filter(p => p.status === 'rejected')
    if (rejectedProducts.length > 0) {
      if (confirm(`Are you sure you want to permanently delete all ${rejectedProducts.length} rejected products? This action cannot be undone.`)) {
        rejectedProducts.forEach(product => {
          onDelete(product._id)
        })
      }
    } else {
      alert('No rejected products found to delete.')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Product Management</h3>
            <p className="text-gray-600 text-sm">Review and manage all products on the platform</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products or sellers..."
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
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={handleBulkDeleteRejected}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clean Rejected
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Seller</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={product.images?.[0] || '/api/placeholder/40/40'} 
                      alt={product.name || 'Product image'}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name || 'Unnamed Product'}</div>
                      <div className="text-sm text-gray-500">{product.category || 'Uncategorized'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.sellerId?.storeName || 'N/A'}</div>
                  <div className="text-sm text-gray-500">{product.sellerId?.email || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">${product.price || 0}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(product.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Unknown date'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {(product.status === 'pending' || !product.status) && (
                      <>
                        <button
                          onClick={() => onApprove(product._id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve Product"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onReject(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Reject Product"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onDelete(product._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Product Permanently"
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
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Summary */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Showing {filteredProducts.length} of {products.length} products</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              Pending: {products.filter(p => p.status === 'pending').length}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Approved: {products.filter(p => p.status === 'approved').length}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Rejected: {products.filter(p => p.status === 'rejected').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// =========================
// User Management Table Component
// =========================
function UserManagementTable({ 
  users, 
  onSuspend, 
  onActivate,
  onDelete 
}: { 
  users: User[]
  onSuspend: (userId: string) => void
  onActivate: (userId: string) => void
  onDelete: (userId: string) => void
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const filteredUsers = users.filter(user => {
    if (!user) return false
    
    const userName = user.name || 'Unknown User'
    const userEmail = user.email || 'No email'
    
    const matchesSearch = userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         userEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleBadge = (role: string | undefined) => {
    const safeRole = role || 'customer'
    const roleConfig = {
      admin: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Admin' },
      seller: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Seller' },
      customer: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Customer' }
    }
    
    const config = roleConfig[safeRole as keyof typeof roleConfig] || roleConfig.customer
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const getStatusBadge = (status: string | undefined) => {
    const safeStatus = status || 'active'
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
        safeStatus === 'active' 
          ? 'bg-green-100 text-green-800 border-green-200' 
          : 'bg-red-100 text-red-800 border-red-200'
      }`}>
        {safeStatus === 'active' ? 'Active' : 'Suspended'}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
            <p className="text-gray-600 text-sm">Manage all user accounts and access levels</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {(user.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name || 'Unknown User'}</div>
                      <div className="text-sm text-gray-500">{user.email || 'No email'}</div>
                      {user.storeName && (
                        <div className="text-xs text-gray-400">{user.storeName}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getRoleBadge(user.role)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(user.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.role === 'seller' ? (user.totalProducts || 0) : '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown date'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {(user.status === 'active' || !user.status) ? (
                      <button
                        onClick={() => onSuspend(user._id)}
                        className="px-3 py-1 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors text-sm font-medium"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => onActivate(user._id)}
                        className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm font-medium"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(user._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete User"
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
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}

// =========================
// Seller Management Table Component
// =========================
function SellerManagementTable({ 
  sellers, 
  onSuspend, 
  onActivate,
  onDelete 
}: { 
  sellers: User[]
  onSuspend: (sellerId: string) => void
  onActivate: (sellerId: string) => void
  onDelete: (sellerId: string) => void
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredSellers = sellers.filter(seller => {
    if (!seller) return false
    
    const storeName = seller.storeName || ''
    const sellerName = seller.name || ''
    const sellerEmail = seller.email || ''
    
    const matchesSearch = storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sellerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || seller.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string | undefined) => {
    const safeStatus = status || 'active'
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
        safeStatus === 'active' 
          ? 'bg-green-100 text-green-800 border-green-200' 
          : 'bg-red-100 text-red-800 border-red-200'
      }`}>
        {safeStatus === 'active' ? 'Active' : 'Suspended'}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Seller Management</h3>
            <p className="text-gray-600 text-sm">Manage seller accounts and stores</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sellers..."
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
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Store</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Seller</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSellers.map((seller) => (
              <tr key={seller._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {seller.storeName || 'No Store Name'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{seller.name || 'Unknown'}</div>
                  <div className="text-sm text-gray-500">{seller.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{seller.email}</div>
                  <div className="text-sm text-gray-500">{seller.phone || 'No phone'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(seller.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 text-center">
                    {seller.totalProducts || 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => window.open(`mailto:${seller.email}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Email Seller"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    {seller.phone && (
                      <button
                        onClick={() => window.open(`tel:${seller.phone}`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Call Seller"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                    )}
                    {(seller.status === 'active' || !seller.status) ? (
                      <button
                        onClick={() => onSuspend(seller._id)}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Suspend Seller"
                      >
                        <AlertCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onActivate(seller._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Activate Seller"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(seller._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Seller"
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
      {filteredSellers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sellers found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Summary */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Showing {filteredSellers.length} of {sellers.length} sellers</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Active: {sellers.filter(s => s.status === 'active').length}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Suspended: {sellers.filter(s => s.status === 'suspended').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// =========================
// Main Admin Dashboard Component
// =========================
export default function ProfessionalAdminDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [flash, setFlash] = useState('')
  
  // State for data
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    pendingApprovals: 0,
    totalRevenue: 0,
    monthlySales: 0
  })

  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [sellers, setSellers] = useState<User[]>([])

  // Check authentication and fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user is authenticated and is admin
        const authRes = await fetch('/api/auth/check')
        const authData = await authRes.json()
        
        if (!authData.loggedIn || authData.user.role !== 'admin') {
          router.push('/admin/login')
          return
        }
        
        setUser(authData.user)

        // Fetch dashboard stats
        const statsRes = await fetch('/api/admin/dashboard')
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          console.log('📊 Stats data:', statsData)
          setStats(statsData.stats || {
            totalUsers: 0,
            totalSellers: 0,
            totalProducts: 0,
            pendingApprovals: 0,
            totalRevenue: 0,
            monthlySales: 0
          })
        } else {
          console.error('❌ Failed to fetch stats')
        }

        // Fetch products for approval
        const productsRes = await fetch('/api/admin/products?status=all&limit=100')
        if (productsRes.ok) {
          const productsData = await productsRes.json()
          console.log('📦 Products data:', productsData)
          const safeProducts = Array.isArray(productsData.products) ? productsData.products : []
          setProducts(safeProducts)
        } else {
          console.error('❌ Failed to fetch products')
          setProducts([])
        }

        // Fetch users
        const usersRes = await fetch('/api/admin/users?limit=50')
        if (usersRes.ok) {
          const usersData = await usersRes.json()
          console.log('👥 Users data:', usersData)
          const safeUsers = Array.isArray(usersData.users) ? usersData.users : []
          setUsers(safeUsers)
        } else {
          console.error('❌ Failed to fetch users')
          setUsers([])
        }

        // Fetch sellers when sellers section is active
        if (activeSection === 'sellers') {
          const sellersRes = await fetch('/api/admin/users?role=seller&limit=100')
          if (sellersRes.ok) {
            const sellersData = await sellersRes.json()
            console.log('👨‍💼 Sellers data:', sellersData)
            const safeSellers = Array.isArray(sellersData.users) ? sellersData.users : []
            setSellers(safeSellers)
          } else {
            console.error('❌ Failed to fetch sellers')
            setSellers([])
          }
        }

      } catch (error) {
        console.error('❌ Failed to fetch data:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router, activeSection])

  // Handle flash message from actions (approved, rejected, deleted)
  useEffect(() => {
    const msg = searchParams?.get('msg') || ''
    if (msg) {
      setFlash(msg)
      const t = setTimeout(() => setFlash(''), 3000)
      return () => clearTimeout(t)
    }
  }, [searchParams])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleApproveProduct = async (productId: string) => {
    try {
      console.log('🔄 Approving product:', productId)
      
      const response = await fetch(`/api/admin/products/${productId}/approve`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log('✅ Product approved successfully:', result)
        
        // Refresh products data
        await refreshProducts()
        
        alert('Product approved successfully!')
      } else {
        const error = await response.json()
        console.error('❌ Failed to approve product:', error)
        alert(error.error || 'Failed to approve product')
      }
    } catch (error) {
      console.error('❌ Failed to approve product:', error)
      alert('Failed to approve product')
    }
  }

  const handleRejectProduct = async (productId: string) => {
    try {
      console.log('🔄 Rejecting product:', productId)
      
      const response = await fetch(`/api/admin/products/${productId}/reject`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log('✅ Product rejected successfully:', result)
        
        // Refresh products data
        await refreshProducts()
        
        alert('Product rejected successfully!')
      } else {
        const error = await response.json()
        console.error('❌ Failed to reject product:', error)
        alert(error.error || 'Failed to reject product')
      }
    } catch (error) {
      console.error('❌ Failed to reject product:', error)
      alert('Failed to reject product')
    }
  }

  // Add refresh function
  const refreshProducts = async () => {
    try {
      console.log('🔄 Refreshing products data...')
      const productsRes = await fetch('/api/admin/products?status=all&limit=100')
      if (productsRes.ok) {
        const productsData = await productsRes.json()
        console.log('✅ Products refreshed:', productsData.products.length)
        const safeProducts: Product[] = Array.isArray(productsData.products) ? productsData.products : []
        setProducts(safeProducts)
        
        // Update stats
        setStats(prev => ({
          ...prev,
          pendingApprovals: safeProducts.filter((p: Product) => p.status === 'pending').length,
          totalProducts: safeProducts.length
        }))
      }
    } catch (error) {
      console.error('❌ Failed to refresh products:', error)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('⚠️ WARNING: This will permanently delete this product and all its data. This action cannot be undone. Are you sure you want to proceed?')) {
      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          const result = await response.json()
          
          // Remove product from state
          setProducts(prev => prev.filter(p => p._id !== productId))
          
          // Update stats
          const deletedProduct = products.find(p => p._id === productId)
          setStats(prev => ({
            ...prev,
            totalProducts: prev.totalProducts - 1,
            pendingApprovals: deletedProduct?.status === 'pending' 
              ? prev.pendingApprovals - 1 
              : prev.pendingApprovals
          }))
          
          console.log('✅ Product deleted successfully:', result)
        } else {
          const error = await response.json()
          console.error('❌ Failed to delete product:', error)
          alert(error.error || 'Failed to delete product')
        }
      } catch (error) {
        console.error('❌ Failed to delete product:', error)
        alert('Failed to delete product')
      }
    }
  }

  const handleViewProduct = (product: Product) => {
    router.push(`/admin/products/${product._id}`)
  }

  const handleSuspendUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        setUsers(prev => prev.map(u => 
          u._id === userId ? { ...u, status: 'suspended' } : u
        ))
        setSellers(prev => prev.map(s => 
          s._id === userId ? { ...s, status: 'suspended' } : s
        ))
        alert('User suspended successfully!')
      } else {
        const error = await response.json()
        console.error('❌ Failed to suspend user:', error)
        alert(error.error || 'Failed to suspend user')
      }
    } catch (error) {
      console.error('❌ Failed to suspend user:', error)
      alert('Failed to suspend user')
    }
  }

  const handleActivateUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/activate`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        setUsers(prev => prev.map(u => 
          u._id === userId ? { ...u, status: 'active' } : u
        ))
        setSellers(prev => prev.map(s => 
          s._id === userId ? { ...s, status: 'active' } : s
        ))
        alert('User activated successfully!')
      } else {
        const error = await response.json()
        console.error('❌ Failed to activate user:', error)
        alert(error.error || 'Failed to activate user')
      }
    } catch (error) {
      console.error('❌ Failed to activate user:', error)
      alert('Failed to activate user')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          setUsers(prev => prev.filter(u => u._id !== userId))
          setSellers(prev => prev.filter(s => s._id !== userId))
          alert('User deleted successfully!')
        } else {
          const error = await response.json()
          console.error('❌ Failed to delete user:', error)
          alert(error.error || 'Failed to delete user')
        }
      } catch (error) {
        console.error('❌ Failed to delete user:', error)
        alert('Failed to delete user')
      }
    }
  }

  // Seller Management Functions
  const suspendSeller = async (sellerId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${sellerId}/suspend`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        setSellers(prev => prev.map(seller => 
          seller._id === sellerId ? { ...seller, status: 'suspended' } : seller
        ))
        alert('Seller suspended successfully!')
      } else {
        const error = await response.json()
        console.error('❌ Failed to suspend seller:', error)
        alert(error.error || 'Failed to suspend seller')
      }
    } catch (error) {
      console.error('❌ Failed to suspend seller:', error)
      alert('Failed to suspend seller')
    }
  }

  const activateSeller = async (sellerId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${sellerId}/activate`, {
        method: 'PATCH'
      })
      
      if (response.ok) {
        setSellers(prev => prev.map(seller => 
          seller._id === sellerId ? { ...seller, status: 'active' } : seller
        ))
        alert('Seller activated successfully!')
      } else {
        const error = await response.json()
        console.error('❌ Failed to activate seller:', error)
        alert(error.error || 'Failed to activate seller')
      }
    } catch (error) {
      console.error('❌ Failed to activate seller:', error)
      alert('Failed to activate seller')
    }
  }

  const deleteSeller = async (sellerId: string) => {
    if (confirm('Are you sure you want to delete this seller? This will also remove all their products. This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/admin/users/${sellerId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          setSellers(prev => prev.filter(seller => seller._id !== sellerId))
          alert('Seller deleted successfully!')
        } else {
          const error = await response.json()
          console.error('❌ Failed to delete seller:', error)
          alert(error.error || 'Failed to delete seller')
        }
      } catch (error) {
        console.error('❌ Failed to delete seller:', error)
        alert('Failed to delete seller')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Admin Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    {activeSection === 'overview' && 'Dashboard Overview'}
                    {activeSection === 'products' && 'Product Management'}
                    {activeSection === 'sellers' && 'Seller Management'}
                    {activeSection === 'users' && 'User Management'}
                    {activeSection === 'analytics' && 'Analytics'}
                    {activeSection === 'settings' && 'Settings'}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {activeSection === 'overview' && 'Complete overview of platform performance'}
                    {activeSection === 'products' && 'Review and manage all products on the platform'}
                    {activeSection === 'sellers' && 'Manage seller accounts and permissions'}
                    {activeSection === 'users' && 'Manage all user accounts and access levels'}
                    {activeSection === 'analytics' && 'Platform analytics and performance metrics'}
                    {activeSection === 'settings' && 'System configuration and preferences'}
                  </p>
                </div>
                {flash && (
                  <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    flash === 'approved' ? 'bg-green-100 text-green-800 border border-green-200' :
                    flash === 'rejected' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {flash === 'approved' && 'Approved'}
                    {flash === 'rejected' && 'Rejected'}
                    {flash === 'deleted' && 'Deleted'}
                  </div>
                )}
                {user && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Welcome back,</p>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Content Sections */}
            {activeSection === 'overview' && (
              <div>
                <StatsCards stats={stats} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pending Products for Review */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Pending Products</h3>
                          <p className="text-gray-600 text-sm">Products awaiting approval</p>
                        </div>
                        <button
                          onClick={() => setActiveSection('products')}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        >
                          View All Products
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      {products.filter(p => p.status === 'pending').slice(0, 5).map((product) => (
                        <div key={product._id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center space-x-3 flex-1">
                            <img 
                              src={product.images?.[0] || '/api/placeholder/40/40'} 
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover border"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                              <div className="text-xs text-gray-500">{product.category}</div>
                              <div className="text-xs text-gray-400 mt-1">
                                Seller: {product.sellerId?.storeName || 'N/A'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleApproveProduct(product._id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve Product"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRejectProduct(product._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject Product"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleViewProduct(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {products.filter(p => p.status === 'pending').length === 0 && (
                        <div className="text-center py-8">
                          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500 text-sm">No pending products for review</p>
                        </div>
                      )}
                    </div>
                    {products.filter(p => p.status === 'pending').length > 0 && (
                      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center text-xs text-gray-600">
                          <span>
                            Showing {Math.min(products.filter(p => p.status === 'pending').length, 5)} of{' '}
                            {products.filter(p => p.status === 'pending').length} pending products
                          </span>
                          <div className="flex gap-4">
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                              Pending: {products.filter(p => p.status === 'pending').length}
                            </span>
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Approved: {products.filter(p => p.status === 'approved').length}
                            </span>
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              Rejected: {products.filter(p => p.status === 'rejected').length}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <UserManagementTable
                    users={users.slice(0, 5)}
                    onSuspend={handleSuspendUser}
                    onActivate={handleActivateUser}
                    onDelete={handleDeleteUser}
                  />
                </div>
              </div>
            )}

            {activeSection === 'products' && (
              <ProductManagementTable
                products={products}
                onApprove={handleApproveProduct}
                onReject={handleRejectProduct}
                onDelete={handleDeleteProduct}
                onView={handleViewProduct}
              />
            )}

            {activeSection === 'sellers' && (
              <SellerManagementTable
                sellers={sellers}
                onSuspend={suspendSeller}
                onActivate={activateSeller}
                onDelete={deleteSeller}
              />
            )}

            {activeSection === 'users' && (
              <UserManagementTable
                users={users}
                onSuspend={handleSuspendUser}
                onActivate={handleActivateUser}
                onDelete={handleDeleteUser}
              />
            )}

            {activeSection === 'analytics' && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="text-center py-12">
                  <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Advanced analytics with sales trends, user growth, and platform performance metrics coming soon.
                  </p>
                </div>
              </div>
            )}

            {activeSection === 'settings' && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">System Settings</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Configure platform settings, payment methods, and system preferences.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}