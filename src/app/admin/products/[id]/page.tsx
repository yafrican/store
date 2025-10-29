'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { CheckCircle, XCircle, Trash2 } from 'lucide-react'

export default function AdminProductDetailPage() {
  const router = useRouter()
  // @ts-ignore
  const params = useParams()
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [product, setProduct] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`)
        if (!res.ok) throw new Error(`Failed to load product (${res.status})`)
        const data = await res.json()
        if (!data.success) throw new Error(data.error || 'Failed to load product')
        setProduct(data.product)
      } catch (e: any) {
        setError(e.message || 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

  const handleAction = async (action: 'approve' | 'reject' | 'delete') => {
    try {
      setSaving(true)
      setError('')
      if (action === 'delete') {
        const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
        if (!res.ok) {
          const j = await res.json().catch(() => ({}))
          throw new Error(j?.error || `Delete failed (${res.status})`)
        }
        router.push('/admin/dashboard?msg=deleted')
        return
      }
      const res = await fetch(`/api/admin/products/${id}/${action}`, { method: 'PATCH' })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error || `${action} failed (${res.status})`)
      }
      // After approve/reject, go back to dashboard with a flash message
      router.push(`/admin/dashboard?msg=${action}`)
    } catch (e: any) {
      setError(e.message || 'Action failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-red-600 text-sm">{error || 'Product not found'}</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="mt-1">
            <span className={`inline-block text-xs px-2 py-1 rounded border ${
              (product.status || 'pending') === 'approved' ? 'bg-green-100 text-green-800 border-green-200' :
              (product.status || 'pending') === 'rejected' ? 'bg-amber-100 text-amber-800 border-amber-200' :
              'bg-gray-100 text-gray-800 border-gray-200'
            }`}>
              {(product.status || 'pending').toString().toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {(product.status || 'pending') !== 'approved' && (
            <button
              onClick={() => handleAction('approve')}
              disabled={saving}
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Approve
            </button>
          )}
          {(product.status || 'pending') !== 'rejected' && (
            <button
              onClick={() => handleAction('reject')}
              disabled={saving}
              className="px-4 py-2 rounded bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" /> Reject
            </button>
          )}
          <button
            onClick={() => handleAction('delete')}
            disabled={saving}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border rounded-xl p-4">
            <h2 className="font-semibold mb-3">Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(product.images || []).map((src: string, idx: number) => (
                <img key={idx} src={src} alt="" className="w-full h-40 object-cover rounded-lg border" />
              ))}
              {(!product.images || product.images.length === 0) && (
                <div className="text-sm text-gray-500">No images</div>
              )}
            </div>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-700 text-sm whitespace-pre-line">{product.description || 'No description'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border rounded-xl p-4">
            <h2 className="font-semibold mb-2">Details</h2>
            <div className="text-sm text-gray-700 space-y-1">
              <div><span className="text-gray-500">Category:</span> {product.category || 'Uncategorized'}</div>
              {product.subcategory && (
                <div><span className="text-gray-500">Subcategory:</span> {product.subcategory}</div>
              )}
              <div><span className="text-gray-500">Price:</span> ${product.price}</div>
              <div><span className="text-gray-500">Status:</span> {product.status || 'pending'}</div>
              <div><span className="text-gray-500">Stock:</span> {product.stock ?? 0}</div>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-4">
            <h2 className="font-semibold mb-2">Seller</h2>
            <div className="text-sm text-gray-700 space-y-1">
              <div><span className="text-gray-500">Store:</span> {product.seller?.storeName || 'N/A'}</div>
              <div><span className="text-gray-500">Name:</span> {product.seller?.name || 'N/A'}</div>
              <div><span className="text-gray-500">Email:</span> {product.seller?.email || 'N/A'}</div>
              <div><span className="text-gray-500">Phone:</span> {product.seller?.phone || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
