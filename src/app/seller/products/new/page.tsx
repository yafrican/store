// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'
// import { ArrowLeft, Upload, X, Plus, Calculator, ChevronDown, ChevronUp } from 'lucide-react'
// import { getCategoryConfig } from '@/lib/categories'

// interface ProductFormData {
//   name: string
//   price: string
//   originalPrice: string
//   category: string
//   subcategory: string
//   description: string
//   stock: string
//   images: string[]
//   specifications: {
//     [key: string]: string | number | boolean
//   }
// }

// // Category mapping function - converts readable format to MongoDB format
// const mapCategoryToDBFormat = (category: string): string => {
//   const categoryMap: { [key: string]: string } = {
//     'Clothing': 'CLOTHING',
//     'Electronics': 'ELECTRONICS',
//     'Home & Garden': 'HOME_GARDEN',
//     'Beauty & Health': 'BEAUTY_HEALTH',
//     'Sports & Outdoors': 'SPORTS_OUTDOORS',
//     'Toys & Games': 'TOYS_GAMES',
//     'Automotive': 'AUTOMOTIVE',
//     'Books & Media': 'BOOKS_MEDIA',
//     'Jewelry & Accessories': 'JEWELRY_ACCESSORIES',
//     'Food & Beverages': 'FOOD_BEVERAGES'
//   }
//   return categoryMap[category] || category
// }

// export default function CreateProductPage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [imageFiles, setImageFiles] = useState<File[]>([])
//   const [imagePreviews, setImagePreviews] = useState<string[]>([])
//   const [specsSectionOpen, setSpecsSectionOpen] = useState(false)

//   const [formData, setFormData] = useState<ProductFormData>({
//     name: '',
//     price: '',
//     originalPrice: '',
//     category: '',
//     subcategory: '',
//     description: '',
//     stock: '1',
//     images: [],
//     specifications: {}
//   })

//   const categories = [
//     'Clothing',
//     'Electronics',
//     'Home & Garden',
//     'Beauty & Health',
//     'Sports & Outdoors',
//     'Toys & Games',
//     'Automotive',
//     'Books & Media',
//     'Jewelry & Accessories',
//     'Food & Beverages'
//   ]

//   const subcategories: Record<string, string[]> = {
//     'Clothing': ['Men', 'Women', 'Kids', 'Baby', 'Shoes', 'Accessories'],
//     'Electronics': ['Phones', 'Computers', 'TV & Audio', 'Cameras', 'Gaming', 'Smart Home'],
//     'Home & Garden': ['Furniture', 'Decor', 'Kitchen', 'Bed & Bath', 'Garden', 'Tools'],
//     'Beauty & Health': ['Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Wellness'],
//     'Sports & Outdoors': ['Exercise', 'Outdoor Gear', 'Team Sports', 'Water Sports', 'Cycling'],
//     'Toys & Games': ['Action Figures', 'Dolls', 'Board Games', 'Educational', 'Puzzles'],
//     'Automotive': ['Car Care', 'Tools', 'Accessories', 'Parts', 'Motorcycle'],
//     'Books & Media': ['Fiction', 'Non-Fiction', 'Children', 'Educational', 'Audio Books'],
//     'Jewelry & Accessories': ['Necklaces', 'Rings', 'Earrings', 'Watches', 'Bags'],
//     'Food & Beverages': ['Snacks', 'Beverages', 'Cooking', 'Organic', 'International']
//   }
// // const subcategories: Record<string, string[]> = {
// //   'Clothing': ['Men', 'Women', 'Shoes'],
// //   'Electronics': ['Phones', 'Computers', 'Cameras', 'TV & Audio', 'Gaming'],
// //   'Home & Garden': ['Furniture', 'Decor', 'Kitchenware', 'Garden'],
// //   'Beauty & Health': ['Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Wellness'],
// //   'Sports & Outdoors': ['Football', 'Basketball', 'Running', 'Fitness'],
// //   'Toys & Games': ['Action Figures', 'Dolls', 'Board Games', 'Educational'],
// //   'Jewelry & Accessories': ['Necklaces', 'Rings', 'Earrings'],
// //   'Food & Beverages': ['Snacks', 'Beverages', 'Cooking Ingredients']
// // }
//   const categoryConfig = formData.category ? getCategoryConfig(formData.category, formData.subcategory) : null

//   // Clean up object URLs on unmount
//   useEffect(() => {
//     return () => {
//       imagePreviews.forEach(url => URL.revokeObjectURL(url))
//     }
//   }, [imagePreviews])

//   // Reset specifications when category changes
//   useEffect(() => {
//     if (formData.category) {
//       setFormData(prev => ({
//         ...prev,
//         specifications: {}
//       }))
//       setSpecsSectionOpen(true)
//     }
//   }, [formData.category])

//   // Form validation
//   const validateForm = (): string | null => {
//     if (imageFiles.length === 0) {
//       return 'Please upload at least one product image'
//     }
//     if (!formData.name.trim()) {
//       return 'Product name is required'
//     }
//     if (!formData.originalPrice || parseFloat(formData.originalPrice) <= 0) {
//       return 'Valid original price is required'
//     }
//     if (!formData.price || parseFloat(formData.price) <= 0) {
//       return 'Valid selling price is required'
//     }
//     if (!formData.category) {
//       return 'Category is required'
//     }
//     if (!formData.description.trim()) {
//       return 'Description is required'
//     }
//     if (!formData.stock || parseInt(formData.stock) < 0) {
//       return 'Valid stock quantity is required'
//     }

//     // Validate required specifications
//     if (categoryConfig) {
//       const missingRequired = categoryConfig.specifications
//         .filter(spec => spec.required && !formData.specifications[spec.fieldName])
//         .map(spec => spec.label)

//       if (missingRequired.length > 0) {
//         return `Please fill in required specifications: ${missingRequired.join(', ')}`
//       }
//     }

//     return null
//   }

//   // Calculate final price with 10% markup
//   const calculateFinalPrice = (basePrice: string): string => {
//     if (!basePrice || isNaN(parseFloat(basePrice))) return ''
//     const price = parseFloat(basePrice)
//     const finalPrice = price + (price * 0.10)
//     return finalPrice.toFixed(2)
//   }

//   // Handle price input changes
//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const basePrice = e.target.value
//     setFormData(prev => ({
//       ...prev,
//       originalPrice: basePrice,
//       price: calculateFinalPrice(basePrice)
//     }))
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
    
//     if (files.length + imageFiles.length > 4) {
//       alert('Maximum 4 images allowed')
//       return
//     }

//     const newImageFiles = [...imageFiles, ...files]
//     setImageFiles(newImageFiles)

//     // Create preview URLs
//     const newPreviews = files.map(file => URL.createObjectURL(file))
//     setImagePreviews(prev => [...prev, ...newPreviews])
//   }

//   const removeImage = (index: number) => {
//     const newFiles = imageFiles.filter((_, i) => i !== index)
//     const newPreviews = imagePreviews.filter((_, i) => i !== index)
    
//     setImageFiles(newFiles)
//     setImagePreviews(newPreviews)
    
//     URL.revokeObjectURL(imagePreviews[index])
//   }

//   // Handle basic form input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
    
//     if (name !== 'originalPrice') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }))
//     }
//   }

//   const handleSpecificationChange = (fieldName: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       specifications: {
//         ...prev.specifications,
//         [fieldName]: value
//       }
//     }))
//   }

//   // Upload images with watermark using API route
//   const uploadImagesWithWatermark = async (files: File[]): Promise<string[]> => {
//     try {
//       console.log('📤 Starting upload with watermark via API...')
      
//       const uploadFormData = new FormData()
//       files.forEach(file => {
//         uploadFormData.append('images', file)
//       })

//       // Add watermark flag
//       uploadFormData.append('addWatermark', 'true')

//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: uploadFormData,
//       })

//       console.log('📤 Upload API response status:', response.status)

//       if (!response.ok) {
//         const errorText = await response.text()
//         console.error('❌ Upload API error:', errorText)
//         throw new Error(`Upload failed: HTTP ${response.status}`)
//       }

//       const result = await response.json()
//       console.log('📤 Upload API result:', result)

//       if (result.success && result.urls) {
//         console.log('✅ API upload with watermark successful:', result.urls)
//         return result.urls
//       } else {
//         throw new Error(result.error || 'Upload failed - no URLs returned')
//       }
//     } catch (error) {
//       console.error('❌ API upload with watermark error:', error)
//       // Fallback to direct Cloudinary upload without watermark
//       console.log('🔄 Falling back to direct Cloudinary upload without watermark...')
//       return await uploadImagesToCloudinary(files)
//     }
//   }

//   // Fallback: Upload images to Cloudinary without watermark
//   const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
//     try {
//       console.log('📤 Starting Cloudinary direct upload...')
//       const uploadedUrls: string[] = []

//       for (const file of files) {
//         try {
//           if (!file.type.startsWith('image/')) {
//             throw new Error(`File ${file.name} is not an image`)
//           }

//           const formData = new FormData()
//           formData.append('file', file)
//           formData.append('upload_preset', 'ml_default')
//           formData.append('cloud_name', 'dxuhyn4ue')
          
//           console.log(`📤 Uploading to Cloudinary: ${file.name}`)
          
//           const response = await fetch(`https://api.cloudinary.com/v1_1/dxuhyn4ue/image/upload`, {
//             method: 'POST',
//             body: formData,
//           })
          
//           if (!response.ok) {
//             const errorData = await response.json()
//             throw new Error(errorData.error?.message || `HTTP ${response.status}`)
//           }
          
//           const data = await response.json()
          
//           if (data.secure_url) {
//             console.log(`✅ Cloudinary upload successful: ${data.secure_url}`)
//             uploadedUrls.push(data.secure_url)
//           } else {
//             throw new Error('No secure_url in response')
//           }
//         } catch (fileError) {
//           console.error(`❌ Error uploading file ${file.name}:`, fileError)
//           throw fileError
//         }
//       }

//       if (uploadedUrls.length === 0) {
//         throw new Error('All Cloudinary uploads failed')
//       }

//       return uploadedUrls

//     } catch (error) {
//       console.error('❌ Cloudinary upload error:', error)
//       const placeholderUrls = files.map((_, index) => 
//         `https://via.placeholder.com/400x400/007bff/ffffff?text=Product+${index + 1}`
//       )
//       console.log('📸 Using fallback placeholder URLs:', placeholderUrls)
//       return placeholderUrls
//     }
//   }

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     const validationError = validateForm()
//     if (validationError) {
//       alert(validationError)
//       return
//     }

//     setLoading(true)

//     try {
//       // Step 1: Upload images with watermark
//       console.log('📤 Uploading images with watermark...')
//       const imageUrls = await uploadImagesWithWatermark(imageFiles)
//       console.log('✅ Images uploaded successfully with watermark:', imageUrls)

//       // ✅ FIXED: Convert category to MongoDB format
//       const productData = {
//         name: formData.name.trim(),
//         price: parseFloat(formData.price),
//         originalPrice: parseFloat(formData.originalPrice),
//         category: mapCategoryToDBFormat(formData.category.trim()), // Convert to uppercase
//         subcategory: formData.subcategory ? formData.subcategory.trim() : "",
//         images: imageUrls,
//         description: formData.description.trim(),
//         stock: parseInt(formData.stock) || 1,
//         inStock: parseInt(formData.stock) > 0,
//         status: 'pending',
//         specifications: formData.specifications
//       }

//       console.log('📦 Sending product data to API:', productData)

//       // Send to your products API
//       const response = await fetch('/api/sellers/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//         credentials: 'include',
//       })

//       console.log('📦 Products API response status:', response.status)

//       if (!response.ok) {
//         const errorText = await response.text()
//         console.error('❌ Products API error response:', errorText)
//         throw new Error(`Failed to create product: HTTP ${response.status}`)
//       }

//       const result = await response.json()
//       console.log('📦 Products API response:', result)

//       if (result.success) {
//         console.log('✅ Product created successfully:', result.product)
//         alert('Product created successfully with watermarked images! Awaiting admin approval.')
//         router.push('/seller/dashboard')
//       } else {
//         throw new Error(result.error || result.message || 'Failed to create product')
//       }

//     } catch (error) {
//       console.error('❌ Product creation process failed:', error)
//       alert(error instanceof Error ? error.message : 'Failed to create product. Please check console for details.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Calculate profit and markup
//   const profit = formData.originalPrice && formData.price 
//     ? (parseFloat(formData.price) - parseFloat(formData.originalPrice)).toFixed(2)
//     : '0.00'

//   const markupPercentage = formData.originalPrice && parseFloat(formData.originalPrice) > 0
//     ? ((parseFloat(formData.price) - parseFloat(formData.originalPrice)) / parseFloat(formData.originalPrice) * 100).toFixed(1)
//     : '0.0'

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Dashboard
//           </button>
//           <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
//           <p className="text-gray-600 mt-2">Add a new product to your store. Products require admin approval before going live.</p>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
//         >
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Basic Information */}
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Product Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter product name"
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   {/* Original Price Input */}
//                   <div>
//                     <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Price (Birr) *
//                     </label>
//                     <input
//                       type="number"
//                       id="originalPrice"
//                       name="originalPrice"
//                       required
//                       min="0"
//                       step="0.01"
//                       value={formData.originalPrice}
//                       onChange={handlePriceChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="0.00"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Enter the price you want to sell for</p>
//                   </div>

//                   {/* Final Price Display */}
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium text-blue-900">Final Selling Price:</span>
//                       <Calculator className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <div className="text-2xl font-bold text-blue-700">
//                       Birr{formData.price || '0.00'}
//                     </div>
//                     <div className="text-xs text-blue-600 mt-1">
//                       Includes 10% platform fee (Birr{profit} profit)
//                     </div>
//                     {formData.originalPrice && (
//                       <div className="text-xs text-green-600 mt-1">
//                         Markup: {markupPercentage}%
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
//                     Stock Quantity *
//                   </label>
//                   <input
//                     type="number"
//                     id="stock"
//                     name="stock"
//                     required
//                     min="0"
//                     value={formData.stock}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="1"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
//                     Category *
//                   </label>
//                   <select
//                     id="category"
//                     name="category"
//                     required
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select a category</option>
//                     {categories.map(category => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
//                     Subcategory
//                   </label>
//                   <select
//                     id="subcategory"
//                     name="subcategory"
//                     value={formData.subcategory}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     disabled={!formData.category}
//                   >
//                     <option value="">Select a subcategory</option>
//                     {formData.category && subcategories[formData.category]?.map(sub => (
//                       <option key={sub} value={sub}>
//                         {sub}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 required
//                 rows={4}
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Describe your product in detail..."
//               />
//             </div>

//             {/* Dynamic Specifications Section */}
//             {categoryConfig && (
//               <div className="border border-gray-200 rounded-lg">
//                 <button
//                   type="button"
//                   onClick={() => setSpecsSectionOpen(!specsSectionOpen)}
//                   className="w-full flex items-center justify-between p-6 text-left"
//                 >
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {categoryConfig.name} Specifications
//                     </h2>
//                     <p className="text-sm text-gray-600 mt-1">
//                       Add detailed specifications for your product
//                     </p>
//                   </div>
//                   {specsSectionOpen ? (
//                     <ChevronUp className="w-5 h-5 text-gray-500" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5 text-gray-500" />
//                   )}
//                 </button>

//                 {specsSectionOpen && (
//                   <div className="px-6 pb-6 border-t border-gray-200">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                       {categoryConfig.specifications.map((spec) => (
//                         <div key={spec.fieldName}>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             {spec.label} {spec.required && '*'}
//                           </label>
                          
//                           {spec.type === 'select' ? (
//                             <select
//                               value={formData.specifications[spec.fieldName] as string || ''}
//                               onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                               required={spec.required}
//                             >
//                               <option value="">Select {spec.label}</option>
//                               {spec.options?.map(option => (
//                                 <option key={option} value={option}>
//                                   {option}
//                                 </option>
//                               ))}
//                             </select>
//                           ) : spec.type === 'number' ? (
//                             <div className="flex items-center">
//                               <input
//                                 type="number"
//                                 value={formData.specifications[spec.fieldName] as string || ''}
//                                 onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
//                                 min={spec.min}
//                                 max={spec.max}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 required={spec.required}
//                               />
//                               {spec.unit && (
//                                 <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">
//                                   {spec.unit}
//                                 </span>
//                               )}
//                             </div>
//                           ) : (
//                             <input
//                               type="text"
//                               value={formData.specifications[spec.fieldName] as string || ''}
//                               onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                               required={spec.required}
//                               placeholder={`Enter ${spec.label.toLowerCase()}`}
//                             />
//                           )}
                          
//                           {spec.unit && spec.type !== 'number' && (
//                             <span className="text-sm text-gray-500 ml-2">{spec.unit}</span>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Image Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Images *
//               </label>
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-medium text-yellow-800">
//                       Automatic Watermark Protection
//                     </h3>
//                     <div className="mt-2 text-sm text-yellow-700">
//                       <p>
//                         All uploaded images will be automatically watermarked with "yafrican.com" 
//                         to protect your content.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <p className="text-sm text-gray-500 mb-4">Upload up to 4 images. The first image will be the main display image.</p>
              
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                 {imagePreviews.map((preview, index) => (
//                   <div key={index} className="relative group">
//                     <img
//                       src={preview}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg border border-gray-300"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
                
//                 {imagePreviews.length < 4 && (
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
//                     <Upload className="w-8 h-8 text-gray-400 mb-2" />
//                     <span className="text-sm text-gray-500">Add Image</span>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                     />
//                   </label>
//                 )}
//               </div>
              
//               {imagePreviews.length === 0 && (
//                 <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
//                   <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500">No images uploaded yet</p>
//                   <p className="text-sm text-gray-400 mt-1">Upload product images to continue</p>
//                 </div>
//               )}
//             </div>

//             {/* Price Summary */}
//             {formData.originalPrice && (
//               <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                   <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
//                     <div className="text-gray-600 mb-1">Your Price</div>
//                     <div className="text-2xl font-bold text-gray-900">Birr{parseFloat(formData.originalPrice).toFixed(2)}</div>
//                   </div>
//                   <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
//                     <div className="text-gray-600 mb-1">Platform Fee (10%)</div>
//                     <div className="text-2xl font-bold text-yellow-600">Birr{profit}</div>
//                   </div>
//                   <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
//                     <div className="text-gray-600 mb-1">Final Price</div>
//                     <div className="text-2xl font-bold text-green-700">Birr{formData.price}</div>
//                   </div>
//                 </div>
//                 <div className="mt-4 text-center text-sm text-gray-600">
//                   Customers will see the final price of <strong>Birr{formData.price}</strong>
//                 </div>
//               </div>
//             )}

//             {/* Submit Buttons */}
//             <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading || imagePreviews.length === 0 || !formData.originalPrice}
//                 className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Creating...
//                   </>
//                 ) : (
//                   <>
//                     <Plus className="w-4 h-4" />
//                     Create Product with Watermark
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

// // 'use client'

// // import { useState, useEffect } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { motion } from 'framer-motion'
// // import { ArrowLeft, Upload, X, Plus, Calculator, ChevronDown, ChevronUp } from 'lucide-react'
// // import { getCategoryConfig } from '@/lib/categories'

// // interface ProductFormData {
// //   name: string
// //   price: string
// //   originalPrice: string
// //   category: string
// //   subcategory: string
// //   description: string
// //   stock: string
// //   images: string[]
// //   specifications: {
// //     [key: string]: string | number | boolean
// //   }
// // }

// // export default function CreateProductPage() {
// //   const router = useRouter()
// //   const [loading, setLoading] = useState(false)
// //   const [imageFiles, setImageFiles] = useState<File[]>([])
// //   const [imagePreviews, setImagePreviews] = useState<string[]>([])
// //   const [specsSectionOpen, setSpecsSectionOpen] = useState(false)

// //  const [formData, setFormData] = useState<ProductFormData>({
// //   name: '',
// //   price: '',
// //   originalPrice: '',
// //   category: '',
// //   subcategory: '',
// //   description: '',
// //   stock: '1',
// //   images: [],
// //   specifications: {}
// // })

// //   const categories = [
// //     'Clothing',
// //     'Electronics',
// //     'Home & Garden',
// //     'Beauty & Health',
// //     'Sports & Outdoors',
// //     'Toys & Games',
// //     'Automotive',
// //     'Books & Media',
// //     'Jewelry & Accessories',
// //     'Food & Beverages'
// //   ]

// //   const subcategories: Record<string, string[]> = {
// //     'Clothing': ['Men', 'Women', 'Kids', 'Baby', 'Shoes', 'Accessories'],
// //     'Electronics': ['Phones', 'Computers', 'TV & Audio', 'Cameras', 'Gaming', 'Smart Home'],
// //     'Home & Garden': ['Furniture', 'Decor', 'Kitchen', 'Bed & Bath', 'Garden', 'Tools'],
// //     'Beauty & Health': ['Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Wellness'],
// //     'Sports & Outdoors': ['Exercise', 'Outdoor Gear', 'Team Sports', 'Water Sports', 'Cycling'],
// //     'Toys & Games': ['Action Figures', 'Dolls', 'Board Games', 'Educational', 'Puzzles'],
// //     'Automotive': ['Car Care', 'Tools', 'Accessories', 'Parts', 'Motorcycle'],
// //     'Books & Media': ['Fiction', 'Non-Fiction', 'Children', 'Educational', 'Audio Books'],
// //     'Jewelry & Accessories': ['Necklaces', 'Rings', 'Earrings', 'Watches', 'Bags'],
// //     'Food & Beverages': ['Snacks', 'Beverages', 'Cooking', 'Organic', 'International']
// //   }

// // // Update this line in your CreateProductPage component
// // const categoryConfig = formData.category ? getCategoryConfig(formData.category, formData.subcategory) : null
// //   // Clean up object URLs on unmount
// //   useEffect(() => {
// //     return () => {
// //       imagePreviews.forEach(url => URL.revokeObjectURL(url))
// //     }
// //   }, [imagePreviews])

// //   // Reset specifications when category changes
// //   useEffect(() => {
// //     if (formData.category) {
// //       setFormData(prev => ({
// //         ...prev,
// //         specifications: {}
// //       }))
// //       setSpecsSectionOpen(true)
// //     }
// //   }, [formData.category])

// //   // Form validation
// //   const validateForm = (): string | null => {
// //     if (imageFiles.length === 0) {
// //       return 'Please upload at least one product image'
// //     }
// //     if (!formData.name.trim()) {
// //       return 'Product name is required'
// //     }
// //     if (!formData.originalPrice || parseFloat(formData.originalPrice) <= 0) {
// //       return 'Valid original price is required'
// //     }
// //     if (!formData.price || parseFloat(formData.price) <= 0) {
// //       return 'Valid selling price is required'
// //     }
// //     if (!formData.category) {
// //       return 'Category is required'
// //     }
// //     if (!formData.description.trim()) {
// //       return 'Description is required'
// //     }
// //     if (!formData.stock || parseInt(formData.stock) < 0) {
// //       return 'Valid stock quantity is required'
// //     }

// //     // Validate required specifications
// //     if (categoryConfig) {
// //       const missingRequired = categoryConfig.specifications
// //         .filter(spec => spec.required && !formData.specifications[spec.fieldName])
// //         .map(spec => spec.label)

// //       if (missingRequired.length > 0) {
// //         return `Please fill in required specifications: ${missingRequired.join(', ')}`
// //       }
// //     }

// //     return null
// //   }

// //   // Calculate final price with 10% markup
// //   const calculateFinalPrice = (basePrice: string): string => {
// //     if (!basePrice || isNaN(parseFloat(basePrice))) return ''
// //     const price = parseFloat(basePrice)
// //     const finalPrice = price + (price * 0.10)
// //     return finalPrice.toFixed(2)
// //   }

// //   // Handle price input changes
// //   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const basePrice = e.target.value
// //     setFormData(prev => ({
// //       ...prev,
// //       originalPrice: basePrice,
// //       price: calculateFinalPrice(basePrice)
// //     }))
// //   }

// //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = Array.from(e.target.files || [])
    
// //     if (files.length + imageFiles.length > 4) {
// //       alert('Maximum 4 images allowed')
// //       return
// //     }

// //     const newImageFiles = [...imageFiles, ...files]
// //     setImageFiles(newImageFiles)

// //     // Create preview URLs
// //     const newPreviews = files.map(file => URL.createObjectURL(file))
// //     setImagePreviews(prev => [...prev, ...newPreviews])
// //   }

// //   const removeImage = (index: number) => {
// //     const newFiles = imageFiles.filter((_, i) => i !== index)
// //     const newPreviews = imagePreviews.filter((_, i) => i !== index)
    
// //     setImageFiles(newFiles)
// //     setImagePreviews(newPreviews)
    
// //     URL.revokeObjectURL(imagePreviews[index])
// //   }

// //   // Handle basic form input changes
// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target
    
// //     if (name !== 'originalPrice') {
// //       setFormData(prev => ({
// //         ...prev,
// //         [name]: value
// //       }))
// //     }
// //   }

// // const handleSpecificationChange = (fieldName: string, value: string) => {
// //   setFormData(prev => ({
// //     ...prev,
// //     specifications: {
// //       ...prev.specifications,
// //       [fieldName]: value
// //     }
// //   }))
// // }
// //   // Upload images using your API route
// //   const uploadImagesToAPI = async (files: File[]): Promise<string[]> => {
// //     try {
// //       console.log('📤 Starting upload via API...')
      
// //       const uploadFormData = new FormData()
// //       files.forEach(file => {
// //         uploadFormData.append('images', file)
// //       })

// //       const response = await fetch('/api/upload', {
// //         method: 'POST',
// //         body: uploadFormData,
// //       })

// //       console.log('📤 Upload API response status:', response.status)

// //       if (!response.ok) {
// //         const errorText = await response.text()
// //         console.error('❌ Upload API error:', errorText)
// //         throw new Error(`Upload failed: HTTP ${response.status}`)
// //       }

// //       const result = await response.json()
// //       console.log('📤 Upload API result:', result)

// //       if (result.success && result.urls) {
// //         console.log('✅ API upload successful:', result.urls)
// //         return result.urls
// //       } else {
// //         throw new Error(result.error || 'Upload failed - no URLs returned')
// //       }
// //     } catch (error) {
// //       console.error('❌ API upload error:', error)
// //       // Fallback to direct Cloudinary upload
// //       console.log('🔄 Falling back to direct Cloudinary upload...')
// //       return await uploadImagesToCloudinary(files)
// //     }
// //   }

// //   // Fallback: Upload images to Cloudinary
// //   const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
// //     try {
// //       console.log('📤 Starting Cloudinary direct upload...')
// //       const uploadedUrls: string[] = []

// //       for (const file of files) {
// //         try {
// //           if (!file.type.startsWith('image/')) {
// //             throw new Error(`File ${file.name} is not an image`)
// //           }

// //           const formData = new FormData()
// //           formData.append('file', file)
// //           formData.append('upload_preset', 'ml_default')
// //           formData.append('cloud_name', 'dxuhyn4ue')
          
// //           console.log(`📤 Uploading to Cloudinary: ${file.name}`)
          
// //           const response = await fetch(`https://api.cloudinary.com/v1_1/dxuhyn4ue/image/upload`, {
// //             method: 'POST',
// //             body: formData,
// //           })
          
// //           if (!response.ok) {
// //             const errorData = await response.json()
// //             throw new Error(errorData.error?.message || `HTTP ${response.status}`)
// //           }
          
// //           const data = await response.json()
          
// //           if (data.secure_url) {
// //             console.log(`✅ Cloudinary upload successful: ${data.secure_url}`)
// //             uploadedUrls.push(data.secure_url)
// //           } else {
// //             throw new Error('No secure_url in response')
// //           }
// //         } catch (fileError) {
// //           console.error(`❌ Error uploading file ${file.name}:`, fileError)
// //           throw fileError
// //         }
// //       }

// //       if (uploadedUrls.length === 0) {
// //         throw new Error('All Cloudinary uploads failed')
// //       }

// //       return uploadedUrls

// //     } catch (error) {
// //       console.error('❌ Cloudinary upload error:', error)
// //       const placeholderUrls = files.map((_, index) => 
// //         `https://via.placeholder.com/400x400/007bff/ffffff?text=Product+${index + 1}`
// //       )
// //       console.log('📸 Using fallback placeholder URLs:', placeholderUrls)
// //       return placeholderUrls
// //     }
// //   }

// //   // Handle form submission
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
    
// //     const validationError = validateForm()
// //     if (validationError) {
// //       alert(validationError)
// //       return
// //     }

// //     setLoading(true)

// //     try {
// //       // Step 1: Upload images
// //       console.log('📤 Uploading images...')
// //       const imageUrls = await uploadImagesToAPI(imageFiles)
// //       console.log('✅ Images uploaded successfully:', imageUrls)

// //       // Prepare product data with specifications
// //       const productData = {
// //         name: formData.name.trim(),
// //         price: parseFloat(formData.price),
// //         originalPrice: parseFloat(formData.originalPrice),
// //   category: formData.category.trim(), // Remove .toUpperCase()
// //         subcategory: formData.subcategory ? formData.subcategory.trim() : "",
// //         images: imageUrls,
// //         description: formData.description.trim(),
// //         stock: parseInt(formData.stock) || 1,
// //         inStock: parseInt(formData.stock) > 0,
// //         status: 'pending',
// //         specifications: formData.specifications
// //       }

// //       console.log('📦 Sending product data to API:', productData)

// //       // Send to your products API
// //       const response = await fetch('/api/sellers/products', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(productData),
// //         credentials: 'include',
// //       })

// //       console.log('📦 Products API response status:', response.status)

// //       if (!response.ok) {
// //         const errorText = await response.text()
// //         console.error('❌ Products API error response:', errorText)
// //         throw new Error(`Failed to create product: HTTP ${response.status}`)
// //       }

// //       const result = await response.json()
// //       console.log('📦 Products API response:', result)

// //       if (result.success) {
// //         console.log('✅ Product created successfully:', result.product)
// //         alert('Product created successfully! Awaiting admin approval.')
// //         router.push('/seller/dashboard')
// //       } else {
// //         throw new Error(result.error || result.message || 'Failed to create product')
// //       }

// //     } catch (error) {
// //       console.error('❌ Product creation process failed:', error)
// //       alert(error instanceof Error ? error.message : 'Failed to create product. Please check console for details.')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Calculate profit and markup
// //   const profit = formData.originalPrice && formData.price 
// //     ? (parseFloat(formData.price) - parseFloat(formData.originalPrice)).toFixed(2)
// //     : '0.00'

// //   const markupPercentage = formData.originalPrice && parseFloat(formData.originalPrice) > 0
// //     ? ((parseFloat(formData.price) - parseFloat(formData.originalPrice)) / parseFloat(formData.originalPrice) * 100).toFixed(1)
// //     : '0.0'

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <button
// //             onClick={() => router.back()}
// //             className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
// //           >
// //             <ArrowLeft className="w-4 h-4 mr-2" />
// //             Back to Dashboard
// //           </button>
// //           <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
// //           <p className="text-gray-600 mt-2">Add a new product to your store. Products require admin approval before going live.</p>
// //         </div>

// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
// //         >
// //           <form onSubmit={handleSubmit} className="space-y-8">
// //             {/* Basic Information */}
// //             <div>
// //               <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div>
// //                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Product Name *
// //                   </label>
// //                   <input
// //                     type="text"
// //                     id="name"
// //                     name="name"
// //                     required
// //                     value={formData.name}
// //                     onChange={handleInputChange}
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     placeholder="Enter product name"
// //                   />
// //                 </div>

// //                 <div className="space-y-4">
// //                   {/* Original Price Input */}
// //                   <div>
// //                     <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Your Price (Birr) *
// //                     </label>
// //                     <input
// //                       type="number"
// //                       id="originalPrice"
// //                       name="originalPrice"
// //                       required
// //                       min="0"
// //                       step="0.01"
// //                       value={formData.originalPrice}
// //                       onChange={handlePriceChange}
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                       placeholder="0.00"
// //                     />
// //                     <p className="text-xs text-gray-500 mt-1">Enter the price you want to sell for</p>
// //                   </div>

// //                   {/* Final Price Display */}
// //                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
// //                     <div className="flex items-center justify-between mb-2">
// //                       <span className="text-sm font-medium text-blue-900">Final Selling Price:</span>
// //                       <Calculator className="w-4 h-4 text-blue-600" />
// //                     </div>
// //                     <div className="text-2xl font-bold text-blue-700">
// //                       Birr{formData.price || '0.00'}
// //                     </div>
// //                     <div className="text-xs text-blue-600 mt-1">
// //                       Includes 10% platform fee (Birr{profit} profit)
// //                     </div>
// //                     {formData.originalPrice && (
// //                       <div className="text-xs text-green-600 mt-1">
// //                         Markup: {markupPercentage}%
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Stock Quantity *
// //                   </label>
// //                   <input
// //                     type="number"
// //                     id="stock"
// //                     name="stock"
// //                     required
// //                     min="0"
// //                     value={formData.stock}
// //                     onChange={handleInputChange}
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     placeholder="1"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Category *
// //                   </label>
// //                   <select
// //                     id="category"
// //                     name="category"
// //                     required
// //                     value={formData.category}
// //                     onChange={handleInputChange}
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   >
// //                     <option value="">Select a category</option>
// //                     {categories.map(category => (
// //                       <option key={category} value={category}>
// //                         {category}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div>
// //                   <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Subcategory
// //                   </label>
// //                   <select
// //                     id="subcategory"
// //                     name="subcategory"
// //                     value={formData.subcategory}
// //                     onChange={handleInputChange}
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     disabled={!formData.category}
// //                   >
// //                     <option value="">Select a subcategory</option>
// //                     {formData.category && subcategories[formData.category]?.map(sub => (
// //                       <option key={sub} value={sub}>
// //                         {sub}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Description */}
// //             <div>
// //               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Description *
// //               </label>
// //               <textarea
// //                 id="description"
// //                 name="description"
// //                 required
// //                 rows={4}
// //                 value={formData.description}
// //                 onChange={handleInputChange}
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Describe your product in detail..."
// //               />
// //             </div>

// //             {/* Dynamic Specifications Section */}

// // {/* Dynamic Specifications Section */}
// // {categoryConfig && (
// //   <div className="border border-gray-200 rounded-lg">
// //     <button
// //       type="button"
// //       onClick={() => setSpecsSectionOpen(!specsSectionOpen)}
// //       className="w-full flex items-center justify-between p-6 text-left"
// //     >
// //       <div>
// //         <h2 className="text-xl font-semibold text-gray-900">
// //           {categoryConfig.name} Specifications
// //         </h2>
// //         <p className="text-sm text-gray-600 mt-1">
// //           Add detailed specifications for your product
// //         </p>
// //       </div>
// //       {specsSectionOpen ? (
// //         <ChevronUp className="w-5 h-5 text-gray-500" />
// //       ) : (
// //         <ChevronDown className="w-5 h-5 text-gray-500" />
// //       )}
// //     </button>

// //     {specsSectionOpen && (
// //       <div className="px-6 pb-6 border-t border-gray-200">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
// //           {categoryConfig.specifications.map((spec) => (
// //             <div key={spec.fieldName}>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 {spec.label} {spec.required && '*'}
// //               </label>
              
// //               {spec.type === 'select' ? (
// //                 <select
// //                   value={formData.specifications[spec.fieldName] as string || ''}
// //                   onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   required={spec.required}
// //                 >
// //                   <option value="">Select {spec.label}</option>
// //                   {spec.options?.map(option => (
// //                     <option key={option} value={option}>
// //                       {option}
// //                       {/* Show ad counts for screen sizes like Jiji */}
// //                       {spec.fieldName === 'screenSize' && (
// //                         <>{option === '< 5"' && ' • 434 ads'}
// //                          {option === '5.1 - 5.5"' && ' • 626 ads'}
// //                          {option === '5.6 - 6"' && ' • 895 ads'}
// //                          {option === '6.1 - 6.5"' && ' • 7,851 ads'}
// //                          {option === '6.6 - 6.8"' && ' • 8,698 ads'}
// //                          {option === '> 6.8"' && ' • 1,090 ads'}</>
// //                       )}
// //                     </option>
// //                   ))}
// //                 </select>
// //               ) : spec.type === 'number' ? (
// //                 <div className="flex items-center">
// //                   <input
// //                     type="number"
// //                     value={formData.specifications[spec.fieldName] as string || ''}
// //                     onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
// //                     min={spec.min}
// //                     max={spec.max}
// //                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     required={spec.required}
// //                   />
// //                   {spec.unit && (
// //                     <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">
// //                       {spec.unit}
// //                     </span>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <input
// //                   type="text"
// //                   value={formData.specifications[spec.fieldName] as string || ''}
// //                   onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   required={spec.required}
// //                   placeholder={`Enter ${spec.label.toLowerCase()}`}
// //                 />
// //               )}
              
// //               {spec.unit && spec.type !== 'number' && (
// //                 <span className="text-sm text-gray-500 ml-2">{spec.unit}</span>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     )}
// //   </div>
// // )}
// //             {/* Image Upload */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Product Images *
// //               </label>
// //               <p className="text-sm text-gray-500 mb-4">Upload up to 4 images. The first image will be the main display image.</p>
              
// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
// //                 {imagePreviews.map((preview, index) => (
// //                   <div key={index} className="relative group">
// //                     <img
// //                       src={preview}
// //                       alt={`Preview ${index + 1}`}
// //                       className="w-full h-32 object-cover rounded-lg border border-gray-300"
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => removeImage(index)}
// //                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
// //                     >
// //                       <X className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 ))}
                
// //                 {imagePreviews.length < 4 && (
// //                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
// //                     <Upload className="w-8 h-8 text-gray-400 mb-2" />
// //                     <span className="text-sm text-gray-500">Add Image</span>
// //                     <input
// //                       type="file"
// //                       multiple
// //                       accept="image/*"
// //                       onChange={handleImageUpload}
// //                       className="hidden"
// //                     />
// //                   </label>
// //                 )}
// //               </div>
              
// //               {imagePreviews.length === 0 && (
// //                 <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
// //                   <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                   <p className="text-gray-500">No images uploaded yet</p>
// //                   <p className="text-sm text-gray-400 mt-1">Upload product images to continue</p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Price Summary */}
// //             {formData.originalPrice && (
// //               <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
// //                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
// //                   <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
// //                     <div className="text-gray-600 mb-1">Your Price</div>
// //                     <div className="text-2xl font-bold text-gray-900">Birr{parseFloat(formData.originalPrice).toFixed(2)}</div>
// //                   </div>
// //                   <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
// //                     <div className="text-gray-600 mb-1">Platform Fee (10%)</div>
// //                     <div className="text-2xl font-bold text-yellow-600">Birr{profit}</div>
// //                   </div>
// //                   <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
// //                     <div className="text-gray-600 mb-1">Final Price</div>
// //                     <div className="text-2xl font-bold text-green-700">Birr{formData.price}</div>
// //                   </div>
// //                 </div>
// //                 <div className="mt-4 text-center text-sm text-gray-600">
// //                   Customers will see the final price of <strong>Birr{formData.price}</strong>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Submit Buttons */}
// //             <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
// //               <button
// //                 type="button"
// //                 onClick={() => router.back()}
// //                 className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 disabled={loading || imagePreviews.length === 0 || !formData.originalPrice}
// //                 className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //                     Creating...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Plus className="w-4 h-4" />
// //                     Create Product
// //                   </>
// //                 )}
// //               </button>
// //             </div>
// //           </form>
// //         </motion.div>
// //       </div>
// //     </div>
// //   )
// // }
// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ArrowLeft, Upload, X, Plus, Calculator, ChevronDown, ChevronUp, ArrowRight, ArrowLeft as LeftIcon } from 'lucide-react'
// import { getCategoryConfig } from '@/lib/categories'

// interface ProductFormData {
//   name: string
//   price: string
//   originalPrice: string
//   category: string
//   subcategory: string
//   description: string
//   stock: string
//   images: string[]
//   specifications: {
//     [key: string]: string | number | boolean
//   }
// }

// // CORRECT mapping - matches MongoDB schema
// const mapCategoryToDBFormat = (category: string): string => {
//   const categoryMap: { [key: string]: string } = {
//     'Electronics': 'ELECTRONICS',
//     'Clothing': 'CLOTHING',
//     'Home, Furniture & Appliances': 'HOME_FURNITURE_APPLIANCES',
//     'Beauty & Personal Care': 'BEAUTY_PERSONAL_CARE',
//     'Sports & Outdoors': 'LEISURE_ACTIVITIES',
//     'Toys & Games': 'LEISURE_ACTIVITIES',
//     'Automotive': 'AUTOMOTIVE', 
//     'Books & Media': 'BOOKS_MEDIA',
//     'Jewelry & Accessories': 'FASHION',
//     'Food & Beverages': 'FOOD_AGRICULTURE_FARMING',
//     'Services': 'SERVICES',
//     'Property': 'PROPERTY',
//     'Vehicles': 'VEHICLES',
//     'Commercial Equipment': 'COMMERCIAL_EQUIPMENT',
//     'Repair & Construction': 'REPAIR_CONSTRUCTION',
//     'Animals & Pets': 'ANIMALS_PETS',
//     'Babies & Kids': 'BABIES_KIDS'
//   }
//   return categoryMap[category] || category
// }
// // Mapping for category config (what getCategoryConfig expects)
// const mapToConfigCategory = (category: string): string => {
//   const configMap: { [key: string]: string } = {
//     'Electronics': 'Electronics',
//     'Clothing': 'Clothing', 
//     'Home, Furniture & Appliances': 'Home, Furniture & Appliances',
//     'Beauty & Personal Care': 'Beauty & Personal Care',
//     'Sports & Outdoors': 'Leisure & Activities',
//     'Toys & Games': 'Leisure & Activities',
//     'Automotive': 'Automotive',
//     'Books & Media': 'Books & Media',
//     'Jewelry & Accessories': 'Fashion',
//     'Food & Beverages': 'Food, Agriculture & Farming',
//     'Services': 'Services',
//     'Property': 'Property',
//     'Vehicles': 'Vehicles',
//     'Commercial Equipment': 'Commercial Equipment',
//     'Repair & Construction': 'Repair & Construction',
//     'Animals & Pets': 'Animals & Pets',
//     'Babies & Kids': 'Babies & Kids'
//   }
//   return configMap[category] || category
// }

// type Step = 'basic' | 'specifications' | 'images'

// export default function CreateProductPage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [currentStep, setCurrentStep] = useState<Step>('basic')
//   const [imageFiles, setImageFiles] = useState<File[]>([])
//   const [imagePreviews, setImagePreviews] = useState<string[]>([])
//   const [specsSectionOpen, setSpecsSectionOpen] = useState(false)

//   const [formData, setFormData] = useState<ProductFormData>({
//     name: '',
//     price: '',
//     originalPrice: '',
//     category: '',
//     subcategory: '',
//     description: '',
//     stock: '1',
//     images: [],
//     specifications: {}
//   })

//   const categories = [
//     'Electronics',
//     'Clothing',
//     'Home, Furniture & Appliances',
//     'Beauty & Personal Care',
//     'Sports & Outdoors',
//     'Toys & Games',
//     'Automotive',
//     'Books & Media',
//     'Jewelry & Accessories',
//     'Food & Beverages',
//     'Services',
//     'Property',
//     'Vehicles',
//     'Commercial Equipment',
//     'Repair & Construction',
//     'Animals & Pets',
//     'Babies & Kids'
//   ]

//   const subcategories: Record<string, string[]> = {
//     'Electronics': [
//       'Phones', 'Laptops & Computers', 'Video Game Consoles', 'Audio & Music Equipment', 
//       'Headphones', 'Photo & Video Cameras', 'Security & Surveillance', 'Networking Products',
//       'Printers & Scanners', 'Computer Monitors', 'Computer Hardware', 'Computer Accessories',
//       'Electronic Accessories & Supplies', 'Video Games', 'Software'
//     ],
//     'Clothing': ['Men', 'Women', 'Kids', 'Baby', 'Shoes', 'Accessories'],
//     'Home, Furniture & Appliances': [
//       'Furniture', 'Lighting', 'Storage & Organization', 'Home Accessories',
//       'Kitchen Appliances', 'Kitchenware & Cookware', 'Household Chemicals', 'Garden Supplies'
//     ],
//     'Beauty & Personal Care': [
//       'Hair Care & Beauty', 'Face Care', 'Oral Care', 'Body Care', 'Fragrances',
//       'Makeup', 'Tools & Accessories', 'Vitamins & Supplements', 'Massagers',
//       'Health & Beauty Services'
//     ],
//     'Sports & Outdoors': ['Exercise', 'Outdoor Gear', 'Team Sports', 'Water Sports', 'Cycling'],
//     'Toys & Games': ['Action Figures', 'Dolls', 'Board Games', 'Educational', 'Puzzles'],
//     'Automotive': ['Car Care', 'Tools', 'Accessories', 'Parts', 'Motorcycle'],
//     'Books & Media': ['Fiction', 'Non-Fiction', 'Children', 'Educational', 'Audio Books'],
//     'Jewelry & Accessories': ['Necklaces', 'Rings', 'Earrings', 'Watches', 'Bags'],
//     'Food & Beverages': ['Snacks', 'Beverages', 'Cooking', 'Organic', 'International'],
//     'Services': [
//       'Building & Trade Services', 'Car Services', 'Computer & IT Services', 'Repair Services',
//       'Cleaning Services', 'Printing Services', 'Manufacturing Services', 'Logistics Services',
//       'Legal Services', 'Tax & Financial Services', 'Recruitment Services', 'Rental Services',
//       'Chauffeur & Airport Transfer Services', 'Travel Agents & Tours', 'Classes & Courses',
//       'Health & Beauty Services', 'Fitness & Personal Training', 'Party, Catering & Event Services',
//       'DJ & Entertainment Services', 'Photography & Video Services', 'Landscaping & Gardening Services',
//       'Pet Services'
//     ],
//     'Property': [
//       'New Builds', 'Houses & Apartments for Rent', 'Houses & Apartments for Sale', 
//       'Land & Plots for Rent', 'Short Let', 'Land & Plots for Sale',
//       'Event Centres, Venues & Workstations', 'Commercial Property for Rent', 
//       'Commercial Property for Sale'
//     ],
//     'Vehicles': [
//       'Vehicle Parts & Accessories', 'Cars', 'Motorcycles & Scooters', 'Buses & Microbuses',
//       'Trucks & Trailers', 'Construction & Heavy Machinery', 'Watercraft & Boats', 'Car Services'
//     ],
//     'Commercial Equipment': [
//       'Medical Equipment & Supplies', 'Manufacturing Equipment', 'Retail & Store Equipment',
//       'Restaurant & Catering Equipment', 'Stationery & Office Equipment', 'Salon & Beauty Equipment',
//       'Printing & Graphics Equipment', 'Stage & Event Equipment', 'Manufacturing Services'
//     ],
//     'Repair & Construction': [
//       'Electrical Equipment', 'Building Materials & Supplies', 'Plumbing & Water Systems',
//       'Electrical Hand Tools', 'Hand Tools', 'Measuring & Testing Tools', 'Hardware & Fasteners',
//       'Doors & Security', 'Windows & Glass', 'Building & Trade Services', 'Repair Services'
//     ],
//     'Animals & Pets': [
//       'Pet Accessories', 'Cats & Kittens', 'Dogs & Puppies', 'Fish', 'Birds',
//       'Pet Services', 'Other Animals'
//     ],
//     'Babies & Kids': [
//       'Toys, Games & Bikes', 'Children\'s Furniture', 'Children\'s Clothing', 'Children\'s Shoes',
//       'Babies & Kids Accessories', 'Baby Gear & Equipment', 'Care & Feeding', 'Maternity & Pregnancy',
//       'Transport & Safety', 'Playground Equipment', 'Child Care & Education'
//     ]
//   }

//   // Use the mapping for category config
//   const categoryConfig = formData.category ? getCategoryConfig(
//     mapToConfigCategory(formData.category), 
//     formData.subcategory
//   ) : null

//   // Progress steps
//   const steps = [
//     { id: 'basic', name: 'Basic Information', description: 'Product details' },
//     { id: 'specifications', name: 'Specifications', description: 'Product specs' },
//     { id: 'images', name: 'Images & Finalize', description: 'Upload images' }
//   ]

//   // Clean up object URLs on unmount
//   useEffect(() => {
//     return () => {
//       imagePreviews.forEach(url => URL.revokeObjectURL(url))
//     }
//   }, [imagePreviews])

//   // Reset specifications when category changes
//   useEffect(() => {
//     if (formData.category) {
//       setFormData(prev => ({
//         ...prev,
//         specifications: {}
//       }))
//       setSpecsSectionOpen(true)
//     }
//   }, [formData.category])

//   // Form validation for current step
//   const validateCurrentStep = (): string | null => {
//     switch (currentStep) {
//       case 'basic':
//         if (!formData.name.trim()) return 'Product name is required'
//         if (!formData.originalPrice || parseFloat(formData.originalPrice) <= 0) return 'Valid original price is required'
//         if (!formData.price || parseFloat(formData.price) <= 0) return 'Valid selling price is required'
//         if (!formData.category) return 'Category is required'
//         if (!formData.description.trim()) return 'Description is required'
//         if (!formData.stock || parseInt(formData.stock) < 0) return 'Valid stock quantity is required'
//         return null

//       case 'specifications':
//         if (categoryConfig) {
//           const missingRequired = categoryConfig.specifications
//             .filter(spec => spec.required && !formData.specifications[spec.fieldName])
//             .map(spec => spec.label)

//           if (missingRequired.length > 0) {
//             return `Please fill in required specifications: ${missingRequired.join(', ')}`
//           }
//         }
//         return null

//       case 'images':
//         if (imageFiles.length === 0) return 'Please upload at least one product image'
//         return null

//       default:
//         return null
//     }
//   }

//   // Navigation functions
//   const nextStep = () => {
//     const error = validateCurrentStep()
//     if (error) {
//       alert(error)
//       return
//     }

//     const stepOrder: Step[] = ['basic', 'specifications', 'images']
//     const currentIndex = stepOrder.indexOf(currentStep)
//     if (currentIndex < stepOrder.length - 1) {
//       setCurrentStep(stepOrder[currentIndex + 1])
//     }
//   }

//   const prevStep = () => {
//     const stepOrder: Step[] = ['basic', 'specifications', 'images']
//     const currentIndex = stepOrder.indexOf(currentStep)
//     if (currentIndex > 0) {
//       setCurrentStep(stepOrder[currentIndex - 1])
//     }
//   }

//   // Calculate final price with 10% markup
//   const calculateFinalPrice = (basePrice: string): string => {
//     if (!basePrice || isNaN(parseFloat(basePrice))) return ''
//     const price = parseFloat(basePrice)
//     const finalPrice = price + (price * 0.10)
//     return finalPrice.toFixed(2)
//   }

//   // Handle price input changes
//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const basePrice = e.target.value
//     setFormData(prev => ({
//       ...prev,
//       originalPrice: basePrice,
//       price: calculateFinalPrice(basePrice)
//     }))
//   }

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || [])
    
//     if (files.length + imageFiles.length > 4) {
//       alert('Maximum 4 images allowed')
//       return
//     }

//     const newImageFiles = [...imageFiles, ...files]
//     setImageFiles(newImageFiles)

//     // Create preview URLs
//     const newPreviews = files.map(file => URL.createObjectURL(file))
//     setImagePreviews(prev => [...prev, ...newPreviews])
//   }

//   const removeImage = (index: number) => {
//     const newFiles = imageFiles.filter((_, i) => i !== index)
//     const newPreviews = imagePreviews.filter((_, i) => i !== index)
    
//     setImageFiles(newFiles)
//     setImagePreviews(newPreviews)
    
//     URL.revokeObjectURL(imagePreviews[index])
//   }

//   // Handle basic form input changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
    
//     if (name !== 'originalPrice') {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }))
//     }
//   }

//   const handleSpecificationChange = (fieldName: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       specifications: {
//         ...prev.specifications,
//         [fieldName]: value
//       }
//     }))
//   }

//   // Upload images with watermark using API route
//   const uploadImagesWithWatermark = async (files: File[]): Promise<string[]> => {
//     try {
//       console.log('📤 Starting upload with watermark via API...')
      
//       const uploadFormData = new FormData()
//       files.forEach(file => {
//         uploadFormData.append('images', file)
//       })

//       // Add watermark flag
//       uploadFormData.append('addWatermark', 'true')

//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: uploadFormData,
//       })

//       console.log('📤 Upload API response status:', response.status)

//       if (!response.ok) {
//         const errorText = await response.text()
//         console.error('❌ Upload API error:', errorText)
//         throw new Error(`Upload failed: HTTP ${response.status}`)
//       }

//       const result = await response.json()
//       console.log('📤 Upload API result:', result)

//       if (result.success && result.urls) {
//         console.log('✅ API upload with watermark successful:', result.urls)
//         return result.urls
//       } else {
//         throw new Error(result.error || 'Upload failed - no URLs returned')
//       }
//     } catch (error) {
//       console.error('❌ API upload with watermark error:', error)
//       // Fallback to direct Cloudinary upload without watermark
//       console.log('🔄 Falling back to direct Cloudinary upload without watermark...')
//       return await uploadImagesToCloudinary(files)
//     }
//   }

//   // Fallback: Upload images to Cloudinary without watermark
//   const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
//     try {
//       console.log('📤 Starting Cloudinary direct upload...')
//       const uploadedUrls: string[] = []

//       for (const file of files) {
//         try {
//           if (!file.type.startsWith('image/')) {
//             throw new Error(`File ${file.name} is not an image`)
//           }

//           const formData = new FormData()
//           formData.append('file', file)
//           formData.append('upload_preset', 'ml_default')
//           formData.append('cloud_name', 'dxuhyn4ue')
          
//           console.log(`📤 Uploading to Cloudinary: ${file.name}`)
          
//           const response = await fetch(`https://api.cloudinary.com/v1_1/dxuhyn4ue/image/upload`, {
//             method: 'POST',
//             body: formData,
//           })
          
//           if (!response.ok) {
//             const errorData = await response.json()
//             throw new Error(errorData.error?.message || `HTTP ${response.status}`)
//           }
          
//           const data = await response.json()
          
//           if (data.secure_url) {
//             console.log(`✅ Cloudinary upload successful: ${data.secure_url}`)
//             uploadedUrls.push(data.secure_url)
//           } else {
//             throw new Error('No secure_url in response')
//           }
//         } catch (fileError) {
//           console.error(`❌ Error uploading file ${file.name}:`, fileError)
//           throw fileError
//         }
//       }

//       if (uploadedUrls.length === 0) {
//         throw new Error('All Cloudinary uploads failed')
//       }

//       return uploadedUrls

//     } catch (error) {
//       console.error('❌ Cloudinary upload error:', error)
//       const placeholderUrls = files.map((_, index) => 
//         `https://via.placeholder.com/400x400/007bff/ffffff?text=Product+${index + 1}`
//       )
//       console.log('📸 Using fallback placeholder URLs:', placeholderUrls)
//       return placeholderUrls
//     }
//   }

//   // Handle final form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     const validationError = validateCurrentStep()
//     if (validationError) {
//       alert(validationError)
//       return
//     }

//     setLoading(true)

//     try {
//       // Step 1: Upload images with watermark
//       console.log('📤 Uploading images with watermark...')
//       const imageUrls = await uploadImagesWithWatermark(imageFiles)
//       console.log('✅ Images uploaded successfully with watermark:', imageUrls)

//       // Convert category to MongoDB format using the CORRECT mapping
//       const productData = {
//         name: formData.name.trim(),
//         price: parseFloat(formData.price),
//         originalPrice: parseFloat(formData.originalPrice),
//         category: mapCategoryToDBFormat(formData.category.trim()), // This now maps to BEAUTY_PERSONAL_CARE
//         subcategory: formData.subcategory ? formData.subcategory.trim() : "",
//         images: imageUrls,
//         description: formData.description.trim(),
//         stock: parseInt(formData.stock) || 1,
//         inStock: parseInt(formData.stock) > 0,
//         status: 'pending',
//         specifications: formData.specifications
//       }

//       console.log('📦 Sending product data to API:', productData)

//       // Send to your products API
//       const response = await fetch('/api/sellers/products', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//         credentials: 'include',
//       })

//       console.log('📦 Products API response status:', response.status)

//       if (!response.ok) {
//         const errorText = await response.text()
//         console.error('❌ Products API error response:', errorText)
//         throw new Error(`Failed to create product: HTTP ${response.status}`)
//       }

//       const result = await response.json()
//       console.log('📦 Products API response:', result)

//       if (result.success) {
//         console.log('✅ Product created successfully:', result.product)
//         alert('Product created successfully with watermarked images! Awaiting admin approval.')
//         router.push('/seller/dashboard')
//       } else {
//         throw new Error(result.error || result.message || 'Failed to create product')
//       }

//     } catch (error) {
//       console.error('❌ Product creation process failed:', error)
//       alert(error instanceof Error ? error.message : 'Failed to create product. Please check console for details.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Calculate profit and markup
//   const profit = formData.originalPrice && formData.price 
//     ? (parseFloat(formData.price) - parseFloat(formData.originalPrice)).toFixed(2)
//     : '0.00'

//   const markupPercentage = formData.originalPrice && parseFloat(formData.originalPrice) > 0
//     ? ((parseFloat(formData.price) - parseFloat(formData.originalPrice)) / parseFloat(formData.originalPrice) * 100).toFixed(1)
//     : '0.0'

//   // Render current step content
//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 'basic':
//         return (
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Product Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter product name"
//                   />
//                 </div>

//                 <div className="space-y-4">
//                   {/* Original Price Input */}
//                   <div>
//                     <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Price (Birr) *
//                     </label>
//                     <input
//                       type="number"
//                       id="originalPrice"
//                       name="originalPrice"
//                       required
//                       min="0"
//                       step="0.01"
//                       value={formData.originalPrice}
//                       onChange={handlePriceChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="0.00"
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Enter the price you want to sell for</p>
//                   </div>

//                   {/* Final Price Display */}
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium text-blue-900">Final Selling Price:</span>
//                       <Calculator className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <div className="text-2xl font-bold text-blue-700">
//                       Birr{formData.price || '0.00'}
//                     </div>
//                     <div className="text-xs text-blue-600 mt-1">
//                       Includes 10% platform fee (Birr{profit} profit)
//                     </div>
//                     {formData.originalPrice && (
//                       <div className="text-xs text-green-600 mt-1">
//                         Markup: {markupPercentage}%
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
//                     Stock Quantity *
//                   </label>
//                   <input
//                     type="number"
//                     id="stock"
//                     name="stock"
//                     required
//                     min="0"
//                     value={formData.stock}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="1"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
//                     Category *
//                   </label>
//                   <select
//                     id="category"
//                     name="category"
//                     required
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Select a category</option>
//                     {categories.map(category => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
//                     Subcategory
//                   </label>
//                   <select
//                     id="subcategory"
//                     name="subcategory"
//                     value={formData.subcategory}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     disabled={!formData.category}
//                   >
//                     <option value="">Select a subcategory</option>
//                     {formData.category && subcategories[formData.category]?.map(sub => (
//                       <option key={sub} value={sub}>
//                         {sub}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 required
//                 rows={4}
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Describe your product in detail..."
//               />
//             </div>
//           </div>
//         )

//       case 'specifications':
//         return (
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Specifications</h2>
              
//               {categoryConfig ? (
//                 <div className="border border-gray-200 rounded-lg">
//                   <button
//                     type="button"
//                     onClick={() => setSpecsSectionOpen(!specsSectionOpen)}
//                     className="w-full flex items-center justify-between p-6 text-left"
//                   >
//                     <div>
//                       <h2 className="text-xl font-semibold text-gray-900">
//                         {categoryConfig.name} Specifications
//                       </h2>
//                       <p className="text-sm text-gray-600 mt-1">
//                         Add detailed specifications for your product
//                       </p>
//                     </div>
//                     {specsSectionOpen ? (
//                       <ChevronUp className="w-5 h-5 text-gray-500" />
//                     ) : (
//                       <ChevronDown className="w-5 h-5 text-gray-500" />
//                     )}
//                   </button>

//                   {specsSectionOpen && (
//                     <div className="px-6 pb-6 border-t border-gray-200">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                         {categoryConfig.specifications.map((spec) => (
//                           <div key={spec.fieldName}>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               {spec.label} {spec.required && '*'}
//                             </label>
                            
//                             {spec.type === 'select' ? (
//                               <select
//                                 value={formData.specifications[spec.fieldName] as string || ''}
//                                 onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 required={spec.required}
//                               >
//                                 <option value="">Select {spec.label}</option>
//                                 {spec.options?.map(option => (
//                                   <option key={option} value={option}>
//                                     {option}
//                                   </option>
//                                 ))}
//                               </select>
//                             ) : spec.type === 'number' ? (
//                               <div className="flex items-center">
//                                 <input
//                                   type="number"
//                                   value={formData.specifications[spec.fieldName] as string || ''}
//                                   onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
//                                   min={spec.min}
//                                   max={spec.max}
//                                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                   required={spec.required}
//                                 />
//                                 {spec.unit && (
//                                   <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">
//                                     {spec.unit}
//                                   </span>
//                                 )}
//                               </div>
//                             ) : (
//                               <input
//                                 type="text"
//                                 value={formData.specifications[spec.fieldName] as string || ''}
//                                 onChange={(e) => handleSpecificationChange(spec.fieldName, e.target.value)}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 required={spec.required}
//                                 placeholder={`Enter ${spec.label.toLowerCase()}`}
//                               />
//                             )}
                            
//                             {spec.unit && spec.type !== 'number' && (
//                               <span className="text-sm text-gray-500 ml-2">{spec.unit}</span>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
//                   <p className="text-gray-500">Please select a category in the Basic Information step to see specifications</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )

//       case 'images':
//         return (
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Images</h2>
              
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Images *
//               </label>
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-medium text-yellow-800">
//                       Automatic Watermark Protection
//                     </h3>
//                     <div className="mt-2 text-sm text-yellow-700">
//                       <p>
//                         All uploaded images will be automatically watermarked with "yafrican.com" 
//                         to protect your content.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <p className="text-sm text-gray-500 mb-4">Upload up to 4 images. The first image will be the main display image.</p>
              
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//                 {imagePreviews.map((preview, index) => (
//                   <div key={index} className="relative group">
//                     <img
//                       src={preview}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg border border-gray-300"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
                
//                 {imagePreviews.length < 4 && (
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
//                     <Upload className="w-8 h-8 text-gray-400 mb-2" />
//                     <span className="text-sm text-gray-500">Add Image</span>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                     />
//                   </label>
//                 )}
//               </div>
              
//               {imagePreviews.length === 0 && (
//                 <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
//                   <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-500">No images uploaded yet</p>
//                   <p className="text-sm text-gray-400 mt-1">Upload product images to continue</p>
//                 </div>
//               )}
//             </div>

//             {/* Price Summary */}
//             {formData.originalPrice && (
//               <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                   <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
//                     <div className="text-gray-600 mb-1">Your Price</div>
//                     <div className="text-2xl font-bold text-gray-900">Birr{parseFloat(formData.originalPrice).toFixed(2)}</div>
//                   </div>
//                   <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
//                     <div className="text-gray-600 mb-1">Platform Fee (10%)</div>
//                     <div className="text-2xl font-bold text-yellow-600">Birr{profit}</div>
//                   </div>
//                   <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
//                     <div className="text-gray-600 mb-1">Final Price</div>
//                     <div className="text-2xl font-bold text-green-700">Birr{formData.price}</div>
//                   </div>
//                 </div>
//                 <div className="mt-4 text-center text-sm text-gray-600">
//                   Customers will see the final price of <strong>Birr{formData.price}</strong>
//                 </div>
//               </div>
//             )}
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Dashboard
//           </button>
//           <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
//           <p className="text-gray-600 mt-2">Add a new product to your store. Products require admin approval before going live.</p>
//         </div>

//         {/* Progress Steps */}
//         <div className="mb-8">
//           <nav aria-label="Progress">
//             <ol className="flex items-center space-x-8">
//               {steps.map((step, index) => {
//                 const stepIndex = steps.findIndex(s => s.id === step.id)
//                 const currentStepIndex = steps.findIndex(s => s.id === currentStep)
//                 const isCompleted = stepIndex < currentStepIndex
//                 const isCurrent = step.id === currentStep

//                 return (
//                   <li key={step.id} className="flex-1">
//                     <div className="flex items-center">
//                       <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
//                         isCompleted 
//                           ? 'bg-blue-600' 
//                           : isCurrent 
//                             ? 'bg-blue-600 border-2 border-blue-600' 
//                             : 'bg-gray-200'
//                       }`}>
//                         {isCompleted ? (
//                           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         ) : (
//                           <span className={`text-sm font-medium ${
//                             isCurrent ? 'text-white' : 'text-gray-500'
//                           }`}>
//                             {index + 1}
//                           </span>
//                         )}
//                       </div>
//                       <div className="ml-4 flex-1">
//                         <div className={`text-sm font-medium ${
//                           isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-500'
//                         }`}>
//                           {step.name}
//                         </div>
//                         <div className="text-sm text-gray-500">{step.description}</div>
//                       </div>
//                       {index < steps.length - 1 && (
//                         <div className={`flex-1 h-0.5 ml-8 ${
//                           stepIndex < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
//                         }`} />
//                       )}
//                     </div>
//                   </li>
//                 )
//               })}
//             </ol>
//           </nav>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
//         >
//           <form onSubmit={handleSubmit}>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentStep}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {renderStepContent()}
//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation Buttons */}
//             <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-8">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 disabled={currentStep === 'basic'}
//                 className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 <LeftIcon className="w-4 h-4 mr-2" />
//                 Previous
//               </button>

//               <div className="flex items-center gap-4">
//                 <button
//                   type="button"
//                   onClick={() => router.back()}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>

//                 {currentStep === 'images' ? (
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//                   >
//                     {loading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         Creating...
//                       </>
//                     ) : (
//                       <>
//                         <Plus className="w-4 h-4" />
//                         Create Product with Watermark
//                       </>
//                     )}
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Next
//                     <ArrowRight className="w-4 h-4 ml-2" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Upload, X, Plus, Calculator, ChevronDown, ChevronUp, ArrowRight, ArrowLeft as LeftIcon } from 'lucide-react'
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

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    description: '',
    stock: '1',
    images: [],
    specifications: {}
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
        if (!formData.stock || parseInt(formData.stock) < 0) return 'Valid stock quantity is required'
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

  // Calculate final price with 10% markup
  const calculateFinalPrice = (basePrice: string): string => {
    if (!basePrice || isNaN(parseFloat(basePrice))) return ''
    const price = parseFloat(basePrice)
    const finalPrice = price + (price * 0.10)
    return finalPrice.toFixed(2)
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

      // Convert category to MongoDB format using the CORRECT mapping
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        category: mapCategoryToDBFormat(formData.category.trim()),
        subcategory: formData.subcategory ? formData.subcategory.trim() : "",
        images: imageUrls,
        description: formData.description.trim(),
        stock: parseInt(formData.stock) || 1,
        inStock: parseInt(formData.stock) > 0,
        status: 'pending',
        specifications: formData.specifications
      }

      console.log('📦 Sending product data to API:', productData)

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
  const profit = formData.originalPrice && formData.price 
    ? (parseFloat(formData.price) - parseFloat(formData.originalPrice)).toFixed(2)
    : '0.00'

  const markupPercentage = formData.originalPrice && parseFloat(formData.originalPrice) > 0
    ? ((parseFloat(formData.price) - parseFloat(formData.originalPrice)) / parseFloat(formData.originalPrice) * 100).toFixed(1)
    : '0.0'

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
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">Final Selling Price:</span>
                      <Calculator className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-700">
                      Birr{formData.price || '0.00'}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className="text-gray-600 mb-1">Your Price</div>
                    <div className="text-2xl font-bold text-gray-900">Birr{parseFloat(formData.originalPrice).toFixed(2)}</div>
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
        )

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