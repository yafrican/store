// // models/Product.ts - Add tracking fields
// import mongoose, { Schema, model, models, Document } from 'mongoose'
// import slugify from 'slugify'

// export interface IProduct extends Omit<Document, 'isNew'> {
//   // Basic Information
//   name: string
//   slug?: string
//   price: number
//   originalPrice?: number
//   category: string
//   subcategory?: string
//   images: string[]
//   description?: string
//   status: 'pending' | 'approved' | 'rejected'
//   inStock: boolean
//   stock: number
//   seller: mongoose.Types.ObjectId
//     deliveryLocations: string[]
//   deliveryTime: string // Add this line
//  freeShipping: boolean
//   warrantyPeriod: string
//   warrantyType: string
//   // Product Details
//   rating?: number
//   reviewCount?: number
//   isNewProduct?: boolean
//   isOnSale?: boolean
//   salePrice?: number
//   exchangePossible?: boolean
  
//   // Tracking for recommendations
//   viewCount: number
//   purchaseCount: number
//   popularityScore: number
//   tags: string[]
  
//   // ✅ FIXED: Use any type for specifications to avoid schema conflicts
//   specifications?: any
  
//   // Timestamps
//   createdAt: Date
//   updatedAt: Date
// }

// const ProductSchema = new Schema<IProduct>(
//   {
//     // Basic Information
//     name: { 
//       type: String, 
//       required: [true, 'Product name is required'], 
//       trim: true,
//       maxlength: [100, 'Product name cannot exceed 100 characters']
//     },
    
//     slug: { type: String, unique: true, sparse: true },
//     price: { 
//       type: Number, 
//       required: [true, 'Price is required'],
//       min: [0, 'Price cannot be negative']
//     },
//     originalPrice: { 
//       type: Number,
//       min: [0, 'Original price cannot be negative']
//     },
//     category: { 
//       type: String, 
//       required: [true, 'Category is required'],
//       trim: true,
//        enum: [
//     'ELECTRONICS',
//     'CLOTHING',
//     'HOME_FURNITURE_APPLIANCES',
//     'BEAUTY_PERSONAL_CARE',
//     'LEISURE_ACTIVITIES',
//     'BABIES_KIDS',
//     'AUTOMOTIVE',
//     'BOOKS_MEDIA',
//     'JEWELRY_ACCESSORIES',
//     'FOOD_AGRICULTURE_FARMING',
//     'SERVICES',
//     'PROPERTY',
//     'VEHICLES',
//     'COMMERCIAL_EQUIPMENT',
//     'REPAIR_CONSTRUCTION',
//     'ANIMALS_PETS'
//   ]

//   },
//     subcategory: { 
//       type: String, 
//       trim: true 
//     },
//     images: { 
//       type: [String], 
//       default: [],
//       validate: {
//         validator: function(images: string[]) {
//           return images.length <= 10
//         },
//         message: 'Cannot upload more than 10 images'
//       }
//     },
//     description: { 
//       type: String,
//       maxlength: [2000, 'Description cannot exceed 2000 characters']
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'approved', 'rejected'],
//       default: 'pending'
//     },
//     inStock: { 
//       type: Boolean, 
//       default: true 
//     },
//     stock: { 
//       type: Number, 
//       default: 1,
//       min: [0, 'Stock cannot be negative']
//     },
//     seller: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//      deliveryLocations: {
//       type: [String],
//       default: []
//     },
//     deliveryTime: { // Add this field
//       type: String,
//       required: [true, 'Delivery time is required'],
//       trim: true,
//       maxlength: [50, 'Delivery time cannot exceed 50 characters']
//     },
//     freeShipping: {
//       type: Boolean,
//       default: false
//     },
//     warrantyPeriod: {
//       type: String,
//       default: ''
//     },
//     warrantyType: {
//       type: String,
//       trim: true,
//       maxlength: [100, 'Warranty type cannot exceed 100 characters']
//     },
// //     deliveryLocations: {
// //   type: [String],
// //   default: [],
// //   validate: {
// //     validator: function(locations: string[]) {
// //       return locations.length <= 10 && 
// //              locations.every(loc => loc.length <= 50) // Each location max 50 chars
// //     },
// //     message: 'Max 10 locations, each under 50 characters'
// //   }
// // }
//     // Product Details
//     rating: {
//       type: Number,
//       min: 0,
//       max: 5,
//       default: 0
//     },
//     reviewCount: {
//       type: Number,
//       default: 0
//     },
//     isNewProduct: {
//       type: Boolean,
//       default: false
//     },
//     isOnSale: {
//       type: Boolean,
//       default: false
//     },
//     salePrice: {
//       type: Number,
//       min: 0
//     },
//     exchangePossible: {
//       type: Boolean,
//       default: false
//     },
    
//     // Tracking for recommendations
//     viewCount: {
//       type: Number,
//       default: 0
//     },
//     purchaseCount: {
//       type: Number,
//       default: 0
//     },
//     popularityScore: {
//       type: Number,
//       default: 0
//     },
//     tags: [{
//       type: String,
//       trim: true
//     }],
    
//     // ✅ FIXED: Use Schema.Types.Mixed with proper configuration
//     specifications: {
//       type: Schema.Types.Mixed,
//       default: {}
//     }
//   },
//   { 
//     timestamps: true,
//     toJSON: { 
//       virtuals: true,
//       transform: function(doc, ret) {
//         // Ensure specifications is always an object in JSON output
//         if (!ret.specifications) {
//           ret.specifications = {}
//         }
//         return ret
//       }
//     },
//     toObject: { 
//       virtuals: true,
//       transform: function(doc, ret) {
//         // Ensure specifications is always an object in object output
//         if (!ret.specifications) {
//           ret.specifications = {}
//         }
//         return ret
//       }
//     }
//   }
// )

// // Virtual for discount percentage
// ProductSchema.virtual('discountPercentage').get(function() {
//   if (this.originalPrice && this.originalPrice > this.price) {
//     return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100)
//   }
//   return 0
// })

// // Virtual for current price (sale or regular)
// ProductSchema.virtual('currentPrice').get(function() {
//   return this.isOnSale && this.salePrice ? this.salePrice : this.price
// })

// // Auto-update popularity score
// ProductSchema.pre('save', function(next) {
//   this.popularityScore = (this.viewCount * 0.7) + (this.purchaseCount * 0.3)
//   next()
// })
// // ✅ ADD SLUG GENERATION MIDDLEWARE HERE
// ProductSchema.pre('save', async function(next) {
//   // Only generate slug if name is modified or slug doesn't exist
//   if (this.isModified('name') || !this.slug) {
//     try {
//       // Generate base slug with Amharic support
//       const baseSlug = slugify(this.name, {
//         lower: true,
//         strict: false,  // Keep Amharic characters
//         locale: 'am',
//         remove: /[*+~.()'"!:@]/g // Remove only special characters
//       }) || 'product'

//       let slug = baseSlug
//       let counter = 1

//       // Check for duplicate slugs
//       while (await mongoose.model('Product').findOne({ 
//         slug, 
//         _id: { $ne: this._id } 
//       })) {
//         slug = `${baseSlug}-${counter}`
//         counter++
        
//         // Safety check to prevent infinite loops
//         if (counter > 100) {
//           slug = `${baseSlug}-${Date.now()}`
//           break
//         }
//       }

//       this.slug = slug
//     } catch (error) {
//       console.error('Error generating slug:', error)
//       // Fallback slug
//       this.slug = `product-${Date.now()}`
//     }
//   }
//   next()
// })

// // Indexes for optimal query performance
// ProductSchema.index({ seller: 1, status: 1 })
// ProductSchema.index({ category: 1, status: 1 })
// ProductSchema.index({ price: 1 })
// ProductSchema.index({ popularityScore: -1 })
// ProductSchema.index({ viewCount: -1 })
// ProductSchema.index({ 'specifications.brand': 1 })
// ProductSchema.index({ 'specifications.condition': 1 })
// ProductSchema.index({ 'specifications.ram': 1 })
// ProductSchema.index({ 'specifications.storage': 1 })
// ProductSchema.index({ 'specifications.screenSize': 1 })
// ProductSchema.index({ 'specifications.color': 1 })
// ProductSchema.index({ 'specifications.simType': 1 })
// ProductSchema.index({ createdAt: -1 })
// ProductSchema.index({ rating: -1 })

// // Text search index
// ProductSchema.index({
//   name: 'text',
//   description: 'text',
//   'specifications.brand': 'text',
//   'specifications.model': 'text',
//   tags: 'text'
// })

// // ✅ FIXED: Add middleware to ensure specifications is always an object
// ProductSchema.pre('save', function(next) {
//   if (!this.specifications || typeof this.specifications !== 'object') {
//     this.specifications = {}
//   }
//   next()
// })

// const Product = models.Product || model<IProduct>('Product', ProductSchema)
// export default Product

// models/Product.ts - COMPLETE FIXED VERSION
import mongoose, { Schema, model, models, Document } from 'mongoose'
import slugify from 'slugify'

export interface IProduct extends Omit<Document, 'isNew'> {
  // Basic Information
  name: string
  slug?: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  images: string[]
  description?: string
  status: 'pending' | 'approved' | 'rejected'
  inStock: boolean
  stock: number
  seller: mongoose.Types.ObjectId
  deliveryLocations: string[]
  deliveryTime: string
  freeShipping: boolean
  warrantyPeriod: string
  warrantyType: string
  
  // Product Details
  rating?: number
  reviewCount?: number
  isNewProduct?: boolean
  isOnSale?: boolean
  salePrice?: number
  exchangePossible?: boolean
  
  // Tracking for recommendations
  viewCount: number
  purchaseCount: number
  popularityScore: number
  tags: string[]
  
  // ✅ FIXED: Use any type for specifications to avoid schema conflicts
  specifications?: any
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    // Basic Information
    name: { 
      type: String, 
      required: [true, 'Product name is required'], 
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    
    slug: { type: String, unique: true, sparse: true },
    price: { 
      type: Number, 
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    originalPrice: { 
      type: Number,
      min: [0, 'Original price cannot be negative']
    },
    category: { 
      type: String, 
      required: [true, 'Category is required'],
      trim: true,
      enum: [
        'ELECTRONICS',
        'CLOTHING',
        'HOME_FURNITURE_APPLIANCES',
        'BEAUTY_PERSONAL_CARE',
        'LEISURE_ACTIVITIES',
        'BABIES_KIDS',
        'AUTOMOTIVE',
        'BOOKS_MEDIA',
        'JEWELRY_ACCESSORIES',
        'FOOD_AGRICULTURE_FARMING',
        'SERVICES',
        'PROPERTY',
        'VEHICLES',
        'COMMERCIAL_EQUIPMENT',
        'REPAIR_CONSTRUCTION',
        'ANIMALS_PETS'
      ]
    },
    subcategory: { 
      type: String, 
      trim: true 
    },
    images: { 
      type: [String], 
      default: [],
      validate: {
        validator: function(images: string[]) {
          return images.length <= 10
        },
        message: 'Cannot upload more than 10 images'
      }
    },
    description: { 
      type: String,
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    inStock: { 
      type: Boolean, 
      default: true 
    },
    stock: { 
      type: Number, 
      default: 1,
      min: [0, 'Stock cannot be negative']
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    deliveryLocations: {
      type: [String],
      default: []
    },
    deliveryTime: {
      type: String,
      required: [true, 'Delivery time is required'],
      trim: true,
      maxlength: [50, 'Delivery time cannot exceed 50 characters']
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    warrantyPeriod: {
      type: String,
      default: ''
    },
    warrantyType: {
      type: String,
      trim: true,
      maxlength: [100, 'Warranty type cannot exceed 100 characters']
    },

    // Product Details
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    isNewProduct: {
      type: Boolean,
      default: false
    },
    isOnSale: {
      type: Boolean,
      default: false
    },
    salePrice: {
      type: Number,
      min: 0
    },
    exchangePossible: {
      type: Boolean,
      default: false
    },
    
    // Tracking for recommendations
    viewCount: {
      type: Number,
      default: 0
    },
    purchaseCount: {
      type: Number,
      default: 0
    },
    popularityScore: {
      type: Number,
      default: 0
    },
    tags: [{
      type: String,
      trim: true
    }],
    
    // ✅ FIXED: Use Schema.Types.Mixed with proper configuration
    specifications: {
      type: Schema.Types.Mixed,
      default: {}
    }
  },
  { 
    timestamps: true,
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        // Ensure specifications is always an object in JSON output
        if (!ret.specifications) {
          ret.specifications = {}
        }
        return ret
      }
    },
    toObject: { 
      virtuals: true,
      transform: function(doc, ret) {
        // Ensure specifications is always an object in object output
        if (!ret.specifications) {
          ret.specifications = {}
        }
        return ret
      }
    }
  }
)

// Virtual for discount percentage
ProductSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100)
  }
  return 0
})

// Virtual for current price (sale or regular)
ProductSchema.virtual('currentPrice').get(function() {
  return this.isOnSale && this.salePrice ? this.salePrice : this.price
})

// ✅ CORRECTED: SINGLE COMBINED SAVE MIDDLEWARE
ProductSchema.pre('save', async function(next) {
  // 1. Ensure specifications is always an object
  if (!this.specifications || typeof this.specifications !== 'object') {
    this.specifications = {}
  }

  // 2. Auto-update popularity score
  this.popularityScore = (this.viewCount * 0.7) + (this.purchaseCount * 0.3)

  // 3. Generate slug if name is modified or slug doesn't exist
  if (this.isModified('name') || !this.slug) {
    try {
      // Generate base slug with Amharic support
      const baseSlug = slugify(this.name, {
        lower: true,
        strict: false,  // Keep Amharic characters
        locale: 'am',
        remove: /[*+~.()'"!:@]/g // Remove only special characters
      }) || 'product'

      let slug = baseSlug
      let counter = 1

      // Check for duplicate slugs
      while (await mongoose.model('Product').findOne({ 
        slug, 
        _id: { $ne: this._id } 
      })) {
        slug = `${baseSlug}-${counter}`
        counter++
        
        // Safety check to prevent infinite loops
        if (counter > 100) {
          slug = `${baseSlug}-${Date.now()}`
          break
        }
      }

      this.slug = slug
    } catch (error) {
      console.error('Error generating slug:', error)
      // Fallback slug
      this.slug = `product-${Date.now()}`
    }
  }
  next()
})

// Indexes for optimal query performance
ProductSchema.index({ seller: 1, status: 1 })
ProductSchema.index({ category: 1, status: 1 })
ProductSchema.index({ price: 1 })
ProductSchema.index({ popularityScore: -1 })
ProductSchema.index({ viewCount: -1 })
ProductSchema.index({ 'specifications.brand': 1 })
ProductSchema.index({ 'specifications.condition': 1 })
ProductSchema.index({ 'specifications.ram': 1 })
ProductSchema.index({ 'specifications.storage': 1 })
ProductSchema.index({ 'specifications.screenSize': 1 })
ProductSchema.index({ 'specifications.color': 1 })
ProductSchema.index({ 'specifications.simType': 1 })
ProductSchema.index({ createdAt: -1 })
ProductSchema.index({ rating: -1 })

// Text search index
ProductSchema.index({
  name: 'text',
  description: 'text',
  'specifications.brand': 'text',
  'specifications.model': 'text',
  tags: 'text'
})

const Product = models.Product || model<IProduct>('Product', ProductSchema)
export default Product