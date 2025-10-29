import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

// Hash password before save
SellerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

SellerSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password)
}

const Seller = mongoose.models.Seller || mongoose.model('Seller', SellerSchema)
export default Seller
