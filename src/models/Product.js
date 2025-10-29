// models/product.js - UPDATED TO MATCH NEW SCHEMA
import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: { type: String, unique: true },
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
    trim: true
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
        return images.length <= 4 // Max 4 images
      },
      message: 'Cannot upload more than 4 images'
    }
  },
  description: { 
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
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
    ref: 'User', // Changed from 'Seller' to 'User'
    required: true
  }
}, { 
  timestamps: true // This adds createdAt and updatedAt
})

// Add indexes for better performance
ProductSchema.index({ seller: 1, status: 1 })
ProductSchema.index({ category: 1, status: 1 })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
export default Product