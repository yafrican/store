// // models/product.js - COMPLETELY FIXED WITH SPECIFICATIONS
// import mongoose from 'mongoose'
// import slugify from 'slugify' // ← ADD THIS IMPORT

// const ProductSchema = new mongoose.Schema({
//   // Basic Information
//   name: { 
//     type: String, 
//     required: true, 
//     trim: true,
//     maxlength: [100, 'Product name cannot exceed 100 characters']
//   },
//   slug: { type: String, unique: true, sparse: true },
//   price: { 
//     type: Number, 
//     required: true,
//     min: [0, 'Price cannot be negative']
//   },
//   originalPrice: { 
//     type: Number,
//     min: [0, 'Original price cannot be negative']
//   },
//   category: { 
//     type: String, 
//     required: true,
//     trim: true,
//   //   enum: [
//   //   'Electronics', 'Clothing', 'Home & Garden', 'Beauty & Health', 
//   //   'Sports & Outdoors', 'Toys & Games', 'Automotive', 
//   //   'Books & Media', 'Jewelry & Accessories', 'Food & Beverages'
//     enum: [
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
// },
//   subcategory: { 
//     type: String, 
//     trim: true 
//   },
//   images: { 
//     type: [String], 
//     default: [],
//     validate: {
//       validator: function(images) {
//         return images.length <= 10
//       },
//       message: 'Cannot upload more than 10 images'
//     }
//   },
//   description: { 
//     type: String,
//     maxlength: [2000, 'Description cannot exceed 2000 characters']
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'approved', 'rejected'],
//     default: 'pending'
//   },
//   inStock: { 
//     type: Boolean, 
//     default: true 
//   },
//   stock: { 
//     type: Number, 
//     default: 1,
//     min: [0, 'Stock cannot be negative']
//   },
//   seller: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   deliveryLocations: {
//     type: [String],
//     default: []
//   },
//   deliveryTime: { // Add this
//     type: String,
//     required: true,
//     trim: true,
//     maxlength: 50
//   },
//   freeShipping: {
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
//   // Product Details
//   rating: {
//     type: Number,
//     min: 0,
//     max: 5,
//     default: 0
//   },
//   reviewCount: {
//     type: Number,
//     default: 0
//   },
//   isNewProduct: {
//     type: Boolean,
//     default: false
//   },
//   isOnSale: {
//     type: Boolean,
//     default: false
//   },
//   salePrice: {
//     type: Number,
//     min: 0
//   },
//   exchangePossible: {
//     type: Boolean,
//     default: false
//   },
  
//   // ✅ FIXED: Comprehensive Specifications with proper configuration
//   specifications: {
//     type: mongoose.Schema.Types.Mixed,
//     default: {}
//   }
// }, { 
//   timestamps: true,
//   toJSON: { 
//     virtuals: true,
//     transform: function(doc, ret) {
//       // ✅ FIXED: Ensure specifications is always an object in JSON output
//       if (!ret.specifications || typeof ret.specifications !== 'object') {
//         ret.specifications = {}
//       }
//       return ret
//     }
//   },
//   toObject: { 
//     virtuals: true,
//     transform: function(doc, ret) {
//       // ✅ FIXED: Ensure specifications is always an object in object output
//       if (!ret.specifications || typeof ret.specifications !== 'object') {
//         ret.specifications = {}
//       }
//       return ret
//     }
//   }
// })

// // Virtual for discount percentage
// ProductSchema.virtual('discountPercentage').get(function() {
//   if (this.originalPrice && this.originalPrice > this.price) {
//     return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100)
//   }
//   return 0
// })

// // Virtual for current price
// ProductSchema.virtual('currentPrice').get(function() {
//   return this.isOnSale && this.salePrice ? this.salePrice : this.price
// })

// // Indexes for optimal query performance
// ProductSchema.index({ seller: 1, status: 1 })
// ProductSchema.index({ category: 1, status: 1 })
// ProductSchema.index({ price: 1 })
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
//   'specifications.model': 'text'
// })

// // ✅ REPLACE LINES 147-180 WITH THIS:
// // COMBINED SAVE MIDDLEWARE
// ProductSchema.pre('save', async function(next) {
//   // 1. Ensure specifications is always an object
//   if (!this.specifications || typeof this.specifications !== 'object') {
//     this.specifications = {}
//   }

//   // 2. Generate slug if name is modified or slug doesn't exist
//   if (this.isModified('name') || !this.slug) {
//     try {
//       const baseSlug = slugify(this.name, {
//         lower: true,
//         strict: false,
//         locale: 'am',
//         remove: /[*+~.()'"!:@]/g
//       }) || 'product'

//       let slug = baseSlug
//       let counter = 1

//       while (await mongoose.model('Product').findOne({ 
//         slug, 
//         _id: { $ne: this._id } 
//       })) {
//         slug = `${baseSlug}-${counter}`
//         counter++
        
//         if (counter > 100) {
//           slug = `${baseSlug}-${Date.now()}`
//           break
//         }
//       }

//       this.slug = slug
//     } catch (error) {
//       console.error('Error generating slug:', error)
//       this.slug = `product-${Date.now()}`
//     }
//   }

//   next()
// })

// // ✅ FIXED: Add middleware for find operations to ensure specifications consistency
// ProductSchema.post('find', function(docs) {
//   docs.forEach(doc => {
//     if (doc.specifications && typeof doc.specifications === 'object') {
//       // Already good
//     } else {
//       doc.specifications = {}
//     }
//   })
// })

// ProductSchema.post('findOne', function(doc) {
//   if (doc && (!doc.specifications || typeof doc.specifications !== 'object')) {
//     doc.specifications = {}
//   }
// })

// const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
// export default Product

// models/product.js - COMPLETE FIXED VERSION
import mongoose from 'mongoose'
import slugify from 'slugify'

const ProductSchema = new mongoose.Schema({
  // Basic Information
  name: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: { type: String, unique: true, sparse: true },
  price: { 
    type: Number, 
    required: true,
    min: [0, 'Price cannot be negative']
  },
  originalPrice: { 
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  category: { 
    type: String, 
    required: true,
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
      validator: function(images) {
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deliveryLocations: {
    type: [String],
    default: []
  },
  deliveryTime: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
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
  
  // ✅ FIXED: Comprehensive Specifications with proper configuration
  specifications: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { 
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      // ✅ FIXED: Ensure specifications is always an object in JSON output
      if (!ret.specifications || typeof ret.specifications !== 'object') {
        ret.specifications = {}
      }
      return ret
    }
  },
  toObject: { 
    virtuals: true,
    transform: function(doc, ret) {
      // ✅ FIXED: Ensure specifications is always an object in object output
      if (!ret.specifications || typeof ret.specifications !== 'object') {
        ret.specifications = {}
      }
      return ret
    }
  }
})

// Virtual for discount percentage
ProductSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100)
  }
  return 0
})

// Virtual for current price
ProductSchema.virtual('currentPrice').get(function() {
  return this.isOnSale && this.salePrice ? this.salePrice : this.price
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

// ✅ CORRECTED: COMBINED SAVE MIDDLEWARE
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
      const baseSlug = slugify(this.name, {
        lower: true,
        strict: false,
        locale: 'am',
        remove: /[*+~.()'"!:@]/g
      }) || 'product'

      let slug = baseSlug
      let counter = 1

      while (await mongoose.model('Product').findOne({ 
        slug, 
        _id: { $ne: this._id } 
      })) {
        slug = `${baseSlug}-${counter}`
        counter++
        
        if (counter > 100) {
          slug = `${baseSlug}-${Date.now()}`
          break
        }
      }

      this.slug = slug
    } catch (error) {
      console.error('Error generating slug:', error)
      this.slug = `product-${Date.now()}`
    }
  }

  next()
})

// ✅ FIXED: Add middleware for find operations to ensure specifications consistency
ProductSchema.post('find', function(docs) {
  docs.forEach(doc => {
    if (doc.specifications && typeof doc.specifications === 'object') {
      // Already good
    } else {
      doc.specifications = {}
    }
  })
})

ProductSchema.post('findOne', function(doc) {
  if (doc && (!doc.specifications || typeof doc.specifications !== 'object')) {
    doc.specifications = {}
  }
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
export default Product