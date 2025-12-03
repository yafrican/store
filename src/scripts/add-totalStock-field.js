const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function addTotalStockField() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all products
    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
    const products = await Product.find({});
    
    console.log(`📊 Found ${products.length} products`);

    let updatedCount = 0;
    let variableProductsCount = 0;

    for (const product of products) {
      let totalStock = product.stock || 0;
      
      // Calculate totalStock for variable products
      if (product.productType === 'variable' && product.variations) {
        variableProductsCount++;
        totalStock = product.variations.reduce((sum, variation) => {
          return sum + (variation.stock || 0);
        }, 0);
      }

      // Update only if totalStock is different from current value
      if (product.totalStock !== totalStock) {
        await Product.updateOne(
          { _id: product._id },
          { $set: { totalStock } }
        );
        updatedCount++;
        console.log(`✅ Updated product: ${product.name} - Total stock: ${totalStock}`);
      }
    }

    console.log('\n📈 Migration Summary:');
    console.log(`✅ Total products processed: ${products.length}`);
    console.log(`✅ Variable products found: ${variableProductsCount}`);
    console.log(`✅ Products updated: ${updatedCount}`);

    mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

addTotalStockField();