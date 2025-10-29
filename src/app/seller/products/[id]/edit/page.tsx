'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function SellerProductEditPage() {
  const router = useRouter()
  // @ts-ignore - useParams in app dir
  const params = useParams()
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([
    'Electronics',
    'Clothing',
    'Beauty',
    'Home',
    'Sports',
    'Accessories',
    'Books',
    'Other'
  ])
  const [customCategory, setCustomCategory] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const [subcategories, setSubcategories] = useState<Record<string, string[]>>({
    Electronics: ['Phones', 'Laptops', 'Audio', 'Accessories', 'Other'],
    Clothing: ['Men', 'Women', 'Kids', 'Shoes', 'Other'],
    Beauty: ['Skincare', 'Makeup', 'Haircare', 'Other'],
    Home: ['Kitchen', 'Furniture', 'Decor', 'Other'],
    Sports: ['Fitness', 'Outdoor', 'Team Sports', 'Other'],
    Accessories: ['Bags', 'Watches', 'Jewelry', 'Other'],
    Books: ['Fiction', 'Non-fiction', 'Education', 'Other'],
    Other: ['Other']
  })
  const [customSubcategory, setCustomSubcategory] = useState('')
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState<number | ''>('')
  const [inStock, setInStock] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/sellers/products/${id}`, { credentials: 'include' })
        if (!res.ok) throw new Error(`Failed to load product (${res.status})`)
        const data = await res.json()
        const p = data.product
        setName(p.name || '')
        setPrice(p.price ?? '')
        setCategory(p.category || '')
        setSubcategory(p.subcategory || '')
        setDescription(p.description || '')
        setStock(p.stock ?? '')
        setInStock(p.inStock ?? true)
      } catch (e: any) {
        setError(e.message || 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      setError('')
      // Apply 10% platform fee on save
      const platformFeeMultiplier = 1.1
      const finalPrice = typeof price === 'number' ? Number((price * platformFeeMultiplier).toFixed(2)) : price
      const finalCategory = (category === 'Other' ? customCategory : category) || ''
      const availableSubs = subcategories[category as keyof typeof subcategories] || []
      const chosenSub = availableSubs.includes(subcategory) ? subcategory : (subcategory === 'Other' ? customSubcategory : subcategory)
      const finalSubcategory = category === 'Other' ? (customSubcategory || '') : (chosenSub || '')
      const res = await fetch(`/api/sellers/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name,
          price: finalPrice,
          category: finalCategory,
          subcategory: finalSubcategory,
          description,
          stock,
          inStock
        })
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j?.error || `Update failed (${res.status})`)
      }
      router.push('/seller/dashboard')
    } catch (e: any) {
      setError(e.message || 'Failed to save product')
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 text-red-600 text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            step="0.01"
            min="0"
            required
          />
          {typeof price === 'number' && (
            <p className="text-xs text-gray-500 mt-1">
              Final price (incl. 10% platform fee): <span className="font-medium">{(price * 1.1).toFixed(2)}</span>
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            {/* Ensure current category is present in dropdown */}
            {category && !categories.includes(category) && (
              <option value={category}>{category}</option>
            )}
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {category === 'Other' && (
            <input
              placeholder="Enter category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="mt-2 w-full border rounded px-3 py-2"
              required
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subcategory</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            {/* Ensure current subcategory visible if not in preset */}
            {subcategory && !(subcategories[category] || []).includes(subcategory) && (
              <option value={subcategory}>{subcategory}</option>
            )}
            {(subcategories[category] || ['Other']).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {subcategory === 'Other' && (
            <input
              placeholder="Enter subcategory"
              value={customSubcategory}
              onChange={(e) => setCustomSubcategory(e.target.value)}
              className="mt-2 w-full border rounded px-3 py-2"
              required
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
              min="0"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="inStock"
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            <label htmlFor="inStock" className="text-sm">In Stock</label>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
