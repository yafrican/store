// components/PaymentProofUpload.tsx
'use client'

import { useState, useRef } from 'react'
import { ManualPaymentReceipt } from '../types/receipt'
import { CloudArrowUpIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'

interface PaymentProofUploadProps {
  receipt: ManualPaymentReceipt
  onProofUpload: (receipt: ManualPaymentReceipt, imageUrl: string) => void
  onCancel: () => void
}

export default function PaymentProofUpload({ receipt, onProofUpload, onCancel }: PaymentProofUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setUploading(true)

    try {
      const imageUrl = await simulateFileUpload(file)
      setUploadedImage(imageUrl)
    } catch (error) {
      alert('Upload failed. Please try again.')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const simulateFileUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }, 2000)
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (uploadedImage) {
      onProofUpload(receipt, uploadedImage)
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Upload Payment Proof</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {!uploadedImage && (
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-yellow-500 bg-yellow-50' 
                  : 'border-gray-300 hover:border-gray-400'
              } ${uploading ? 'opacity-50' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                {uploading ? 'Uploading...' : 'Drag & drop your payment receipt'}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or click to browse (Max 5MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                disabled={uploading}
                className="hidden"
                id="payment-proof"
              />
              <label
                htmlFor="payment-proof"
                className={`inline-block px-4 py-2 rounded-lg cursor-pointer ${
                  uploading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }`}
              >
                {uploading ? 'Uploading...' : 'Choose File'}
              </label>
            </div>
          )}

          {uploadedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Payment proof"
                  className="w-full h-64 object-contain border rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-center text-green-600">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Image uploaded successfully</span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Requirements:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Clear screenshot/photo of bank transfer receipt</li>
              <li>• Transaction details must be visible</li>
              <li>• Amount should match order total</li>
              <li>• Admin will verify within 24 hours</li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!uploadedImage}
              className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit for Approval
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}