// src/scripts/adddelivery.js
const fs = require('fs')
const path = require('path')
const { MongoClient, ObjectId } = require('mongodb')

// Read .env.local file from project root
const envPath = path.join(__dirname, '..', '..', '.env.local')
console.log('🔍 Looking for .env.local at:', envPath)

let MONGODB_URI = ''

if (fs.existsSync(envPath)) {
  console.log('✅ Found .env.local file')
  const envFile = fs.readFileSync(envPath, 'utf8')
  const envVars = envFile.split('\n')
  
  for (const line of envVars) {
    if (line.startsWith('MONGODB_URI=')) {
      MONGODB_URI = line.replace('MONGODB_URI=', '').trim()
      // Remove quotes if present
      MONGODB_URI = MONGODB_URI.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
      console.log('✅ Found MONGODB_URI')
      break
    }
  }
} else {
  console.log('❌ .env.local file not found at:', envPath)
}

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local')
  console.log('💡 Please check your .env.local file has: MONGODB_URI=mongodb+srv://...')
  process.exit(1)
}

console.log('🔗 MongoDB URI found (first 30 chars):', MONGODB_URI.substring(0, 30) + '...')

async function main() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    console.log('🔄 Connecting to MongoDB...')
    await client.connect()
    console.log('✅ Connected to MongoDB')
    
    const database = client.db()
    const products = database.collection('products')
    
    // Add empty arrays to all products missing deliveryLocations
    console.log('🔄 Adding empty deliveryLocations to all products...')
    const result = await products.updateMany(
      { deliveryLocations: { $exists: false } },
      { $set: { deliveryLocations: [] } }
    )
    
    console.log(`✅ Updated ${result.modifiedCount} products with empty deliveryLocations`)
    
    // Add specific locations to your test product
    console.log('🔄 Adding specific delivery locations to sampletest product...')
    const specificResult = await products.updateOne(
      { _id: new ObjectId('692427da2d50db2bd27148d8') },
      { $set: { deliveryLocations: ['Addis Ababa', 'Bole', 'Megenagna'] } }
    )
    
    console.log(`✅ Updated specific product: ${specificResult.modifiedCount} document`)
    
    // Verify
    const product = await products.findOne({ _id: new ObjectId('692427da2d50db2bd27148d8') })
    console.log('📋 Product delivery locations:', product.deliveryLocations)
    
    const countWithDelivery = await products.countDocuments({ deliveryLocations: { $exists: true } })
    console.log(`📊 Total products with deliveryLocations: ${countWithDelivery}`)
    
    console.log('🎉 Script completed successfully!')
    
  } catch (error) {
    console.error('❌ Script failed:', error)
  } finally {
    await client.close()
    console.log('🔌 Disconnected from MongoDB')
  }
}

main().catch(console.error)