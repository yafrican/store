

// lib/mongodb.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGODB_URI environment variable inside .env.local')
}
const bcrypt = require("bcrypt");
bcrypt.hash("yafrican@admin123", 12).then(console.log);

// Global cache to avoid reconnecting on every API call
let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function connectMongo() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    console.log('📡 Connecting to MongoDB...')
    cached.promise = mongoose.connect(MONGODB_URI, {
      // You can add options here if needed
    }).then((mongoose) => {
      console.log('✅ MongoDB connected')
      return mongoose
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error)
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (err) {
    throw err
  }
}

export default connectMongo
