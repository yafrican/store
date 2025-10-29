// components/Checkout.tsx
'use client'

import { useState } from 'react'
import { useCart } from '../app/contexts/CartContext'
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline'

interface BankDetails {
  id: string
  name: string
  logo: string
  accountNumber: string
  accountName: string
  branch?: string
}

const ethiopianBanks: BankDetails[] = [
  {
    id: 'commercial',
    name: 'Commercial Bank of Ethiopia',
    logo: '/banks/cbe.png',
    accountNumber: '10003456789',
    accountName: 'Yafrican Online Store',
    branch: 'Main Branch'
  },
  {
    id: 'abyssinia',
    name: 'Abyssinia Bank',
    logo: '/banks/abyssinia.png',
    accountNumber: '10004567890',
    accountName: 'Yafrican Online Store',
    branch: 'Head Office'
  },
  {
    id: 'zemen',
    name: 'Zemen Bank',
    logo: '/banks/zemen.png',
    accountNumber: '10005678901',
    accountName: 'Yafrican Online Store',
    branch: 'Main Branch'
  },
  {
    id: 'abay',
    name: 'Abay Bank',
    logo: '/banks/abay.png',
    accountNumber: '10006789012',
    accountName: 'Yafrican Online Store',
    branch: 'Head Office'
  },
  {
    id: 'telebirr',
    name: 'Telebirr',
    logo: '/banks/Telebirr.png',
    accountNumber: '251912345678',
    accountName: 'Yafrican Store',
    branch: ''
  },
  {
    id: 'awash',
    name: 'Awash Bank',
    logo: '/banks/awash.png',
    accountNumber: '10007890123',
    accountName: 'Yafrican Online Store',
    branch: 'Main Branch'
  }
]

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const [selectedBank, setSelectedBank] = useState<string>('')
  const [copiedAccount, setCopiedAccount] = useState<string>('')
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: ''
  })

  const handleCopyAccount = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber)
    setCopiedAccount(accountNumber)
    setTimeout(() => setCopiedAccount(''), 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePlaceOrder = () => {
    if (!selectedBank) {
      alert('Please select a payment method')
      return
    }

    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all required customer information')
      return
    }

    // Here you would typically send the order to your backend
    const orderData = {
      customerInfo,
      selectedBank: ethiopianBanks.find(bank => bank.id === selectedBank),
      cartItems,
      totalPrice,
      orderDate: new Date().toISOString()
    }

    console.log('Order placed:', orderData)
    
    // Show success message and clear cart
    alert('Order placed successfully! Please complete your bank transfer and send us the receipt.')
    clearCart()
  }

  const selectedBankDetails = ethiopianBanks.find(bank => bank.id === selectedBank)

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Customer Info & Order Summary */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="+251 XXX XXX XXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your complete delivery address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center"> {/* Changed from item._id to item.id */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {(item.price * item.quantity).toFixed(2)} Br
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-yellow-600">{totalPrice.toFixed(2)} Br</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Methods */}
        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
            <p className="text-gray-600 mb-4">Select your preferred bank for transfer</p>
            
            <div className="space-y-3">
              {ethiopianBanks.map((bank) => (
                <div
                  key={bank.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedBank === bank.id
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-yellow-300'
                  }`}
                  onClick={() => setSelectedBank(bank.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {bank.name.split(' ').map(word => word[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{bank.name}</h3>
                        <p className="text-sm text-gray-500">
                          Account: {bank.accountNumber}
                        </p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedBank === bank.id
                        ? 'bg-yellow-500 border-yellow-500'
                        : 'border-gray-300'
                    }`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Bank Details */}
            {selectedBankDetails && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">
                  Transfer Instructions for {selectedBankDetails.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">{selectedBankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account Number:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-medium bg-gray-100 px-2 py-1 rounded">
                        {selectedBankDetails.accountNumber}
                      </span>
                      <button
                        onClick={() => handleCopyAccount(selectedBankDetails.accountNumber)}
                        className="p-1 text-gray-500 hover:text-yellow-600 transition-colors"
                        title="Copy account number"
                      >
                        {copiedAccount === selectedBankDetails.accountNumber ? (
                          <CheckIcon className="w-4 h-4 text-green-500" />
                        ) : (
                          <DocumentDuplicateIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {selectedBankDetails.branch && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Branch:</span>
                      <span className="font-medium">{selectedBankDetails.branch}</span>
                    </div>
                  )}
                  <div className="mt-3 p-3 bg-yellow-100 border border-yellow-200 rounded">
                    <p className="text-yellow-800 text-xs">
                      💡 <strong>Important:</strong> After making the transfer, please keep the 
                      receipt and send it to us via WhatsApp or email for order confirmation.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={!selectedBank}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
          >
            Place Order
          </button>

          {/* Additional Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Order Process</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Fill in your delivery information</li>
              <li>2. Select your preferred bank</li>
              <li>3. Transfer the total amount to the provided account</li>
              <li>4. Send us the transfer receipt via WhatsApp/Email</li>
              <li>5. We'll process your order and confirm delivery</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}