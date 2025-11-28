'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Upload, X, Calculator, ChevronDown, ChevronUp, Save, Package } from 'lucide-react'
import { getCategoryConfig } from '@/lib/categories'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ProductFormData {
  name: string
  price: string
  originalPrice: string  
  category: string
  subcategory: string
  description: string
  stock: string
  images: string[]
  specifications: {
    [key: string]: string | number | boolean
  }
  deliveryLocations: string[]
  deliveryTime: string
  freeShipping: boolean
  warrantyPeriod: string
  warrantyType: string
}

// CORRECT mapping - matches MongoDB schema
const mapCategoryToDBFormat = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'Electronics': 'ELECTRONICS',
    'Clothing': 'CLOTHING',
    'Home, Furniture & Appliances': 'HOME_FURNITURE_APPLIANCES',
    'Beauty & Personal Care': 'BEAUTY_PERSONAL_CARE',
    'Sports & Outdoors': 'LEISURE_ACTIVITIES',
    'Toys & Games': 'LEISURE_ACTIVITIES',
    'Automotive': 'AUTOMOTIVE', 
    'Books & Media': 'BOOKS_MEDIA',
    'Jewelry and Accessories': 'JEWELRY_ACCESSORIES',
    'Food & Beverages': 'FOOD_AGRICULTURE_FARMING',
    'Services': 'SERVICES',
    'Property': 'PROPERTY',
    'Vehicles': 'VEHICLES',
    'Commercial Equipment': 'COMMERCIAL_EQUIPMENT',
    'Repair & Construction': 'REPAIR_CONSTRUCTION',
    'Animals & Pets': 'ANIMALS_PETS',
    'Babies & Kids': 'BABIES_KIDS'
  }
  return categoryMap[category] || category
}

// Mapping for category config
const mapToConfigCategory = (category: string): string => {
  const configMap: { [key: string]: string } = {
    'Electronics': 'Electronics',
    'Clothing': 'Clothing', 
    'Home, Furniture & Appliances': 'Home, Furniture & Appliances',
    'Beauty & Personal Care': 'Beauty & Personal Care',
    'Sports & Outdoors': 'Leisure & Activities',
    'Toys & Games': 'Leisure & Activities',
    'Automotive': 'Automotive',
    'Books & Media': 'Books & Media',
    'Jewelry and Accessories': 'Jewelry and Accessories',
    'Food & Beverages': 'Food, Agriculture & Farming',
    'Services': 'Services',
    'Property': 'Property',
    'Vehicles': 'Vehicles',
    'Commercial Equipment': 'Commercial Equipment',
    'Repair & Construction': 'Repair & Construction',
    'Animals & Pets': 'Animals & Pets',
    'Babies & Kids': 'Babies & Kids'
  }
  return configMap[category] || category
}

type Step = 'basic' | 'specifications' | 'images'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>('basic')
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [specsSectionOpen, setSpecsSectionOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    description: '',
    stock: '1',
    images: [],
    deliveryLocations: [],
    deliveryTime: '',
    freeShipping: false,
    warrantyPeriod: '',
    warrantyType: '',
    specifications: {}
  })

  // Categories and subcategories
  const categories = [
    'Electronics',
    'Vehicles',
    'Property',
    'Home, Furniture & Appliances',
    'Clothing',
    'Jewelry and Accessories',
    'Books & Media',
    'Automotive',
    'Beauty & Personal Care',
    'Services',
    'Repair & Construction',
    'Commercial Equipment',
    'Leisure & Activities',
    'Babies & Kids',
    'Food, Agriculture & Farming',
    'Animals & Pets'
  ]

  const subcategories: Record<string, string[]> = {
    'Electronics': [
      'Phones', 'Laptops & Computers', 'Video Game Consoles', 'Audio & Music Equipment', 
      'Headphones', 'Photo & Video Cameras', 'Security & Surveillance', 'Networking Products',
      'Printers & Scanners', 'Computer Monitors', 'Computer Hardware', 'Computer Accessories',
      'Electronic Accessories & Supplies', 'Video Games', 'Software'
    ],
    'Vehicles': [
      'Vehicle Parts & Accessories', 'Cars', 'Motorcycles & Scooters', 'Buses & Microbuses',
      'Trucks & Trailers', 'Construction & Heavy Machinery', 'Watercraft & Boats', 'Car Services'
    ],
    'Property': [
      'New Builds', 'Houses & Apartments for Rent', 'Houses & Apartments for Sale', 
      'Land & Plots for Rent', 'Short Let', 'Land & Plots for Sale',
      'Event Centres, Venues & Workstations', 'Commercial Property for Rent', 
      'Commercial Property for Sale'
    ],
    'Home, Furniture & Appliances': [
      'Furniture', 'Lighting', 'Storage & Organization', 'Home Accessories',
      'Kitchen Appliances', 'Kitchenware & Cookware', 'Household Chemicals', 'Garden Supplies'
    ],
    'Clothing': ['Men', 'Women', 'Kids', 'Baby', 'Shoes', 'Accessories'],
    'Books & Media': ['Fiction', 'Non-Fiction', 'Children', 'Educational', 'Audio Books'],
    'Automotive': ['Car Care', 'Tools', 'Accessories', 'Parts', 'Motorcycle'],
    'Beauty & Personal Care': [
      'Hair Care & Beauty', 'Face Care', 'Oral Care', 'Body Care', 'Fragrances',
      'Makeup', 'Tools & Accessories', 'Vitamins & Supplements', 'Massagers',
      'Health & Beauty Services'
    ],
    'Jewelry and Accessories': [
      'Jewelry', 'Watches', 'Bags & Purses', 'Sunglasses & Eyewear', 'Belts & Wallets'
    ],
    'Services': [
      'Building & Trade Services', 'Car Services', 'Computer & IT Services', 'Repair Services',
      'Cleaning Services', 'Printing Services', 'Manufacturing Services', 'Logistics Services',
      'Legal Services', 'Tax & Financial Services', 'Recruitment Services', 'Rental Services',
      'Chauffeur & Airport Transfer Services', 'Travel Agents & Tours', 'Classes & Courses',
      'Health & Beauty Services', 'Fitness & Personal Training', 'Party, Catering & Event Services',
      'DJ & Entertainment Services', 'Photography & Video Services', 'Landscaping & Gardening Services',
      'Pet Services'
    ],
    'Repair & Construction': [
      'Electrical Equipment', 'Building Materials & Supplies', 'Plumbing & Water Systems',
      'Electrical Hand Tools', 'Hand Tools', 'Measuring & Testing Tools', 'Hardware & Fasteners',
      'Doors & Security', 'Windows & Glass', 'Building & Trade Services', 'Repair Services'
    ],
    'Commercial Equipment': [
      'Medical Equipment & Supplies', 'Manufacturing Equipment', 'Retail & Store Equipment',
      'Restaurant & Catering Equipment', 'Stationery & Office Equipment', 'Salon & Beauty Equipment',
      'Printing & Graphics Equipment', 'Stage & Event Equipment', 'Manufacturing Services'
    ],
    'Leisure & Activities': [
      'Sports Equipment', 'Massagers', 'Musical Instruments & Gear', 'Books & Table Games',
      'Arts, Crafts & Awards', 'Outdoor Gear', 'Music & Video', 'Fitness & Personal Training'
    ],
    'Babies & Kids': [
      'Toys, Games & Bikes', 'Children\'s Furniture', 'Children\'s Clothing', 'Children\'s Shoes',
      'Babies & Kids Accessories', 'Baby Gear & Equipment', 'Care & Feeding', 'Maternity & Pregnancy',
      'Transport & Safety', 'Playground Equipment', 'Child Care & Education'
    ],
    'Food, Agriculture & Farming': [
      'Food & Beverages', 'Farm Animals', 'Feeds, Supplements & Seeds', 'Farm Machinery & Equipment',
      'Farm Animal Feed & Supplies'
    ],
    'Animals & Pets': [
      'Pet Accessories', 'Cats & Kittens', 'Dogs & Puppies', 'Fish', 'Birds',
      'Pet Services', 'Other Animals'
    ]
  }

  const categoryConfig = formData.category ? getCategoryConfig(
    mapToConfigCategory(formData.category), 
    formData.subcategory
  ) : null

  // Progress steps
  const steps = [
    { id: 'basic', name: 'Basic Information', description: 'Product details' },
    { id: 'specifications', name: 'Specifications', description: 'Product specs' },
    { id: 'images', name: 'Images & Finalize', description: 'Update images' }
  ]

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/sellers/products/${id}`, { credentials: 'include' })
        if (!res.ok) throw new Error(`Failed to load product (${res.status})`)
        const data = await res.json()
        const product = data.product

        setFormData({
          name: product.name || '',
          price: product.price?.toString() || '',
          originalPrice: product.originalPrice?.toString() || '',
          category: product.category || '',
          subcategory: product.subcategory || '',
          description: product.description || '',
          stock: product.stock?.toString() || '1',
          images: product.images || [],
          specifications: product.specifications || {},
          deliveryLocations: product.deliveryLocations || [],
          deliveryTime: product.deliveryTime || '',
          freeShipping: product.freeShipping || false,
          warrantyPeriod: product.warrantyPeriod || '',
          warrantyType: product.warrantyType || ''
        })

        setExistingImages(product.images || [])
      } catch (error: any) {
        toast.error(error.message || 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  // Clean up object URLs
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url))
    }
  }, [imagePreviews])

  // Reset specifications when category changes
  useEffect(() => {
    if (formData.category) {
      setSpecsSectionOpen(true)
    }
  }, [formData.category])

  // Add validation function
  const validateCurrentStep = (): string | null => {
    switch (currentStep) {
      case 'basic':
        if (!formData.name.trim()) return 'Product name is required'
        if (!formData.originalPrice || parseFloat(formData.originalPrice) <= 0) return 'Valid original price is required'
        if (!formData.category) return 'Category is required'
        if (!formData.description.trim()) return 'Description is required'
        if (!formData.stock || parseInt(formData.stock) < 0) return 'Valid stock quantity is required'
        if (formData.deliveryLocations.length === 0) return 'Please add at least one delivery area'
        if (!formData.deliveryTime.trim()) return 'Please enter an estimated delivery time'
        return null

      case 'specifications':
        if (categoryConfig) {
          const missingRequired = categoryConfig.specifications
            .filter(spec => spec.required && !formData.specifications[spec.fieldName])
            .map(spec => spec.label)

          if (missingRequired.length > 0) {
            return `Please fill in required specifications: ${missingRequired.join(', ')}`
          }
        }
        return null

      case 'images':
        // Allow submission even if no new images are added (existing images remain)
        // No validation needed here since we want to allow keeping existing images
        return null

      default:
        return null
    }
  }

  // Navigation functions
  const nextStep = () => {
    const error = validateCurrentStep()
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
      })
      return
    }

    const stepOrder: Step[] = ['basic', 'specifications', 'images']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const prevStep = () => {
    const stepOrder: Step[] = ['basic', 'specifications', 'images']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  // Calculate final price with 10% markup
  const calculateFinalPrice = (basePrice: string): string => {
    if (!basePrice || isNaN(parseFloat(basePrice))) return ''
    const price = parseFloat(basePrice)
    const finalPrice = price + (price * 0.10)
    const roundedPrice = Math.round(finalPrice / 5) * 5
    return roundedPrice.toFixed(0)
  }

  // Handle price input changes
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const basePrice = e.target.value
    setFormData(prev => ({
      ...prev,
      originalPrice: basePrice,
      price: calculateFinalPrice(basePrice)
    }))
  }

  // Handle basic form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (name !== 'originalPrice') {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }))
    }
  }

  const handleSpecificationChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [fieldName]: value
      }
    }))
  }

  // Image handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length + imageFiles.length + existingImages.length > 4) {
      toast.warning('Maximum 4 images allowed', { position: "top-center" })
      return
    }

    const newImageFiles = [...imageFiles, ...files]
    setImageFiles(newImageFiles)

    const newPreviews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(prev => [...prev, ...newPreviews])
  }

  const removeNewImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    
    setImageFiles(newFiles)
    setImagePreviews(newPreviews)
    URL.revokeObjectURL(imagePreviews[index])
  }

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index))
  }

  // Upload new images
  const uploadImagesWithWatermark = async (files: File[]): Promise<string[]> => {
    try {
      const uploadFormData = new FormData()
      files.forEach(file => uploadFormData.append('images', file))
      uploadFormData.append('addWatermark', 'true')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!response.ok) throw new Error('Upload failed')
      
      const result = await response.json()
      if (result.success && result.urls) {
        return result.urls
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload failed:', error)
      // Fallback upload logic here
      return []
    }
  }

  // Calculate profit and markup
  const platformFee = formData.originalPrice 
    ? (parseFloat(formData.originalPrice) * 0.10).toFixed(0)
    : '0'

  const profit = platformFee

  const markupPercentage = formData.originalPrice && parseFloat(formData.originalPrice) > 0
    ? ((parseFloat(formData.price) - parseFloat(formData.originalPrice)) / parseFloat(formData.originalPrice) * 100).toFixed(1)
    : '0.0'

  // Handle form submission - COMPLETELY PREVENT AUTO-SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Only allow submission when we're on the images step AND the user explicitly clicked the submit button
    if (currentStep !== 'images') {
      console.log('Preventing submission: Not on images step')
      return
    }

    // Final validation before submission
    const error = validateCurrentStep()
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
      })
      return
    }

    setSaving(true)
    setFormSubmitted(true)

    try {
      // Upload new images if any
      let newImageUrls: string[] = []
      if (imageFiles.length > 0) {
        toast.info('Uploading new images...', { position: "top-center" })
        newImageUrls = await uploadImagesWithWatermark(imageFiles)
        toast.success('Images uploaded successfully!', { position: "top-center" })
      }

      // Combine existing and new images
      const allImages = [...existingImages, ...newImageUrls]

      // Check if we have at least one image
      if (allImages.length === 0) {
        toast.error('At least one product image is required', { position: "top-center" })
        setSaving(false)
        setFormSubmitted(false)
        return
      }

      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        category: mapCategoryToDBFormat(formData.category.trim()),
        subcategory: formData.subcategory ? formData.subcategory.trim() : "",
        images: allImages,
        description: formData.description.trim(),
        stock: parseInt(formData.stock) || 1,
        inStock: parseInt(formData.stock) > 0,
        specifications: formData.specifications,
        deliveryLocations: formData.deliveryLocations,
        deliveryTime: formData.deliveryTime.trim(),
        freeShipping: formData.freeShipping,
        warrantyPeriod: formData.warrantyPeriod,
        warrantyType: formData.warrantyType.trim()
      }

      toast.info('Updating product...', { position: "top-center" })
      
      const response = await fetch(`/api/sellers/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(productData)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to update product: ${errorText}`)
      }

      const result = await response.json()
      
      if (result.success) {
        toast.success('Product updated successfully!', { position: "top-center" })
        router.push('/seller/dashboard')
      } else {
        throw new Error(result.error || 'Failed to update product')
      }

    } catch (error: any) {
      toast.error(error.message || 'Failed to update product', { position: "top-center" })
      setFormSubmitted(false)
    } finally {
      setSaving(false)
    }
  }

  // Prevent form submission on Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep !== 'images') {
      e.preventDefault()
    }
  }

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Price (Birr) *
                    </label>
                    <input
                      type="number"
                      id="originalPrice"
                      name="originalPrice"
                      required
                      min="0"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={handlePriceChange}
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter the price you want to sell for</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">Final Selling Price:</span>
                      <Calculator className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-700">
                      Birr{formData.price || '0'}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      Includes 10% platform fee (Birr{profit})
                    </div>
                    {formData.originalPrice && (
                      <div className="text-xs text-green-600 mt-1">
                        Markup: {markupPercentage}%
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!formData.category}
                  >
                    <option value="">Select a subcategory</option>
                    {formData.category && subcategories[formData.category]?.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your product in detail..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Areas *
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add delivery area (e.g., Addis Ababa, Bole)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const input = e.target as HTMLInputElement
                        const value = input.value.trim()
                        if (value && !formData.deliveryLocations.includes(value)) {
                          setFormData(prev => ({
                            ...prev,
                            deliveryLocations: [...prev.deliveryLocations, value]
                          }))
                          input.value = ''
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder*="Add delivery area"]') as HTMLInputElement
                      const value = input?.value.trim()
                      if (value && !formData.deliveryLocations.includes(value)) {
                        setFormData(prev => ({
                          ...prev,
                          deliveryLocations: [...prev.deliveryLocations, value]
                        }))
                        input.value = ''
                      }
                    }}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                
                {formData.deliveryLocations.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.deliveryLocations.map((location, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {location}
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            deliveryLocations: prev.deliveryLocations.filter((_, i) => i !== index)
                          }))}
                          className="hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Delivery Time *
              </label>
              <input
                type="text"
                id="deliveryTime"
                name="deliveryTime"
                required
                value={formData.deliveryTime}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 2-3 days, 1 week, 3-5 business days, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="freeShipping"
                    name="freeShipping"
                    checked={formData.freeShipping}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="freeShipping" className="ml-2 text-sm font-medium text-gray-900">
                    Free Shipping
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="warrantyPeriod" className="block text-sm font-medium text-gray-700 mb-2">
                  Warranty Period
                </label>
                <select
                  id="warrantyPeriod"
                  name="warrantyPeriod"
                  value={formData.warrantyPeriod}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">No warranty</option>
                  <option value="1">1 month</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">1 year</option>
                  <option value="24">2 years</option>
                  <option value="36">3 years</option>
                  <option value="lifetime">Lifetime</option>
                </select>
              </div>
            </div>

            {formData.warrantyPeriod && (
              <div>
                <label htmlFor="warrantyType" className="block text-sm font-medium text-gray-700 mb-2">
                  Warranty Type / Details
                </label>
                <input
                  type="text"
                  id="warrantyType"
                  name="warrantyType"
                  value={formData.warrantyType}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Manufacturer warranty, Seller warranty, Limited warranty..."
                />
              </div>
            )}
          </div>
        )

      case 'specifications':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Specifications</h2>
              
              {categoryConfig ? (
                <div className="border border-gray-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setSpecsSectionOpen(!specsSectionOpen)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {categoryConfig.name} Specifications
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Update product specifications
                      </p>
                    </div>
                    {specsSectionOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {specsSectionOpen && (
                    <div className="px-6 pb-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {categoryConfig.specifications.map((spec) => (
                          <div key={spec.fieldName}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {spec.label} {spec.required && '*'}
                            </label>
                            
                            {spec.type === 'select' ? (
                              <select
                                value={formData.specifications[spec.fieldName] as string || ''}
                                onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required={spec.required}
                              >
                                <option value="">Select {spec.label}</option>
                                {spec.options?.map(option => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            ) : spec.type === 'number' ? (
                              <div className="flex items-center">
                                <input
                                  type="number"
                                  value={formData.specifications[spec.fieldName] as string || ''}
                                  onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
                                  onKeyDown={handleKeyDown}
                                  min={spec.min}
                                  max={spec.max}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  required={spec.required}
                                />
                                {spec.unit && (
                                  <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">
                                    {spec.unit}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <input
                                type="text"
                                value={formData.specifications[spec.fieldName] as string || ''}
                                onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required={spec.required}
                                placeholder={`Enter ${spec.label.toLowerCase()}`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Please select a category to see specifications</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'images':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Update Product</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Ready to Update Your Product?</h3>
                <p className="text-blue-700 mb-4">
                  Review your changes below. Click "Update Product" to save all changes, or go back to make adjustments.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-900">Product Name:</span>
                    <p className="text-blue-700">{formData.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-900">Category:</span>
                    <p className="text-blue-700">{formData.category} {formData.subcategory && `- ${formData.subcategory}`}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-900">Price:</span>
                    <p className="text-blue-700">Birr{formData.price} (Your price: Birr{formData.originalPrice})</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-900">Stock:</span>
                    <p className="text-blue-700">{formData.stock} units</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Automatic Watermark Protection
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>New uploaded images will be automatically watermarked with "yafrican.com"</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Current Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {existingImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Existing ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* New Images */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`New ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {(imagePreviews.length + existingImages.length) < 4 && (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Add Image</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <p className="text-sm text-gray-500">
                  Maximum 4 images total. {existingImages.length} current + {imagePreviews.length} new = {existingImages.length + imagePreviews.length}/4
                </p>
              </div>
            </div>

            {/* Price Summary */}
            {formData.originalPrice && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className="text-gray-600 mb-1">Your Price</div>
                    <div className="text-2xl font-bold text-gray-900">Birr{parseFloat(formData.originalPrice).toFixed(0)}</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className="text-gray-600 mb-1">Platform Fee (10%)</div>
                    <div className="text-2xl font-bold text-yellow-600">Birr{profit}</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-gray-600 mb-1">Final Price</div>
                    <div className="text-2xl font-bold text-green-700">Birr{formData.price}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600 mt-2">Update your product information and images</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="hidden md:flex items-center space-x-8">
              {steps.map((step, index) => {
                const stepIndex = steps.findIndex(s => s.id === step.id)
                const currentStepIndex = steps.findIndex(s => s.id === currentStep)
                const isCompleted = stepIndex < currentStepIndex
                const isCurrent = step.id === currentStep

                return (
                  <li key={step.id} className="flex-1">
                    <div className="flex items-center">
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-blue-600' 
                          : isCurrent 
                            ? 'bg-blue-600 border-2 border-blue-600' 
                            : 'bg-gray-200'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className={`text-sm font-medium ${
                            isCurrent ? 'text-white' : 'text-gray-500'
                          }`}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className={`text-sm font-medium ${
                          isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {step.name}
                        </div>
                        <div className="text-sm text-gray-500">{step.description}</div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 ml-8 ${
                          stepIndex < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium text-gray-900">
                  Step {steps.findIndex(s => s.id === currentStep) + 1} of {steps.length}
                </div>
                <div className="text-sm text-gray-500">
                  {steps.find(s => s.id === currentStep)?.name}
                </div>
              </div>
              
              <div className="flex space-x-2">
                {steps.map((step, index) => {
                  const stepIndex = steps.findIndex(s => s.id === step.id)
                  const currentStepIndex = steps.findIndex(s => s.id === currentStep)
                  const isCompleted = stepIndex < currentStepIndex
                  const isCurrent = step.id === currentStep

                  return (
                    <div
                      key={step.id}
                      className={`flex-1 h-2 rounded-full ${
                        isCompleted 
                          ? 'bg-blue-600' 
                          : isCurrent 
                            ? 'bg-blue-600' 
                            : 'bg-gray-200'
                      }`}
                    />
                  )
                })}
              </div>
            </div>
          </nav>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          {/* Remove the form tag completely to prevent any auto-submission */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-200 mt-8 gap-4">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 'basic'}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-2 sm:order-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto order-1 sm:order-2">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  Cancel
                </button>

                {currentStep === 'images' ? (
                  <button
                    type="button" // Changed to type="button"
                    onClick={handleSubmit} // Manually call handleSubmit
                    disabled={saving}
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Update Product
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}