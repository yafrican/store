'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Package, ShoppingBag, BarChart, Settings, Users, LogOut } from 'lucide-react'

function SellerNav() {
  const [sidebarOpen, setSidebarOpen] = useState(true) // start open on desktop

  const navItems = [
    { href: '/seller/products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { href: '/seller/orders', label: 'Orders', icon: <ShoppingBag className="w-5 h-5" /> },
    { href: '/seller/analytics', label: 'Analytics', icon: <BarChart className="w-5 h-5" /> },
    { href: '/seller/customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
    { href: '/seller/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { href: '/seller/logout', label: 'Logout', icon: <LogOut className="w-5 h-5 text-red-600" />, red: true },
  ]

  return (
    <>
      {/* Hamburger button always visible */}
      <div className="fixed top-5 left-5 z-50">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="bg-amber-500 p-2 rounded-full shadow-lg hover:bg-amber-600 transition"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 w-64 bg-amber-200 shadow-lg p-6 flex flex-col z-50 md:static md:translate-x-0 md:flex md:w-64 md:shadow-none"
      >
        <h1 className="text-2xl font-bold mb-6 text-amber-700">Seller Dashboard</h1>
        <nav className="flex-1 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition hover:bg-amber-300 ${
                item.red ? 'text-red-600 hover:text-red-800' : 'text-amber-800 hover:text-amber-600'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </motion.aside>

      {/* Overlay only for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}

export default SellerNav
