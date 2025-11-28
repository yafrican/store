// scripts/migrate-slugs.js
const { MongoClient } = require('mongodb');

// Your MongoDB URI - directly from your .env.local
const MONGODB_URI = 'mongodb+srv://yafricanstore_db_user:Gj03voXIVYevntht@yafrican.0er58xy.mongodb.net/yafrican?retryWrites=true&w=majority&appName=yafrican';

console.log('🚀 Starting slug migration...');
console.log('📊 Using MongoDB URI directly');

async function migrateSlugs() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔗 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB successfully!');
    
    const database = client.db('yafrican');
    const products = database.collection('products');
    
    // Get all products
    const allProducts = await products.find({}).toArray();
    console.log(`📦 Found ${allProducts.length} products in database`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    console.log('\n🔄 Starting slug generation...');
    
    for (const product of allProducts) {
      try {
        // Check if product already has a valid slug
        if (product.slug && product.slug !== '' && !/^[0-9a-fA-F]{24}$/.test(product.slug)) {
          console.log(`⏭️ Skipping - already has slug: ${product.name} -> ${product.slug}`);
          skippedCount++;
          continue;
        }
        
        // Generate slug from product name
        const slug = generateSlug(product.name);
        console.log(`📝 Generated slug: "${product.name}" -> ${slug}`);
        
        // Update the product with the new slug
        const result = await products.updateOne(
          { _id: product._id },
          { $set: { slug: slug } }
        );
        
        if (result.modifiedCount > 0) {
          updatedCount++;
          console.log(`✅ Updated: ${product.name} -> ${slug}`);
        } else {
          console.log(`⚠️ No changes made for: ${product.name}`);
        }
        
      } catch (error) {
        errorCount++;
        console.error(`❌ Error updating product "${product.name}":`, error.message);
      }
    }
    
    // Display summary
    console.log('\n🎉 MIGRATION SUMMARY:');
    console.log('====================');
    console.log(`✅ Successfully updated: ${updatedCount} products`);
    console.log(`⏭️ Skipped (already had slugs): ${skippedCount} products`);
    console.log(`❌ Errors: ${errorCount} products`);
    console.log(`📊 Total products processed: ${allProducts.length}`);
    
    // Show some examples
    if (updatedCount > 0) {
      console.log('\n📋 SAMPLE OF UPDATED PRODUCTS:');
      console.log('=============================');
      const sampleProducts = await products.find({}).limit(5).toArray();
      sampleProducts.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name}`);
        console.log(`      🔗 URL: /products/${product.slug}`);
      });
      
      console.log('\n💡 TEST YOUR NEW URLS:');
      console.log('=====================');
      console.log('Visit these URLs in your browser to test:');
      sampleProducts.forEach(product => {
        console.log(`   http://localhost:3000/products/${product.slug}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Disconnected from MongoDB');
    console.log('🎊 Migration completed!');
  }
}

// Slug generation function
function generateSlug(name) {
  if (!name || typeof name !== 'string') {
    return 'untitled-product';
  }
  
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .substring(0, 60) // Limit length
    || 'product'; // Fallback
}

// Run the migration
migrateSlugs();