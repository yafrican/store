// lib/cloudinary.ts - FIXED
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dh3ehrc3p',
  api_key: process.env.CLOUDINARY_API_KEY || '954112281589694',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'kWi_7ggA3-E8rRjCvV08MSBcXiQ',
  secure: true
})

export default cloudinary