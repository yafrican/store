// models/User.ts
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: "" },
  storeName: { type: String, default: "" },
  address: { type: String, default: "" },
  paymentMethod: { type: String, default: "" },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "seller", "customer"], // Added "admin"
    default: "customer" 
  },
  status: { 
    type: String, 
    enum: ["active", "suspended"], 
    default: "active" 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.passwordHash)
}

// Update updatedAt before saving
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.User || mongoose.model("User", UserSchema)