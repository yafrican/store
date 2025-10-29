// app/contexts/CartContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  stock: number
  category: string
  isDemo?: boolean
}

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  totalPrice: number // Add totalPrice here
  loading: boolean
  addToCart: (product: any) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0) // Add totalPrice state
  const [loading, setLoading] = useState(true)

  // Calculate total price
  const calculateTotalPrice = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
        setCartCount(parsedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0))
        setTotalPrice(calculateTotalPrice(parsedCart))
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cartItems))
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0))
    setTotalPrice(calculateTotalPrice(cartItems)) // Update total price when cart changes
  }, [cartItems])

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product._id)
      
      if (existingItem) {
        // Update quantity if item exists
        return prev.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add new item
        const newItem: CartItem = {
          id: product._id,
          name: product.name,
          price: product.salePrice || product.price,
          image: product.image,
          quantity: 1,
          stock: product.stock || 10,
          category: product.category || 'General',
          isDemo: product.isDemo
        }
        return [...prev, newItem]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      totalPrice, // Include totalPrice in the context value
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}