
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Upload, X, Plus, Calculator, ChevronDown, ChevronUp, ArrowRight, ArrowLeft as LeftIcon } from 'lucide-react'
import { getCategoryConfig } from '@/lib/categories'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Add this interface near your other interfaces
interface ProductVariationForm {
  sku?: string
  attributes: {
    [key: string]: string
  }
  price?: string
  stock: string
  image?: string
  specifications?: { // Add this line
    [key: string]: string | number | boolean
  }
}

// Add this to your existing interfaces if not already there
interface ProductAttributeForm {
  name: string
  values: string[]
  type: 'select' | 'color' | 'text' | 'number'
  required: boolean
}
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
    deliveryLocations: string[] // Add this
     deliveryTime: string // Add this line
freeShipping: boolean
  warrantyPeriod: string
  warrantyType: string
   productType: 'simple' | 'variable' // NEW
  attributes?: ProductAttributeForm[] // NEW
  variations?: ProductVariationForm[] // NEW
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
    'Jewelry and Accessories': 'JEWELRY_ACCESSORIES',  // ✅ Maps to FASHION in DB
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

// Mapping for category config (what getCategoryConfig expects)
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

    'Jewelry and Accessories': 'Jewelry and Accessories',  // ✅ This should match your lib/categories
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

export default function CreateProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>('basic')
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [specsSectionOpen, setSpecsSectionOpen] = useState(false)
const [showVariableProductSection, setShowVariableProductSection] = useState(false)
const [currentAttributes, setCurrentAttributes] = useState<ProductAttributeForm[]>([])
const [currentVariations, setCurrentVariations] = useState<ProductVariationForm[]>([])
const [selectedAttributeValues, setSelectedAttributeValues] = useState<{[key: string]: string}>({})

// ============= ADD THE VariableProductSection COMPONENT HERE =============
// ============= UPDATED VariableProductSection COMPONENT =============
const VariableProductSection = () => {
  const [newAttribute, setNewAttribute] = useState({
    name: '',
    values: '',
    type: 'select' as const,
    required: true
  })

  const [selectedCombinations, setSelectedCombinations] = useState<{[key: string]: string}[]>([])
  const [currentSelection, setCurrentSelection] = useState<{[key: string]: string}>({})
  const [batchPrice, setBatchPrice] = useState('')
  const [batchStock, setBatchStock] = useState('')

  const categoryConfig = formData.category ? getCategoryConfig(
    mapToConfigCategory(formData.category), 
    formData.subcategory
  ) : null

  // Get variable attributes from category config
  useEffect(() => {
    if (categoryConfig?.variableAttributes) {
      const currentAttributesString = JSON.stringify(currentAttributes)
      const newAttributesString = JSON.stringify(categoryConfig.variableAttributes)
      
      if (currentAttributesString !== newAttributesString) {
        setCurrentAttributes(categoryConfig.variableAttributes)
        // Reset selections when attributes change
        setSelectedCombinations([])
        setCurrentSelection({})
      }
    }
  }, [categoryConfig?.variableAttributes])

 // In the main component (outside VariableProductSection)
const calculateFinalPrice = (basePrice: string): string => {
  if (!basePrice || isNaN(parseFloat(basePrice))) return ''
  const price = parseFloat(basePrice)
  const finalPrice = price + (price * 0.10)
  
  // Round to nearest 5 Birr - 1449=1450, 1446=1445
  const roundedPrice = Math.round(finalPrice / 5) * 5
  return roundedPrice > 0 ? roundedPrice.toString() : '0'
}

  const addCustomAttribute = () => {
    if (!newAttribute.name.trim() || !newAttribute.values.trim()) return
    
    const valuesArray = newAttribute.values.split(',').map(v => v.trim()).filter(v => v)
    
    if (valuesArray.length === 0) return
    
    const attribute: ProductAttributeForm = {
      name: newAttribute.name.trim(),
      values: valuesArray,
      type: newAttribute.type,
      required: newAttribute.required
    }
    
    const updatedAttributes = [...currentAttributes, attribute]
    setCurrentAttributes(updatedAttributes)
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      attributes: updatedAttributes
    }))
    
    // Reset form
    setNewAttribute({
      name: '',
      values: '',
      type: 'select',
      required: true
    })
    
    // Reset current selection for new attribute
    setCurrentSelection({})
    setSelectedCombinations([])
  }

  const removeAttribute = (index: number) => {
    const updatedAttributes = currentAttributes.filter((_, i) => i !== index)
    setCurrentAttributes(updatedAttributes)
    
    setFormData(prev => ({
      ...prev,
      attributes: updatedAttributes
    }))
    
    // Also remove variations that had this attribute
    const updatedVariations = currentVariations.filter(variation => {
      const attrName = currentAttributes[index].name
      return !(attrName in variation.attributes)
    })
    setCurrentVariations(updatedVariations)
    setFormData(prev => ({
      ...prev,
      variations: updatedVariations
    }))
    
    // Reset selections
    setCurrentSelection({})
    setSelectedCombinations([])
  }

  const handleAttributeSelect = (attributeName: string, value: string) => {
    const newSelection = {
      ...currentSelection,
      [attributeName]: value
    }
    setCurrentSelection(newSelection)
  }

const addSelectedCombination = () => {
  // Check if all attributes have a selection
  const hasAllSelections = currentAttributes.every(attr => 
    currentSelection[attr.name] && attr.values.includes(currentSelection[attr.name])
  )
  
  if (!hasAllSelections) {
    toast.error('Please select a value for each attribute', {
      position: "top-center",
      autoClose: 3000,
    })
    return
  }
  
  // Check if this combination already exists
  const combinationExists = selectedCombinations.some(combination => {
    return JSON.stringify(combination) === JSON.stringify(currentSelection)
  })
  
  if (combinationExists) {
    toast.warning('This combination already exists', {
      position: "top-center",
      autoClose: 3000,
    })
    return
  }
  
  // Add to selected combinations
  setSelectedCombinations(prev => [...prev, {...currentSelection}])
  
  // ✅ FIX: Start with EMPTY price for new variations
  // This allows sellers to set individual prices for each variation
  const variation: ProductVariationForm = {
    attributes: {...currentSelection},
    stock: '0',
    price: '' // ✅ Start empty, not with default price
  }
  
  const updatedVariations = [...currentVariations, variation]
  setCurrentVariations(updatedVariations)
  setFormData(prev => ({
    ...prev,
    variations: updatedVariations
  }))
  
  // Reset current selection for next combination
  setCurrentSelection({})
  
  toast.success('Variation added! Set price and stock for this combination.', {
    position: "top-center",
    autoClose: 3000,
  })
}

  const removeVariation = (index: number) => {
    const updatedVariations = currentVariations.filter((_, i) => i !== index)
    setCurrentVariations(updatedVariations)
    
    // Also remove from selected combinations
    const updatedCombinations = selectedCombinations.filter((_, i) => i !== index)
    setSelectedCombinations(updatedCombinations)
    
    setFormData(prev => ({
      ...prev,
      variations: updatedVariations
    }))
    
    toast.success('Variation removed', {
      position: "top-center",
      autoClose: 2000,
    })
  }

  const updateVariation = (index: number, field: keyof ProductVariationForm, value: string) => {
  const updatedVariations = [...currentVariations]
  
  if (field === 'price') {
    // ✅ Only apply platform fee if a price is entered
    if (value.trim() === '') {
      updatedVariations[index] = {
        ...updatedVariations[index],
        [field]: ''
      }
    } else {
      const finalPrice = calculateFinalPrice(value)
      updatedVariations[index] = {
        ...updatedVariations[index],
        [field]: finalPrice
      }
    }
  } else {
    updatedVariations[index] = {
      ...updatedVariations[index],
      [field]: value
    }
  }
  
  setCurrentVariations(updatedVariations)
  setFormData(prev => ({
    ...prev,
    variations: updatedVariations
  }))
}

  const calculateTotalStock = () => {
    return currentVariations.reduce((total, variation) => total + parseInt(variation.stock || '0'), 0)
  }

 const applyBatchPrice = () => {
  if (!batchPrice || isNaN(parseFloat(batchPrice))) {
    toast.error('Please enter a valid price', {
      position: "top-center",
      autoClose: 3000,
    })
    return
  }
  
  // Apply 10% platform fee to batch price
  const finalPrice = calculateFinalPrice(batchPrice)
  
  // ✅ Only apply to variations that DON'T have a price yet
  const updatedVariations = currentVariations.map(variation => {
    if (!variation.price || variation.price.trim() === '') {
      return {
        ...variation,
        price: finalPrice
      }
    }
    return variation // Keep existing price
  })
  
  setCurrentVariations(updatedVariations)
  setFormData(prev => ({
    ...prev,
    variations: updatedVariations
  }))
  
  const appliedCount = currentVariations.filter(v => !v.price || v.price.trim() === '').length
  toast.success(`Price set for ${appliedCount} variations without prices`, {
    position: "top-center",
    autoClose: 3000,
  })
  
  setBatchPrice('')
}
  

const applyBatchStock = () => {
  if (!batchStock || isNaN(parseInt(batchStock))) {
    toast.error('Please enter a valid stock quantity', {
      position: "top-center",
      autoClose: 3000,
    })
    return
  }
  
  // ✅ Only apply to variations that DON'T have stock yet
  const updatedVariations = currentVariations.map(variation => {
    if (!variation.stock || parseInt(variation.stock) === 0) {
      return {
        ...variation,
        stock: batchStock
      }
    }
    return variation // Keep existing stock
  })
  
  setCurrentVariations(updatedVariations)
  setFormData(prev => ({
    ...prev,
    variations: updatedVariations
  }))
  
  const appliedCount = currentVariations.filter(v => !v.stock || parseInt(v.stock) === 0).length
  toast.success(`Stock set to ${batchStock} for ${appliedCount} variations`, {
    position: "top-center",
    autoClose: 3000,
  })
  
  setBatchStock('')
}
const calculatePriceRange = () => {
  if (currentVariations.length === 0) return { min: 0, max: 0 }
  
  // Filter out variations without prices
  const prices = currentVariations
    .map(v => parseFloat(v.price || '0'))
    .filter(p => !isNaN(p) && p > 0)
    
  if (prices.length === 0) return { min: 0, max: 0 }
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
}

  const clearAllVariations = () => {
    setCurrentVariations([])
    setSelectedCombinations([])
    setFormData(prev => ({
      ...prev,
      variations: []
    }))
    
    toast.success('All variations cleared', {
      position: "top-center",
      autoClose: 2000,
    })
  }

  return (
    <div className="space-y-6">
      {/* Product Type Selection */}
      <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Product Type</h3>
            <p className="text-sm text-gray-600 mt-1">
              Choose between a simple product or a variable product with different options
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({...prev, productType: 'simple'}))
                setShowVariableProductSection(false)
              }}
              className={`px-6 py-3 rounded-lg border transition-all duration-300 flex items-center gap-2 ${
                formData.productType === 'simple'
                  ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg 
                className={`w-4 h-4 ${formData.productType === 'simple' ? 'text-blue-600' : 'text-gray-500'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Simple Product
            </button>
            
            <div className="text-gray-300 hidden md:block">|</div>
            
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({...prev, productType: 'variable'}))
                setShowVariableProductSection(true)
              }}
              className={`px-6 py-3 rounded-lg border transition-all duration-300 flex items-center gap-2 ${
                formData.productType === 'variable'
                  ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg 
                className={`w-4 h-4 ${formData.productType === 'variable' ? 'text-blue-600' : 'text-gray-500'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Variable Product
            </button>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="mt-4">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
            formData.productType === 'simple' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-purple-100 text-purple-800'
          }`}>
            <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
            {formData.productType === 'simple' 
              ? 'Simple product with fixed options' 
              : 'Variable product with multiple options'}
          </div>
        </div>
      </div>

      {/* Variable Product Options */}
      {formData.productType === 'variable' && (
        <div className="space-y-6">
          {/* Category-based Attributes Notification */}
          {categoryConfig?.variableAttributes && categoryConfig.variableAttributes.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="text-sm font-medium text-green-800">
                    This category has pre-defined attributes
                  </span>
                  <p className="text-sm text-green-700 mt-1">
                    Select values for each attribute to create your variations
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Attribute Selection Builder */}
          {currentAttributes.length > 0 && (
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Build Your Variations</h3>
              <p className="text-sm text-gray-600 mb-6">
                Select values for each attribute to create specific variations you want to sell
              </p>
              
              {/* Attribute Value Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {currentAttributes.map((attr, attrIndex) => (
                  <div key={attr.name} className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      {attr.name} {attr.required && '*'}
                    </label>
                    
                    {/* Display values as buttons/select based on type */}
                    <div className="flex flex-wrap gap-2">
                      {attr.values.map(value => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleAttributeSelect(attr.name, value)}
                          className={`px-3 py-2 rounded-lg border text-sm transition-all duration-200 ${
                            currentSelection[attr.name] === value
                              ? 'bg-blue-100 border-blue-300 text-blue-700 font-medium'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {attr.type === 'color' ? (
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: value.toLowerCase() }}
                              />
                              {value}
                            </div>
                          ) : value}
                        </button>
                      ))}
                    </div>
                    
                    {/* Selected indicator */}
                    {currentSelection[attr.name] && (
                      <div className="text-sm text-green-600 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Selected: <span className="text-gray-900">{currentSelection[attr.name]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Add Combination Button */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {selectedCombinations.length} combination(s) created
                </div>
                <button
                  type="button"
                  onClick={addSelectedCombination}
                  disabled={!currentAttributes.every(attr => currentSelection[attr.name])}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add This Combination
                </button>
              </div>
              
              {/* Current Combination Preview */}
              {currentAttributes.every(attr => currentSelection[attr.name]) && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-blue-800">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Ready to add:
                    </div>
                    <div className="text-sm font-medium text-blue-900">
                      {currentAttributes.map(attr => currentSelection[attr.name]).join(' + ')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Custom Attributes Section */}
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Custom Attributes</h3>
            <p className="text-sm text-gray-600 mb-4">Add additional attributes if needed</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attribute Name
                </label>
                <input
                  type="text"
                  value={newAttribute.name}
                  onChange={(e) => setNewAttribute(prev => ({...prev, name: e.target.value}))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Size, Color, Material"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Values (comma separated)
                </label>
                <input
                  type="text"
                  value={newAttribute.values}
                  onChange={(e) => setNewAttribute(prev => ({...prev, values: e.target.value}))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Small, Medium, Large"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addCustomAttribute}
                  disabled={!newAttribute.name.trim() || !newAttribute.values.trim()}
                  className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add Attribute
                </button>
              </div>
            </div>

            {/* Display Current Attributes */}
            {currentAttributes.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Current Attributes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentAttributes.map((attr, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{attr.name}</span>
                            <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded">
                              {attr.type}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="text-xs text-gray-500 mb-1">Available values:</div>
                            <div className="flex flex-wrap gap-1">
                              {attr.values.map((value, valueIndex) => (
                                <span 
                                  key={valueIndex} 
                                  className="text-xs px-2 py-1 bg-white border border-gray-300 rounded text-gray-700"
                                >
                                  {value}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttribute(index)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Variations Management */}
          {currentVariations.length > 0 && (
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Manage Your Variations</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Set price and stock for each variation you've created. Prices include 10% platform fee.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium text-gray-900">
                    Total Stock: <span className="text-blue-600">{calculateTotalStock()}</span> units
                  </div>
                  <button
                    type="button"
                    onClick={clearAllVariations}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Batch Edit Section - SIMPLIFIED */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Batch Operations</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Set Price for All Variations
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-xs">Birr</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={batchPrice}
                          onChange={(e) => setBatchPrice(e.target.value)}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Your price"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={applyBatchPrice}
                        disabled={!batchPrice || isNaN(parseFloat(batchPrice))}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Your price + 10% platform fee will be applied
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Set Stock for All Variations
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        value={batchStock}
                        onChange={(e) => setBatchStock(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Stock quantity"
                      />
                      <button
                        type="button"
                        onClick={applyBatchStock}
                        disabled={!batchStock || isNaN(parseInt(batchStock))}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => {
                        const updatedVariations = currentVariations.map(v => ({
                          ...v,
                          stock: '0'
                        }))
                        setCurrentVariations(updatedVariations)
                        setFormData(prev => ({
                          ...prev,
                          variations: updatedVariations
                        }))
                        toast.success('Reset all stock to 0')
                      }}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 border border-gray-300"
                    >
                      Reset All Stock to 0
                    </button>
                  </div>
                </div>
              </div>

              {/* Variations Table */}
<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead>
      <tr className="bg-gray-50">
        {currentAttributes.map(attr => (
          <th key={attr.name} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {attr.name}
          </th>
        ))}
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Your Price (Birr)
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Final Price (Birr)
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Stock
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {currentVariations.map((variation, index) => {
        // ✅ Calculate seller's price from stored final price
       const finalPrice = parseFloat(variation.price || '0')
  const sellerPrice = finalPrice > 0 ? Math.round(finalPrice / 1.10) : '' 
        return (
          <tr key={index} className="hover:bg-gray-50 transition-colors">
            {currentAttributes.map(attr => (
              <td key={attr.name} className="px-4 py-3">
                <div className="flex items-center">
                  {attr.type === 'color' ? (
                    <>
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300 mr-2 shrink-0"
                        style={{ backgroundColor: variation.attributes[attr.name]?.toLowerCase() || '#ccc' }}
                      />
                      <span className="text-sm text-gray-900">{variation.attributes[attr.name] || '—'}</span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-900">{variation.attributes[attr.name] || '—'}</span>
                  )}
                </div>
              </td>
            ))}
            
            <td className="px-4 py-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-xs">Birr</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={sellerPrice}
                  onChange={(e) => {
                    const sellerPriceValue = parseFloat(e.target.value) || 0
                    if (sellerPriceValue > 0) {
                      // Calculate final price with 10% platform fee
                      const finalPriceValue = sellerPriceValue + (sellerPriceValue * 0.10)
                      const roundedPrice = Math.round(finalPriceValue / 5) * 5
                      updateVariation(index, 'price', roundedPrice.toString())
                    } else {
                      updateVariation(index, 'price', '')
                    }
                  }}
                  className="pl-10 w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0"
                />
              </div>
            </td>
            
            <td className="px-4 py-3">
              <div className="text-sm font-medium text-green-600">
                {variation.price ? `Birr${variation.price}` : 'Not set'}
              </div>
              {variation.price && (
                <div className="text-xs text-gray-500">
                  (Includes 10% platform fee)
                </div>
              )}
            </td>
            
            <td className="px-4 py-3">
              <input
                type="number"
                min="0"
                value={variation.stock}
                onChange={(e) => updateVariation(index, 'stock', e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="0"
              />
            </td>
            
            <td className="px-4 py-3">
              <button
                type="button"
                onClick={() => removeVariation(index)}
                className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                title="Remove variation"
              >
                <X className="w-4 h-4" />
              </button>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
</div>

              {/* Variations Summary */}
              {currentVariations.length > 0 && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-900">Number of Variations</div>
                    <div className="text-2xl font-bold text-blue-700 mt-1">{currentVariations.length}</div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-900">Total Stock</div>
                    <div className="text-2xl font-bold text-green-700 mt-1">{calculateTotalStock()}</div>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-purple-900">Price Range</div>
                    <div className="text-2xl font-bold text-purple-700 mt-1">
                      Birr{calculatePriceRange().min} - Birr{calculatePriceRange().max}
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-yellow-900">Average Price</div>
                    <div className="text-2xl font-bold text-yellow-700 mt-1">
                      Birr{currentVariations.length > 0 
                        ? Math.round(currentVariations.reduce((sum, v) => sum + parseFloat(v.price || '0'), 0) / currentVariations.length)
                        : 0}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty State */}
          {currentVariations.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No variations yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Select values for each attribute above and click "Add This Combination" to create your first variation.
              </p>
              <p className="text-sm text-gray-500">
                You'll be able to set individual prices and stock for each variation. Prices will include 10% platform fee.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ============= END OF VariableProductSection COMPONENT =============
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    description: '',
    stock: '1',
    images: [],
    deliveryLocations: [], // Add this - empty array initially
      deliveryTime: '', // Add this - empty string initially
freeShipping: false,
  warrantyPeriod: '',
  warrantyType: '',
    specifications: {},
    productType: 'simple', // Default to simple
  attributes: [], // Empty array for attributes
  variations: [] // Empty array for variations
  })

  // Updated categories list matching your new structure
  const categories = [
    'Electronics',
    'Vehicles',
    'Property',
    'Home, Furniture & Appliances',
    'Clothing',
      'Jewelry and Accessories',     // ✅ New category
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

  // Updated subcategories matching your comprehensive structure
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
    'Jewelry',
    'Watches', 
    'Bags & Purses',
    'Sunglasses & Eyewear',
    'Belts & Wallets'
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

  // Use the mapping for category config
  const categoryConfig = formData.category ? getCategoryConfig(
    mapToConfigCategory(formData.category), 
    formData.subcategory
  ) : null

  // Progress steps
  const steps = [
    { id: 'basic', name: 'Basic Information', description: 'Product details' },
    { id: 'specifications', name: 'Specifications', description: 'Product specs' },
    { id: 'images', name: 'Images & Finalize', description: 'Upload images' }
  ]

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url))
    }
  }, [imagePreviews])

  // Reset specifications when category changes
  useEffect(() => {
    if (formData.category) {
      setFormData(prev => ({
        ...prev,
        specifications: {}
      }))
      setSpecsSectionOpen(true)
    }
  }, [formData.category])

  // Form validation for current step
  const validateCurrentStep = (): string | null => {
    switch (currentStep) {
      case 'basic':
        if (!formData.name.trim()) return 'Product name is required'
        if (!formData.originalPrice || parseFloat(formData.originalPrice) <= 0) return 'Valid original price is required'
        if (!formData.price || parseFloat(formData.price) <= 0) return 'Valid selling price is required'
        if (!formData.category) return 'Category is required'
        if (!formData.description.trim()) return 'Description is required'
          // Stock validation based on product type
  if (formData.productType === 'simple') {
    if (!formData.stock || parseInt(formData.stock) < 0) return 'Valid stock quantity is required'
  } else if (formData.productType === 'variable') {
    // Check if variations have stock
    const hasVariationStock = formData.variations?.some(v => parseInt(v?.stock || '0') > 0)
    if (!hasVariationStock) return 'At least one variation must have stock'
  }
        // if (!formData.stock || parseInt(formData.stock) < 0) return 'Valid stock quantity is required'
        if (formData.deliveryLocations.length === 0) return 'Please add at least one delivery area'
  return null
         if (!formData.deliveryTime.trim()) return 'Please enter an estimated delivery time' // Add this line

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
        if (imageFiles.length === 0) return 'Please upload at least one product image'
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
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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

 // In the VariableProductSection component
const calculateFinalPrice = (basePrice: string): string => {
  if (!basePrice || isNaN(parseFloat(basePrice))) return ''
  const price = parseFloat(basePrice)
  const finalPrice = price + (price * 0.10)
  
  // Round to nearest 5 Birr - 1449=1450, 1446=1445
  const roundedPrice = Math.round(finalPrice / 5) * 5
  return roundedPrice.toString() // Don't convert to string if showing as number
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length + imageFiles.length > 4) {
      toast.warning('Maximum 4 images allowed', {
        position: "top-center",
        autoClose: 3000,
      })
      return
    }

    const newImageFiles = [...imageFiles, ...files]
    setImageFiles(newImageFiles)

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    
    setImageFiles(newFiles)
    setImagePreviews(newPreviews)
    
    URL.revokeObjectURL(imagePreviews[index])
  }

  // Handle basic form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name !== 'originalPrice') {
      setFormData(prev => ({
        ...prev,
        [name]: value
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

  // Upload images with watermark using API route
  const uploadImagesWithWatermark = async (files: File[]): Promise<string[]> => {
    try {
      console.log('📤 Starting upload with watermark via API...');
      
      const uploadFormData = new FormData();
      files.forEach(file => {
        uploadFormData.append('images', file);
      });

      uploadFormData.append('addWatermark', 'true');

      console.log('🔄 Sending to upload API with watermark flag...');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      console.log('📤 Upload API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Upload API error:', errorText);
        throw new Error(`Upload failed: HTTP ${response.status}`);
      }

      const result = await response.json();
      console.log('📤 Upload API result:', result);

      if (result.success && result.urls) {
        console.log('✅ API upload with watermark successful:', result.urls);
        console.log('📝 Message:', result.message);
        return result.urls;
      } else {
        throw new Error(result.error || 'Upload failed - no URLs returned');
      }
    } catch (error) {
      console.error('❌ API upload with watermark error:', error);
      
      // Fallback: Try without watermark
      console.log('🔄 Falling back to upload without watermark...');
      try {
        const uploadFormData = new FormData();
        files.forEach(file => {
          uploadFormData.append('images', file);
        });
        
        const fallbackResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (fallbackResponse.ok) {
          const fallbackResult = await fallbackResponse.json();
          if (fallbackResult.success && fallbackResult.urls) {
            console.log('✅ Fallback upload successful (no watermark):', fallbackResult.urls);
            return fallbackResult.urls;
          }
        }
      } catch (fallbackError) {
        console.error('❌ Fallback upload also failed:', fallbackError);
      }
      
      // Final fallback to direct Cloudinary
      console.log('🔄 Final fallback to direct Cloudinary...');
      return await uploadImagesToCloudinary(files);
    }
  };

  // Fallback: Upload images to Cloudinary without watermark
  const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
    try {
      console.log('📤 Starting Cloudinary direct upload...')
      const uploadedUrls: string[] = []

      for (const file of files) {
        try {
          if (!file.type.startsWith('image/')) {
            throw new Error(`File ${file.name} is not an image`)
          }

          const formData = new FormData()
          formData.append('file', file)

          formData.append('upload_preset', 'ml_default')
          formData.append('cloud_name', 'dxuhyn4ue')
          
          console.log(`📤 Uploading to Cloudinary: ${file.name}`)
          
          const response = await fetch(`https://api.cloudinary.com/v1_1/dxuhyn4ue/image/upload`, {
            method: 'POST',
            body: formData,
          })
          
          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error?.message || `HTTP ${response.status}`)
          }
          
          const data = await response.json()
          
          if (data.secure_url) {
            console.log(`✅ Cloudinary upload successful: ${data.secure_url}`)
            uploadedUrls.push(data.secure_url)
          } else {
            throw new Error('No secure_url in response')
          }
        } catch (fileError) {
          console.error(`❌ Error uploading file ${file.name}:`, fileError)
          throw fileError
        }
      }

      if (uploadedUrls.length === 0) {
        throw new Error('All Cloudinary uploads failed')
      }

      return uploadedUrls

    } catch (error) {
      console.error('❌ Cloudinary upload error:', error)
      const placeholderUrls = files.map((_, index) => 
        `https://via.placeholder.com/400x400/007bff/ffffff?text=Product+${index + 1}`
      )
      console.log('📸 Using fallback placeholder URLs:', placeholderUrls)
      return placeholderUrls
    }
  }

  // Handle final form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const validationError = validateCurrentStep()
  if (validationError) {
    toast.error(validationError, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    return
  }

  setLoading(true)

  try {
    // Step 1: Upload images with watermark
    toast.info('Uploading images with watermark...', {
      position: "top-center",
      autoClose: 2000,
    })
    
    console.log('📤 Uploading images with watermark...')
    const imageUrls = await uploadImagesWithWatermark(imageFiles)
    console.log('✅ Images uploaded successfully with watermark:', imageUrls)

    // Build the product data object
    const productData: any = {
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      category: mapCategoryToDBFormat(formData.category.trim()),
      subcategory: formData.subcategory ? formData.subcategory.trim() : "",
      images: imageUrls,
      description: formData.description.trim(),
      // ✅ FIX: Add the stock field back
      stock: parseInt(formData.stock) || 1, // Always send the stock value from form
      inStock: formData.productType === 'simple' 
        ? parseInt(formData.stock) > 0 
        : (formData.variations?.some(v => parseInt(v.stock || '0') > 0) || false),
      status: 'pending',
      specifications: formData.specifications,
      deliveryLocations: formData.deliveryLocations,
      deliveryTime: formData.deliveryTime.trim(),
      freeShipping: formData.freeShipping,
      warrantyPeriod: formData.warrantyPeriod,
      warrantyType: formData.warrantyType.trim(),
      productType: formData.productType,
    }

    // Add variable product data if applicable
    if (formData.productType === 'variable' && formData.variations && formData.variations.length > 0) {
      productData.attributes = formData.attributes || []
      productData.variations = formData.variations.map(v => ({
        ...v,
        price: v.price ? parseFloat(v.price) : parseFloat(formData.price),
        stock: parseInt(v.stock || '0'),
        specifications: v.specifications || {}
      }))
      
      // ✅ ADD: For variable products, check both main stock AND variations for inStock
      const hasMainStock = parseInt(formData.stock) > 0
      const hasVariationStock = formData.variations.some(v => parseInt(v.stock || '0') > 0)
      productData.inStock = hasMainStock || hasVariationStock
    }

    // DEBUG: Check what's being sent
    const hasVariations = productData.variations && productData.variations.length > 0
    const variationsCount = productData.variations?.length || 0
    
    console.log('📤 SENDING PRODUCT DATA TO API:', {
      productType: productData.productType,
      hasVariations: hasVariations,
      variationsCount: variationsCount,
      isVariableProduct: productData.productType === 'variable',
      // ⭐⭐⭐⭐ ADD THIS LOG FOR STOCK ⭐⭐⭐⭐
      mainProductStock: productData.stock,
      mainProductInStock: productData.inStock,
      variations: productData.variations?.slice(0, 2) || [], // Show first 2
      fullData: productData
    })

    // Send to your products API
    const response = await fetch('/api/sellers/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
      credentials: 'include',
    })

    console.log('📦 Products API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Products API error response:', errorText)
      throw new Error(`Failed to create product: HTTP ${response.status}`)
    }

    const result = await response.json()
    console.log('📦 Products API response:', result)

    if (result.success) {
      console.log('✅ Product created successfully:', result.product)
      toast.success('Product created successfully with watermarked images! Awaiting admin approval.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      router.push('/seller/dashboard')
    } else {
      throw new Error(result.error || result.message || 'Failed to create product')
    }

  } catch (error) {
    console.error('❌ Product creation process failed:', error)
    toast.error(error instanceof Error ? error.message : 'Failed to create product. Please check console for details.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  } finally {
    setLoading(false)
  }
}
  // Calculate profit and markup
  // Calculate profit and markup with accurate platform fee
const platformFee = formData.originalPrice 
  ? (parseFloat(formData.originalPrice) * 0.10).toFixed(0)
  : '0'

const profit = platformFee

const markupPercentage = formData.originalPrice && parseFloat(formData.originalPrice) > 0
  ? ((parseFloat(formData.price) - parseFloat(formData.originalPrice)) / parseFloat(formData.originalPrice) * 100).toFixed(1)
  : '0.0'
// Calculate profit and markup with accurate rounding
// const actualPlatformFee = formData.originalPrice 
//   ? (parseFloat(formData.originalPrice) * 0.10).toFixed(0)
//   : '0'

// const actualProfit = formData.originalPrice && formData.price 
//   ? (parseFloat(formData.price) - parseFloat(formData.originalPrice)).toFixed(0)
//   : '0'

// const profit = actualProfit

// const markupPercentage = formData.originalPrice && parseFloat(formData.originalPrice) > 0
//   ? ((parseFloat(formData.price) - parseFloat(formData.originalPrice)) / parseFloat(formData.originalPrice) * 100).toFixed(1)
//   : '0.0'

  // Render current step content
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="space-y-4">
                  {/* Original Price Input */}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter the price you want to sell for</p>
                  </div>

                  {/* Final Price Display */}
{/* Final Price Display */}
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm font-medium text-blue-900">Final Selling Price:</span>
    <Calculator className="w-4 h-4 text-blue-600" />
  </div>
  <div className="text-2xl font-bold text-blue-700">
    Birr{formData.price || '0'}
  </div>
  <div className="text-xs text-blue-600 mt-1">
    Includes 10% platform fee (Birr{profit} profit)
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={!formData.category}
                  >
                    <option value="">Select a subcategory</option>
                    {formData.category && subcategories[formData.category]?.map(sub => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
<div className="mt-6">
        <VariableProductSection />
      </div>
            {/* Description */}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your product in detail..."
              />
            </div>
            {/* Delivery Locations */}
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
    
    {/* Selected locations */}
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
    
    <p className="text-sm text-gray-500">
      Add areas where you can deliver this product. Press Enter or click Add to add each location.
    </p>
  </div>
</div>
{/* Add Custom Delivery Time Input */}
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 2-3 days, 1 week, 3-5 business days, etc."
        />
        <p className="text-sm text-gray-500 mt-1">
          Enter your estimated delivery time (e.g., "2-3 days", "1 week", "3-5 business days")
        </p>
      </div>
      {/* ✅ ADD FREE SHIPPING & WARRANTY FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Shipping Toggle */}
        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="freeShipping"
              name="freeShipping"
              checked={formData.freeShipping}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                freeShipping: e.target.checked
              }))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="freeShipping" className="ml-2 text-sm font-medium text-gray-900">
              Free Shipping
            </label>
          </div>
          <div className="text-sm text-gray-500">
            Offer free shipping to customers
          </div>
        </div>

        {/* Warranty Period */}
        <div>
          <label htmlFor="warrantyPeriod" className="block text-sm font-medium text-gray-700 mb-2">
            Warranty Period
          </label>
          <select
            id="warrantyPeriod"
            name="warrantyPeriod"
            value={formData.warrantyPeriod}
            onChange={handleInputChange}
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

      {/* Warranty Type Description */}
      {formData.warrantyPeriod && formData.warrantyPeriod !== '' && (
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Manufacturer warranty, Seller warranty, Limited warranty..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Describe the type of warranty coverage
          </p>
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
                        Add detailed specifications for your product
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required={spec.required}
                              >
                                <option value="">Select {spec.label}</option>
                                {spec.options?.map(option => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            ) : spec.type === 'number' ? (
                              <div className="flex items-center">
                                <input
                                  type="number"
                                  value={formData.specifications[spec.fieldName] as string || ''}
                                  onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required={spec.required}
                                placeholder={`Enter ${spec.label.toLowerCase()}`}
                              />
                            )}
                            
                            {spec.unit && spec.type !== 'number' && (
                              <span className="text-sm text-gray-500 ml-2">{spec.unit}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">Please select a category in the Basic Information step to see specifications</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'images':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Images</h2>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images *
              </label>
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
                      <p>
                        All uploaded images will be automatically watermarked with "yafrican.com" 
                        to protect your content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">Upload up to 4 images. The first image will be the main display image.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {imagePreviews.length < 4 && (
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
              
              {imagePreviews.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No images uploaded yet</p>
                  <p className="text-sm text-gray-400 mt-1">Upload product images to continue</p>
                </div>
              )}
            </div>
             {/* Price Summary */}
      {formData.originalPrice && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
          
          {formData.productType === 'simple' ? (
            // Simple product price summary
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
          ) : (
            // Variable product price summary
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-gray-600 mb-1">Your Base Price</div>
                <div className="text-2xl font-bold text-gray-900">Birr{parseFloat(formData.originalPrice).toFixed(0)}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                <div className="text-gray-600 mb-1">Platform Fee (10%)</div>
                <div className="text-2xl font-bold text-yellow-600">Birr{profit}</div>
              </div>
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-gray-600 mb-1">Starting From</div>
                <div className="text-2xl font-bold text-green-700">
                  Birr{formData.variations?.length ? 
                    Math.min(...formData.variations.map(v => 
                      parseFloat(v.price || formData.price) + (parseFloat(v.price || formData.price) * 0.10)
                    )).toFixed(0) : formData.price}
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-gray-600 mb-1">Variations</div>
                <div className="text-2xl font-bold text-purple-700">{formData.variations?.length || 0}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {formData.attributes?.map(a => a.name).join(', ')}
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 text-center text-sm text-gray-600">
            {formData.productType === 'simple' ? (
              <>Customers will see the final price of <strong>Birr{formData.price}</strong></>
            ) : (
              <>This product has <strong>{formData.variations?.length || 0} variations</strong> with different prices</>
            )}
          </div>
        </div>
      )}
    </div>
  )

            {/* Price Summary
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
                <div className="mt-4 text-center text-sm text-gray-600">
                  Customers will see the final price of <strong>Birr{formData.price}</strong>
                </div>
              </div>
            )}
          </div>
        ) */}

      default:
        return null
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
          <p className="text-gray-600 mt-2">Add a new product to your store. Products require admin approval before going live.</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            {/* Desktop View */}
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
          <form onSubmit={handleSubmit}>
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
            <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-200 mt-8 mb-16 gap-4">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 'basic'}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-2 sm:order-1"
              >
                <LeftIcon className="w-4 h-4 mr-2" />
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
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Create Product
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
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}