// src/app/admin/payment-proofs/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface PaymentProof {
  _id: string
  orderNumber: string
  customerInfo: {
    fullName: string
    phone: string
    email: string
    address: string
  }
  totalAmount: number
  paymentMethod: string
  bankDetails?: {
    name: string
    accountNumber: string
    accountName: string
  }
  paymentProof: {
    imageUrl: string
    uploadedAt: string
    verified: boolean
    verifiedBy?: string
    verifiedAt?: string
  }
  status: string
  createdAt: string
}

export default function PaymentProofsAdminPage() {
  const [paymentProofs, setPaymentProofs] = useState<PaymentProof[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProof, setSelectedProof] = useState<PaymentProof | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [rejecting, setRejecting] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('pending')

  useEffect(() => {
    fetchPaymentProofs()
  }, [filter])

  const fetchPaymentProofs = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/payment-proofs?filter=${filter}`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setPaymentProofs(data.paymentProofs)
      } else {
        toast.error('Failed to fetch payment proofs')
      }
    } catch (error) {
      toast.error('Error fetching payment proofs')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPayment = async (orderId: string) => {
    try {
      setVerifying(true)
      const response = await fetch(`/api/admin/orders/${orderId}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          status: 'confirmed',
          adminNotes: 'Payment verified successfully'
        })
      })

      if (response.ok) {
        toast.success('Payment verified successfully!')
        fetchPaymentProofs()
        setShowModal(false)
      } else {
        toast.error('Failed to verify payment')
      }
    } catch (error) {
      toast.error('Error verifying payment')
    } finally {
      setVerifying(false)
    }
  }

  const handleRejectPayment = async (orderId: string, reason: string) => {
    try {
      setRejecting(true)
      const response = await fetch(`/api/admin/orders/${orderId}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          status: 'cancelled',
          adminNotes: reason
        })
      })

      if (response.ok) {
        toast.success('Payment rejected successfully!')
        fetchPaymentProofs()
        setShowModal(false)
      } else {
        toast.error('Failed to reject payment')
      }
    } catch (error) {
      toast.error('Error rejecting payment')
    } finally {
      setRejecting(false)
    }
  }

  const openProofModal = (proof: PaymentProof) => {
    setSelectedProof(proof)
    setShowModal(true)
  }

  const getStatusBadge = (status: string, verified: boolean) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium"
    
    if (verified) {
      return <span className={`${baseClasses} bg-green-100 text-green-800`}>Verified</span>
    }
    
    switch (status) {
      case 'pending':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending Review</span>
      case 'confirmed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Confirmed</span>
      case 'cancelled':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Rejected</span>
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ET', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-lg shadow p-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Proofs Management</h1>
          <p className="text-gray-600">Review and verify customer payment proofs</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border">
            {[
              { key: 'pending', label: 'Pending Review', count: paymentProofs.filter(p => !p.paymentProof.verified && p.status === 'pending').length },
              { key: 'verified', label: 'Verified', count: paymentProofs.filter(p => p.paymentProof.verified).length },
              { key: 'rejected', label: 'Rejected', count: paymentProofs.filter(p => p.status === 'cancelled').length },
              { key: 'all', label: 'All Proofs', count: paymentProofs.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Payment Proofs Grid */}
        {paymentProofs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Proofs Found</h3>
            <p className="text-gray-600">
              {filter === 'pending' 
                ? 'All pending payment proofs have been processed.' 
                : 'No payment proofs match the current filter.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {paymentProofs.map((proof) => (
              <div key={proof._id} className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{proof.orderNumber}</h3>
                    {getStatusBadge(proof.status, proof.paymentProof.verified)}
                  </div>
                  <p className="text-2xl font-bold text-green-600">{proof.totalAmount.toFixed(2)} Br</p>
                </div>

                {/* Customer Info */}
                <div className="p-4 border-b border-gray-200">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="font-medium text-gray-900">{proof.customerInfo.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{proof.customerInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-medium text-gray-900 capitalize">{proof.paymentMethod.replace('_', ' ')}</p>
                    </div>
                  </div>
                </div>

                {/* Proof Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Uploaded</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatDate(proof.paymentProof.uploadedAt)}
                    </span>
                  </div>

                  {/* Proof Image Preview */}
                  <div className="mb-4">
                    <img
                      src={proof.paymentProof.imageUrl}
                      alt="Payment proof"
                      className="w-full h-32 object-cover rounded-lg border border-gray-300 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openProofModal(proof)}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openProofModal(proof)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    >
                      View Details
                    </button>
                    {!proof.paymentProof.verified && proof.status === 'pending' && (
                      <button
                        onClick={() => handleVerifyPayment(proof._id)}
                        disabled={verifying}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Proof Modal */}
        {showModal && selectedProof && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Payment Proof Details</h2>
                    <p className="text-gray-600">{selectedProof.orderNumber}</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Proof Image */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Proof</h3>
                    <img
                      src={selectedProof.paymentProof.imageUrl}
                      alt="Payment proof"
                      className="w-full rounded-lg border border-gray-300 shadow-sm"
                    />
                    <div className="mt-4 text-sm text-gray-600">
                      <p>Uploaded: {formatDate(selectedProof.paymentProof.uploadedAt)}</p>
                      {selectedProof.paymentProof.verified && selectedProof.paymentProof.verifiedAt && (
                        <p>Verified: {formatDate(selectedProof.paymentProof.verifiedAt)}</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Order Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                    
                    {/* Customer Details */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Customer Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Full Name:</span>
                          <span className="font-medium">{selectedProof.customerInfo.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{selectedProof.customerInfo.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{selectedProof.customerInfo.email}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Address:</span>
                          <p className="font-medium mt-1">{selectedProof.customerInfo.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Payment Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Amount:</span>
                          <span className="font-bold text-green-600">{selectedProof.totalAmount.toFixed(2)} Br</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="font-medium capitalize">{selectedProof.paymentMethod.replace('_', ' ')}</span>
                        </div>
                        {selectedProof.bankDetails && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Bank:</span>
                              <span className="font-medium">{selectedProof.bankDetails.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Account:</span>
                              <span className="font-medium">{selectedProof.bankDetails.accountNumber}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Verification Status */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Verification Status</h4>
                      {getStatusBadge(selectedProof.status, selectedProof.paymentProof.verified)}
                      {selectedProof.paymentProof.verifiedBy && (
                        <p className="text-sm text-gray-600 mt-2">
                          Verified by: {selectedProof.paymentProof.verifiedBy}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {!selectedProof.paymentProof.verified && selectedProof.status === 'pending' && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleVerifyPayment(selectedProof._id)}
                          disabled={verifying}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-50"
                        >
                          {verifying ? 'Verifying...' : 'Verify Payment'}
                        </button>
                        <button
                          onClick={() => {
                            const reason = prompt('Please provide a reason for rejection:')
                            if (reason) {
                              handleRejectPayment(selectedProof._id, reason)
                            }
                          }}
                          disabled={rejecting}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-50"
                        >
                          {rejecting ? 'Rejecting...' : 'Reject'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}