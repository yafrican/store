// src/lib/createDefaultAdmin.ts
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function createDefaultAdmin() {
  try {
    await connectMongo()
    
    const adminEmail = 'admin@yafrican.com'
    const existingAdmin = await User.findOne({ email: adminEmail })
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('yafrican@admin123', 12)
      
      await User.create({
        name: 'Yafrican Admin',
        email: adminEmail,
        password: hashedPassword, // FIX: Changed from passwordHash to password
        role: 'admin',
        status: 'active'
      })
      
      console.log('✅ Default admin user created successfully')
    } else {
      console.log('ℹ️  Admin user already exists')
    }
  } catch (error) {
    console.error('❌ Failed to create default admin:', error)
  }
}

// Call this in your app startup