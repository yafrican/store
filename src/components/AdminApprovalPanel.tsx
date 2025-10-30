// components/AdminApprovalPanel.tsx
'use client'

import { useState, useEffect } from 'react'
import { Receipt, ManualPaymentReceipt } from '../types/receipt'
import { ReceiptGenerator } from '../utils/receiptGenerator'

interface AdminApprovalPanelProps {
  receipts: Receipt[]
  onReceiptUpdate: (receipts: Receipt[]) => void
}

export default function AdminApprovalPanel({ receipts, onReceiptUpdate }: AdminApprovalPanelProps) {
  const [pendingApprovals, setPendingApprovals] = useState<ManualPaymentReceipt[]>([])
  const receiptGenerator = new ReceiptGenerator()

  useEffect(() => {
    const pending = receipts.filter(
      (receipt): receipt is ManualPaymentReceipt =>
        receipt.type === 'manual' && 
        receipt.status === 'pending_approval'
    )
    setPendingApprovals(pending)
  }, [receipts])

  const approvePayment = (receipt: ManualPaymentReceipt) => {
    const approvedReceipt = receiptGenerator.approveManualPayment(receipt, 'Admin User')
    updateReceipt(approvedReceipt)
  }

  const rejectPayment = (receipt: ManualPaymentReceipt, reason: string) => {
    const rejectedReceipt = receiptGenerator.rejectManualPayment(receipt, 'Admin User', reason)
    updateReceipt(rejectedReceipt)
  }

  const updateReceipt = (updatedReceipt: Receipt) => {
    const updatedReceipts = receipts.map(r => 
      r.id === updatedReceipt.id ? updatedReceipt : r
    )
    onReceiptUpdate(updatedReceipts)
    localStorage.setItem('yafrican_receipts', JSON.stringify(updatedReceipts))
  }

  if (pendingApprovals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Approval Panel</h2>
        <p className="text-gray-600">No pending approvals</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Pending Approvals ({pendingApprovals.length})
      </h2>
      
      <div className="space-y-4">
        {pendingApprovals.map((receipt) => (
          <div key={receipt.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">Order #{receipt.orderNumber}</h3>
                <p className="text-gray-600">{receipt.customerInfo.fullName}</p>
                <p className="text-sm text-gray-500">{receipt.customerInfo.phone}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600">{receipt.totalAmount.toFixed(2)} Br</p>
                <p className="text-sm text-gray-500 capitalize">
                  {receipt.paymentMethod.replace('_', ' ')}
                </p>
              </div>
            </div>

            {receipt.paymentProof && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-900 mb-2">Payment Proof:</h4>
                <img
                  src={receipt.paymentProof.imageUrl}
                  alt="Payment proof"
                  className="w-48 h-48 object-contain border rounded cursor-pointer"
                  onClick={() => window.open(receipt.paymentProof!.imageUrl, '_blank')}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Uploaded: {new Date(receipt.paymentProof.uploadedAt).toLocaleString()}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => approvePayment(receipt)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  const reason = prompt('Rejection reason:')
                  if (reason) rejectPayment(receipt, reason)
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}