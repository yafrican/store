// // src/scripts/rename-categories.js
// const { MongoClient } = require('mongodb');

// const uri = 'mongodb+srv://yafricanstore_db_user:Gj03voXIVYevntht@yafrican.0er58xy.mongodb.net/?appName=yafrican';

// const categoryRenames = {
//   'BEAUTY_HEALTH': 'BEAUTY_PERSONAL_CARE',
//   'HOME_GARDEN': 'HOME_FURNITURE_APPLIANCES',
//   'SPORTS_OUTDOORS': 'LEISURE_ACTIVITIES',
//   'TOYS_GAMES': 'BABIES_KIDS',
//   'JEWELRY_ACCESSORIES': 'FASHION',
//   'FOOD_BEVERAGES': 'FOOD_AGRICULTURE_FARMING'
// };

// async function renameCategories() {
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     console.log('✅ Connected to MongoDB Atlas');
    
//     const database = client.db('yafricanstore');
//     const products = database.collection('products');
    
//     for (const [oldCategory, newCategory] of Object.entries(categoryRenames)) {
//       const result = await products.updateMany(
//         { category: oldCategory },
//         { $set: { category: newCategory } }
//       );
//       console.log(`✅ Renamed ${result.modifiedCount} products from ${oldCategory} to ${newCategory}`);
//     }
    
//     console.log('✅ All categories renamed successfully!');
    
//   } catch (error) {
//     console.error('❌ Error:', error);
//   } finally {
//     await client.close();
//   }
// }

// renameCategories();