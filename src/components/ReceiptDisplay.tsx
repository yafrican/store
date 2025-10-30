// components/ReceiptDisplay.tsx
'use client'

import { Receipt, ManualPaymentReceipt, TelebirrReceipt } from '../types/receipt'
import { DocumentDuplicateIcon, CheckIcon, QrCodeIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import PaymentProofUpload from './PaymentProofUpload'

interface ReceiptDisplayProps {
  receipt: Receipt
  onPrint?: () => void
  onShare?: () => void
  onProofUpload?: (receipt: ManualPaymentReceipt, imageUrl: string) => void
}

export default function ReceiptDisplay({ receipt, onPrint, onShare, onProofUpload }: ReceiptDisplayProps) {
  const [copiedField, setCopiedField] = useState<string>('')
  const [showUploadModal, setShowUploadModal] = useState(false)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(''), 2000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-ET', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isManualReceipt = (receipt: Receipt): receipt is ManualPaymentReceipt => {
    return receipt.type === 'manual'
  }

  const isTelebirrReceipt = (receipt: Receipt): receipt is TelebirrReceipt => {
    return receipt.type === 'telebirr'
  }

  const handleProofUpload = (receipt: ManualPaymentReceipt, imageUrl: string) => {
    if (onProofUpload) {
      onProofUpload(receipt, imageUrl)
    }
    setShowUploadModal(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_payment':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />
      case 'pending_approval':
        return <ClockIcon className="w-5 h-5 text-blue-600" />
      case 'confirmed':
        return <CheckIcon className="w-5 h-5 text-green-600" />
      case 'rejected':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusMessage = (receipt: Receipt) => {
    if (isManualReceipt(receipt)) {
      switch (receipt.status) {
        case 'pending_payment':
          return 'Waiting for payment proof upload'
        case 'pending_approval':
          return 'Payment proof submitted - Waiting for admin approval'
        case 'confirmed':
          return 'Payment approved - Order confirmed!'
        case 'rejected':
          return `Payment rejected: ${receipt.adminNotes || 'Please contact support'}`
        default:
          return 'Processing...'
      }
    } else {
      switch (receipt.status) {
        case 'pending_payment':
          return 'Processing Telebirr payment...'
        case 'confirmed':
          return 'Payment confirmed via Telebirr'
        default:
          return 'Processing...'
      }
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Yafrican Online Store</h1>
          <p className="text-gray-600">Order Receipt</p>
          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="text-left">
              <p className="font-semibold">Order #: {receipt.orderNumber}</p>
              <p className="text-gray-600">{formatDate(receipt.orderDate)}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
              receipt.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
              receipt.status === 'pending_approval' ? 'bg-blue-100 text-blue-800' :
              receipt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              receipt.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {getStatusIcon(receipt.status)}
              <span>{receipt.status.toUpperCase().replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        <div className={`mb-6 p-4 rounded-lg ${
          receipt.status === 'pending_payment' ? 'bg-yellow-50 border border-yellow-200' :
          receipt.status === 'pending_approval' ? 'bg-blue-50 border border-blue-200' :
          receipt.status === 'confirmed' ? 'bg-green-50 border border-green-200' :
          receipt.status === 'rejected' ? 'bg-red-50 border border-red-200' :
          'bg-gray-50 border border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon(receipt.status)}
              <span className={`font-medium ${
                receipt.status === 'pending_payment' ? 'text-yellow-800' :
                receipt.status === 'pending_approval' ? 'text-blue-800' :
                receipt.status === 'confirmed' ? 'text-green-800' :
                receipt.status === 'rejected' ? 'text-red-800' :
                'text-gray-800'
              }`}>
                {getStatusMessage(receipt)}
              </span>
            </div>
            {isManualReceipt(receipt) && receipt.status === 'rejected' && receipt.adminNotes && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
              >
                Re-upload
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="font-medium">{receipt.customerInfo.fullName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="font-medium">{receipt.customerInfo.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="font-medium">{receipt.customerInfo.email || 'N/A'}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500">Delivery Address</label>
              <p className="font-medium">{receipt.customerInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h2>
          <div className="space-y-3">
            {receipt.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
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
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h2>
          
          {isManualReceipt(receipt) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-yellow-900">
                  {receipt.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 
                   receipt.paymentMethod === 'telegram' ? 'Telegram Payment' : 'WhatsApp Payment'}
                </h3>
                {receipt.status === 'pending_approval' && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Under Review
                  </span>
                )}
              </div>

              {receipt.paymentMethod === 'bank_transfer' && receipt.bankDetails && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium">{receipt.bankDetails.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">{receipt.bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Account Number:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-medium">{receipt.bankDetails.accountNumber}</span>
                      <button
                        onClick={() => handleCopy(receipt.bankDetails!.accountNumber, 'account')}
                        className="p-1 text-gray-500 hover:text-yellow-600 transition-colors"
                      >
                        {copiedField === 'account' ? (
                          <CheckIcon className="w-4 h-4 text-green-500" />
                        ) : (
                          <DocumentDuplicateIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {receipt.bankDetails.branch && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Branch:</span>
                      <span className="font-medium">{receipt.bankDetails.branch}</span>
                    </div>
                  )}
                </div>
              )}

              {(receipt.paymentMethod === 'telegram' || receipt.paymentMethod === 'whatsapp') && (
                <div className="text-sm text-yellow-800">
                  <p>Please contact us via {receipt.paymentMethod === 'telegram' ? 'Telegram' : 'WhatsApp'} to complete your payment.</p>
                  <p className="mt-1 font-medium">Total Amount: {receipt.totalAmount.toFixed(2)} Br</p>
                </div>
              )}

              {receipt.paymentProof && (
                <div className="mt-4 p-3 bg-white border border-gray-200 rounded">
                  <h4 className="font-medium text-gray-900 mb-2">Uploaded Payment Proof</h4>
                  <img
                    src={receipt.paymentProof.imageUrl}
                    alt="Payment proof"
                    className="w-32 h-32 object-cover rounded border cursor-pointer"
                    onClick={() => window.open(receipt.paymentProof!.imageUrl, '_blank')}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Uploaded: {formatDate(receipt.paymentProof.uploadedAt)}
                  </p>
                  {receipt.paymentProof.verified && (
                    <p className="text-xs text-green-600 mt-1">
                      Verified by {receipt.paymentProof.verifiedBy} on {formatDate(receipt.paymentProof.verifiedAt!)}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {isTelebirrReceipt(receipt) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-green-900">Telebirr Payment</h3>
                {receipt.paymentConfirmed ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Payment Confirmed
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Processing
                  </span>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono font-medium">{receipt.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span className="font-medium">{formatDate(receipt.paymentDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    receipt.paymentConfirmed ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {receipt.paymentConfirmed ? 'Confirmed' : 'Pending Confirmation'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-4 mb-6">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-yellow-600">{receipt.totalAmount.toFixed(2)} Br</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onPrint}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Print Receipt
          </button>
          
          <div className="flex space-x-3">
            {isManualReceipt(receipt) && receipt.status === 'pending_payment' && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Upload Payment Proof
              </button>
            )}
            
            <button
              onClick={onShare}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
            >
              Share Receipt
            </button>
          </div>
        </div>
      </div>

      {showUploadModal && isManualReceipt(receipt) && (
        <PaymentProofUpload
          receipt={receipt}
          onProofUpload={handleProofUpload}
          onCancel={() => setShowUploadModal(false)}
        />
      )}
    </>
  )
}