// C:\Users\hp\Desktop\nextjs pro\yafrican\src\app\order-success\page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

export default function OrderSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear any cart items from localStorage
    localStorage.removeItem('cart')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            Thank you for your order. We've received your order and will process it shortly.
          </p>
          
          <p className="text-gray-500 dark:text-gray-500 mb-8">
            You will receive a confirmation call or message within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              Continue Shopping
            </button>
            
            <button
              onClick={() => router.push('/contact')}
              className="border border-gray-300 dark:border-gray-600 hover:border-yellow-500 text-gray-700 dark:text-gray-300 hover:text-yellow-600 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}