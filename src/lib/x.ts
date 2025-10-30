// // lib/categories.ts - UPDATED WITH COMPLETE SUBCATEGORIES
// import { CategoryConfig } from '@/types/category'

// // Subcategory-specific configurations for ALL categories
// const subcategoryConfigs: { [key: string]: { [key: string]: any } } = {
//   // ELECTRONICS SUBCATEGORIES
//   'Electronics': {
//     'Phones': {
//       specifications: [
//         { fieldName: 'screenSize', label: 'Screen Size', type: 'select', required: false,
//           options: ['< 5"', '5.1 - 5.5"', '5.6 - 6"', '6.1 - 6.5"', '6.6 - 6.8"', '> 6.8"'] },
//         { fieldName: 'ram', label: 'RAM', type: 'select', required: false,
//           options: ['2GB', '4GB', '6GB', '8GB', '12GB', '16GB'] },
//         { fieldName: 'storage', label: 'Storage', type: 'select', required: false,
//           options: ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB'] },
//         { fieldName: 'battery', label: 'Battery', type: 'text', required: false, unit: 'mAh' },
//         { fieldName: 'camera', label: 'Camera', type: 'text', required: false, unit: 'MP' },
//         { fieldName: 'simType', label: 'SIM Type', type: 'select', required: false,
//           options: ['Single SIM', 'Dual SIM', 'eSIM'] },
//         { fieldName: 'network', label: 'Network', type: 'select', required: false,
//           options: ['2G', '3G', '4G', '5G'] },
//       ],
//       filters: [
//         { fieldName: 'screenSize', label: 'Screen Size', type: 'checkbox', required: false },
//         { fieldName: 'ram', label: 'RAM', type: 'checkbox', required: false },
//         { fieldName: 'storage', label: 'Storage', type: 'checkbox', required: false },
//         { fieldName: 'simType', label: 'SIM Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Computers': {
//       specifications: [
//         { fieldName: 'screenSize', label: 'Screen Size', type: 'select', required: false,
//           options: ['11"', '13"', '14"', '15"', '16"', '17"'] },
//         { fieldName: 'ram', label: 'RAM', type: 'select', required: false,
//           options: ['4GB', '8GB', '16GB', '32GB', '64GB'] },
//         { fieldName: 'storage', label: 'Storage', type: 'select', required: false,
//           options: ['128GB', '256GB', '512GB', '1TB', '2TB'] },
//         { fieldName: 'processor', label: 'Processor', type: 'select', required: false,
//           options: ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M1', 'Apple M2'] },
//         { fieldName: 'graphics', label: 'Graphics', type: 'text', required: false },
//         { fieldName: 'operatingSystem', label: 'OS', type: 'select', required: false,
//           options: ['Windows', 'macOS', 'Linux', 'Chrome OS'] },
//       ],
//       filters: [
//         { fieldName: 'screenSize', label: 'Screen Size', type: 'checkbox', required: false },
//         { fieldName: 'ram', label: 'RAM', type: 'checkbox', required: false },
//         { fieldName: 'storage', label: 'Storage', type: 'checkbox', required: false },
//         { fieldName: 'processor', label: 'Processor', type: 'checkbox', required: false },
//       ]
//     },
//     'Cameras': {
//       specifications: [
//         { fieldName: 'cameraType', label: 'Camera Type', type: 'select', required: false,
//           options: ['DSLR', 'Mirrorless', 'Point & Shoot', 'Action Camera', 'Film Camera'] },
//         { fieldName: 'megapixels', label: 'Megapixels', type: 'text', required: false, unit: 'MP' },
//         { fieldName: 'lensMount', label: 'Lens Mount', type: 'text', required: false },
//         { fieldName: 'sensorSize', label: 'Sensor Size', type: 'select', required: false,
//           options: ['Full Frame', 'APS-C', 'Micro Four Thirds', '1"'] },
//       ],
//       filters: [
//         { fieldName: 'cameraType', label: 'Camera Type', type: 'checkbox', required: false },
//         { fieldName: 'sensorSize', label: 'Sensor Size', type: 'checkbox', required: false },
//       ]
//     },
//     'TV & Audio': {
//       specifications: [
//         { fieldName: 'screenSize', label: 'Screen Size', type: 'select', required: false,
//           options: ['32"', '40"', '43"', '50"', '55"', '65"', '75"', '85"'] },
//         { fieldName: 'displayType', label: 'Display Type', type: 'select', required: false,
//           options: ['LED', 'OLED', 'QLED', '4K UHD', '8K UHD'] },
//         { fieldName: 'smartTV', label: 'Smart TV', type: 'select', required: false,
//           options: ['Yes', 'No'] },
//       ],
//       filters: [
//         { fieldName: 'screenSize', label: 'Screen Size', type: 'checkbox', required: false },
//         { fieldName: 'displayType', label: 'Display Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Gaming': {
//       specifications: [
//         { fieldName: 'consoleType', label: 'Console Type', type: 'select', required: false,
//           options: ['PlayStation', 'Xbox', 'Nintendo Switch', 'Gaming PC'] },
//         { fieldName: 'storage', label: 'Storage', type: 'select', required: false,
//           options: ['500GB', '1TB', '2TB'] },
//       ],
//       filters: [
//         { fieldName: 'consoleType', label: 'Console Type', type: 'checkbox', required: false },
//       ]
//     }
//   },

//   // CLOTHING SUBCATEGORIES
//   'Clothing': {
//     'Men': {
//       specifications: [
//         { fieldName: 'clothingType', label: 'Clothing Type', type: 'select', required: true,
//           options: ['T-Shirt', 'Shirt', 'Pants', 'Jeans', 'Jacket', 'Sweater', 'Underwear', 'Suit', 'Shorts'] },
//         { fieldName: 'size', label: 'Size', type: 'select', required: true,
//           options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
//       ],
//       filters: [
//         { fieldName: 'clothingType', label: 'Clothing Type', type: 'checkbox', required: false },
//         { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Women': {
//       specifications: [
//         { fieldName: 'clothingType', label: 'Clothing Type', type: 'select', required: true,
//           options: ['Dress', 'Skirt', 'Blouse', 'T-Shirt', 'Pants', 'Jeans', 'Jacket', 'Sweater'] },
//         { fieldName: 'size', label: 'Size', type: 'select', required: true,
//           options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
//       ],
//       filters: [
//         { fieldName: 'clothingType', label: 'Clothing Type', type: 'checkbox', required: false },
//         { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Kids': {
//       specifications: [
//         { fieldName: 'clothingType', label: 'Clothing Type', type: 'select', required: true,
//           options: ['T-Shirt', 'Dress', 'Pants', 'Shorts', 'Jacket', 'Sweater'] },
//         { fieldName: 'size', label: 'Size', type: 'select', required: true,
//           options: ['Newborn', '0-3M', '3-6M', '6-12M', '1-2Y', '3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
//       ],
//       filters: [
//         { fieldName: 'clothingType', label: 'Clothing Type', type: 'checkbox', required: false },
//         { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Shoes': {
//       specifications: [
//         { fieldName: 'shoeType', label: 'Shoe Type', type: 'select', required: true,
//           options: ['Sneakers', 'Boots', 'Sandals', 'Formal', 'Sports', 'Casual'] },
//         { fieldName: 'size', label: 'Size', type: 'select', required: true,
//           options: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'] },
//       ],
//       filters: [
//         { fieldName: 'shoeType', label: 'Shoe Type', type: 'checkbox', required: false },
//         { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       ]
//     }
//   },

//   // HOME & GARDEN SUBCATEGORIES
//   'Home & Garden': {
//     'Furniture': {
//       specifications: [
//         { fieldName: 'furnitureType', label: 'Furniture Type', type: 'select', required: true,
//           options: ['Sofa', 'Bed', 'Table', 'Chair', 'Cabinet', 'Wardrobe', 'Shelf'] },
//         { fieldName: 'material', label: 'Material', type: 'select', required: false,
//           options: ['Wood', 'Metal', 'Plastic', 'Glass', 'Fabric'] },
//       ],
//       filters: [
//         { fieldName: 'furnitureType', label: 'Furniture Type', type: 'checkbox', required: false },
//         { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//       ]
//     },
//     'Decor': {
//       specifications: [
//         { fieldName: 'decorType', label: 'Decor Type', type: 'select', required: true,
//           options: ['Wall Art', 'Vases', 'Candles', 'Mirrors', 'Clocks', 'Rugs'] },
//         { fieldName: 'style', label: 'Style', type: 'select', required: false,
//           options: ['Modern', 'Traditional', 'Minimalist', 'Bohemian'] },
//       ],
//       filters: [
//         { fieldName: 'decorType', label: 'Decor Type', type: 'checkbox', required: false },
//         { fieldName: 'style', label: 'Style', type: 'checkbox', required: false },
//       ]
//     },
//     'Kitchenware': {
//       specifications: [
//         { fieldName: 'kitchenwareType', label: 'Kitchenware Type', type: 'select', required: true,
//           options: ['Cookware', 'Cutlery', 'Appliances', 'Storage', 'Serveware'] },
//         { fieldName: 'material', label: 'Material', type: 'select', required: false,
//           options: ['Stainless Steel', 'Ceramic', 'Glass', 'Plastic', 'Wood'] },
//       ],
//       filters: [
//         { fieldName: 'kitchenwareType', label: 'Kitchenware Type', type: 'checkbox', required: false },
//         { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//       ]
//     },
//     'Garden': {
//       specifications: [
//         { fieldName: 'gardenType', label: 'Garden Type', type: 'select', required: true,
//           options: ['Tools', 'Plants', 'Furniture', 'Decor', 'Lighting'] },
//         { fieldName: 'material', label: 'Material', type: 'select', required: false,
//           options: ['Metal', 'Wood', 'Plastic', 'Ceramic'] },
//       ],
//       filters: [
//         { fieldName: 'gardenType', label: 'Garden Type', type: 'checkbox', required: false },
//         { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//       ]
//     }
//   },

//   // BEAUTY & HEALTH SUBCATEGORIES
//   'Beauty & Health': {
//     'Skincare': {
//       specifications: [
//         { fieldName: 'skinType', label: 'Skin Type', type: 'select', required: false,
//           options: ['All Skin Types', 'Dry', 'Oily', 'Combination', 'Sensitive'] },
//         { fieldName: 'productType', label: 'Product Type', type: 'select', required: true,
//           options: ['Cleanser', 'Moisturizer', 'Serum', 'Sunscreen', 'Mask', 'Toner'] },
//       ],
//       filters: [
//         { fieldName: 'skinType', label: 'Skin Type', type: 'checkbox', required: false },
//         { fieldName: 'productType', label: 'Product Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Makeup': {
//       specifications: [
//         { fieldName: 'makeupType', label: 'Makeup Type', type: 'select', required: true,
//           options: ['Foundation', 'Lipstick', 'Eyeshadow', 'Mascara', 'Blush', 'Concealer'] },
//         { fieldName: 'shade', label: 'Shade', type: 'text', required: false },
//       ],
//       filters: [
//         { fieldName: 'makeupType', label: 'Makeup Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Hair Care': {
//       specifications: [
//         { fieldName: 'hairType', label: 'Hair Type', type: 'select', required: false,
//           options: ['All Hair Types', 'Dry', 'Oily', 'Curly', 'Straight', 'Color-Treated'] },
//         { fieldName: 'productType', label: 'Product Type', type: 'select', required: true,
//           options: ['Shampoo', 'Conditioner', 'Treatment', 'Styling', 'Color'] },
//       ],
//       filters: [
//         { fieldName: 'hairType', label: 'Hair Type', type: 'checkbox', required: false },
//         { fieldName: 'productType', label: 'Product Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Fragrance': {
//       specifications: [
//         { fieldName: 'fragranceType', label: 'Fragrance Type', type: 'select', required: true,
//           options: ['Perfume', 'Cologne', 'Body Spray', 'Essential Oil'] },
//         { fieldName: 'scent', label: 'Scent', type: 'select', required: false,
//           options: ['Floral', 'Woody', 'Fresh', 'Oriental', 'Fruity'] },
//       ],
//       filters: [
//         { fieldName: 'fragranceType', label: 'Fragrance Type', type: 'checkbox', required: false },
//         { fieldName: 'scent', label: 'Scent', type: 'checkbox', required: false },
//       ]
//     },
//     'Wellness': {
//       specifications: [
//         { fieldName: 'wellnessType', label: 'Wellness Type', type: 'select', required: true,
//           options: ['Vitamins', 'Supplements', 'Fitness Equipment', 'Personal Care'] },
//         { fieldName: 'benefit', label: 'Benefit', type: 'select', required: false,
//           options: ['Energy', 'Immunity', 'Weight Management', 'Beauty'] },
//       ],
//       filters: [
//         { fieldName: 'wellnessType', label: 'Wellness Type', type: 'checkbox', required: false },
//         { fieldName: 'benefit', label: 'Benefit', type: 'checkbox', required: false },
//       ]
//     }
//   },

//   // Add similar subcategory configurations for other main categories...
//   'Sports & Outdoors': {
//     'Football': {
//       specifications: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'select', required: true,
//           options: ['Shoes', 'Ball', 'Jersey', 'Gloves', 'Accessories'] },
//         { fieldName: 'size', label: 'Size', type: 'select', required: false,
//           options: ['S', 'M', 'L', 'XL', 'XXL'] },
//       ],
//       filters: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
//         { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       ]
//     },
//     // ... other sports subcategories
//   },

//   'Toys & Games': {
//     'Action Figures': {
//       specifications: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'select', required: true,
//           options: ['3-5 years', '6-8 years', '9-12 years', '13+ years'] },
//         { fieldName: 'brand', label: 'Brand', type: 'select', required: false,
//           options: ['Lego', 'Hasbro', 'Mattel', 'Local Brand'] },
//       ],
//       filters: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'checkbox', required: false },
//         { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
//       ]
//     },
//     // ... other toy subcategories
//   },

//   'Automotive': {
//     'Cars': {
//       specifications: [
//         { fieldName: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true,
//           options: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible'] },
//         { fieldName: 'fuelType', label: 'Fuel Type', type: 'select', required: true,
//           options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
//         { fieldName: 'transmission', label: 'Transmission', type: 'select', required: true,
//           options: ['Manual', 'Automatic'] },
//       ],
//       filters: [
//         { fieldName: 'vehicleType', label: 'Vehicle Type', type: 'checkbox', required: false },
//         { fieldName: 'fuelType', label: 'Fuel Type', type: 'checkbox', required: false },
//         { fieldName: 'transmission', label: 'Transmission', type: 'checkbox', required: false },
//       ]
//     },
//     // ... other automotive subcategories
//   },

//   'Books & Media': {
//     'Books': {
//       specifications: [
//         { fieldName: 'genre', label: 'Genre', type: 'select', required: true,
//           options: ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Science Fiction', 'Romance', 'Mystery'] },
//         { fieldName: 'format', label: 'Format', type: 'select', required: false,
//           options: ['Paperback', 'Hardcover', 'Digital', 'Audio'] },
//       ],
//       filters: [
//         { fieldName: 'genre', label: 'Genre', type: 'checkbox', required: false },
//         { fieldName: 'format', label: 'Format', type: 'checkbox', required: false },
//       ]
//     },
//     // ... other media subcategories
//   },

//   'Jewelry & Accessories': {
//     'Necklaces': {
//       specifications: [
//         { fieldName: 'material', label: 'Material', type: 'select', required: true,
//           options: ['Gold', 'Silver', 'Platinum', 'Stainless Steel'] },
//         { fieldName: 'gemstone', label: 'Gemstone', type: 'select', required: false,
//           options: ['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'None'] },
//       ],
//       filters: [
//         { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//         { fieldName: 'gemstone', label: 'Gemstone', type: 'checkbox', required: false },
//       ]
//     },
//     // ... other jewelry subcategories
//   },

//   'Food & Beverages': {
//     'Snacks': {
//       specifications: [
//         { fieldName: 'snackType', label: 'Snack Type', type: 'select', required: true,
//           options: ['Chips', 'Chocolate', 'Biscuits', 'Nuts', 'Dried Fruits'] },
//         { fieldName: 'packageSize', label: 'Package Size', type: 'select', required: false,
//           options: ['Small', 'Medium', 'Large', 'Family Size'] },
//       ],
//       filters: [
//         { fieldName: 'snackType', label: 'Snack Type', type: 'checkbox', required: false },
//         { fieldName: 'packageSize', label: 'Package Size', type: 'checkbox', required: false },
//       ]
//     },
//     // ... other food subcategories
//   }
// }

// // Main category configurations (same as before but with all subcategories)
// export const categoryConfigs: { [key: string]: CategoryConfig } = {
//   'Electronics': {
//     id: 'electronics',
//     name: 'Electronics',
//     slug: 'electronics',
//     subcategories: ['Phones', 'Computers', 'Cameras', 'TV & Audio', 'Gaming'],
//     specifications: [
//       { fieldName: 'brand', label: 'Brand', type: 'select', required: true, 
//         options: ['Samsung', 'Apple', 'Tecno', 'Infinix', 'Xiaomi', 'Oppo', 'Vivo', 'Huawei', 'Nokia', 'Google', 'OnePlus', 'Realme', 'Motorola', 'LG', 'Sony', 'Asus', 'Lenovo', 'HTC', 'Honor', 'ZTE', 'Dell', 'HP', 'Canon', 'Nikon', 'Other'] },
//       { fieldName: 'model', label: 'Model', type: 'text', required: true },
//       { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
//         options: ['Brand New', 'Refurbished', 'Used'] },
//       { fieldName: 'color', label: 'Color', type: 'select', required: false,
//         options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Silver', 'Gold', 'Gray', 'Other'] },
//     ],
//     filters: [
//       { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
//       { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
//       { fieldName: 'price', label: 'Price', type: 'range', required: false, min: 0, max: 500000 },
//       { fieldName: 'color', label: 'Color', type: 'checkbox', required: false },
//     ]
//   },

//   'Clothing': {
//     id: 'clothing',
//     name: 'Clothing',
//     slug: 'clothing',
//     subcategories: ['Men', 'Women', 'Kids', 'Shoes'],
//     specifications: [
//       { fieldName: 'brand', label: 'Brand', type: 'select', required: false,
//         options: ['Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Puma', 'Levi\'s', 'Local Brand', 'Other'] },
//       { fieldName: 'clothingType', label: 'Clothing Type', type: 'select', required: true,
//         options: ['T-Shirt', 'Shirt', 'Pants', 'Jeans', 'Dress', 'Skirt', 'Jacket', 'Sweater', 'Underwear', 'Other'] },
//       { fieldName: 'size', label: 'Size', type: 'select', required: true,
//         options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
//       { fieldName: 'color', label: 'Color', type: 'select', required: true,
//         options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple', 'Gray', 'Brown', 'Other'] },
//       { fieldName: 'material', label: 'Material', type: 'select', required: false,
//         options: ['Cotton', 'Polyester', 'Silk', 'Wool', 'Denim', 'Linen', 'Leather', 'Spandex', 'Mixed'] },
//       { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
//         options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
//       { fieldName: 'gender', label: 'Gender', type: 'select', required: true,
//         options: ['Men', 'Women', 'Unisex', 'Kids'] },
//     ],
//     filters: [
//       { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
//       { fieldName: 'clothingType', label: 'Type', type: 'checkbox', required: false },
//       { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       { fieldName: 'gender', label: 'Gender', type: 'checkbox', required: false },
//       { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
//       { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//     ]
//   },

//   'Home & Garden': {
//     id: 'home-garden',
//     name: 'Home & Garden',
//     slug: 'home-garden',
//     subcategories: ['Furniture', 'Decor', 'Kitchenware', 'Garden'],
//     specifications: [
//       { fieldName: 'itemType', label: 'Item Type', type: 'select', required: true,
//         options: ['Furniture', 'Decor', 'Kitchenware', 'Garden Tool', 'Lighting', 'Storage'] },
//       { fieldName: 'material', label: 'Material', type: 'select', required: false,
//         options: ['Wood', 'Metal', 'Plastic', 'Glass', 'Fabric', 'Ceramic'] },
//       { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
//         options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] },
//       { fieldName: 'color', label: 'Color', type: 'select', required: false,
//         options: ['Black', 'White', 'Brown', 'Gray', 'Blue', 'Green', 'Red', 'Other'] },
//       { fieldName: 'dimensions', label: 'Dimensions', type: 'text', required: false, unit: 'cm' },
//     ],
//     filters: [
//       { fieldName: 'itemType', label: 'Item Type', type: 'checkbox', required: false },
//       { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//       { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
//     ]
//   },

//   'Beauty & Health': {
//     id: 'beauty-health',
//     name: 'Beauty & Health',
//     slug: 'beauty-health',
//     subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Wellness'],
//     specifications: [
//       { fieldName: 'productType', label: 'Product Type', type: 'select', required: true,
//         options: ['Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Wellness', 'Personal Care'] },
//       { fieldName: 'brand', label: 'Brand', type: 'select', required: false,
//         options: ['L\'Oreal', 'Maybelline', 'Nivea', 'Dove', 'Local Brand', 'International'] },
//       { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
//         options: ['New', 'Used - Lightly', 'Used'] },
//       { fieldName: 'size', label: 'Size', type: 'select', required: false,
//         options: ['Travel Size', 'Regular', 'Large', 'Jumbo'] },
//       { fieldName: 'skinType', label: 'Skin Type', type: 'select', required: false,
//         options: ['All Skin Types', 'Dry', 'Oily', 'Combination', 'Sensitive'] },
//     ],
//     filters: [
//       { fieldName: 'productType', label: 'Product Type', type: 'checkbox', required: false },
//       { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
//       { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
//       { fieldName: 'skinType', label: 'Skin Type', type: 'checkbox', required: false },
//     ]
//   },

//   // ... other main categories with their subcategories
//   'Sports & Outdoors': {
//     id: 'sports-outdoors',
//     name: 'Sports & Outdoors',
//     slug: 'sports-outdoors',
//     subcategories: ['Football', 'Basketball', 'Running', 'Fitness', 'Cycling', 'Swimming', 'Hiking', 'Camping'],
//     // ... specifications and filters
//   },

//   'Toys & Games': {
//     id: 'toys-games',
//     name: 'Toys & Games',
//     slug: 'toys-games',
//     subcategories: ['Action Figures', 'Dolls', 'Board Games', 'Educational', 'Puzzles', 'Outdoor Toys', 'Electronic Toys'],
//     // ... specifications and filters
//   },

//   'Automotive': {
//     id: 'automotive',
//     name: 'Automotive',
//     slug: 'automotive',
//     subcategories: ['Cars', 'Motorcycles', 'Bicycles', 'Trucks', 'SUVs', 'Parts & Accessories'],
//     // ... specifications and filters
//   },

//   'Books & Media': {
//     id: 'books-media',
//     name: 'Books & Media',
//     slug: 'books-media',
//     subcategories: ['Books', 'DVDs', 'CDs', 'Video Games', 'Magazines'],
//     // ... specifications and filters
//   },

//   'Jewelry & Accessories': {
//     id: 'jewelry-accessories',
//     name: 'Jewelry & Accessories',
//     slug: 'jewelry-accessories',
//     subcategories: ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Watches', 'Bags', 'Sunglasses'],
//     // ... specifications and filters
//   },

//   'Food & Beverages': {
//     id: 'food-beverages',
//     name: 'Food & Beverages',
//     slug: 'food-beverages',
//     subcategories: ['Snacks', 'Beverages', 'Cooking Ingredients', 'Organic', 'International'],
//      specifications: [
//       { fieldName: 'productType', label: 'Product Type', type: 'select', required: true,
//         options: ['Snacks', 'Beverages', 'Cooking Ingredients', 'Organic', 'International'] },
//       { fieldName: 'brand', label: 'Brand', type: 'select', required: false,
//         options: ['Local Brand', 'International Brand'] },
//       { fieldName: 'expiryDate', label: 'Expiry Date', type: 'text', required: true },
//       { fieldName: 'packageSize', label: 'Package Size', type: 'select', required: false,
//         options: ['Small', 'Medium', 'Large', 'Family Size'] },
//       { fieldName: 'storage', label: 'Storage', type: 'select', required: false,
//         options: ['Room Temperature', 'Refrigerated', 'Frozen'] },
//     ],
//     filters: [
//       { fieldName: 'productType', label: 'Product Type', type: 'checkbox', required: false },
//       { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
//       { fieldName: 'packageSize', label: 'Package Size', type: 'checkbox', required: false },
//     ]
//   }
// }

// // Get category configuration with subcategory support
// export const getCategoryConfig = (categoryName: string, subcategory?: string): CategoryConfig | null => {
//   const baseConfig = categoryConfigs[categoryName]
//   if (!baseConfig) return null

//   // If we have subcategory-specific config, merge it
//   if (subcategory && subcategoryConfigs[categoryName] && subcategoryConfigs[categoryName][subcategory]) {
//     const subConfig = subcategoryConfigs[categoryName][subcategory]
//     return {
//       ...baseConfig,
//       specifications: [...baseConfig.specifications, ...subConfig.specifications],
//       filters: [...baseConfig.filters, ...subConfig.filters]
//     }
//   }

//   return baseConfig
// }

// // Get subcategories for a category
// export const getSubcategories = (categoryName: string): string[] => {
//   return categoryConfigs[categoryName]?.subcategories || []
// }

// export const getAllCategories = () => {
//   return Object.values(categoryConfigs).map(config => ({
//     id: config.id,
//     name: config.name,
//     slug: config.slug,
//     subcategories: config.subcategories || []
//   }))
// }