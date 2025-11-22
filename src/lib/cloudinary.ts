// lib/cloudinary.ts - FIXED
import { v2 as cloudinary } from 'cloudinary'

// Validate environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  console.error('❌ Missing Cloudinary environment variables')
  throw new Error('Cloudinary configuration is incomplete')
}

console.log('🔧 Cloudinary Config:', { 
  cloudName, 
  apiKey: apiKey ? '***' + apiKey.slice(-4) : 'missing',
  apiSecret: apiSecret ? '***' + apiSecret.slice(-4) : 'missing'
})

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
})

export default cloudinary
// // lib/cloudinary.ts - FIXED
// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dh3ehrc3p',
//   api_key: process.env.CLOUDINARY_API_KEY || '954112281589694',
//   api_secret: process.env.CLOUDINARY_API_SECRET || 'kWi_7ggA3-E8rRjCvV08MSBcXiQ',
//   secure: true
// })

// export default cloudinary