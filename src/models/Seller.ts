import mongoose, { Document, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface ISeller extends Document {
  name: string
  email: string
  phone?: string
  passwordHash: string
  isApproved: boolean
  status: 'pending' | 'approved' | 'suspended'
  createdAt: Date
  comparePassword(password: string): Promise<boolean>
}

const SellerSchema = new mongoose.Schema<ISeller>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  passwordHash: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'suspended'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
})

// Instance method for comparing passwords
SellerSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.passwordHash)
}

// Prevent model overwrite on hot reload
const Seller: Model<ISeller> =
  mongoose.models.Seller || mongoose.model<ISeller>('Seller', SellerSchema)

export default Seller