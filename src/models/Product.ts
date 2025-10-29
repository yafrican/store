// src/models/Product.ts - UPDATED
import mongoose, { Schema, model, models } from 'mongoose'

interface IProduct extends mongoose.Document {
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
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { 
      type: String, 
      required: [true, 'Product name is required'], 
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    slug: { type: String, unique: true },
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
        validator: function(images: string[]) {
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { 
    timestamps: true 
  }
)

// Add index for better query performance
ProductSchema.index({ seller: 1, status: 1 })
ProductSchema.index({ category: 1, status: 1 })

const Product = models.Product || model<IProduct>('Product', ProductSchema)
export default Product