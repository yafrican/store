// // lib/categories.ts - UPDATED WITH ALL CATEGORIES
// import { CategoryConfig } from '@/types/category'


// // Subcategory-specific configurations for ALL categories
// const subcategoryConfigs: { [key: string]: { [key: string]: any } } = {
//   // ELECTRONICS SUBCATEGORIES (existing - keep as is)
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

//   // In your category configurations - KEEP ORIGINAL FIELD NAMES
// 'Clothing': {
//   'Men': {
//     specifications: [
//       { fieldName: 'clothingType', label: 'Clothing Type', type: 'select', required: true,
//         options: ['T-Shirt', 'Shirt', 'Pants', 'Jeans', 'Jacket', 'Sweater', 'Underwear', 'Suit', 'Shorts'] },
//       { fieldName: 'size', label: 'Size', type: 'select', required: true,
//         options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
//     ],
//     filters: [
//       { fieldName: 'clothingType', label: 'Clothing Type', type: 'checkbox', required: false },
//       { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//     ]
//   },
//   'Women': {
//     specifications: [
//       { fieldName: 'clothingType', label: 'Clothing Type', type: 'select', required: true,
//         options: ['Dress', 'Skirt', 'Blouse', 'T-Shirt', 'Pants', 'Jeans', 'Jacket', 'Sweater'] },
//       { fieldName: 'size', label: 'Size', type: 'select', required: true,
//         options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
//     ],
//     filters: [
//       { fieldName: 'clothingType', label: 'Clothing Type', type: 'checkbox', required: false },
//       { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//     ]
//   },
//   'Shoes': {
//     specifications: [
//       { fieldName: 'shoeType', label: 'Shoe Type', type: 'select', required: true,
//         options: ['Sneakers', 'Boots', 'Sandals', 'Formal', 'Sports', 'Casual'] },
//       { fieldName: 'size', label: 'Size', type: 'select', required: true,
//         options: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'] },
//     ],
//     filters: [
//       { fieldName: 'shoeType', label: 'Shoe Type', type: 'checkbox', required: false },
//       { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//     ]
//   }
// },
//   // HOME & GARDEN SUBCATEGORIES (existing - keep as is)
//   'Home & Garden': {
//     'Furniture': {
//       specifications: [
//         { fieldName: 'furnitureType', label: 'Furniture Type', type: 'select', required: true,
//           options: ['Sofa', 'Bed', 'Table', 'Chair', 'Cabinet', 'Wardrobe', 'Shelf'] },
//         { fieldName: 'homeMaterial', label: 'Material', type: 'select', required: false,
//           options: ['Wood', 'Metal', 'Plastic', 'Glass', 'Fabric', 'Ceramic'] },
//       ],
//       filters: [
//         { fieldName: 'furnitureType', label: 'Furniture Type', type: 'checkbox', required: false },
//         { fieldName: 'homeMaterial', label: 'Material', type: 'checkbox', required: false },
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

//   // BEAUTY & HEALTH SUBCATEGORIES - COMPLETE VERSION
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

//   // SPORTS & OUTDOORS SUBCATEGORIES - COMPLETE VERSION
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
//     'Basketball': {
//       specifications: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'select', required: true,
//           options: ['Shoes', 'Ball', 'Jersey', 'Shorts', 'Accessories'] },
//         { fieldName: 'size', label: 'Size', type: 'select', required: false,
//           options: ['S', 'M', 'L', 'XL', 'XXL'] },
//       ],
//       filters: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
//         { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Running': {
//       specifications: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'select', required: true,
//           options: ['Shoes', 'Clothing', 'Accessories', 'Watches'] },
//         { fieldName: 'size', label: 'Size', type: 'select', required: false,
//           options: ['XS', 'S', 'M', 'L', 'XL'] },
//       ],
//       filters: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
//         { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Fitness': {
//       specifications: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'select', required: true,
//           options: ['Weights', 'Machines', 'Mats', 'Accessories'] },
//         { fieldName: 'weight', label: 'Weight', type: 'text', required: false, unit: 'kg' },
//       ],
//       filters: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Cycling': {
//       specifications: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'select', required: true,
//           options: ['Bicycle', 'Helmet', 'Clothing', 'Accessories'] },
//         { fieldName: 'bikesType', label: 'Bike Type', type: 'select', required: false,
//           options: ['Mountain', 'Road', 'Hybrid', 'Electric'] },
//       ],
//       filters: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
//         { fieldName: 'bikeType', label: 'Bike Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Swimming': {
//       specifications: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'select', required: true,
//           options: ['Swimwear', 'Goggles', 'Accessories'] },
//         { fieldName: 'size', label: 'Size', type: 'select', required: false,
//           options: ['XS', 'S', 'M', 'L', 'XL'] },
//       ],
//       filters: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
//         { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Hiking': {
//       specifications: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'select', required: true,
//           options: ['Boots', 'Backpack', 'Clothing', 'Accessories'] },
//         { fieldName: 'size', label: 'Size', type: 'select', required: false,
//           options: ['S', 'M', 'L', 'XL'] },
//       ],
//       filters: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
//         { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Camping': {
//       specifications: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'select', required: true,
//           options: ['Tent', 'Sleeping Bag', 'Cooking', 'Lighting'] },
//         { fieldName: 'capacity', label: 'Capacity', type: 'text', required: false, unit: 'person' },
//       ],
//       filters: [
//         { fieldName: 'equipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
//       ]
//     }
//   },

//   // TOYS & GAMES SUBCATEGORIES - COMPLETE VERSION
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
//     'Dolls': {
//       specifications: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'select', required: true,
//           options: ['3-5 years', '6-8 years', '9-12 years'] },
//         { fieldName: 'dollType', label: 'Doll Type', type: 'select', required: false,
//           options: ['Fashion', 'Baby', 'Action'] },
//       ],
//       filters: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'checkbox', required: false },
//         { fieldName: 'dollType', label: 'Doll Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Board Games': {
//       specifications: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'select', required: true,
//           options: ['6-8 years', '9-12 years', '13+ years', 'Adult'] },
//         { fieldName: 'players', label: 'Number of Players', type: 'select', required: false,
//           options: ['2', '2-4', '4-6', '6+'] },
//       ],
//       filters: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'checkbox', required: false },
//         { fieldName: 'players', label: 'Players', type: 'checkbox', required: false },
//       ]
//     },
//     'Educational': {
//       specifications: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'select', required: true,
//           options: ['0-2 years', '3-5 years', '6-8 years', '9-12 years'] },
//         { fieldName: 'subject', label: 'Subject', type: 'select', required: false,
//           options: ['Math', 'Science', 'Language', 'Creative'] },
//       ],
//       filters: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'checkbox', required: false },
//         { fieldName: 'subject', label: 'Subject', type: 'checkbox', required: false },
//       ]
//     },
//     'Puzzles': {
//       specifications: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'select', required: true,
//           options: ['3-5 years', '6-8 years', '9-12 years', '13+ years'] },
//         { fieldName: 'pieces', label: 'Number of Pieces', type: 'select', required: false,
//           options: ['< 50', '50-100', '100-500', '500-1000', '1000+'] },
//       ],
//       filters: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'checkbox', required: false },
//         { fieldName: 'pieces', label: 'Pieces', type: 'checkbox', required: false },
//       ]
//     },
//     'Outdoor Toys': {
//       specifications: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'select', required: true,
//           options: ['3-5 years', '6-8 years', '9-12 years'] },
//         { fieldName: 'toyType', label: 'Toy Type', type: 'select', required: false,
//           options: ['Ride-on', 'Sports', 'Water', 'Playground'] },
//       ],
//       filters: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'checkbox', required: false },
//         { fieldName: 'toyType', label: 'Toy Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Electronic Toys': {
//       specifications: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'select', required: true,
//           options: ['3-5 years', '6-8 years', '9-12 years'] },
//         { fieldName: 'powerSource', label: 'Power Source', type: 'select', required: false,
//           options: ['Battery', 'Rechargeable', 'Solar'] },
//       ],
//       filters: [
//         { fieldName: 'ageRange', label: 'Age Range', type: 'checkbox', required: false },
//         { fieldName: 'powerSource', label: 'Power Source', type: 'checkbox', required: false },
//       ]
//     }
//   },

//   // AUTOMOTIVE SUBCATEGORIES - COMPLETE VERSION
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
//     'Motorcycles': {
//       specifications: [
//         { fieldName: 'bikeType', label: 'Bike Type', type: 'select', required: true,
//           options: ['Sport', 'Cruiser', 'Off-road', 'Scooter'] },
//         { fieldName: 'engineSize', label: 'Engine Size', type: 'select', required: false,
//           options: ['< 125cc', '125-250cc', '250-500cc', '500-750cc', '750cc+'] },
//         { fieldName: 'fuelType', label: 'Fuel Type', type: 'select', required: true,
//           options: ['Petrol', 'Electric'] },
//       ],
//       filters: [
//         { fieldName: 'bikeType', label: 'Bike Type', type: 'checkbox', required: false },
//         { fieldName: 'engineSize', label: 'Engine Size', type: 'checkbox', required: false },
//         { fieldName: 'fuelType', label: 'Fuel Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Bicycles': {
//       specifications: [
//         { fieldName: 'bikeType', label: 'Bike Type', type: 'select', required: true,
//           options: ['Mountain', 'Road', 'Hybrid', 'Electric', 'Kids'] },
//         { fieldName: 'size', label: 'Frame Size', type: 'select', required: false,
//           options: ['XS', 'S', 'M', 'L', 'XL'] },
//         { fieldName: 'wheelSize', label: 'Wheel Size', type: 'select', required: false,
//           options: ['20"', '24"', '26"', '27.5"', '29"'] },
//       ],
//       filters: [
//         { fieldName: 'bikeType', label: 'Bike Type', type: 'checkbox', required: false },
//         { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Trucks': {
//       specifications: [
//         { fieldName: 'truckType', label: 'Truck Type', type: 'select', required: true,
//           options: ['Pickup', 'Commercial', 'Heavy Duty'] },
//         { fieldName: 'fuelType', label: 'Fuel Type', type: 'select', required: true,
//           options: ['Petrol', 'Diesel'] },
//         { fieldName: 'capacity', label: 'Load Capacity', type: 'text', required: false, unit: 'tons' },
//       ],
//       filters: [
//         { fieldName: 'truckType', label: 'Truck Type', type: 'checkbox', required: false },
//         { fieldName: 'fuelType', label: 'Fuel Type', type: 'checkbox', required: false },
//       ]
//     },
//     'SUVs': {
//       specifications: [
//         { fieldName: 'suvType', label: 'SUV Type', type: 'select', required: true,
//           options: ['Compact', 'Mid-size', 'Full-size', 'Luxury'] },
//         { fieldName: 'fuelType', label: 'Fuel Type', type: 'select', required: true,
//           options: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
//         { fieldName: 'transmission', label: 'Transmission', type: 'select', required: true,
//           options: ['Manual', 'Automatic'] },
//       ],
//       filters: [
//         { fieldName: 'suvType', label: 'SUV Type', type: 'checkbox', required: false },
//         { fieldName: 'fuelType', label: 'Fuel Type', type: 'checkbox', required: false },
//         { fieldName: 'transmission', label: 'Transmission', type: 'checkbox', required: false },
//       ]
//     },
//     'Parts & Accessories': {
//       specifications: [
//         { fieldName: 'partType', label: 'Part Type', type: 'select', required: true,
//           options: ['Engine', 'Brakes', 'Suspension', 'Electrical', 'Body', 'Interior'] },
//         { fieldName: 'compatibility', label: 'Vehicle Compatibility', type: 'text', required: false },
//       ],
//       filters: [
//         { fieldName: 'partType', label: 'Part Type', type: 'checkbox', required: false },
//       ]
//     }
//   },

//   // BOOKS & MEDIA SUBCATEGORIES - COMPLETE VERSION
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
//     'DVDs': {
//       specifications: [
//         { fieldName: 'mediaType', label: 'Media Type', type: 'select', required: true,
//           options: ['Movie', 'TV Series', 'Documentary', 'Music'] },
//         { fieldName: 'genre', label: 'Genre', type: 'select', required: false,
//           options: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance'] },
//       ],
//       filters: [
//         { fieldName: 'mediaType', label: 'Media Type', type: 'checkbox', required: false },
//         { fieldName: 'genre', label: 'Genre', type: 'checkbox', required: false },
//       ]
//     },
//     'CDs': {
//       specifications: [
//         { fieldName: 'musicGenre', label: 'Music Genre', type: 'select', required: true,
//           options: ['Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Traditional'] },
//         { fieldName: 'format', label: 'Format', type: 'select', required: false,
//           options: ['CD', 'Vinyl', 'Cassette'] },
//       ],
//       filters: [
//         { fieldName: 'musicGenre', label: 'Music Genre', type: 'checkbox', required: false },
//         { fieldName: 'format', label: 'Format', type: 'checkbox', required: false },
//       ]
//     },
//     'Video Games': {
//       specifications: [
//         { fieldName: 'platform', label: 'Platform', type: 'select', required: true,
//           options: ['PlayStation', 'Xbox', 'Nintendo', 'PC'] },
//         { fieldName: 'genre', label: 'Genre', type: 'select', required: false,
//           options: ['Action', 'Adventure', 'Sports', 'RPG', 'Strategy'] },
//       ],
//       filters: [
//         { fieldName: 'platform', label: 'Platform', type: 'checkbox', required: false },
//         { fieldName: 'genre', label: 'Genre', type: 'checkbox', required: false },
//       ]
//     },
//     'Magazines': {
//       specifications: [
//         { fieldName: 'category', label: 'Category', type: 'select', required: true,
//           options: ['News', 'Lifestyle', 'Sports', 'Entertainment', 'Educational'] },
//         { fieldName: 'frequency', label: 'Frequency', type: 'select', required: false,
//           options: ['Weekly', 'Monthly', 'Quarterly'] },
//       ],
//       filters: [
//         { fieldName: 'category', label: 'Category', type: 'checkbox', required: false },
//         { fieldName: 'frequency', label: 'Frequency', type: 'checkbox', required: false },
//       ]
//     }
//   },

//   // JEWELRY & ACCESSORIES SUBCATEGORIES - COMPLETE VERSION
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
//     'Rings': {
//       specifications: [
//         { fieldName: 'material', label: 'Material', type: 'select', required: true,
//           options: ['Gold', 'Silver', 'Platinum', 'Titanium'] },
//         { fieldName: 'ringSize', label: 'Ring Size', type: 'select', required: false,
//           options: ['4', '5', '6', '7', '8', '9', '10'] },
//       ],
//       filters: [
//         { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//         { fieldName: 'ringSize', label: 'Ring Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Earrings': {
//       specifications: [
//         { fieldName: 'material', label: 'Material', type: 'select', required: true,
//           options: ['Gold', 'Silver', 'Platinum', 'Surgical Steel'] },
//         { fieldName: 'earringType', label: 'Earring Type', type: 'select', required: false,
//           options: ['Stud', 'Hoop', 'Drop', 'Huggie'] },
//       ],
//       filters: [
//         { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//         { fieldName: 'earringType', label: 'Earring Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Bracelets': {
//       specifications: [
//         { fieldName: 'material', label: 'Material', type: 'select', required: true,
//           options: ['Gold', 'Silver', 'Leather', 'Beaded'] },
//         { fieldName: 'braceletType', label: 'Bracelet Type', type: 'select', required: false,
//           options: ['Chain', 'Bangle', 'Cuff', 'Charm'] },
//       ],
//       filters: [
//         { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//         { fieldName: 'braceletType', label: 'Bracelet Type', type: 'checkbox', required: false },
//       ]
//     },
//     'Watches': {
//       specifications: [
//         { fieldName: 'watchType', label: 'Watch Type', type: 'select', required: true,
//           options: ['Analog', 'Digital', 'Smartwatch', 'Chronograph'] },
//         { fieldName: 'material', label: 'Material', type: 'select', required: false,
//           options: ['Stainless Steel', 'Leather', 'Rubber', 'Gold'] },
//       ],
//       filters: [
//         { fieldName: 'watchType', label: 'Watch Type', type: 'checkbox', required: false },
//         { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//       ]
//     },
//     'Bags': {
//       specifications: [
//         { fieldName: 'bagType', label: 'Bag Type', type: 'select', required: true,
//           options: ['Handbag', 'Backpack', 'Clutch', 'Tote', 'Crossbody'] },
//         { fieldName: 'material', label: 'Material', type: 'select', required: false,
//           options: ['Leather', 'Canvas', 'Synthetic', 'Straw'] },
//       ],
//       filters: [
//         { fieldName: 'bagType', label: 'Bag Type', type: 'checkbox', required: false },
//         { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//       ]
//     },
//     'Sunglasses': {
//       specifications: [
//         { fieldName: 'frameMaterial', label: 'Frame Material', type: 'select', required: true,
//           options: ['Plastic', 'Metal', 'Acetate'] },
//         { fieldName: 'lensType', label: 'Lens Type', type: 'select', required: false,
//           options: ['Polarized', 'Mirrored', 'Gradient'] },
//       ],
//       filters: [
//         { fieldName: 'frameMaterial', label: 'Frame Material', type: 'checkbox', required: false },
//         { fieldName: 'lensType', label: 'Lens Type', type: 'checkbox', required: false },
//       ]
//     }
//   },

//   // FOOD & BEVERAGES SUBCATEGORIES - COMPLETE VERSION
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
//     'Beverages': {
//       specifications: [
//         { fieldName: 'beverageType', label: 'Beverage Type', type: 'select', required: true,
//           options: ['Soft Drinks', 'Juice', 'Water', 'Energy Drinks', 'Tea', 'Coffee'] },
//         { fieldName: 'packageSize', label: 'Package Size', type: 'select', required: false,
//           options: ['250ml', '500ml', '1L', '1.5L', '2L'] },
//       ],
//       filters: [
//         { fieldName: 'beverageType', label: 'Beverage Type', type: 'checkbox', required: false },
//         { fieldName: 'packageSize', label: 'Package Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Cooking Ingredients': {
//       specifications: [
//         { fieldName: 'ingredientType', label: 'Ingredient Type', type: 'select', required: true,
//           options: ['Spices', 'Grains', 'Oils', 'Sauces', 'Flour'] },
//         { fieldName: 'packageSize', label: 'Package Size', type: 'select', required: false,
//           options: ['100g', '250g', '500g', '1kg', '5kg'] },
//       ],
//       filters: [
//         { fieldName: 'ingredientType', label: 'Ingredient Type', type: 'checkbox', required: false },
//         { fieldName: 'packageSize', label: 'Package Size', type: 'checkbox', required: false },
//       ]
//     },
//     'Organic': {
//       specifications: [
//         { fieldName: 'organicType', label: 'Organic Type', type: 'select', required: true,
//           options: ['Fruits', 'Vegetables', 'Grains', 'Dairy'] },
//         { fieldName: 'certification', label: 'Certification', type: 'select', required: false,
//           options: ['USDA', 'EU Organic', 'Local Certified'] },
//       ],
//       filters: [
//         { fieldName: 'organicType', label: 'Organic Type', type: 'checkbox', required: false },
//         { fieldName: 'certification', label: 'Certification', type: 'checkbox', required: false },
//       ]
//     },
//     'International': {
//       specifications: [
//         { fieldName: 'cuisine', label: 'Cuisine', type: 'select', required: true,
//           options: ['Italian', 'Chinese', 'Indian', 'Mexican', 'Middle Eastern'] },
//         { fieldName: 'productType', label: 'Product Type', type: 'select', required: false,
//           options: ['Sauces', 'Spices', 'Ready Meals', 'Snacks'] },
//       ],
//       filters: [
//         { fieldName: 'cuisine', label: 'Cuisine', type: 'checkbox', required: false },
//         { fieldName: 'productType', label: 'Product Type', type: 'checkbox', required: false },
//       ]
//     }
//   }
// }

// // Main category configurations
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
//       // REMOVED BRAND FROM CLOTHING
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
//       // REMOVED BRAND FILTER FROM CLOTHING
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
//       { fieldName: 'homeMaterial', label: 'Material', type: 'select', required: false,
//         options: ['Wood', 'Metal', 'Plastic', 'Glass', 'Fabric', 'Ceramic'] },
//       { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
//         options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] },
//       { fieldName: 'color', label: 'Color', type: 'select', required: false,
//         options: ['Black', 'White', 'Brown', 'Gray', 'Blue', 'Green', 'Red', 'Other'] },
//       { fieldName: 'dimensions', label: 'Dimensions', type: 'text', required: false, unit: 'cm' },
//     ],
//     filters: [
//       { fieldName: 'itemType', label: 'Item Type', type: 'checkbox', required: false },
//       { fieldName: 'homeMaterial', label: 'Material', type: 'checkbox', required: false },
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
// // ADD THE MISSING CATEGORIES:
//   'Sports & Outdoors': {
//     id: 'sports-outdoors',
//     name: 'Sports & Outdoors',
//     slug: 'sports-outdoors',
//     subcategories: ['Football', 'Basketball', 'Running', 'Fitness', 'Cycling', 'Swimming', 'Hiking', 'Camping'],
//     specifications: [
//       { fieldName: 'sportType', label: 'Sport Type', type: 'select', required: true,
//         options: ['Football', 'Basketball', 'Running', 'Fitness', 'Cycling', 'Swimming', 'Hiking', 'Camping'] },
//       { fieldName: 'brand', label: 'Brand', type: 'select', required: false,
//         options: ['Nike', 'Adidas', 'Puma', 'Under Armour', 'Local Brand'] },
//       { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
//         options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] },
//       { fieldName: 'size', label: 'Size', type: 'select', required: false,
//         options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
//       { fieldName: 'material', label: 'Material', type: 'select', required: false,
//         options: ['Polyester', 'Nylon', 'Cotton', 'Mesh', 'Rubber'] },
//     ],
//     filters: [
//       { fieldName: 'sportType', label: 'Sport Type', type: 'checkbox', required: false },
//       { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
//       { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
//       { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
//     ]
//   },

//   'Toys & Games': {
//     id: 'toys-games',
//     name: 'Toys & Games',
//     slug: 'toys-games',
//     subcategories: ['Action Figures', 'Dolls', 'Board Games', 'Educational', 'Puzzles', 'Outdoor Toys', 'Electronic Toys'],
//     specifications: [
//       { fieldName: 'toyType', label: 'Toy Type', type: 'select', required: true,
//         options: ['Action Figures', 'Dolls', 'Board Games', 'Educational', 'Puzzles', 'Outdoor Toys', 'Electronic Toys'] },
//       { fieldName: 'ageRange', label: 'Age Range', type: 'select', required: true,
//         options: ['0-2 years', '3-5 years', '6-8 years', '9-12 years', '13+ years'] },
//       { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
//         options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] },
//       { fieldName: 'brand', label: 'Brand', type: 'select', required: false,
//         options: ['Lego', 'Barbie', 'Hot Wheels', 'Nerf', 'Local Brand'] },
//       { fieldName: 'material', label: 'Material', type: 'select', required: false,
//         options: ['Plastic', 'Wood', 'Fabric', 'Metal'] },
//     ],
//     filters: [
//       { fieldName: 'toyType', label: 'Toy Type', type: 'checkbox', required: false },
//       { fieldName: 'ageRange', label: 'Age Range', type: 'checkbox', required: false },
//       { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
//       { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
//     ]
//   },

//   'Automotive': {
//     id: 'automotive',
//     name: 'Automotive',
//     slug: 'automotive',
//     subcategories: ['Cars', 'Motorcycles', 'Bicycles', 'Trucks', 'SUVs', 'Parts & Accessories'],
//     specifications: [
//       { fieldName: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true,
//         options: ['Car', 'Motorcycle', 'Bicycle', 'Truck', 'SUV'] },
//       { fieldName: 'brand', label: 'Brand', type: 'select', required: true,
//         options: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Hyundai', 'Other'] },
//       { fieldName: 'model', label: 'Model', type: 'text', required: true },
//       { fieldName: 'year', label: 'Year', type: 'number', required: true, min: 1990, max: 2024 },
//       { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
//         options: ['New', 'Used', 'Reconditioned'] },
//       { fieldName: 'fuelType', label: 'Fuel Type', type: 'select', required: true,
//         options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
//       { fieldName: 'transmission', label: 'Transmission', type: 'select', required: true,
//         options: ['Manual', 'Automatic'] },
//       { fieldName: 'mileage', label: 'Mileage', type: 'number', required: false, unit: 'km' },
//     ],
//     filters: [
//       { fieldName: 'vehicleType', label: 'Vehicle Type', type: 'checkbox', required: false },
//       { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
//       { fieldName: 'year', label: 'Year', type: 'range', required: false, min: 1990, max: 2024 },
//       { fieldName: 'fuelType', label: 'Fuel Type', type: 'checkbox', required: false },
//       { fieldName: 'transmission', label: 'Transmission', type: 'checkbox', required: false },
//     ]
//   },

//   'Books & Media': {
//     id: 'books-media',
//     name: 'Books & Media',
//     slug: 'books-media',
//     subcategories: ['Books', 'DVDs', 'CDs', 'Video Games', 'Magazines'],
//     specifications: [
//       { fieldName: 'mediaType', label: 'Media Type', type: 'select', required: true,
//         options: ['Book', 'DVD', 'CD', 'Video Game', 'Magazine'] },
//       { fieldName: 'genre', label: 'Genre', type: 'select', required: true,
//         options: ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Science Fiction', 'Romance', 'Mystery'] },
//       { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
//         options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
//       { fieldName: 'format', label: 'Format', type: 'select', required: false,
//         options: ['Paperback', 'Hardcover', 'Digital', 'Audio'] },
//       { fieldName: 'language', label: 'Language', type: 'select', required: false,
//         options: ['English', 'Amharic', 'French', 'Arabic', 'Other'] },
//     ],
//     filters: [
//       { fieldName: 'mediaType', label: 'Media Type', type: 'checkbox', required: false },
//       { fieldName: 'genre', label: 'Genre', type: 'checkbox', required: false },
//       { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
//       { fieldName: 'format', label: 'Format', type: 'checkbox', required: false },
//     ]
//   },

//   'Jewelry & Accessories': {
//     id: 'jewelry-accessories',
//     name: 'Jewelry & Accessories',
//     slug: 'jewelry-accessories',
//     subcategories: ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Watches', 'Bags', 'Sunglasses'],
//     specifications: [
//       { fieldName: 'Jewelry-itemType', label: 'Item Type', type: 'select', required: true,
//         options: ['Necklace', 'Ring', 'Earrings', 'Bracelet', 'Watch', 'Bag', 'Sunglasses'] },
//       { fieldName: 'Jewelry-material', label: 'Material', type: 'select', required: true,
//         options: ['Gold', 'Silver', 'Platinum', 'Stainless Steel', 'Leather', 'Fabric', 'Plastic'] },
//       { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
//         options: ['New', 'Used - Excellent', 'Used - Good'] },
//       { fieldName: 'color', label: 'Color', type: 'select', required: false,
//         options: ['Gold', 'Silver', 'Black', 'White', 'Brown', 'Multi-color'] },
//       { fieldName: 'gemstone', label: 'Gemstone', type: 'select', required: false,
//         options: ['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'None'] },
//     ],
//     filters: [
//       { fieldName: 'itemType', label: 'Item Type', type: 'checkbox', required: false },
//       { fieldName: 'material', label: 'Material', type: 'checkbox', required: false },
//       { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
//       { fieldName: 'gemstone', label: 'Gemstone', type: 'checkbox', required: false },
//     ]
//   },

//   'Food & Beverages': {
//     id: 'food-beverages',
//     name: 'Food & Beverages',
//     slug: 'food-beverages',
//     subcategories: ['Snacks', 'Beverages', 'Cooking Ingredients', 'Organic', 'International'],
//     specifications: [
//       { fieldName: 'productsType', label: 'Product Type', type: 'select', required: true,
//         options: ['Snacks', 'Beverages', 'Cooking Ingredients', 'Organic', 'International'] },
//       { fieldName: 'brand', label: 'Brand', type: 'select', required: false,
//         options: ['Local Brand', 'International Brand'] },
//       { fieldName: 'expiryDate', label: 'Expiry Date', type: 'text', required: true },
//       { fieldName: 'packageSize', label: 'Package Size', type: 'select', required: false,
//         options: ['Small', 'Medium', 'Large', 'Family Size'] },
//       { fieldName: 'storages', label: 'Storage', type: 'select', required: false,
//         options: ['Room Temperature', 'Refrigerated', 'Frozen'] },
//     ],
//     filters: [
//       { fieldName: 'productType', label: 'Product Type', type: 'checkbox', required: false },
//       { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
//       { fieldName: 'packageSize', label: 'Package Size', type: 'checkbox', required: false },
//     ]
//   }
// }

// // Rest of the file remains the same...
// export const getCategoryConfig = (categoryName: string, subcategory?: string): CategoryConfig | null => {
//   const baseConfig = categoryConfigs[categoryName]
//   if (!baseConfig) return null

//   if (subcategory && subcategoryConfigs[categoryName] && subcategoryConfigs[categoryName][subcategory]) {
//     const subConfig = subcategoryConfigs[categoryName][subcategory]
//     return {
//       ...baseConfig,
//       specifications: [...baseConfig.specifications, ...subConfig.specifications],
//       filters: [...baseConfig.filters, ...subConfig.filters]import { CategoryConfig } from '@/types/category'

// Subcategory-specific configurations for ALL categories with UNIQUE field names
import { CategoryConfig } from "@/types/category"

const subcategoryConfigs: { [key: string]: { [key: string]: any } } = {
  // ELECTRONICS SUBCATEGORIES
  'Electronics': {
    'Phones': {
      specifications: [
        { fieldName: 'phoneScreenSize', label: 'Screen Size', type: 'select', required: false,
          options: ['< 5"', '5.1 - 5.5"', '5.6 - 6"', '6.1 - 6.5"', '6.6 - 6.8"', '> 6.8"'] },
        { fieldName: 'phoneRam', label: 'RAM', type: 'select', required: false,
          options: ['2GB', '4GB', '6GB', '8GB', '12GB', '16GB'] },
        { fieldName: 'phoneStorage', label: 'Storage', type: 'select', required: false,
          options: ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB'] },
        { fieldName: 'phoneBattery', label: 'Battery', type: 'text', required: false, unit: 'mAh' },
        { fieldName: 'phoneCamera', label: 'Camera', type: 'text', required: false, unit: 'MP' },
        { fieldName: 'phoneSimType', label: 'SIM Type', type: 'select', required: false,
          options: ['Single SIM', 'Dual SIM', 'eSIM'] },
        { fieldName: 'phoneNetwork', label: 'Network', type: 'select', required: false,
          options: ['2G', '3G', '4G', '5G'] },
      ],
      filters: [
        { fieldName: 'phoneScreenSize', label: 'Screen Size', type: 'checkbox', required: false },
        { fieldName: 'phoneRam', label: 'RAM', type: 'checkbox', required: false },
        { fieldName: 'phoneStorage', label: 'Storage', type: 'checkbox', required: false },
        { fieldName: 'phoneSimType', label: 'SIM Type', type: 'checkbox', required: false },
      ]
    },
    'Laptops & Computers': {
      specifications: [
        { fieldName: 'laptopScreenSize', label: 'Screen Size', type: 'select', required: false,
          options: ['11"', '13"', '14"', '15"', '16"', '17"'] },
        { fieldName: 'laptopRam', label: 'RAM', type: 'select', required: false,
          options: ['4GB', '8GB', '16GB', '32GB', '64GB'] },
        { fieldName: 'laptopStorage', label: 'Storage', type: 'select', required: false,
          options: ['128GB', '256GB', '512GB', '1TB', '2TB'] },
        { fieldName: 'laptopProcessor', label: 'Processor', type: 'select', required: false,
          options: ['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'Intel Core i9', 'AMD Ryzen 3', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M1', 'Apple M2'] },
        { fieldName: 'laptopGraphics', label: 'Graphics', type: 'text', required: false },
        { fieldName: 'laptopOS', label: 'OS', type: 'select', required: false,
          options: ['Windows', 'macOS', 'Linux', 'Chrome OS'] },
      ],
      filters: [
        { fieldName: 'laptopScreenSize', label: 'Screen Size', type: 'checkbox', required: false },
        { fieldName: 'laptopRam', label: 'RAM', type: 'checkbox', required: false },
        { fieldName: 'laptopStorage', label: 'Storage', type: 'checkbox', required: false },
        { fieldName: 'laptopProcessor', label: 'Processor', type: 'checkbox', required: false },
      ]
    },
    'Video Game Consoles': {
      specifications: [
        { fieldName: 'consoleType', label: 'Console Type', type: 'select', required: true,
          options: ['PlayStation', 'Xbox', 'Nintendo Switch', 'Gaming PC', 'Handheld'] },
        { fieldName: 'consoleStorage', label: 'Storage', type: 'select', required: false,
          options: ['500GB', '1TB', '2TB'] },
        { fieldName: 'consoleGeneration', label: 'Generation', type: 'select', required: false,
          options: ['Current Gen', 'Previous Gen', 'Retro'] },
      ],
      filters: [
        { fieldName: 'consoleType', label: 'Console Type', type: 'checkbox', required: false },
        { fieldName: 'consoleGeneration', label: 'Generation', type: 'checkbox', required: false },
      ]
    },
    'Audio & Music Equipment': {
      specifications: [
        { fieldName: 'audioType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Speakers', 'Amplifiers', 'Mixers', 'Microphones', 'DJ Equipment'] },
        { fieldName: 'audioPower', label: 'Power Output', type: 'text', required: false, unit: 'W' },
        { fieldName: 'audioConnectivity', label: 'Connectivity', type: 'select', required: false,
          options: ['Bluetooth', 'Wired', 'Wi-Fi', 'Multi'] },
      ],
      filters: [
        { fieldName: 'audioType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'audioConnectivity', label: 'Connectivity', type: 'checkbox', required: false },
      ]
    },
    'Headphones': {
      specifications: [
        { fieldName: 'headphoneType', label: 'Headphone Type', type: 'select', required: true,
          options: ['Over-ear', 'On-ear', 'In-ear', 'Wireless', 'Noise Cancelling'] },
        { fieldName: 'headphoneConnectivity', label: 'Connectivity', type: 'select', required: false,
          options: ['Wired', 'Bluetooth', 'Both'] },
        { fieldName: 'headphoneBattery', label: 'Battery Life', type: 'text', required: false, unit: 'hours' },
      ],
      filters: [
        { fieldName: 'headphoneType', label: 'Headphone Type', type: 'checkbox', required: false },
        { fieldName: 'headphoneConnectivity', label: 'Connectivity', type: 'checkbox', required: false },
      ]
    },
    'Photo & Video Cameras': {
      specifications: [
        { fieldName: 'cameraType', label: 'Camera Type', type: 'select', required: true,
          options: ['DSLR', 'Mirrorless', 'Point & Shoot', 'Action Camera', 'Film Camera', 'Video Camera'] },
        { fieldName: 'cameraMegapixels', label: 'Megapixels', type: 'text', required: false, unit: 'MP' },
        { fieldName: 'cameraLensMount', label: 'Lens Mount', type: 'text', required: false },
        { fieldName: 'cameraSensorSize', label: 'Sensor Size', type: 'select', required: false,
          options: ['Full Frame', 'APS-C', 'Micro Four Thirds', '1"'] },
      ],
      filters: [
        { fieldName: 'cameraType', label: 'Camera Type', type: 'checkbox', required: false },
        { fieldName: 'cameraSensorSize', label: 'Sensor Size', type: 'checkbox', required: false },
      ]
    },
    'Security & Surveillance': {
      specifications: [
        { fieldName: 'securityType', label: 'Security Type', type: 'select', required: true,
          options: ['CCTV Cameras', 'Alarm Systems', 'Access Control', 'Smart Home Security'] },
        { fieldName: 'securityResolution', label: 'Resolution', type: 'select', required: false,
          options: ['720p', '1080p', '2K', '4K'] },
        { fieldName: 'securityConnectivity', label: 'Connectivity', type: 'select', required: false,
          options: ['Wired', 'Wireless', 'Both'] },
      ],
      filters: [
        { fieldName: 'securityType', label: 'Security Type', type: 'checkbox', required: false },
      ]
    },
    'Networking Products': {
      specifications: [
        { fieldName: 'networkingType', label: 'Networking Type', type: 'select', required: true,
          options: ['Routers', 'Switches', 'Modems', 'Access Points', 'Network Cards'] },
        { fieldName: 'networkingSpeed', label: 'Speed', type: 'select', required: false,
          options: ['Wi-Fi 5', 'Wi-Fi 6', 'Wi-Fi 6E', 'Gigabit', '10 Gigabit'] },
        { fieldName: 'networkingBand', label: 'Frequency Band', type: 'select', required: false,
          options: ['2.4GHz', '5GHz', 'Dual Band', 'Tri Band'] },
      ],
      filters: [
        { fieldName: 'networkingType', label: 'Networking Type', type: 'checkbox', required: false },
        { fieldName: 'networkingSpeed', label: 'Speed', type: 'checkbox', required: false },
      ]
    },
    'Printers & Scanners': {
      specifications: [
        { fieldName: 'printerType', label: 'Printer Type', type: 'select', required: true,
          options: ['Inkjet', 'Laser', 'All-in-One', 'Photo Printer', '3D Printer'] },
        { fieldName: 'printerFunction', label: 'Function', type: 'select', required: false,
          options: ['Print Only', 'Print & Scan', 'Print, Scan & Copy'] },
        { fieldName: 'printerConnectivity', label: 'Connectivity', type: 'select', required: false,
          options: ['USB', 'Wi-Fi', 'Ethernet', 'All'] },
      ],
      filters: [
        { fieldName: 'printerType', label: 'Printer Type', type: 'checkbox', required: false },
        { fieldName: 'printerFunction', label: 'Function', type: 'checkbox', required: false },
      ]
    },
    'Computer Monitors': {
      specifications: [
        { fieldName: 'monitorSize', label: 'Screen Size', type: 'select', required: false,
          options: ['< 21"', '21-24"', '25-27"', '28-32"', '> 32"'] },
        { fieldName: 'monitorResolution', label: 'Resolution', type: 'select', required: false,
          options: ['HD', 'Full HD', '2K', '4K', 'UltraWide'] },
        { fieldName: 'monitorRefreshRate', label: 'Refresh Rate', type: 'select', required: false,
          options: ['60Hz', '75Hz', '120Hz', '144Hz', '240Hz+'] },
      ],
      filters: [
        { fieldName: 'monitorSize', label: 'Screen Size', type: 'checkbox', required: false },
        { fieldName: 'monitorResolution', label: 'Resolution', type: 'checkbox', required: false },
      ]
    },
    'Computer Hardware': {
      specifications: [
        { fieldName: 'hardwareType', label: 'Hardware Type', type: 'select', required: true,
          options: ['Processors', 'Graphics Cards', 'Motherboards', 'Memory', 'Storage', 'Power Supplies'] },
        { fieldName: 'hardwareCompatibility', label: 'Compatibility', type: 'text', required: false },
        { fieldName: 'hardwareInterface', label: 'Interface', type: 'select', required: false,
          options: ['SATA', 'NVMe', 'PCIe', 'DDR4', 'DDR5'] },
      ],
      filters: [
        { fieldName: 'hardwareType', label: 'Hardware Type', type: 'checkbox', required: false },
      ]
    },
    'Computer Accessories': {
      specifications: [
        { fieldName: 'accessoryType', label: 'Accessory Type', type: 'select', required: true,
          options: ['Keyboards', 'Mice', 'Webcams', 'External Storage', 'Docks', 'Cables'] },
        { fieldName: 'accessoryConnectivity', label: 'Connectivity', type: 'select', required: false,
          options: ['USB', 'Bluetooth', 'Wireless', 'Thunderbolt'] },
      ],
      filters: [
        { fieldName: 'accessoryType', label: 'Accessory Type', type: 'checkbox', required: false },
      ]
    },
    'Electronic Accessories & Supplies': {
      specifications: [
        { fieldName: 'electronicAccessoryType', label: 'Accessory Type', type: 'select', required: true,
          options: ['Chargers', 'Cables', 'Cases', 'Screen Protectors', 'Stands', 'Adapters'] },
        { fieldName: 'accessoryCompatibility', label: 'Compatibility', type: 'text', required: false },
      ],
      filters: [
        { fieldName: 'electronicAccessoryType', label: 'Accessory Type', type: 'checkbox', required: false },
      ]
    },
    'Video Games': {
      specifications: [
        { fieldName: 'gamePlatform', label: 'Platform', type: 'select', required: true,
          options: ['PlayStation', 'Xbox', 'Nintendo', 'PC', 'Mobile'] },
        { fieldName: 'gameGenre', label: 'Genre', type: 'select', required: false,
          options: ['Action', 'Adventure', 'Sports', 'RPG', 'Strategy', 'Racing'] },
        { fieldName: 'gameEdition', label: 'Edition', type: 'select', required: false,
          options: ['Standard', 'Deluxe', 'Collector\'s'] },
      ],
      filters: [
        { fieldName: 'gamePlatform', label: 'Platform', type: 'checkbox', required: false },
        { fieldName: 'gameGenre', label: 'Genre', type: 'checkbox', required: false },
      ]
    },
    'Software': {
      specifications: [
        { fieldName: 'softwareType', label: 'Software Type', type: 'select', required: true,
          options: ['Operating System', 'Productivity', 'Creative', 'Security', 'Business'] },
        { fieldName: 'softwareLicense', label: 'License Type', type: 'select', required: false,
          options: ['Lifetime', 'Subscription', 'Trial'] },
        { fieldName: 'softwarePlatform', label: 'Platform', type: 'select', required: false,
          options: ['Windows', 'macOS', 'Linux', 'Mobile'] },
      ],
      filters: [
        { fieldName: 'softwareType', label: 'Software Type', type: 'checkbox', required: false },
        { fieldName: 'softwareLicense', label: 'License Type', type: 'checkbox', required: false },
      ]
    }
  },

  // VEHICLES SUBCATEGORIES
  'Vehicles': {
    'Vehicle Parts & Accessories': {
      specifications: [
        { fieldName: 'partType', label: 'Part Type', type: 'select', required: true,
          options: ['Engine', 'Brakes', 'Suspension', 'Electrical', 'Body', 'Interior', 'Exhaust'] },
        { fieldName: 'partCompatibility', label: 'Vehicle Compatibility', type: 'text', required: false },
        { fieldName: 'partCondition', label: 'Condition', type: 'select', required: true,
          options: ['New', 'Used', 'Refurbished'] },
      ],
      filters: [
        { fieldName: 'partType', label: 'Part Type', type: 'checkbox', required: false },
        { fieldName: 'partCondition', label: 'Condition', type: 'checkbox', required: false },
      ]
    },
    'Cars': {
      specifications: [
        { fieldName: 'carVehicleType', label: 'Vehicle Type', type: 'select', required: true,
          options: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Station Wagon'] },
        { fieldName: 'carFuelType', label: 'Fuel Type', type: 'select', required: true,
          options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
        { fieldName: 'carTransmission', label: 'Transmission', type: 'select', required: true,
          options: ['Manual', 'Automatic'] },
        { fieldName: 'carMileage', label: 'Mileage', type: 'number', required: false, unit: 'km' },
        { fieldName: 'carYear', label: 'Year', type: 'number', required: true, min: 1990, max: 2024 },
        { fieldName: 'carEngineSize', label: 'Engine Size', type: 'select', required: false,
          options: ['1.0L', '1.2L', '1.4L', '1.6L', '1.8L', '2.0L', '2.2L', '2.4L', '3.0L+'] },
      ],
      filters: [
        { fieldName: 'carVehicleType', label: 'Vehicle Type', type: 'checkbox', required: false },
        { fieldName: 'carFuelType', label: 'Fuel Type', type: 'checkbox', required: false },
        { fieldName: 'carTransmission', label: 'Transmission', type: 'checkbox', required: false },
        { fieldName: 'carYear', label: 'Year', type: 'range', required: false, min: 1990, max: 2024 },
      ]
    },
    'Motorcycles & Scooters': {
      specifications: [
        { fieldName: 'motorcycleType', label: 'Bike Type', type: 'select', required: true,
          options: ['Sport', 'Cruiser', 'Off-road', 'Scooter', 'Moped', 'Adventure'] },
        { fieldName: 'motorcycleEngineSize', label: 'Engine Size', type: 'select', required: true,
          options: ['< 125cc', '125-250cc', '250-500cc', '500-750cc', '750cc+'] },
        { fieldName: 'motorcycleFuelType', label: 'Fuel Type', type: 'select', required: true,
          options: ['Petrol', 'Electric'] },
        { fieldName: 'motorcycleMileage', label: 'Mileage', type: 'number', required: false, unit: 'km' },
      ],
      filters: [
        { fieldName: 'motorcycleType', label: 'Bike Type', type: 'checkbox', required: false },
        { fieldName: 'motorcycleEngineSize', label: 'Engine Size', type: 'checkbox', required: false },
        { fieldName: 'motorcycleFuelType', label: 'Fuel Type', type: 'checkbox', required: false },
      ]
    },
    'Buses & Microbuses': {
      specifications: [
        { fieldName: 'busType', label: 'Bus Type', type: 'select', required: true,
          options: ['Minibus', 'Microbus', 'School Bus', 'Tourist Bus', 'Public Transport'] },
        { fieldName: 'busCapacity', label: 'Passenger Capacity', type: 'select', required: false,
          options: ['< 15', '15-25', '26-35', '36-50', '50+'] },
        { fieldName: 'busFuelType', label: 'Fuel Type', type: 'select', required: true,
          options: ['Petrol', 'Diesel'] },
      ],
      filters: [
        { fieldName: 'busType', label: 'Bus Type', type: 'checkbox', required: false },
        { fieldName: 'busCapacity', label: 'Capacity', type: 'checkbox', required: false },
      ]
    },
    'Trucks & Trailers': {
      specifications: [
        { fieldName: 'truckType', label: 'Truck Type', type: 'select', required: true,
          options: ['Pickup', 'Commercial', 'Heavy Duty', 'Trailer', 'Tanker'] },
        { fieldName: 'truckFuelType', label: 'Fuel Type', type: 'select', required: true,
          options: ['Petrol', 'Diesel'] },
        { fieldName: 'truckCapacity', label: 'Load Capacity', type: 'text', required: false, unit: 'tons' },
      ],
      filters: [
        { fieldName: 'truckType', label: 'Truck Type', type: 'checkbox', required: false },
        { fieldName: 'truckFuelType', label: 'Fuel Type', type: 'checkbox', required: false },
      ]
    },
    'Construction & Heavy Machinery': {
      specifications: [
        { fieldName: 'machineryType', label: 'Machinery Type', type: 'select', required: true,
          options: ['Excavator', 'Bulldozer', 'Crane', 'Loader', 'Forklift', 'Compactor'] },
        { fieldName: 'machineryWeight', label: 'Weight Class', type: 'select', required: false,
          options: ['Light', 'Medium', 'Heavy', 'Extra Heavy'] },
        { fieldName: 'machineryFuelType', label: 'Fuel Type', type: 'select', required: true,
          options: ['Diesel', 'Electric', 'Hybrid'] },
      ],
      filters: [
        { fieldName: 'machineryType', label: 'Machinery Type', type: 'checkbox', required: false },
      ]
    },
    'Watercraft & Boats': {
      specifications: [
        { fieldName: 'watercraftType', label: 'Watercraft Type', type: 'select', required: true,
          options: ['Speedboat', 'Fishing Boat', 'Yacht', 'Sailboat', 'Jet Ski', 'Canoe'] },
        { fieldName: 'watercraftLength', label: 'Length', type: 'text', required: false, unit: 'meters' },
        { fieldName: 'watercraftEngine', label: 'Engine Type', type: 'select', required: false,
          options: ['Outboard', 'Inboard', 'Sail', 'None'] },
      ],
      filters: [
        { fieldName: 'watercraftType', label: 'Watercraft Type', type: 'checkbox', required: false },
      ]
    },
    'Car Services': {
      specifications: [
        { fieldName: 'carServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Mechanical Repair', 'Body Work', 'Car Wash', 'Oil Change', 'Tire Service', 'Electrical'] },
        { fieldName: 'serviceSpecialization', label: 'Specialization', type: 'select', required: false,
          options: ['All Brands', 'Japanese', 'European', 'Korean', 'American'] },
        { fieldName: 'serviceWarranty', label: 'Warranty', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'carServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    }
  },

  // PROPERTY SUBCATEGORIES
  'Property': {
    'New Builds': {
      specifications: [
        { fieldName: 'propertyType', label: 'Property Type', type: 'select', required: true,
          options: ['Apartment', 'House', 'Villa', 'Townhouse', 'Commercial'] },
        { fieldName: 'bedrooms', label: 'Bedrooms', type: 'select', required: true,
          options: ['Studio', '1', '2', '3', '4', '5+'] },
        { fieldName: 'bathrooms', label: 'Bathrooms', type: 'select', required: true,
          options: ['1', '2', '3', '4+'] },
        { fieldName: 'propertySize', label: 'Size', type: 'text', required: false, unit: 'm²' },
      ],
      filters: [
        { fieldName: 'propertyType', label: 'Property Type', type: 'checkbox', required: false },
        { fieldName: 'bedrooms', label: 'Bedrooms', type: 'checkbox', required: false },
        { fieldName: 'bathrooms', label: 'Bathrooms', type: 'checkbox', required: false },
      ]
    },
    'Houses & Apartments for Rent': {
      specifications: [
        { fieldName: 'rentalType', label: 'Rental Type', type: 'select', required: true,
          options: ['Apartment', 'House', 'Villa', 'Townhouse', 'Room'] },
        { fieldName: 'rentBedrooms', label: 'Bedrooms', type: 'select', required: true,
          options: ['Studio', '1', '2', '3', '4', '5+'] },
        { fieldName: 'rentBathrooms', label: 'Bathrooms', type: 'select', required: true,
          options: ['1', '2', '3', '4+'] },
        { fieldName: 'rentFurnishing', label: 'Furnishing', type: 'select', required: false,
          options: ['Furnished', 'Unfurnished', 'Semi-Furnished'] },
        { fieldName: 'rentUtilities', label: 'Utilities Included', type: 'select', required: false,
          options: ['Yes', 'No', 'Partial'] },
      ],
      filters: [
        { fieldName: 'rentalType', label: 'Rental Type', type: 'checkbox', required: false },
        { fieldName: 'rentBedrooms', label: 'Bedrooms', type: 'checkbox', required: false },
        { fieldName: 'rentFurnishing', label: 'Furnishing', type: 'checkbox', required: false },
      ]
    },
    'Houses & Apartments for Sale': {
      specifications: [
        { fieldName: 'saleType', label: 'Property Type', type: 'select', required: true,
          options: ['Apartment', 'House', 'Villa', 'Townhouse', 'Penthouse'] },
        { fieldName: 'saleBedrooms', label: 'Bedrooms', type: 'select', required: true,
          options: ['Studio', '1', '2', '3', '4', '5+'] },
        { fieldName: 'saleBathrooms', label: 'Bathrooms', type: 'select', required: true,
          options: ['1', '2', '3', '4+'] },
        { fieldName: 'salePropertyAge', label: 'Property Age', type: 'select', required: false,
          options: ['New', '1-5 years', '5-10 years', '10-20 years', '20+ years'] },
      ],
      filters: [
        { fieldName: 'saleType', label: 'Property Type', type: 'checkbox', required: false },
        { fieldName: 'saleBedrooms', label: 'Bedrooms', type: 'checkbox', required: false },
        { fieldName: 'salePropertyAge', label: 'Property Age', type: 'checkbox', required: false },
      ]
    },
    'Land & Plots for Rent': {
      specifications: [
        { fieldName: 'landRentType', label: 'Land Type', type: 'select', required: true,
          options: ['Residential', 'Commercial', 'Agricultural', 'Industrial'] },
        { fieldName: 'landRentSize', label: 'Plot Size', type: 'text', required: true, unit: 'm²' },
        { fieldName: 'landRentZoning', label: 'Zoning', type: 'select', required: false,
          options: ['Residential', 'Commercial', 'Mixed Use', 'Agricultural'] },
      ],
      filters: [
        { fieldName: 'landRentType', label: 'Land Type', type: 'checkbox', required: false },
        { fieldName: 'landRentZoning', label: 'Zoning', type: 'checkbox', required: false },
      ]
    },
    'Short Let': {
      specifications: [
        { fieldName: 'shortLetType', label: 'Property Type', type: 'select', required: true,
          options: ['Apartment', 'House', 'Villa', 'Room', 'Guest House'] },
        { fieldName: 'shortLetBedrooms', label: 'Bedrooms', type: 'select', required: true,
          options: ['Studio', '1', '2', '3', '4+'] },
        { fieldName: 'shortLetMinStay', label: 'Minimum Stay', type: 'select', required: false,
          options: ['1 night', '3 nights', '1 week', '2 weeks', '1 month'] },
        { fieldName: 'shortLetAmenities', label: 'Amenities', type: 'text', required: false },
      ],
      filters: [
        { fieldName: 'shortLetType', label: 'Property Type', type: 'checkbox', required: false },
        { fieldName: 'shortLetBedrooms', label: 'Bedrooms', type: 'checkbox', required: false },
      ]
    },
    'Land & Plots for Sale': {
      specifications: [
        { fieldName: 'landSaleType', label: 'Land Type', type: 'select', required: true,
          options: ['Residential', 'Commercial', 'Agricultural', 'Industrial'] },
        { fieldName: 'landSaleSize', label: 'Plot Size', type: 'text', required: true, unit: 'm²' },
        { fieldName: 'landSaleZoning', label: 'Zoning', type: 'select', required: false,
          options: ['Residential', 'Commercial', 'Mixed Use', 'Agricultural'] },
        { fieldName: 'landSaleTitle', label: 'Title Status', type: 'select', required: false,
          options: ['Freehold', 'Leasehold', 'Certificate of Occupancy'] },
      ],
      filters: [
        { fieldName: 'landSaleType', label: 'Land Type', type: 'checkbox', required: false },
        { fieldName: 'landSaleZoning', label: 'Zoning', type: 'checkbox', required: false },
      ]
    },
    'Event Centres, Venues & Workstations': {
      specifications: [
        { fieldName: 'venueType', label: 'Venue Type', type: 'select', required: true,
          options: ['Event Center', 'Conference Room', 'Wedding Venue', 'Coworking Space', 'Office'] },
        { fieldName: 'venueCapacity', label: 'Capacity', type: 'select', required: false,
          options: ['< 50', '50-100', '100-200', '200-500', '500+'] },
        { fieldName: 'venueAmenities', label: 'Amenities', type: 'text', required: false },
      ],
      filters: [
        { fieldName: 'venueType', label: 'Venue Type', type: 'checkbox', required: false },
        { fieldName: 'venueCapacity', label: 'Capacity', type: 'checkbox', required: false },
      ]
    },
    'Commercial Property for Rent': {
      specifications: [
        { fieldName: 'commercialRentType', label: 'Property Type', type: 'select', required: true,
          options: ['Office Space', 'Shop', 'Warehouse', 'Showroom', 'Factory'] },
        { fieldName: 'commercialRentSize', label: 'Size', type: 'text', required: true, unit: 'm²' },
        { fieldName: 'commercialRentUse', label: 'Intended Use', type: 'select', required: false,
          options: ['Retail', 'Office', 'Industrial', 'Storage'] },
      ],
      filters: [
        { fieldName: 'commercialRentType', label: 'Property Type', type: 'checkbox', required: false },
        { fieldName: 'commercialRentUse', label: 'Intended Use', type: 'checkbox', required: false },
      ]
    },
    'Commercial Property for Sale': {
      specifications: [
        { fieldName: 'commercialSaleType', label: 'Property Type', type: 'select', required: true,
          options: ['Office Building', 'Shopping Mall', 'Warehouse', 'Factory', 'Hotel'] },
        { fieldName: 'commercialSaleSize', label: 'Size', type: 'text', required: true, unit: 'm²' },
        { fieldName: 'commercialSaleUse', label: 'Current Use', type: 'select', required: false,
          options: ['Retail', 'Office', 'Industrial', 'Hospitality'] },
      ],
      filters: [
        { fieldName: 'commercialSaleType', label: 'Property Type', type: 'checkbox', required: false },
        { fieldName: 'commercialSaleUse', label: 'Current Use', type: 'checkbox', required: false },
      ]
    }
  },

  // HOME, FURNITURE & APPLIANCES SUBCATEGORIES
  'Home, Furniture & Appliances': {
    'Furniture': {
      specifications: [
        { fieldName: 'furnitureType', label: 'Furniture Type', type: 'select', required: true,
          options: ['Sofa', 'Bed', 'Table', 'Chair', 'Cabinet', 'Wardrobe', 'Shelf', 'Desk'] },
        { fieldName: 'furnitureMaterial', label: 'Material', type: 'select', required: false,
          options: ['Wood', 'Metal', 'Plastic', 'Glass', 'Fabric', 'Leather'] },
        { fieldName: 'furnitureDimensions', label: 'Dimensions', type: 'text', required: false, unit: 'cm' },
      ],
      filters: [
        { fieldName: 'furnitureType', label: 'Furniture Type', type: 'checkbox', required: false },
        { fieldName: 'furnitureMaterial', label: 'Material', type: 'checkbox', required: false },
      ]
    },
    'Lighting': {
      specifications: [
        { fieldName: 'lightingType', label: 'Lighting Type', type: 'select', required: true,
          options: ['Ceiling Light', 'Table Lamp', 'Floor Lamp', 'Wall Light', 'Outdoor Light'] },
        { fieldName: 'lightingPower', label: 'Power', type: 'text', required: false, unit: 'W' },
        { fieldName: 'lightingColorTemp', label: 'Color Temperature', type: 'select', required: false,
          options: ['Warm White', 'Cool White', 'Daylight'] },
      ],
      filters: [
        { fieldName: 'lightingType', label: 'Lighting Type', type: 'checkbox', required: false },
      ]
    },
    'Storage & Organization': {
      specifications: [
        { fieldName: 'storageType', label: 'Storage Type', type: 'select', required: true,
          options: ['Shelving', 'Cabinets', 'Containers', 'Racks', 'Organizers'] },
        { fieldName: 'storageMaterial', label: 'Material', type: 'select', required: false,
          options: ['Plastic', 'Wood', 'Metal', 'Fabric'] },
        { fieldName: 'storageCapacity', label: 'Capacity', type: 'text', required: false },
      ],
      filters: [
        { fieldName: 'storageType', label: 'Storage Type', type: 'checkbox', required: false },
        { fieldName: 'storageMaterial', label: 'Material', type: 'checkbox', required: false },
      ]
    },
    'Home Accessories': {
      specifications: [
        { fieldName: 'homeAccessoryType', label: 'Accessory Type', type: 'select', required: true,
          options: ['Decor', 'Mirrors', 'Clocks', 'Rugs', 'Curtains', 'Cushions'] },
        { fieldName: 'homeAccessoryStyle', label: 'Style', type: 'select', required: false,
          options: ['Modern', 'Traditional', 'Minimalist', 'Bohemian'] },
      ],
      filters: [
        { fieldName: 'homeAccessoryType', label: 'Accessory Type', type: 'checkbox', required: false },
        { fieldName: 'homeAccessoryStyle', label: 'Style', type: 'checkbox', required: false },
      ]
    },
    'Kitchen Appliances': {
      specifications: [
        { fieldName: 'kitchenApplianceType', label: 'Appliance Type', type: 'select', required: true,
          options: ['Refrigerator', 'Oven', 'Microwave', 'Blender', 'Toaster', 'Cooker'] },
        { fieldName: 'appliancePower', label: 'Power Rating', type: 'text', required: false, unit: 'W' },
        { fieldName: 'applianceCapacity', label: 'Capacity', type: 'text', required: false },
      ],
      filters: [
        { fieldName: 'kitchenApplianceType', label: 'Appliance Type', type: 'checkbox', required: false },
      ]
    },
    'Kitchenware & Cookware': {
      specifications: [
        { fieldName: 'kitchenwareType', label: 'Kitchenware Type', type: 'select', required: true,
          options: ['Cookware', 'Cutlery', 'Utensils', 'Bakeware', 'Serveware'] },
        { fieldName: 'kitchenwareMaterial', label: 'Material', type: 'select', required: false,
          options: ['Stainless Steel', 'Ceramic', 'Glass', 'Plastic', 'Wood'] },
      ],
      filters: [
        { fieldName: 'kitchenwareType', label: 'Kitchenware Type', type: 'checkbox', required: false },
        { fieldName: 'kitchenwareMaterial', label: 'Material', type: 'checkbox', required: false },
      ]
    },
    'Household Chemicals': {
      specifications: [
        { fieldName: 'chemicalType', label: 'Chemical Type', type: 'select', required: true,
          options: ['Cleaning', 'Laundry', 'Air Freshener', 'Pest Control'] },
        { fieldName: 'chemicalSize', label: 'Size', type: 'select', required: false,
          options: ['Small', 'Medium', 'Large', 'Bulk'] },
        { fieldName: 'chemicalSafety', label: 'Safety Level', type: 'select', required: false,
          options: ['General Use', 'Caution', 'Dangerous'] },
      ],
      filters: [
        { fieldName: 'chemicalType', label: 'Chemical Type', type: 'checkbox', required: false },
      ]
    },
    'Garden Supplies': {
      specifications: [
        { fieldName: 'gardenSupplyType', label: 'Supply Type', type: 'select', required: true,
          options: ['Tools', 'Plants', 'Fertilizers', 'Pots', 'Watering', 'Decor'] },
        { fieldName: 'gardenMaterial', label: 'Material', type: 'select', required: false,
          options: ['Metal', 'Wood', 'Plastic', 'Ceramic'] },
      ],
      filters: [
        { fieldName: 'gardenSupplyType', label: 'Supply Type', type: 'checkbox', required: false },
        { fieldName: 'gardenMaterial', label: 'Material', type: 'checkbox', required: false },
      ]
    }
  },

  // FASHION SUBCATEGORIES
  'FASHION': {
    "Women's Fashion": {
      specifications: [
        { fieldName: 'womenClothingType', label: 'Clothing Type', type: 'select', required: true,
          options: ['Dress', 'Skirt', 'Blouse', 'T-Shirt', 'Pants', 'Jeans', 'Jacket', 'Sweater', 'Traditional Wear'] },
        { fieldName: 'womenSize', label: 'Size', type: 'select', required: true,
          options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
        { fieldName: 'womenColor', label: 'Color', type: 'select', required: true,
          options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple', 'Multi'] },
      ],
      filters: [
        { fieldName: 'womenClothingType', label: 'Clothing Type', type: 'checkbox', required: false },
        { fieldName: 'womenSize', label: 'Size', type: 'checkbox', required: false },
        { fieldName: 'womenColor', label: 'Color', type: 'checkbox', required: false },
      ]
    },
    "Men's Fashion": {
      specifications: [
        { fieldName: 'menClothingType', label: 'Clothing Type', type: 'select', required: true,
          options: ['T-Shirt', 'Shirt', 'Pants', 'Jeans', 'Jacket', 'Sweater', 'Underwear', 'Suit', 'Traditional Wear'] },
        { fieldName: 'menSize', label: 'Size', type: 'select', required: true,
          options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
        { fieldName: 'menColor', label: 'Color', type: 'select', required: true,
          options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Gray', 'Brown', 'Multi'] },
      ],
      filters: [
        { fieldName: 'menClothingType', label: 'Clothing Type', type: 'checkbox', required: false },
        { fieldName: 'menSize', label: 'Size', type: 'checkbox', required: false },
        { fieldName: 'menColor', label: 'Color', type: 'checkbox', required: false },
      ]
    },
    "Baby & Kids Fashion": {
      specifications: [
        { fieldName: 'kidsClothingType', label: 'Clothing Type', type: 'select', required: true,
          options: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Sleepwear', 'School Uniform'] },
        { fieldName: 'kidsSize', label: 'Size', type: 'select', required: true,
          options: ['Newborn', '0-3M', '3-6M', '6-12M', '12-18M', '18-24M', '2T', '3T', '4T', '5T', '6-7', '8-9', '10-12'] },
        { fieldName: 'kidsGender', label: 'Gender', type: 'select', required: false,
          options: ['Boys', 'Girls', 'Unisex'] },
      ],
      filters: [
        { fieldName: 'kidsClothingType', label: 'Clothing Type', type: 'checkbox', required: false },
        { fieldName: 'kidsSize', label: 'Size', type: 'checkbox', required: false },
        { fieldName: 'kidsGender', label: 'Gender', type: 'checkbox', required: false },
      ]
    }
  },
  // JEWELRY & ACCESSORIES SUBCATEGORIES - ENHANCED VERSION
// Add to your subcategoryConfigs object:
'Jewelry and Accessories': {
  'Jewelry': {
    specifications: [
      { fieldName: 'jewelryType', label: 'Jewelry Type', type: 'select', required: true,
        options: ['Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Anklets', 'Brooches', 'Body Jewelry', 'Jewelry Sets'] },
      { fieldName: 'jewelryMaterial', label: 'Material', type: 'select', required: true,
        options: ['Gold', 'Silver', 'Platinum', 'Stainless Steel', 'Brass', 'Copper', 'Titanium', 'Other'] },
      { fieldName: 'jewelryGemstone', label: 'Gemstone', type: 'select', required: false,
        options: ['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'Amethyst', 'Topaz', 'Opal', 'None'] },
      { fieldName: 'jewelryGender', label: 'For', type: 'select', required: false,
        options: ['Women', 'Men', 'Unisex', 'Children'] },
      { fieldName: 'jewelryCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair', 'Vintage'] },
    ],
    filters: [
      { fieldName: 'jewelryType', label: 'Jewelry Type', type: 'checkbox', required: false },
      { fieldName: 'jewelryMaterial', label: 'Material', type: 'checkbox', required: false },
      { fieldName: 'jewelryGemstone', label: 'Gemstone', type: 'checkbox', required: false },
      { fieldName: 'jewelryGender', label: 'For', type: 'checkbox', required: false },
    ]
  },
  'Watches': {
    specifications: [
      { fieldName: 'watchType', label: 'Watch Type', type: 'select', required: true,
        options: ['Analog', 'Digital', 'Smartwatch', 'Chronograph', 'Dress', 'Sports', 'Luxury'] },
      { fieldName: 'watchBrand', label: 'Brand', type: 'text', required: false },
      { fieldName: 'watchMaterial', label: 'Material', type: 'select', required: false,
        options: ['Stainless Steel', 'Leather', 'Rubber', 'Gold', 'Silver', 'Titanium', 'Ceramic'] },
      { fieldName: 'watchGender', label: 'For', type: 'select', required: false,
        options: ['Men', 'Women', 'Unisex'] },
      { fieldName: 'watchCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair', 'Vintage'] },
    ],
    filters: [
      { fieldName: 'watchType', label: 'Watch Type', type: 'checkbox', required: false },
      { fieldName: 'watchMaterial', label: 'Material', type: 'checkbox', required: false },
      { fieldName: 'watchGender', label: 'For', type: 'checkbox', required: false },
    ]
  },
  'Bags & Purses': {
    specifications: [
      { fieldName: 'bagType', label: 'Bag Type', type: 'select', required: true,
        options: ['Handbag', 'Backpack', 'Clutch', 'Tote', 'Crossbody', 'Wallet', 'Briefcase', 'Travel Bag'] },
      { fieldName: 'bagMaterial', label: 'Material', type: 'select', required: false,
        options: ['Leather', 'Canvas', 'Nylon', 'Suede', 'Polyester', 'Straw', 'Other'] },
      { fieldName: 'bagColor', label: 'Color', type: 'select', required: true,
        options: ['Black', 'Brown', 'White', 'Blue', 'Red', 'Green', 'Multi', 'Other'] },
      { fieldName: 'bagBrand', label: 'Brand', type: 'text', required: false },
      { fieldName: 'bagCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'bagType', label: 'Bag Type', type: 'checkbox', required: false },
      { fieldName: 'bagMaterial', label: 'Material', type: 'checkbox', required: false },
      { fieldName: 'bagColor', label: 'Color', type: 'checkbox', required: false },
    ]
  },
  'Sunglasses & Eyewear': {
    specifications: [
      { fieldName: 'eyewearType', label: 'Eyewear Type', type: 'select', required: true,
        options: ['Sunglasses', 'Prescription Glasses', 'Reading Glasses', 'Safety Glasses'] },
      { fieldName: 'eyewearBrand', label: 'Brand', type: 'text', required: false },
      { fieldName: 'eyewearFrameMaterial', label: 'Frame Material', type: 'select', required: false,
        options: ['Plastic', 'Metal', 'Acetate', 'Titanium', 'Mixed'] },
      { fieldName: 'eyewearLensColor', label: 'Lens Color', type: 'select', required: false,
        options: ['Black', 'Brown', 'Gray', 'Blue', 'Green', 'Yellow', 'Clear', 'Mirrored'] },
      { fieldName: 'eyewearCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'eyewearType', label: 'Eyewear Type', type: 'checkbox', required: false },
      { fieldName: 'eyewearFrameMaterial', label: 'Frame Material', type: 'checkbox', required: false },
      { fieldName: 'eyewearLensColor', label: 'Lens Color', type: 'checkbox', required: false },
    ]
  },
  'Belts & Wallets': {
    specifications: [
      { fieldName: 'beltWalletType', label: 'Product Type', type: 'select', required: true,
        options: ['Belt', 'Wallet', 'Money Clip', 'Card Holder'] },
      { fieldName: 'beltWalletMaterial', label: 'Material', type: 'select', required: false,
        options: ['Leather', 'Fabric', 'Synthetic', 'Metal'] },
      { fieldName: 'beltWalletColor', label: 'Color', type: 'select', required: true,
        options: ['Black', 'Brown', 'Blue', 'Red', 'Multi', 'Other'] },
      { fieldName: 'beltSize', label: 'Belt Size (if applicable)', type: 'select', required: false,
        options: ['S', 'M', 'L', 'XL', 'Specific Size'] },
      { fieldName: 'beltWalletCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'beltWalletType', label: 'Product Type', type: 'checkbox', required: false },
      { fieldName: 'beltWalletMaterial', label: 'Material', type: 'checkbox', required: false },
      { fieldName: 'beltWalletColor', label: 'Color', type: 'checkbox', required: false },
    ]
  }
},
// CLOTHING SUBCATEGORIES
'Clothing': {
  'Men': {
    specifications: [
      { fieldName: 'menClothingType', label: 'Clothing Type', type: 'select', required: true,
        options: ['T-Shirt', 'Shirt', 'Pants', 'Jeans', 'Jacket', 'Sweater', 'Shorts', 'Suit', 'Traditional Wear', 'Underwear', 'Sportswear'] },
      { fieldName: 'menSize', label: 'Size', type: 'select', required: true,
        options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
      { fieldName: 'menColor', label: 'Color', type: 'select', required: true,
        options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Gray', 'Brown', 'Navy', 'Beige', 'Multi'] },
      { fieldName: 'menMaterial', label: 'Material', type: 'select', required: false,
        options: ['Cotton', 'Polyester', 'Linen', 'Wool', 'Denim', 'Silk', 'Leather', 'Mixed'] },
      { fieldName: 'menCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'menClothingType', label: 'Clothing Type', type: 'checkbox', required: false },
      { fieldName: 'menSize', label: 'Size', type: 'checkbox', required: false },
      { fieldName: 'menColor', label: 'Color', type: 'checkbox', required: false },
      { fieldName: 'menMaterial', label: 'Material', type: 'checkbox', required: false },
    ]
  },
  'Women': {
    specifications: [
      { fieldName: 'womenClothingType', label: 'Clothing Type', type: 'select', required: true,
        options: ['Dress', 'Skirt', 'Blouse', 'T-Shirt', 'Pants', 'Jeans', 'Jacket', 'Sweater', 'Traditional Wear', 'Lingerie', 'Sportswear'] },
      { fieldName: 'womenSize', label: 'Size', type: 'select', required: true,
        options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
      { fieldName: 'womenColor', label: 'Color', type: 'select', required: true,
        options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Pink', 'Purple', 'Yellow', 'Multi'] },
      { fieldName: 'womenMaterial', label: 'Material', type: 'select', required: false,
        options: ['Cotton', 'Polyester', 'Linen', 'Wool', 'Denim', 'Silk', 'Leather', 'Mixed'] },
      { fieldName: 'womenCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'womenClothingType', label: 'Clothing Type', type: 'checkbox', required: false },
      { fieldName: 'womenSize', label: 'Size', type: 'checkbox', required: false },
      { fieldName: 'womenColor', label: 'Color', type: 'checkbox', required: false },
      { fieldName: 'womenMaterial', label: 'Material', type: 'checkbox', required: false },
    ]
  },
  'Kids': {
    specifications: [
      { fieldName: 'kidsClothingType', label: 'Clothing Type', type: 'select', required: true,
        options: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Sleepwear', 'School Uniform', 'Traditional'] },
      { fieldName: 'kidsSize', label: 'Size', type: 'select', required: true,
        options: ['Newborn', '0-3M', '3-6M', '6-12M', '12-18M', '18-24M', '2T', '3T', '4T', '5T', '6-7', '8-9', '10-12'] },
      { fieldName: 'kidsGender', label: 'Gender', type: 'select', required: false,
        options: ['Boys', 'Girls', 'Unisex'] },
      { fieldName: 'kidsColor', label: 'Color', type: 'select', required: true,
        options: ['Blue', 'Pink', 'White', 'Black', 'Red', 'Green', 'Yellow', 'Multi'] },
      { fieldName: 'kidsCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'kidsClothingType', label: 'Clothing Type', type: 'checkbox', required: false },
      { fieldName: 'kidsSize', label: 'Size', type: 'checkbox', required: false },
      { fieldName: 'kidsGender', label: 'Gender', type: 'checkbox', required: false },
    ]
  },
  'Baby': {
    specifications: [
      { fieldName: 'babyClothingType', label: 'Clothing Type', type: 'select', required: true,
        options: ['Bodysuits', 'Rompers', 'Sleepers', 'Onesies', 'Sets', 'Traditional'] },
      { fieldName: 'babySize', label: 'Size', type: 'select', required: true,
        options: ['Preemie', 'Newborn', '0-3M', '3-6M', '6-9M', '9-12M'] },
      { fieldName: 'babyGender', label: 'Gender', type: 'select', required: false,
        options: ['Boy', 'Girl', 'Unisex'] },
      { fieldName: 'babyMaterial', label: 'Material', type: 'select', required: false,
        options: ['Cotton', 'Organic Cotton', 'Bamboo', 'Mixed'] },
      { fieldName: 'babyCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good'] },
    ],
    filters: [
      { fieldName: 'babyClothingType', label: 'Clothing Type', type: 'checkbox', required: false },
      { fieldName: 'babySize', label: 'Size', type: 'checkbox', required: false },
      { fieldName: 'babyGender', label: 'Gender', type: 'checkbox', required: false },
    ]
  },
  'Shoes': {
    specifications: [
      { fieldName: 'shoeType', label: 'Shoe Type', type: 'select', required: true,
        options: ['Sneakers', 'Sandals', 'Formal', 'Boots', 'Sports', 'Casual', 'Heels'] },
      { fieldName: 'shoeSize', label: 'Shoe Size', type: 'select', required: true,
        options: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'] },
      { fieldName: 'shoeGender', label: 'Gender', type: 'select', required: false,
        options: ['Men', 'Women', 'Unisex'] },
      { fieldName: 'shoeMaterial', label: 'Material', type: 'select', required: false,
        options: ['Leather', 'Synthetic', 'Canvas', 'Rubber', 'Suede'] },
      { fieldName: 'shoeCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'shoeType', label: 'Shoe Type', type: 'checkbox', required: false },
      { fieldName: 'shoeSize', label: 'Size', type: 'checkbox', required: false },
      { fieldName: 'shoeGender', label: 'Gender', type: 'checkbox', required: false },
    ]
  },
  'Accessories': {
    specifications: [
      { fieldName: 'accessoryType', label: 'Accessory Type', type: 'select', required: true,
        options: ['Bags', 'Watches', 'Jewelry', 'Belts', 'Hats', 'Scarves', 'Sunglasses', 'Wallets'] },
      { fieldName: 'accessoryMaterial', label: 'Material', type: 'select', required: false,
        options: ['Leather', 'Fabric', 'Metal', 'Plastic', 'Wood', 'Mixed'] },
      { fieldName: 'accessoryColor', label: 'Color', type: 'select', required: true,
        options: ['Black', 'Brown', 'White', 'Multi', 'Gold', 'Silver'] },
      { fieldName: 'accessoryCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'accessoryType', label: 'Accessory Type', type: 'checkbox', required: false },
      { fieldName: 'accessoryMaterial', label: 'Material', type: 'checkbox', required: false },
      { fieldName: 'accessoryColor', label: 'Color', type: 'checkbox', required: false },
    ]
  }
},
// BOOKS & MEDIA SUBCATEGORIES
'Books & Media': {
  'Fiction': {
    specifications: [
      { fieldName: 'bookGenre', label: 'Genre', type: 'select', required: true,
        options: ['Romance', 'Mystery', 'Science Fiction', 'Fantasy', 'Thriller', 'Historical', 'Literary'] },
      { fieldName: 'bookFormat', label: 'Format', type: 'select', required: true,
        options: ['Paperback', 'Hardcover', 'E-book'] },
      { fieldName: 'bookLanguage', label: 'Language', type: 'select', required: true,
        options: ['English', 'Amharic', 'Oromo', 'Tigrinya', 'Other'] },
      { fieldName: 'bookCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
      { fieldName: 'bookAuthor', label: 'Author', type: 'text', required: true },
      { fieldName: 'bookPublisher', label: 'Publisher', type: 'text', required: false },
    ],
    filters: [
      { fieldName: 'bookGenre', label: 'Genre', type: 'checkbox', required: false },
      { fieldName: 'bookFormat', label: 'Format', type: 'checkbox', required: false },
      { fieldName: 'bookLanguage', label: 'Language', type: 'checkbox', required: false },
      { fieldName: 'bookCondition', label: 'Condition', type: 'checkbox', required: false },
    ]
  },
  'Non-Fiction': {
    specifications: [
      { fieldName: 'nonfictionCategory', label: 'Category', type: 'select', required: true,
        options: ['Biography', 'History', 'Science', 'Self-Help', 'Business', 'Travel', 'Cookbook', 'Academic'] },
      { fieldName: 'bookFormat', label: 'Format', type: 'select', required: true,
        options: ['Paperback', 'Hardcover', 'E-book'] },
      { fieldName: 'bookLanguage', label: 'Language', type: 'select', required: true,
        options: ['English', 'Amharic', 'Oromo', 'Tigrinya', 'Other'] },
      { fieldName: 'bookCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
      { fieldName: 'bookAuthor', label: 'Author', type: 'text', required: true },
    ],
    filters: [
      { fieldName: 'nonfictionCategory', label: 'Category', type: 'checkbox', required: false },
      { fieldName: 'bookFormat', label: 'Format', type: 'checkbox', required: false },
      { fieldName: 'bookLanguage', label: 'Language', type: 'checkbox', required: false },
    ]
  },
  'Children': {
    specifications: [
      { fieldName: 'childrenBookType', label: 'Book Type', type: 'select', required: true,
        options: ['Picture Books', 'Chapter Books', 'Educational', 'Activity Books', 'Story Books'] },
      { fieldName: 'childrenAgeRange', label: 'Age Range', type: 'select', required: true,
        options: ['0-2 years', '3-5 years', '6-8 years', '9-12 years'] },
      { fieldName: 'bookFormat', label: 'Format', type: 'select', required: true,
        options: ['Paperback', 'Hardcover', 'Board Book'] },
      { fieldName: 'bookLanguage', label: 'Language', type: 'select', required: true,
        options: ['English', 'Amharic', 'Oromo', 'Tigrinya', 'Bilingual'] },
      { fieldName: 'bookCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good'] },
    ],
    filters: [
      { fieldName: 'childrenBookType', label: 'Book Type', type: 'checkbox', required: false },
      { fieldName: 'childrenAgeRange', label: 'Age Range', type: 'checkbox', required: false },
      { fieldName: 'bookFormat', label: 'Format', type: 'checkbox', required: false },
    ]
  },
  'Educational': {
    specifications: [
      { fieldName: 'educationalSubject', label: 'Subject', type: 'select', required: true,
        options: ['Mathematics', 'Science', 'Language', 'History', 'Geography', 'Computer', 'Business', 'Medicine'] },
      { fieldName: 'educationalLevel', label: 'Level', type: 'select', required: true,
        options: ['Primary', 'Secondary', 'University', 'Professional', 'General'] },
      { fieldName: 'bookFormat', label: 'Format', type: 'select', required: true,
        options: ['Paperback', 'Hardcover', 'E-book'] },
      { fieldName: 'bookLanguage', label: 'Language', type: 'select', required: true,
        options: ['English', 'Amharic', 'Oromo', 'Tigrinya'] },
      { fieldName: 'bookCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'educationalSubject', label: 'Subject', type: 'checkbox', required: false },
      { fieldName: 'educationalLevel', label: 'Level', type: 'checkbox', required: false },
      { fieldName: 'bookFormat', label: 'Format', type: 'checkbox', required: false },
    ]
  },
  'Audio Books': {
    specifications: [
      { fieldName: 'audioBookGenre', label: 'Genre', type: 'select', required: true,
        options: ['Fiction', 'Non-Fiction', 'Self-Help', 'Educational', 'Business'] },
      { fieldName: 'audioFormat', label: 'Format', type: 'select', required: true,
        options: ['CD', 'Digital Download', 'MP3'] },
      { fieldName: 'audioLanguage', label: 'Language', type: 'select', required: true,
        options: ['English', 'Amharic', 'Oromo', 'Tigrinya'] },
      { fieldName: 'audioDuration', label: 'Duration', type: 'text', required: false, unit: 'hours' },
      { fieldName: 'audioCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good'] },
    ],
    filters: [
      { fieldName: 'audioBookGenre', label: 'Genre', type: 'checkbox', required: false },
      { fieldName: 'audioFormat', label: 'Format', type: 'checkbox', required: false },
      { fieldName: 'audioLanguage', label: 'Language', type: 'checkbox', required: false },
    ]
  }
},
// AUTOMOTIVE SUBCATEGORIES
'Automotive': {
  'Car Care': {
    specifications: [
      { fieldName: 'carCareType', label: 'Product Type', type: 'select', required: true,
        options: ['Cleaning', 'Polishing', 'Wax', 'Interior Care', 'Tire Care', 'Engine Care'] },
      { fieldName: 'carCareBrand', label: 'Brand', type: 'text', required: false },
      { fieldName: 'carCareVolume', label: 'Volume', type: 'text', required: false, unit: 'ml' },
      { fieldName: 'carCareApplication', label: 'Application', type: 'select', required: false,
        options: ['Interior', 'Exterior', 'Both'] },
    ],
    filters: [
      { fieldName: 'carCareType', label: 'Product Type', type: 'checkbox', required: false },
      { fieldName: 'carCareApplication', label: 'Application', type: 'checkbox', required: false },
    ]
  },
  'Tools': {
    specifications: [
      { fieldName: 'autoToolType', label: 'Tool Type', type: 'select', required: true,
        options: ['Hand Tools', 'Power Tools', 'Diagnostic Tools', 'Lifting Equipment', 'Specialty Tools'] },
      { fieldName: 'autoToolBrand', label: 'Brand', type: 'text', required: false },
      { fieldName: 'autoToolCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] },
      { fieldName: 'autoToolWeight', label: 'Weight', type: 'text', required: false, unit: 'kg' },
    ],
    filters: [
      { fieldName: 'autoToolType', label: 'Tool Type', type: 'checkbox', required: false },
      { fieldName: 'autoToolCondition', label: 'Condition', type: 'checkbox', required: false },
    ]
  },
  'Accessories': {
    specifications: [
      { fieldName: 'autoAccessoryType', label: 'Accessory Type', type: 'select', required: true,
        options: ['Interior', 'Exterior', 'Electronics', 'Safety', 'Comfort'] },
      { fieldName: 'autoAccessoryBrand', label: 'Brand', type: 'text', required: false },
      { fieldName: 'autoAccessoryCompatibility', label: 'Vehicle Compatibility', type: 'text', required: false },
      { fieldName: 'autoAccessoryCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good'] },
    ],
    filters: [
      { fieldName: 'autoAccessoryType', label: 'Accessory Type', type: 'checkbox', required: false },
      { fieldName: 'autoAccessoryCondition', label: 'Condition', type: 'checkbox', required: false },
    ]
  },
  'Parts': {
    specifications: [
      { fieldName: 'autoPartType', label: 'Part Type', type: 'select', required: true,
        options: ['Engine', 'Brakes', 'Suspension', 'Electrical', 'Exhaust', 'Transmission', 'Cooling'] },
      { fieldName: 'autoPartBrand', label: 'Brand', type: 'text', required: false },
      { fieldName: 'autoPartCompatibility', label: 'Vehicle Compatibility', type: 'text', required: true },
      { fieldName: 'autoPartCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair', 'Refurbished'] },
      { fieldName: 'autoPartWarranty', label: 'Warranty', type: 'select', required: false,
        options: ['Yes', 'No'] },
    ],
    filters: [
      { fieldName: 'autoPartType', label: 'Part Type', type: 'checkbox', required: false },
      { fieldName: 'autoPartCondition', label: 'Condition', type: 'checkbox', required: false },
      { fieldName: 'autoPartWarranty', label: 'Warranty', type: 'checkbox', required: false },
    ]
  },
  'Motorcycle': {
    specifications: [
      { fieldName: 'motorcyclePartType', label: 'Part Type', type: 'select', required: true,
        options: ['Engine', 'Brakes', 'Suspension', 'Electrical', 'Exhaust', 'Body', 'Accessories'] },
      { fieldName: 'motorcycleBrand', label: 'Brand', type: 'text', required: false },
      { fieldName: 'motorcycleCompatibility', label: 'Motorcycle Compatibility', type: 'text', required: true },
      { fieldName: 'motorcycleCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'motorcyclePartType', label: 'Part Type', type: 'checkbox', required: false },
      { fieldName: 'motorcycleCondition', label: 'Condition', type: 'checkbox', required: false },
    ]
  }
},
  // BEAUTY & PERSONAL CARE SUBCATEGORIES
  'Beauty & Personal Care': {
    'Hair Care & Beauty': {
      specifications: [
        { fieldName: 'hairProductType', label: 'Product Type', type: 'select', required: true,
          options: ['Shampoo', 'Conditioner', 'Treatment', 'Styling', 'Color', 'Tools'] },
        { fieldName: 'hairType', label: 'Hair Type', type: 'select', required: false,
          options: ['All Hair Types', 'Dry', 'Oily', 'Curly', 'Straight', 'Color-Treated'] },
        { fieldName: 'hairSize', label: 'Size', type: 'select', required: false,
          options: ['Travel', 'Regular', 'Large', 'Professional'] },
      ],
      filters: [
        { fieldName: 'hairProductType', label: 'Product Type', type: 'checkbox', required: false },
        { fieldName: 'hairType', label: 'Hair Type', type: 'checkbox', required: false },
      ]
    },
    'Face Care': {
      specifications: [
        { fieldName: 'faceProductType', label: 'Product Type', type: 'select', required: true,
          options: ['Cleanser', 'Moisturizer', 'Serum', 'Sunscreen', 'Mask', 'Toner'] },
        { fieldName: 'skinType', label: 'Skin Type', type: 'select', required: false,
          options: ['All Skin Types', 'Dry', 'Oily', 'Combination', 'Sensitive'] },
        { fieldName: 'faceConcern', label: 'Skin Concern', type: 'select', required: false,
          options: ['Acne', 'Aging', 'Brightening', 'Hydration'] },
      ],
      filters: [
        { fieldName: 'faceProductType', label: 'Product Type', type: 'checkbox', required: false },
        { fieldName: 'skinType', label: 'Skin Type', type: 'checkbox', required: false },
      ]
    },
    'Oral Care': {
      specifications: [
        { fieldName: 'oralProductType', label: 'Product Type', type: 'select', required: true,
          options: ['Toothpaste', 'Toothbrush', 'Mouthwash', 'Floss', 'Whitening'] },
        { fieldName: 'oralSensitivity', label: 'Sensitivity', type: 'select', required: false,
          options: ['Regular', 'Sensitive', 'Whitening', 'Natural'] },
      ],
      filters: [
        { fieldName: 'oralProductType', label: 'Product Type', type: 'checkbox', required: false },
      ]
    },
    'Body Care': {
      specifications: [
        { fieldName: 'bodyProductType', label: 'Product Type', type: 'select', required: true,
          options: ['Lotion', 'Soap', 'Scrub', 'Oil', 'Deodorant'] },
        { fieldName: 'bodySkinType', label: 'Skin Type', type: 'select', required: false,
          options: ['Normal', 'Dry', 'Sensitive', 'All'] },
      ],
      filters: [
        { fieldName: 'bodyProductType', label: 'Product Type', type: 'checkbox', required: false },
      ]
    },
    'Fragrances': {
      specifications: [
        { fieldName: 'fragranceType', label: 'Fragrance Type', type: 'select', required: true,
          options: ['Perfume', 'Cologne', 'Body Spray', 'Essential Oil'] },
        { fieldName: 'fragranceScent', label: 'Scent', type: 'select', required: false,
          options: ['Floral', 'Woody', 'Fresh', 'Oriental', 'Fruity'] },
        { fieldName: 'fragranceSize', label: 'Size', type: 'select', required: false,
          options: ['30ml', '50ml', '100ml', '200ml'] },
      ],
      filters: [
        { fieldName: 'fragranceType', label: 'Fragrance Type', type: 'checkbox', required: false },
        { fieldName: 'fragranceScent', label: 'Scent', type: 'checkbox', required: false },
      ]
    },
    'Makeup': {
      specifications: [
        { fieldName: 'makeupType', label: 'Makeup Type', type: 'select', required: true,
          options: ['Foundation', 'Lipstick', 'Eyeshadow', 'Mascara', 'Blush', 'Concealer'] },
        { fieldName: 'makeupShade', label: 'Shade', type: 'text', required: false },
        { fieldName: 'makeupCoverage', label: 'Coverage', type: 'select', required: false,
          options: ['Light', 'Medium', 'Full'] },
      ],
      filters: [
        { fieldName: 'makeupType', label: 'Makeup Type', type: 'checkbox', required: false },
      ]
    },
    'Tools & Accessories': {
      specifications: [
        { fieldName: 'beautyToolType', label: 'Tool Type', type: 'select', required: true,
          options: ['Brushes', 'Mirrors', 'Tweezers', 'Sharpeners', 'Cases'] },
        { fieldName: 'toolMaterial', label: 'Material', type: 'select', required: false,
          options: ['Synthetic', 'Natural', 'Metal', 'Plastic'] },
      ],
      filters: [
        { fieldName: 'beautyToolType', label: 'Tool Type', type: 'checkbox', required: false },
      ]
    },
    'Vitamins & Supplements': {
      specifications: [
        { fieldName: 'supplementType', label: 'Supplement Type', type: 'select', required: true,
          options: ['Vitamins', 'Minerals', 'Herbal', 'Protein', 'Beauty'] },
        { fieldName: 'supplementBenefit', label: 'Benefit', type: 'select', required: false,
          options: ['Skin', 'Hair', 'Energy', 'Immunity', 'Overall Health'] },
      ],
      filters: [
        { fieldName: 'supplementType', label: 'Supplement Type', type: 'checkbox', required: false },
        { fieldName: 'supplementBenefit', label: 'Benefit', type: 'checkbox', required: false },
      ]
    },
    'Massagers': {
      specifications: [
        { fieldName: 'massagerType', label: 'Massager Type', type: 'select', required: true,
          options: ['Handheld', 'Neck', 'Foot', 'Full Body', 'Percussion'] },
        { fieldName: 'massagerPower', label: 'Power Source', type: 'select', required: false,
          options: ['Corded', 'Cordless', 'Both'] },
      ],
      filters: [
        { fieldName: 'massagerType', label: 'Massager Type', type: 'checkbox', required: false },
      ]
    },
    'Health & Beauty Services': {
      specifications: [
        { fieldName: 'beautyServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Hair Salon', 'Spa', 'Nail Salon', 'Skincare', 'Massage'] },
        { fieldName: 'serviceDuration', label: 'Service Duration', type: 'select', required: false,
          options: ['30 mins', '1 hour', '2 hours', 'Half day', 'Full day'] },
      ],
      filters: [
        { fieldName: 'beautyServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    }
  },

  // SERVICES SUBCATEGORIES
  'Services': {
    'Building & Trade Services': {
      specifications: [
        { fieldName: 'tradeServiceType', label: 'Trade Type', type: 'select', required: true,
          options: ['Plumbing', 'Electrical', 'Carpentry', 'Masonry', 'Painting', 'Welding'] },
        { fieldName: 'tradeExperience', label: 'Experience', type: 'select', required: false,
          options: ['< 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'] },
        { fieldName: 'tradeLicense', label: 'Licensed', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'tradeServiceType', label: 'Trade Type', type: 'checkbox', required: false },
        { fieldName: 'tradeExperience', label: 'Experience', type: 'checkbox', required: false },
      ]
    },
    'Car Services': {
      specifications: [
        { fieldName: 'carServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Mechanical Repair', 'Body Work', 'Car Wash', 'Oil Change', 'Tire Service', 'Electrical'] },
        { fieldName: 'carServiceSpecialization', label: 'Specialization', type: 'select', required: false,
          options: ['All Brands', 'Japanese', 'European', 'Korean', 'American'] },
        { fieldName: 'serviceWarranty', label: 'Warranty', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'carServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Computer & IT Services': {
      specifications: [
        { fieldName: 'itServiceType', label: 'IT Service Type', type: 'select', required: true,
          options: ['Repair', 'Software Installation', 'Network Setup', 'Data Recovery', 'Virus Removal'] },
        { fieldName: 'itSpecialization', label: 'Specialization', type: 'select', required: false,
          options: ['Hardware', 'Software', 'Networking', 'Security'] },
        { fieldName: 'itResponseTime', label: 'Response Time', type: 'select', required: false,
          options: ['Same Day', '24 Hours', '48 Hours', 'Scheduled'] },
      ],
      filters: [
        { fieldName: 'itServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Repair Services': {
      specifications: [
        { fieldName: 'repairServiceType', label: 'Item Type', type: 'select', required: true,
          options: ['Electronics', 'Appliances', 'Furniture', 'Jewelry', 'Clothing'] },
        { fieldName: 'repairSpecialization', label: 'Specialization', type: 'text', required: false },
        { fieldName: 'repairWarranty', label: 'Warranty Offered', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'repairServiceType', label: 'Item Type', type: 'checkbox', required: false },
      ]
    },
    'Cleaning Services': {
      specifications: [
        { fieldName: 'cleaningServiceType', label: 'Cleaning Type', type: 'select', required: true,
          options: ['Home Cleaning', 'Office Cleaning', 'Carpet Cleaning', 'Window Cleaning', 'Deep Cleaning'] },
        { fieldName: 'cleaningFrequency', label: 'Frequency', type: 'select', required: false,
          options: ['One-time', 'Weekly', 'Bi-weekly', 'Monthly'] },
        { fieldName: 'cleaningSupplies', label: 'Supplies Included', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'cleaningServiceType', label: 'Cleaning Type', type: 'checkbox', required: false },
      ]
    },
    'Printing Services': {
      specifications: [
        { fieldName: 'printingServiceType', label: 'Printing Type', type: 'select', required: true,
          options: ['Document', 'Photo', 'Banner', 'Business Cards', 'Large Format'] },
        { fieldName: 'printingColor', label: 'Color Option', type: 'select', required: false,
          options: ['Black & White', 'Color', 'Both'] },
        { fieldName: 'printingTurnaround', label: 'Turnaround Time', type: 'select', required: false,
          options: ['Same Day', '24 Hours', '2-3 Days'] },
      ],
      filters: [
        { fieldName: 'printingServiceType', label: 'Printing Type', type: 'checkbox', required: false },
      ]
    },
    'Manufacturing Services': {
      specifications: [
        { fieldName: 'manufacturingServiceType', label: 'Manufacturing Type', type: 'select', required: true,
          options: ['CNC Machining', '3D Printing', 'Injection Molding', 'Fabrication', 'Assembly'] },
        { fieldName: 'manufacturingMaterial', label: 'Material Specialization', type: 'text', required: false },
        { fieldName: 'manufacturingCapacity', label: 'Production Capacity', type: 'select', required: false,
          options: ['Prototype', 'Small Batch', 'Mass Production'] },
      ],
      filters: [
        { fieldName: 'manufacturingServiceType', label: 'Manufacturing Type', type: 'checkbox', required: false },
      ]
    },
    'Logistics Services': {
      specifications: [
        { fieldName: 'logisticsServiceType', label: 'Logistics Type', type: 'select', required: true,
          options: ['Delivery', 'Moving', 'Freight', 'Warehousing', 'Courier'] },
        { fieldName: 'logisticsArea', label: 'Service Area', type: 'text', required: false },
        { fieldName: 'logisticsVehicle', label: 'Vehicle Type', type: 'select', required: false,
          options: ['Motorcycle', 'Car', 'Van', 'Truck'] },
      ],
      filters: [
        { fieldName: 'logisticsServiceType', label: 'Logistics Type', type: 'checkbox', required: false },
      ]
    },
    'Legal Services': {
      specifications: [
        { fieldName: 'legalServiceType', label: 'Legal Service Type', type: 'select', required: true,
          options: ['Consultation', 'Document Review', 'Contract Drafting', 'Litigation', 'Corporate'] },
        { fieldName: 'legalSpecialization', label: 'Specialization', type: 'text', required: false },
        { fieldName: 'legalExperience', label: 'Years of Experience', type: 'select', required: false,
          options: ['< 5 years', '5-10 years', '10-20 years', '20+ years'] },
      ],
      filters: [
        { fieldName: 'legalServiceType', label: 'Legal Service Type', type: 'checkbox', required: false },
      ]
    },
    'Tax & Financial Services': {
      specifications: [
        { fieldName: 'financialServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Tax Preparation', 'Accounting', 'Bookkeeping', 'Financial Planning', 'Audit'] },
        { fieldName: 'financialSpecialization', label: 'Specialization', type: 'text', required: false },
        { fieldName: 'financialCertification', label: 'Certification', type: 'select', required: false,
          options: ['CPA', 'Chartered Accountant', 'Tax Consultant', 'None'] },
      ],
      filters: [
        { fieldName: 'financialServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Recruitment Services': {
      specifications: [
        { fieldName: 'recruitmentServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Permanent Placement', 'Temporary Staffing', 'Executive Search', 'Contract Hiring'] },
        { fieldName: 'recruitmentIndustry', label: 'Industry Specialization', type: 'text', required: false },
        { fieldName: 'recruitmentFee', label: 'Fee Structure', type: 'select', required: false,
          options: ['Contingency', 'Retained', 'Hybrid'] },
      ],
      filters: [
        { fieldName: 'recruitmentServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Rental Services': {
      specifications: [
        { fieldName: 'rentalServiceType', label: 'Rental Type', type: 'select', required: true,
          options: ['Equipment', 'Vehicle', 'Property', 'Event', 'Tools'] },
        { fieldName: 'rentalDuration', label: 'Rental Duration', type: 'select', required: false,
          options: ['Hourly', 'Daily', 'Weekly', 'Monthly'] },
        { fieldName: 'rentalDelivery', label: 'Delivery Available', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'rentalServiceType', label: 'Rental Type', type: 'checkbox', required: false },
      ]
    },
    'Chauffeur & Airport Transfer Services': {
      specifications: [
        { fieldName: 'chauffeurServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Airport Transfer', 'City Tour', 'Business Travel', 'Special Events'] },
        { fieldName: 'chauffeurVehicle', label: 'Vehicle Type', type: 'select', required: false,
          options: ['Sedan', 'SUV', 'Luxury', 'Van'] },
        { fieldName: 'chauffeurLanguage', label: 'Language', type: 'select', required: false,
          options: ['English', 'Local Language', 'Multiple'] },
      ],
      filters: [
        { fieldName: 'chauffeurServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Travel Agents & Tours': {
      specifications: [
        { fieldName: 'travelServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Tour Packages', 'Flight Booking', 'Hotel Reservation', 'Visa Assistance'] },
        { fieldName: 'travelDestination', label: 'Destination Specialization', type: 'text', required: false },
        { fieldName: 'travelGroupSize', label: 'Group Size', type: 'select', required: false,
          options: ['Individual', 'Small Group', 'Large Group', 'Corporate'] },
      ],
      filters: [
        { fieldName: 'travelServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Classes & Courses': {
      specifications: [
        { fieldName: 'classType', label: 'Class Type', type: 'select', required: true,
          options: ['Academic', 'Vocational', 'Language', 'Arts', 'Music', 'Sports'] },
        { fieldName: 'classLevel', label: 'Skill Level', type: 'select', required: false,
          options: ['Beginner', 'Intermediate', 'Advanced'] },
        { fieldName: 'classFormat', label: 'Format', type: 'select', required: false,
          options: ['In-person', 'Online', 'Hybrid'] },
      ],
      filters: [
        { fieldName: 'classType', label: 'Class Type', type: 'checkbox', required: false },
        { fieldName: 'classLevel', label: 'Skill Level', type: 'checkbox', required: false },
      ]
    },
    'Health & Beauty Services': {
      specifications: [
        { fieldName: 'healthBeautyServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Hair Salon', 'Spa', 'Nail Salon', 'Skincare', 'Massage'] },
        { fieldName: 'serviceDuration', label: 'Service Duration', type: 'select', required: false,
          options: ['30 mins', '1 hour', '2 hours', 'Half day', 'Full day'] },
        { fieldName: 'serviceGender', label: 'Gender Specialization', type: 'select', required: false,
          options: ['Men', 'Women', 'Both'] },
      ],
      filters: [
        { fieldName: 'healthBeautyServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Fitness & Personal Training': {
      specifications: [
        { fieldName: 'fitnessServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Personal Training', 'Group Classes', 'Yoga', 'Pilates', 'Strength Training'] },
        { fieldName: 'fitnessLocation', label: 'Location', type: 'select', required: false,
          options: ['Gym', 'Home', 'Outdoor', 'Online'] },
        { fieldName: 'fitnessCertification', label: 'Trainer Certification', type: 'select', required: false,
          options: ['Certified', 'Experienced', 'Specialized'] },
      ],
      filters: [
        { fieldName: 'fitnessServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Party, Catering & Event Services': {
      specifications: [
        { fieldName: 'eventServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Catering', 'Decoration', 'Entertainment', 'Planning', 'Venue'] },
        { fieldName: 'eventType', label: 'Event Type', type: 'select', required: false,
          options: ['Wedding', 'Birthday', 'Corporate', 'Social'] },
        { fieldName: 'eventCapacity', label: 'Event Size', type: 'select', required: false,
          options: ['Small (<50)', 'Medium (50-150)', 'Large (150+)'] },
      ],
      filters: [
        { fieldName: 'eventServiceType', label: 'Service Type', type: 'checkbox', required: false },
        { fieldName: 'eventType', label: 'Event Type', type: 'checkbox', required: false },
      ]
    },
    'DJ & Entertainment Services': {
      specifications: [
        { fieldName: 'entertainmentServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['DJ', 'Live Band', 'MC', 'Sound System', 'Lighting'] },
        { fieldName: 'entertainmentGenre', label: 'Music Genre', type: 'select', required: false,
          options: ['Popular', 'Traditional', 'Jazz', 'Rock', 'Mixed'] },
        { fieldName: 'entertainmentDuration', label: 'Performance Duration', type: 'select', required: false,
          options: ['2 hours', '4 hours', '6 hours', 'Full event'] },
      ],
      filters: [
        { fieldName: 'entertainmentServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Photography & Video Services': {
      specifications: [
        { fieldName: 'mediaServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Photography', 'Videography', 'Both', 'Editing'] },
        { fieldName: 'mediaSpecialization', label: 'Specialization', type: 'select', required: false,
          options: ['Wedding', 'Portrait', 'Event', 'Commercial'] },
        { fieldName: 'mediaDelivery', label: 'Delivery Time', type: 'select', required: false,
          options: ['Within 24 hours', '3-5 days', '1-2 weeks'] },
      ],
      filters: [
        { fieldName: 'mediaServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Landscaping & Gardening Services': {
      specifications: [
        { fieldName: 'landscapingServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Garden Design', 'Lawn Care', 'Tree Services', 'Irrigation', 'Maintenance'] },
        { fieldName: 'landscapingArea', label: 'Service Area Size', type: 'select', required: false,
          options: ['Small', 'Medium', 'Large', 'Commercial'] },
        { fieldName: 'landscapingFrequency', label: 'Service Frequency', type: 'select', required: false,
          options: ['One-time', 'Weekly', 'Bi-weekly', 'Monthly'] },
      ],
      filters: [
        { fieldName: 'landscapingServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Pet Services': {
      specifications: [
        { fieldName: 'petServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Grooming', 'Veterinary', 'Pet Sitting', 'Training', 'Boarding'] },
        { fieldName: 'petSpecialization', label: 'Animal Specialization', type: 'select', required: false,
          options: ['Dogs', 'Cats', 'Birds', 'All Pets'] },
        { fieldName: 'serviceLocation', label: 'Service Location', type: 'select', required: false,
          options: ['At Home', 'In Clinic', 'Mobile'] },
      ],
      filters: [
        { fieldName: 'petServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    }
  },

  // REPAIR & CONSTRUCTION SUBCATEGORIES
  'Repair & Construction': {
    'Electrical Equipment': {
      specifications: [
        { fieldName: 'electricalEquipmentType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Wires & Cables', 'Switches & Sockets', 'Circuit Breakers', 'Transformers', 'Tools'] },
        { fieldName: 'electricalVoltage', label: 'Voltage Rating', type: 'select', required: false,
          options: ['Low Voltage', 'Medium Voltage', 'High Voltage'] },
        { fieldName: 'electricalSafety', label: 'Safety Rating', type: 'select', required: false,
          options: ['Standard', 'Industrial', 'Weatherproof'] },
      ],
      filters: [
        { fieldName: 'electricalEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'electricalVoltage', label: 'Voltage Rating', type: 'checkbox', required: false },
      ]
    },
    'Building Materials & Supplies': {
      specifications: [
        { fieldName: 'buildingMaterialType', label: 'Material Type', type: 'select', required: true,
          options: ['Cement', 'Bricks', 'Sand', 'Steel', 'Wood', 'Blocks', 'Aggregates'] },
        { fieldName: 'materialGrade', label: 'Grade/Quality', type: 'select', required: false,
          options: ['Premium', 'Standard', 'Economy'] },
        { fieldName: 'materialQuantity', label: 'Quantity Unit', type: 'select', required: false,
          options: ['Bag', 'Piece', 'Ton', 'Cubic Meter'] },
      ],
      filters: [
        { fieldName: 'buildingMaterialType', label: 'Material Type', type: 'checkbox', required: false },
        { fieldName: 'materialGrade', label: 'Grade', type: 'checkbox', required: false },
      ]
    },
    'Plumbing & Water Systems': {
      specifications: [
        { fieldName: 'plumbingSystemType', label: 'Plumbing Type', type: 'select', required: true,
          options: ['Pipes', 'Fittings', 'Valves', 'Fixtures', 'Tools', 'Water Pumps'] },
        { fieldName: 'plumbingMaterial', label: 'Material', type: 'select', required: false,
          options: ['PVC', 'Copper', 'Galvanized', 'PEX', 'Brass'] },
        { fieldName: 'plumbingSize', label: 'Size/Diameter', type: 'text', required: false, unit: 'mm' },
      ],
      filters: [
        { fieldName: 'plumbingSystemType', label: 'Plumbing Type', type: 'checkbox', required: false },
        { fieldName: 'plumbingMaterial', label: 'Material', type: 'checkbox', required: false },
      ]
    },
    'Electrical Hand Tools': {
      specifications: [
        { fieldName: 'electricalToolType', label: 'Tool Type', type: 'select', required: true,
          options: ['Drills', 'Saws', 'Multimeters', 'Voltage Testers', 'Wire Strippers'] },
        { fieldName: 'toolPower', label: 'Power Source', type: 'select', required: false,
          options: ['Corded', 'Cordless', 'Manual'] },
        { fieldName: 'toolVoltage', label: 'Voltage', type: 'text', required: false, unit: 'V' },
      ],
      filters: [
        { fieldName: 'electricalToolType', label: 'Tool Type', type: 'checkbox', required: false },
        { fieldName: 'toolPower', label: 'Power Source', type: 'checkbox', required: false },
      ]
    },
    'Hand Tools': {
      specifications: [
        { fieldName: 'handToolType', label: 'Tool Type', type: 'select', required: true,
          options: ['Wrenches', 'Screwdrivers', 'Hammers', 'Pliers', 'Measuring Tools'] },
        { fieldName: 'handToolMaterial', label: 'Material', type: 'select', required: false,
          options: ['Steel', 'Aluminum', 'Fiberglass', 'Wood'] },
        { fieldName: 'handToolSize', label: 'Size', type: 'text', required: false },
      ],
      filters: [
        { fieldName: 'handToolType', label: 'Tool Type', type: 'checkbox', required: false },
        { fieldName: 'handToolMaterial', label: 'Material', type: 'checkbox', required: false },
      ]
    },
    'Measuring & Testing Tools': {
      specifications: [
        { fieldName: 'measuringToolType', label: 'Tool Type', type: 'select', required: true,
          options: ['Tape Measures', 'Levels', 'Calipers', 'Laser Measures', 'Thermometers'] },
        { fieldName: 'measuringAccuracy', label: 'Accuracy', type: 'text', required: false },
        { fieldName: 'measuringUnits', label: 'Measurement Units', type: 'select', required: false,
          options: ['Metric', 'Imperial', 'Both'] },
      ],
      filters: [
        { fieldName: 'measuringToolType', label: 'Tool Type', type: 'checkbox', required: false },
      ]
    },
    'Hardware & Fasteners': {
      specifications: [
        { fieldName: 'hardwareType', label: 'Hardware Type', type: 'select', required: true,
          options: ['Screws', 'Nails', 'Bolts', 'Anchors', 'Hinges', 'Locks'] },
        { fieldName: 'hardwareMaterial', label: 'Material', type: 'select', required: false,
          options: ['Steel', 'Stainless Steel', 'Brass', 'Aluminum'] },
        { fieldName: 'hardwareSize', label: 'Size', type: 'text', required: false },
      ],
      filters: [
        { fieldName: 'hardwareType', label: 'Hardware Type', type: 'checkbox', required: false },
        { fieldName: 'hardwareMaterial', label: 'Material', type: 'checkbox', required: false },
      ]
    },
    'Doors & Security': {
      specifications: [
        { fieldName: 'doorSecurityType', label: 'Product Type', type: 'select', required: true,
          options: ['Doors', 'Locks', 'Security Gates', 'Access Control', 'Safes'] },
        { fieldName: 'doorMaterial', label: 'Material', type: 'select', required: false,
          options: ['Wood', 'Metal', 'UPVC', 'Glass'] },
        { fieldName: 'securityLevel', label: 'Security Level', type: 'select', required: false,
          options: ['Standard', 'High Security', 'Commercial'] },
      ],
      filters: [
        { fieldName: 'doorSecurityType', label: 'Product Type', type: 'checkbox', required: false },
        { fieldName: 'securityLevel', label: 'Security Level', type: 'checkbox', required: false },
      ]
    },
    'Windows & Glass': {
      specifications: [
        { fieldName: 'windowGlassType', label: 'Product Type', type: 'select', required: true,
          options: ['Windows', 'Glass Panels', 'Mirrors', 'Skylights'] },
        { fieldName: 'windowMaterial', label: 'Material', type: 'select', required: false,
          options: ['Wood', 'Aluminum', 'UPVC', 'Steel'] },
        { fieldName: 'glassType', label: 'Glass Type', type: 'select', required: false,
          options: ['Clear', 'Tinted', 'Tempered', 'Laminated'] },
      ],
      filters: [
        { fieldName: 'windowGlassType', label: 'Product Type', type: 'checkbox', required: false },
        { fieldName: 'glassType', label: 'Glass Type', type: 'checkbox', required: false },
      ]
    },
    'Building & Trade Services': {
      specifications: [
        { fieldName: 'buildingServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Construction', 'Renovation', 'Repair', 'Installation', 'Maintenance'] },
        { fieldName: 'buildingSpecialization', label: 'Specialization', type: 'text', required: false },
        { fieldName: 'serviceWarranty', label: 'Warranty Offered', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'buildingServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Repair Services': {
      specifications: [
        { fieldName: 'constructionRepairType', label: 'Repair Type', type: 'select', required: true,
          options: ['Structural', 'Electrical', 'Plumbing', 'Finishing', 'Emergency'] },
        { fieldName: 'repairUrgency', label: 'Urgency', type: 'select', required: false,
          options: ['Routine', 'Urgent', 'Emergency'] },
        { fieldName: 'repairEstimate', label: 'Free Estimate', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'constructionRepairType', label: 'Repair Type', type: 'checkbox', required: false },
      ]
    }
  },

  // COMMERCIAL EQUIPMENT SUBCATEGORIES
  'Commercial Equipment': {
    'Medical Equipment & Supplies': {
      specifications: [
        { fieldName: 'medicalEquipmentType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Diagnostic', 'Therapeutic', 'Monitoring', 'Surgical', 'Laboratory'] },
        { fieldName: 'medicalCertification', label: 'Certification', type: 'select', required: false,
          options: ['FDA Approved', 'CE Certified', 'Local Certified', 'Uncertified'] },
        { fieldName: 'equipmentCondition', label: 'Condition', type: 'select', required: true,
          options: ['New', 'Refurbished', 'Used'] },
      ],
      filters: [
        { fieldName: 'medicalEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'equipmentCondition', label: 'Condition', type: 'checkbox', required: false },
      ]
    },
    'Manufacturing Equipment': {
      specifications: [
        { fieldName: 'manufacturingEquipmentType', label: 'Equipment Type', type: 'select', required: true,
          options: ['CNC Machines', '3D Printers', 'Injection Molding', 'Lathes', 'Presses'] },
        { fieldName: 'manufacturingCapacity', label: 'Production Capacity', type: 'text', required: false },
        { fieldName: 'equipmentAge', label: 'Equipment Age', type: 'select', required: false,
          options: ['< 1 year', '1-5 years', '5-10 years', '10+ years'] },
      ],
      filters: [
        { fieldName: 'manufacturingEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'equipmentAge', label: 'Age', type: 'checkbox', required: false },
      ]
    },
    'Retail & Store Equipment': {
      specifications: [
        { fieldName: 'retailEquipmentType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Cash Registers', 'Shelving', 'Display Cases', 'Shopping Carts', 'Security Systems'] },
        { fieldName: 'retailStoreType', label: 'Store Type', type: 'select', required: false,
          options: ['Supermarket', 'Boutique', 'Convenience', 'Department Store'] },
        { fieldName: 'equipmentCondition', label: 'Condition', type: 'select', required: true,
          options: ['New', 'Used', 'Refurbished'] },
      ],
      filters: [
        { fieldName: 'retailEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'equipmentCondition', label: 'Condition', type: 'checkbox', required: false },
      ]
    },
    'Restaurant & Catering Equipment': {
      specifications: [
        { fieldName: 'restaurantEquipmentType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Cooking', 'Refrigeration', 'Preparation', 'Serving', 'Storage'] },
        { fieldName: 'equipmentCapacity', label: 'Capacity', type: 'text', required: false },
        { fieldName: 'commercialGrade', label: 'Commercial Grade', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'restaurantEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'commercialGrade', label: 'Commercial Grade', type: 'checkbox', required: false },
      ]
    },
    'Stationery & Office Equipment': {
      specifications: [
        { fieldName: 'officeEquipmentType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Printers', 'Computers', 'Furniture', 'Phones', 'Storage'] },
        { fieldName: 'officeUsage', label: 'Usage Condition', type: 'select', required: false,
          options: ['Light', 'Medium', 'Heavy'] },
        { fieldName: 'officeCapacity', label: 'Office Size', type: 'select', required: false,
          options: ['Small Office', 'Medium Office', 'Large Office'] },
      ],
      filters: [
        { fieldName: 'officeEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'officeUsage', label: 'Usage Condition', type: 'checkbox', required: false },
      ]
    },
    'Salon & Beauty Equipment': {
      specifications: [
        { fieldName: 'salonEquipmentType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Hair Styling', 'Skin Care', 'Nail Care', 'Spa', 'Makeup'] },
        { fieldName: 'salonProfessional', label: 'Professional Grade', type: 'select', required: false,
          options: ['Yes', 'No'] },
        { fieldName: 'equipmentCondition', label: 'Condition', type: 'select', required: true,
          options: ['New', 'Used', 'Refurbished'] },
      ],
      filters: [
        { fieldName: 'salonEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'equipmentCondition', label: 'Condition', type: 'checkbox', required: false },
      ]
    },
    'Printing & Graphics Equipment': {
      specifications: [
        { fieldName: 'printingEquipmentType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Printers', 'Cutters', 'Laminators', 'Plotters', 'Presses'] },
        { fieldName: 'printingFormat', label: 'Print Format', type: 'select', required: false,
          options: ['Small Format', 'Large Format', 'Industrial'] },
        { fieldName: 'printingTechnology', label: 'Technology', type: 'select', required: false,
          options: ['Inkjet', 'Laser', 'Offset', 'Digital'] },
      ],
      filters: [
        { fieldName: 'printingEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'printingFormat', label: 'Print Format', type: 'checkbox', required: false },
      ]
    },
    'Stage & Event Equipment': {
      specifications: [
        { fieldName: 'stageEquipmentType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Lighting', 'Sound', 'Staging', 'Special Effects', 'Rigging'] },
        { fieldName: 'eventScale', label: 'Event Scale', type: 'select', required: false,
          options: ['Small', 'Medium', 'Large', 'Concert'] },
        { fieldName: 'equipmentRental', label: 'Available for Rental', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'stageEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'eventScale', label: 'Event Scale', type: 'checkbox', required: false },
      ]
    },
    'Manufacturing Services': {
      specifications: [
        { fieldName: 'manufacturingServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['CNC Machining', '3D Printing', 'Injection Molding', 'Fabrication', 'Assembly'] },
        { fieldName: 'manufacturingMaterial', label: 'Material Specialization', type: 'text', required: false },
        { fieldName: 'manufacturingCapacity', label: 'Production Capacity', type: 'select', required: false,
          options: ['Prototype', 'Small Batch', 'Mass Production'] },
      ],
      filters: [
        { fieldName: 'manufacturingServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    }
  },

  // LEISURE & ACTIVITIES SUBCATEGORIES
  'Leisure & Activities': {
    'Sports Equipment': {
      specifications: [
        { fieldName: 'sportsEquipmentType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Football', 'Basketball', 'Tennis', 'Swimming', 'Fitness', 'Outdoor'] },
        { fieldName: 'sportsLevel', label: 'Skill Level', type: 'select', required: false,
          options: ['Beginner', 'Intermediate', 'Advanced', 'Professional'] },
        { fieldName: 'sportsAge', label: 'Age Group', type: 'select', required: false,
          options: ['Kids', 'Youth', 'Adult', 'All Ages'] },
      ],
      filters: [
        { fieldName: 'sportsEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'sportsLevel', label: 'Skill Level', type: 'checkbox', required: false },
      ]
    },
    'Massagers': {
      specifications: [
        { fieldName: 'massagerType', label: 'Massager Type', type: 'select', required: true,
          options: ['Handheld', 'Neck', 'Foot', 'Full Body', 'Percussion'] },
        { fieldName: 'massagerPower', label: 'Power Source', type: 'select', required: false,
          options: ['Corded', 'Cordless', 'Both'] },
        { fieldName: 'massagerIntensity', label: 'Intensity Levels', type: 'select', required: false,
          options: ['Single', 'Multiple', 'Adjustable'] },
      ],
      filters: [
        { fieldName: 'massagerType', label: 'Massager Type', type: 'checkbox', required: false },
        { fieldName: 'massagerPower', label: 'Power Source', type: 'checkbox', required: false },
      ]
    },
    'Musical Instruments & Gear': {
      specifications: [
        { fieldName: 'instrumentType', label: 'Instrument Type', type: 'select', required: true,
          options: ['Guitar', 'Piano', 'Drums', 'Violin', 'Wind', 'Traditional'] },
        { fieldName: 'instrumentLevel', label: 'Skill Level', type: 'select', required: false,
          options: ['Beginner', 'Intermediate', 'Advanced', 'Professional'] },
        { fieldName: 'instrumentCondition', label: 'Condition', type: 'select', required: true,
          options: ['New', 'Used', 'Vintage'] },
      ],
      filters: [
        { fieldName: 'instrumentType', label: 'Instrument Type', type: 'checkbox', required: false },
        { fieldName: 'instrumentLevel', label: 'Skill Level', type: 'checkbox', required: false },
      ]
    },
    'Books & Table Games': {
      specifications: [
        { fieldName: 'bookGameType', label: 'Product Type', type: 'select', required: true,
          options: ['Books', 'Board Games', 'Card Games', 'Puzzles'] },
        { fieldName: 'bookGameGenre', label: 'Genre/Type', type: 'select', required: false,
          options: ['Fiction', 'Educational', 'Strategy', 'Family'] },
        { fieldName: 'playerAge', label: 'Age Range', type: 'select', required: false,
          options: ['Children', 'Teen', 'Adult', 'Family'] },
      ],
      filters: [
        { fieldName: 'bookGameType', label: 'Product Type', type: 'checkbox', required: false },
        { fieldName: 'bookGameGenre', label: 'Genre/Type', type: 'checkbox', required: false },
      ]
    },
    'Arts, Crafts & Awards': {
      specifications: [
        { fieldName: 'artCraftType', label: 'Product Type', type: 'select', required: true,
          options: ['Art Supplies', 'Craft Materials', 'Trophies', 'Frames'] },
        { fieldName: 'artSkillLevel', label: 'Skill Level', type: 'select', required: false,
          options: ['Beginner', 'Intermediate', 'Advanced'] },
        { fieldName: 'artMaterial', label: 'Material Type', type: 'text', required: false },
      ],
      filters: [
        { fieldName: 'artCraftType', label: 'Product Type', type: 'checkbox', required: false },
        { fieldName: 'artSkillLevel', label: 'Skill Level', type: 'checkbox', required: false },
      ]
    },
    'Outdoor Gear': {
      specifications: [
        { fieldName: 'outdoorGearType', label: 'Gear Type', type: 'select', required: true,
          options: ['Camping', 'Hiking', 'Fishing', 'Cycling', 'Water Sports'] },
        { fieldName: 'outdoorActivity', label: 'Activity Type', type: 'select', required: false,
          options: ['Recreational', 'Professional', 'Extreme'] },
        { fieldName: 'weatherResistance', label: 'Weather Resistance', type: 'select', required: false,
          options: ['Waterproof', 'Water Resistant', 'Standard'] },
      ],
      filters: [
        { fieldName: 'outdoorGearType', label: 'Gear Type', type: 'checkbox', required: false },
        { fieldName: 'outdoorActivity', label: 'Activity Type', type: 'checkbox', required: false },
      ]
    },
    'Music & Video': {
      specifications: [
        { fieldName: 'mediaType', label: 'Media Type', type: 'select', required: true,
          options: ['CDs', 'DVDs', 'Vinyl', 'Blu-ray', 'Digital'] },
        { fieldName: 'mediaGenre', label: 'Genre', type: 'select', required: false,
          options: ['Pop', 'Rock', 'Classical', 'Movie', 'Documentary'] },
        { fieldName: 'mediaFormat', label: 'Format', type: 'select', required: false,
          options: ['Audio', 'Video', 'Both'] },
      ],
      filters: [
        { fieldName: 'mediaType', label: 'Media Type', type: 'checkbox', required: false },
        { fieldName: 'mediaGenre', label: 'Genre', type: 'checkbox', required: false },
      ]
    },
    'Fitness & Personal Training': {
      specifications: [
        { fieldName: 'fitnessActivityType', label: 'Activity Type', type: 'select', required: true,
          options: ['Personal Training', 'Group Classes', 'Yoga', 'Pilates', 'Strength Training'] },
        { fieldName: 'fitnessLocation', label: 'Location', type: 'select', required: false,
          options: ['Gym', 'Home', 'Outdoor', 'Online'] },
        { fieldName: 'fitnessCertification', label: 'Trainer Certification', type: 'select', required: false,
          options: ['Certified', 'Experienced', 'Specialized'] },
      ],
      filters: [
        { fieldName: 'fitnessActivityType', label: 'Activity Type', type: 'checkbox', required: false },
      ]
    }
  },

  // BABIES & KIDS SUBCATEGORIES
  'Babies & Kids': {
    'Toys, Games & Bikes': {
      specifications: [
        { fieldName: 'toyType', label: 'Toy Type', type: 'select', required: true,
          options: ['Action Figures', 'Dolls', 'Educational', 'Outdoor', 'Electronic', 'Bikes'] },
        { fieldName: 'toyAge', label: 'Age Range', type: 'select', required: true,
          options: ['0-1 year', '1-3 years', '3-5 years', '5-8 years', '8-12 years'] },
        { fieldName: 'toySafety', label: 'Safety Standard', type: 'select', required: false,
          options: ['Certified', 'Standard', 'Not Specified'] },
      ],
      filters: [
        { fieldName: 'toyType', label: 'Toy Type', type: 'checkbox', required: false },
        { fieldName: 'toyAge', label: 'Age Range', type: 'checkbox', required: false },
      ]
    },
    "Children's Furniture": {
      specifications: [
        { fieldName: 'kidsFurnitureType', label: 'Furniture Type', type: 'select', required: true,
          options: ['Beds', 'Desks', 'Chairs', 'Storage', 'Play Furniture'] },
        { fieldName: 'kidsFurnitureAge', label: 'Age Range', type: 'select', required: false,
          options: ['Infant', 'Toddler', 'Child', 'Teen'] },
        { fieldName: 'furnitureMaterial', label: 'Material', type: 'select', required: false,
          options: ['Wood', 'Plastic', 'Metal', 'Fabric'] },
      ],
      filters: [
        { fieldName: 'kidsFurnitureType', label: 'Furniture Type', type: 'checkbox', required: false },
        { fieldName: 'kidsFurnitureAge', label: 'Age Range', type: 'checkbox', required: false },
      ]
    },
    "Children's Clothing": {
      specifications: [
        { fieldName: 'kidsClothingType', label: 'Clothing Type', type: 'select', required: true,
          options: ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Sleepwear', 'School Uniform'] },
        { fieldName: 'kidsSize', label: 'Size', type: 'select', required: true,
          options: ['Newborn', '0-3M', '3-6M', '6-12M', '12-18M', '18-24M', '2T', '3T', '4T', '5T', '6-7', '8-9', '10-12'] },
        { fieldName: 'kidsGender', label: 'Gender', type: 'select', required: false,
          options: ['Boys', 'Girls', 'Unisex'] },
      ],
      filters: [
        { fieldName: 'kidsClothingType', label: 'Clothing Type', type: 'checkbox', required: false },
        { fieldName: 'kidsSize', label: 'Size', type: 'checkbox', required: false },
        { fieldName: 'kidsGender', label: 'Gender', type: 'checkbox', required: false },
      ]
    },
    "Children's Shoes": {
      specifications: [
        { fieldName: 'kidsShoeType', label: 'Shoe Type', type: 'select', required: true,
          options: ['Sneakers', 'Sandals', 'Formal', 'Boots', 'Sports'] },
        { fieldName: 'kidsShoeSize', label: 'Shoe Size', type: 'select', required: true,
          options: ['Infant', 'Toddler', 'Child', 'Youth'] },
        { fieldName: 'shoeMaterial', label: 'Material', type: 'select', required: false,
          options: ['Leather', 'Canvas', 'Synthetic', 'Rubber'] },
      ],
      filters: [
        { fieldName: 'kidsShoeType', label: 'Shoe Type', type: 'checkbox', required: false },
        { fieldName: 'kidsShoeSize', label: 'Shoe Size', type: 'checkbox', required: false },
      ]
    },
    "Babies & Kids Accessories": {
      specifications: [
        { fieldName: 'kidsAccessoryType', label: 'Accessory Type', type: 'select', required: true,
          options: ['Bags', 'Jewelry', 'Hair Accessories', 'Watches', 'Sunglasses'] },
        { fieldName: 'accessoryAge', label: 'Age Range', type: 'select', required: false,
          options: ['Infant', 'Toddler', 'Child', 'Teen'] },
        { fieldName: 'accessoryMaterial', label: 'Material', type: 'select', required: false,
          options: ['Plastic', 'Fabric', 'Metal', 'Wood'] },
      ],
      filters: [
        { fieldName: 'kidsAccessoryType', label: 'Accessory Type', type: 'checkbox', required: false },
        { fieldName: 'accessoryAge', label: 'Age Range', type: 'checkbox', required: false },
      ]
    },
    "Baby Gear & Equipment": {
      specifications: [
        { fieldName: 'babyGearType', label: 'Gear Type', type: 'select', required: true,
          options: ['Strollers', 'Car Seats', 'Carriers', 'High Chairs', 'Playpens', 'Walkers'] },
        { fieldName: 'babyGearAge', label: 'Age Range', type: 'select', required: true,
          options: ['0-6 months', '6-12 months', '1-2 years', '2-3 years'] },
        { fieldName: 'gearSafety', label: 'Safety Certified', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'babyGearType', label: 'Gear Type', type: 'checkbox', required: false },
        { fieldName: 'babyGearAge', label: 'Age Range', type: 'checkbox', required: false },
      ]
    },
    "Care & Feeding": {
      specifications: [
        { fieldName: 'careFeedingType', label: 'Product Type', type: 'select', required: true,
          options: ['Feeding', 'Diapering', 'Bathing', 'Health', 'Nursing'] },
        { fieldName: 'careAge', label: 'Age Range', type: 'select', required: false,
          options: ['Newborn', 'Infant', 'Toddler'] },
        { fieldName: 'careMaterial', label: 'Material', type: 'select', required: false,
          options: ['Plastic', 'Silicone', 'Glass', 'Fabric'] },
      ],
      filters: [
        { fieldName: 'careFeedingType', label: 'Product Type', type: 'checkbox', required: false },
        { fieldName: 'careAge', label: 'Age Range', type: 'checkbox', required: false },
      ]
    },
    "Maternity & Pregnancy": {
      specifications: [
        { fieldName: 'maternityType', label: 'Product Type', type: 'select', required: true,
          options: ['Clothing', 'Support', 'Health', 'Nursing', 'Postpartum'] },
        { fieldName: 'maternityStage', label: 'Pregnancy Stage', type: 'select', required: false,
          options: ['First Trimester', 'Second Trimester', 'Third Trimester', 'Postpartum'] },
        { fieldName: 'maternitySize', label: 'Size', type: 'select', required: false,
          options: ['S', 'M', 'L', 'XL', 'XXL'] },
      ],
      filters: [
        { fieldName: 'maternityType', label: 'Product Type', type: 'checkbox', required: false },
        { fieldName: 'maternityStage', label: 'Pregnancy Stage', type: 'checkbox', required: false },
      ]
    },
    "Transport & Safety": {
      specifications: [
        { fieldName: 'transportSafetyType', label: 'Product Type', type: 'select', required: true,
          options: ['Car Seats', 'Strollers', 'Baby Carriers', 'Safety Gates', 'Monitors'] },
        { fieldName: 'safetyAge', label: 'Age Range', type: 'select', required: false,
          options: ['Newborn', 'Infant', 'Toddler', 'Child'] },
        { fieldName: 'safetyCertification', label: 'Safety Certified', type: 'select', required: false,
          options: ['Yes', 'No'] },
      ],
      filters: [
        { fieldName: 'transportSafetyType', label: 'Product Type', type: 'checkbox', required: false },
        { fieldName: 'safetyAge', label: 'Age Range', type: 'checkbox', required: false },
      ]
    },
    "Playground Equipment": {
      specifications: [
        { fieldName: 'playgroundType', label: 'Equipment Type', type: 'select', required: true,
          options: ['Swings', 'Slides', 'Climbing', 'Play Houses', 'Trampolines'] },
        { fieldName: 'playgroundAge', label: 'Age Range', type: 'select', required: false,
          options: ['Toddler', 'Preschool', 'School Age'] },
        { fieldName: 'playgroundMaterial', label: 'Material', type: 'select', required: false,
          options: ['Plastic', 'Metal', 'Wood', 'Combination'] },
      ],
      filters: [
        { fieldName: 'playgroundType', label: 'Equipment Type', type: 'checkbox', required: false },
        { fieldName: 'playgroundAge', label: 'Age Range', type: 'checkbox', required: false },
      ]
    },
    "Child Care & Education": {
      specifications: [
        { fieldName: 'childcareType', label: 'Service Type', type: 'select', required: true,
          options: ['Daycare', 'Preschool', 'Tutoring', 'Babysitting', 'Activities'] },
        { fieldName: 'childcareAge', label: 'Age Group', type: 'select', required: false,
          options: ['Infant', 'Toddler', 'Preschool', 'School Age'] },
        { fieldName: 'childcareHours', label: 'Operating Hours', type: 'select', required: false,
          options: ['Full Day', 'Half Day', 'Extended', 'Flexible'] },
      ],
      filters: [
        { fieldName: 'childcareType', label: 'Service Type', type: 'checkbox', required: false },
        { fieldName: 'childcareAge', label: 'Age Group', type: 'checkbox', required: false },
      ]
    }
  },

  // FOOD, AGRICULTURE & FARMING SUBCATEGORIES
  'Food, Agriculture & Farming': {
    'Food & Beverages': {
      specifications: [
        { fieldName: 'foodBeverageType', label: 'Product Type', type: 'select', required: true,
          options: ['Fresh Produce', 'Packaged Food', 'Beverages', 'Dairy', 'Meat'] },
        { fieldName: 'foodStorage', label: 'Storage', type: 'select', required: false,
          options: ['Room Temp', 'Refrigerated', 'Frozen', 'Dry'] },
        { fieldName: 'foodExpiry', label: 'Shelf Life', type: 'text', required: false },
      ],
      filters: [
        { fieldName: 'foodBeverageType', label: 'Product Type', type: 'checkbox', required: false },
        { fieldName: 'foodStorage', label: 'Storage', type: 'checkbox', required: false },
      ]
    },
    'Farm Animals': {
      specifications: [
        { fieldName: 'farmAnimalType', label: 'Animal Type', type: 'select', required: true,
          options: ['Cattle', 'Poultry', 'Sheep', 'Goats', 'Pigs', 'Other'] },
        { fieldName: 'animalAge', label: 'Age', type: 'select', required: false,
          options: ['Young', 'Adult', 'Senior'] },
        { fieldName: 'animalPurpose', label: 'Purpose', type: 'select', required: false,
          options: ['Meat', 'Dairy', 'Breeding', 'Pets'] },
      ],
      filters: [
        { fieldName: 'farmAnimalType', label: 'Animal Type', type: 'checkbox', required: false },
        { fieldName: 'animalAge', label: 'Age', type: 'checkbox', required: false },
      ]
    },
    'Feeds, Supplements & Seeds': {
      specifications: [
        { fieldName: 'farmSupplyType', label: 'Supply Type', type: 'select', required: true,
          options: ['Animal Feed', 'Supplements', 'Seeds', 'Fertilizers', 'Pesticides'] },
        { fieldName: 'supplyQuantity', label: 'Quantity Unit', type: 'select', required: false,
          options: ['Bag', 'Kilogram', 'Liter', 'Piece'] },
        { fieldName: 'supplyUsage', label: 'Usage', type: 'text', required: false },
      ],
      filters: [
        { fieldName: 'farmSupplyType', label: 'Supply Type', type: 'checkbox', required: false },
      ]
    },
    'Farm Machinery & Equipment': {
      specifications: [
        { fieldName: 'farmMachineryType', label: 'Machinery Type', type: 'select', required: true,
          options: ['Tractors', 'Harvesters', 'Irrigation', 'Processing', 'Storage'] },
        { fieldName: 'machineryPower', label: 'Power Source', type: 'select', required: false,
          options: ['Manual', 'Electric', 'Diesel', 'Solar'] },
        { fieldName: 'machineryCondition', label: 'Condition', type: 'select', required: true,
          options: ['New', 'Used', 'Refurbished'] },
      ],
      filters: [
        { fieldName: 'farmMachineryType', label: 'Machinery Type', type: 'checkbox', required: false },
        { fieldName: 'machineryCondition', label: 'Condition', type: 'checkbox', required: false },
      ]
    },
    'Farm Animal Feed & Supplies': {
      specifications: [
        { fieldName: 'animalFeedType', label: 'Feed Type', type: 'select', required: true,
          options: ['Concentrates', 'Forage', 'Supplements', 'Medicated'] },
        { fieldName: 'feedAnimal', label: 'For Animal', type: 'select', required: false,
          options: ['Cattle', 'Poultry', 'Sheep', 'Goats', 'All'] },
        { fieldName: 'feedPackaging', label: 'Packaging', type: 'select', required: false,
          options: ['Bag', 'Bulk', 'Custom'] },
      ],
      filters: [
        { fieldName: 'animalFeedType', label: 'Feed Type', type: 'checkbox', required: false },
        { fieldName: 'feedAnimal', label: 'For Animal', type: 'checkbox', required: false },
      ]
    }
  },

  // ANIMALS & PETS SUBCATEGORIES
  'Animals & Pets': {
    'Pet Accessories': {
      specifications: [
        { fieldName: 'petAccessoryType', label: 'Accessory Type', type: 'select', required: true,
          options: ['Food & Water Bowls', 'Collars & Leashes', 'Beds & Furniture', 'Toys', 'Grooming', 'Clothing'] },
        { fieldName: 'petAnimalType', label: 'For Animal', type: 'select', required: true,
          options: ['Dogs', 'Cats', 'Birds', 'Fish', 'Small Animals'] },
        { fieldName: 'accessorySize', label: 'Size', type: 'select', required: false,
          options: ['Small', 'Medium', 'Large', 'X-Large'] },
      ],
      filters: [
        { fieldName: 'petAccessoryType', label: 'Accessory Type', type: 'checkbox', required: false },
        { fieldName: 'petAnimalType', label: 'For Animal', type: 'checkbox', required: false },
      ]
    },
    'Cats & Kittens': {
      specifications: [
        { fieldName: 'catBreed', label: 'Breed', type: 'select', required: false,
          options: ['Domestic Shorthair', 'Siamese', 'Persian', 'Maine Coon', 'Mixed Breed', 'Other'] },
        { fieldName: 'catAge', label: 'Age', type: 'select', required: true,
          options: ['Kitten (<1 year)', 'Young (1-3 years)', 'Adult (3-8 years)', 'Senior (8+ years)'] },
        { fieldName: 'catGender', label: 'Gender', type: 'select', required: true,
          options: ['Male', 'Female'] },
        { fieldName: 'catVaccinated', label: 'Vaccinated', type: 'select', required: false,
          options: ['Yes', 'No', 'Partially'] },
      ],
      filters: [
        { fieldName: 'catBreed', label: 'Breed', type: 'checkbox', required: false },
        { fieldName: 'catAge', label: 'Age', type: 'checkbox', required: false },
        { fieldName: 'catGender', label: 'Gender', type: 'checkbox', required: false },
      ]
    },
    'Dogs & Puppies': {
      specifications: [
        { fieldName: 'dogBreed', label: 'Breed', type: 'select', required: false,
          options: ['Local Breed', 'German Shepherd', 'Labrador', 'Pitbull', 'Mixed Breed', 'Other'] },
        { fieldName: 'dogAge', label: 'Age', type: 'select', required: true,
          options: ['Puppy (<1 year)', 'Young (1-3 years)', 'Adult (3-8 years)', 'Senior (8+ years)'] },
        { fieldName: 'dogGender', label: 'Gender', type: 'select', required: true,
          options: ['Male', 'Female'] },
        { fieldName: 'dogVaccinated', label: 'Vaccinated', type: 'select', required: false,
          options: ['Yes', 'No', 'Partially'] },
      ],
      filters: [
        { fieldName: 'dogBreed', label: 'Breed', type: 'checkbox', required: false },
        { fieldName: 'dogAge', label: 'Age', type: 'checkbox', required: false },
        { fieldName: 'dogGender', label: 'Gender', type: 'checkbox', required: false },
      ]
    },
    'Fish': {
      specifications: [
        { fieldName: 'fishType', label: 'Fish Type', type: 'select', required: true,
          options: ['Freshwater', 'Saltwater', 'Tropical', 'Coldwater'] },
        { fieldName: 'fishSize', label: 'Size', type: 'select', required: false,
          options: ['Small', 'Medium', 'Large'] },
        { fieldName: 'aquariumCompatibility', label: 'Aquarium Type', type: 'select', required: false,
          options: ['Community', 'Aggressive', 'Species Only'] },
      ],
      filters: [
        { fieldName: 'fishType', label: 'Fish Type', type: 'checkbox', required: false },
        { fieldName: 'fishSize', label: 'Size', type: 'checkbox', required: false },
      ]
    },
    'Birds': {
      specifications: [
        { fieldName: 'birdType', label: 'Bird Type', type: 'select', required: true,
          options: ['Parrots', 'Canaries', 'Finches', 'Pigeons', 'Poultry', 'Other'] },
        { fieldName: 'birdAge', label: 'Age', type: 'select', required: false,
          options: ['Young', 'Adult', 'Mature'] },
        { fieldName: 'birdTalking', label: 'Talking Ability', type: 'select', required: false,
          options: ['Yes', 'No', 'Learning'] },
      ],
      filters: [
        { fieldName: 'birdType', label: 'Bird Type', type: 'checkbox', required: false },
        { fieldName: 'birdAge', label: 'Age', type: 'checkbox', required: false },
      ]
    },
    'Pet Services': {
      specifications: [
        { fieldName: 'petServiceType', label: 'Service Type', type: 'select', required: true,
          options: ['Grooming', 'Veterinary', 'Pet Sitting', 'Training', 'Boarding'] },
        { fieldName: 'petSpecialization', label: 'Animal Specialization', type: 'select', required: false,
          options: ['Dogs', 'Cats', 'Birds', 'All Pets'] },
        { fieldName: 'serviceLocation', label: 'Service Location', type: 'select', required: false,
          options: ['At Home', 'In Clinic', 'Mobile'] },
      ],
      filters: [
        { fieldName: 'petServiceType', label: 'Service Type', type: 'checkbox', required: false },
      ]
    },
    'Other Animals': {
      specifications: [
        { fieldName: 'otherAnimalType', label: 'Animal Type', type: 'select', required: true,
          options: ['Reptiles', 'Small Mammals', 'Insects', 'Amphibians', 'Other'] },
        { fieldName: 'animalHabitat', label: 'Habitat Type', type: 'select', required: false,
          options: ['Terrarium', 'Aquarium', 'Cage', 'Free Range'] },
        { fieldName: 'animalDiet', label: 'Diet Type', type: 'select', required: false,
          options: ['Herbivore', 'Carnivore', 'Omnivore', 'Specialized'] },
      ],
      filters: [
        { fieldName: 'otherAnimalType', label: 'Animal Type', type: 'checkbox', required: false },
      ]
    }
  }
}

// Main category configurations - COMPLETE WITH ALL CATEGORIES
export const categoryConfigs: { [key: string]: CategoryConfig } = {
  'Electronics': {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    subcategories: [
      'Phones', 'Laptops & Computers', 'Video Game Consoles', 'Audio & Music Equipment', 
      'Headphones', 'Photo & Video Cameras', 'Security & Surveillance', 'Networking Products',
      'Printers & Scanners', 'Computer Monitors', 'Computer Hardware', 'Computer Accessories',
      'Electronic Accessories & Supplies', 'Video Games', 'Software'
    ],
    specifications: [
      { fieldName: 'electronicsBrand', label: 'Brand', type: 'select', required: true, 
        options: ['Samsung', 'Apple', 'Tecno', 'Infinix', 'Xiaomi', 'Oppo', 'Vivo', 'Huawei', 'Nokia', 'Google', 'OnePlus', 'Realme', 'Motorola', 'LG', 'Sony', 'Asus', 'Lenovo', 'HTC', 'Honor', 'ZTE', 'Dell', 'HP', 'Canon', 'Nikon', 'Other'] },
      { fieldName: 'electronicsModel', label: 'Model', type: 'text', required: true },
      { fieldName: 'electronicsCondition', label: 'Condition', type: 'select', required: true,
        options: ['Brand New', 'Refurbished', 'Used'] },
      { fieldName: 'electronicsColor', label: 'Color', type: 'select', required: false,
        options: ['Black', 'White', 'Blue', 'Red', 'Green', 'Silver', 'Gold', 'Gray', 'Other'] },
    ],
    filters: [
      { fieldName: 'electronicsBrand', label: 'Brand', type: 'checkbox', required: false },
      { fieldName: 'electronicsCondition', label: 'Condition', type: 'checkbox', required: false },
      { fieldName: 'price', label: 'Price', type: 'range', required: false, min: 0, max: 500000 },
      { fieldName: 'electronicsColor', label: 'Color', type: 'checkbox', required: false },
    ]
  },

  'Vehicles': {
    id: 'vehicles',
    name: 'Vehicles',
    slug: 'vehicles',
    subcategories: [
      'Vehicle Parts & Accessories', 'Cars', 'Motorcycles & Scooters', 'Buses & Microbuses',
      'Trucks & Trailers', 'Construction & Heavy Machinery', 'Watercraft & Boats', 'Car Services'
    ],
    specifications: [
      { fieldName: 'vehiclesBrand', label: 'Brand', type: 'select', required: true,
        options: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Hyundai', 'Nissan', 'Kia', 'Other'] },
      { fieldName: 'vehiclesModel', label: 'Model', type: 'text', required: true },
      { fieldName: 'vehiclesYear', label: 'Year', type: 'number', required: true, min: 1990, max: 2024 },
      { fieldName: 'vehiclesCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used', 'Reconditioned'] },
      { fieldName: 'vehiclesFuelType', label: 'Fuel Type', type: 'select', required: true,
        options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
    ],
    filters: [
      { fieldName: 'vehiclesBrand', label: 'Brand', type: 'checkbox', required: false },
      { fieldName: 'vehiclesYear', label: 'Year', type: 'range', required: false, min: 1990, max: 2024 },
      { fieldName: 'vehiclesCondition', label: 'Condition', type: 'checkbox', required: false },
      { fieldName: 'vehiclesFuelType', label: 'Fuel Type', type: 'checkbox', required: false },
    ]
  },

  'Property': {
    id: 'property',
    name: 'Property',
    slug: 'property',
    subcategories: [
      'New Builds', 'Houses & Apartments for Rent', 'Houses & Apartments for Sale', 
      'Land & Plots for Rent', 'Short Let', 'Land & Plots for Sale',
      'Event Centres, Venues & Workstations', 'Commercial Property for Rent', 
      'Commercial Property for Sale'
    ],
    specifications: [
      { fieldName: 'propertyLocation', label: 'Location', type: 'text', required: true },
      { fieldName: 'propertySize', label: 'Size', type: 'text', required: false, unit: 'm²' },
      { fieldName: 'propertyPriceType', label: 'Price Type', type: 'select', required: true,
        options: ['For Sale', 'For Rent', 'Lease', 'Auction'] },
      { fieldName: 'propertyStatus', label: 'Property Status', type: 'select', required: false,
        options: ['Ready to Move', 'Under Construction', 'Off Plan'] },
    ],
    filters: [
      { fieldName: 'propertyPriceType', label: 'Price Type', type: 'checkbox', required: false },
      { fieldName: 'propertyStatus', label: 'Status', type: 'checkbox', required: false },
      { fieldName: 'price', label: 'Price', type: 'range', required: false, min: 0, max: 100000000 },
    ]
  },

  'Home, Furniture & Appliances': {
    id: 'home-furniture-appliances',
    name: 'Home, Furniture & Appliances',
    slug: 'home-furniture-appliances',
    subcategories: [
      'Furniture', 'Lighting', 'Storage & Organization', 'Home Accessories',
      'Kitchen Appliances', 'Kitchenware & Cookware', 'Household Chemicals', 'Garden Supplies'
    ],
    specifications: [
      { fieldName: 'homeCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] },
      { fieldName: 'homeColor', label: 'Color', type: 'select', required: false,
        options: ['Black', 'White', 'Brown', 'Gray', 'Blue', 'Green', 'Red', 'Other'] },
      { fieldName: 'homeMaterial', label: 'Material', type: 'select', required: false,
        options: ['Wood', 'Metal', 'Plastic', 'Glass', 'Fabric', 'Mixed'] },
    ],
    filters: [
      { fieldName: 'homeCondition', label: 'Condition', type: 'checkbox', required: false },
      { fieldName: 'homeColor', label: 'Color', type: 'checkbox', required: false },
      { fieldName: 'homeMaterial', label: 'Material', type: 'checkbox', required: false },
    ]
  },

  'Fashion': {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    subcategories: [
      "Women's Fashion", "Men's Fashion", "Baby & Kids Fashion"
    ],
    specifications: [
      { fieldName: 'fashionBrand', label: 'Brand', type: 'select', required: false,
        options: ['Nike', 'Adidas', 'Local Brand', 'International', 'Other'] },
      { fieldName: 'fashionCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
      { fieldName: 'fashionMaterial', label: 'Material', type: 'select', required: false,
        options: ['Cotton', 'Polyester', 'Silk', 'Wool', 'Denim', 'Linen', 'Leather', 'Spandex', 'Mixed'] },
    ],
    filters: [
      { fieldName: 'fashionBrand', label: 'Brand', type: 'checkbox', required: false },
      { fieldName: 'fashionCondition', label: 'Condition', type: 'checkbox', required: false },
      { fieldName: 'fashionMaterial', label: 'Material', type: 'checkbox', required: false },
    ]
  },

  'Beauty & Personal Care': {
    id: 'beauty-personal-care',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    subcategories: [
      'Hair Care & Beauty', 'Face Care', 'Oral Care', 'Body Care', 'Fragrances',
      'Makeup', 'Tools & Accessories', 'Vitamins & Supplements', 'Massagers',
      'Health & Beauty Services'
    ],
    specifications: [
      { fieldName: 'beautyBrand', label: 'Brand', type: 'select', required: false,
        options: ['L\'Oreal', 'Maybelline', 'Nivea', 'Dove', 'Local Brand', 'International'] },
      { fieldName: 'beautyCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Lightly', 'Used'] },
      { fieldName: 'beautySize', label: 'Size', type: 'select', required: false,
        options: ['Travel Size', 'Regular', 'Large', 'Jumbo'] },
    ],
    filters: [
      { fieldName: 'beautyBrand', label: 'Brand', type: 'checkbox', required: false },
      { fieldName: 'beautyCondition', label: 'Condition', type: 'checkbox', required: false },
      { fieldName: 'beautySize', label: 'Size', type: 'checkbox', required: false },
    ]
  },
'Clothing': {
  id: 'clothing',
  name: 'Clothing',
  slug: 'clothing',
  subcategories: ['Men', 'Women', 'Kids', 'Baby', 'Shoes', 'Accessories'],
  specifications: [
    { fieldName: 'clothingBrand', label: 'Brand', type: 'select', required: false,
      options: ['Local Brand', 'International', 'Nike', 'Adidas', 'H&M', 'Zara', 'Other'] },
    { fieldName: 'clothingCondition', label: 'Condition', type: 'select', required: true,
      options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
    { fieldName: 'clothingMaterial', label: 'Material', type: 'select', required: false,
      options: ['Cotton', 'Polyester', 'Linen', 'Wool', 'Denim', 'Silk', 'Leather', 'Mixed'] },
  ],
  filters: [
    { fieldName: 'clothingBrand', label: 'Brand', type: 'checkbox', required: false },
    { fieldName: 'clothingCondition', label: 'Condition', type: 'checkbox', required: false },
    { fieldName: 'clothingMaterial', label: 'Material', type: 'checkbox', required: false },
  ]
},

'Books & Media': {
  id: 'books-media',
  name: 'Books & Media',
  slug: 'books-media',
  subcategories: ['Fiction', 'Non-Fiction', 'Children', 'Educational', 'Audio Books'],
  specifications: [
    { fieldName: 'mediaType', label: 'Media Type', type: 'select', required: true,
      options: ['Book', 'Audio Book', 'E-book', 'Magazine', 'Newspaper'] },
    { fieldName: 'mediaLanguage', label: 'Language', type: 'select', required: true,
      options: ['English', 'Amharic', 'Oromo', 'Tigrinya', 'Other'] },
    { fieldName: 'mediaCondition', label: 'Condition', type: 'select', required: true,
      options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
  ],
  filters: [
    { fieldName: 'mediaType', label: 'Media Type', type: 'checkbox', required: false },
    { fieldName: 'mediaLanguage', label: 'Language', type: 'checkbox', required: false },
    { fieldName: 'mediaCondition', label: 'Condition', type: 'checkbox', required: false },
  ]
},

'Automotive': {
  id: 'automotive',
  name: 'Automotive',
  slug: 'automotive',
  subcategories: ['Car Care', 'Tools', 'Accessories', 'Parts', 'Motorcycle'],
  specifications: [
    { fieldName: 'autoBrand', label: 'Brand', type: 'text', required: false },
    { fieldName: 'autoCondition', label: 'Condition', type: 'select', required: true,
      options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair', 'Refurbished'] },
    { fieldName: 'autoCompatibility', label: 'Vehicle Compatibility', type: 'text', required: false },
  ],
  filters: [
    { fieldName: 'autoCondition', label: 'Condition', type: 'checkbox', required: false },
  ]
},
// Add to your categoryConfigs object:
'Jewelry and Accessories': {
  id: 'jewelry-accessories',
  name: 'Jewelry and Accessories',
  slug: 'jewelry-accessories',
  subcategories: ['Jewelry', 'Watches', 'Bags & Purses', 'Sunglasses & Eyewear', 'Belts & Wallets'],
  specifications: [
    { fieldName: 'jewelryBrand', label: 'Brand', type: 'select', required: false,
      options: ['Local Brand', 'International', 'Custom Made', 'Other'] },
    { fieldName: 'jewelryMaterial', label: 'Material', type: 'select', required: true,
      options: ['Gold', 'Silver', 'Platinum', 'Stainless Steel', 'Brass', 'Copper', 'Other'] },
    { fieldName: 'jewelryCondition', label: 'Condition', type: 'select', required: true,
      options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair', 'Vintage'] },
    { fieldName: 'jewelryColor', label: 'Color', type: 'select', required: false,
      options: ['Gold', 'Silver', 'Rose Gold', 'Black', 'White', 'Multi-color'] },
  ],
  filters: [
    { fieldName: 'jewelryMaterial', label: 'Material', type: 'checkbox', required: false },
    { fieldName: 'jewelryCondition', label: 'Condition', type: 'checkbox', required: false },
    { fieldName: 'price', label: 'Price', type: 'range', required: false, min: 0, max: 1000000 },
  ]
},
  'Services': {
    id: 'services',
    name: 'Services',
    slug: 'services',
    subcategories: [
      'Building & Trade Services', 'Car Services', 'Computer & IT Services', 'Repair Services',
      'Cleaning Services', 'Printing Services', 'Manufacturing Services', 'Logistics Services',
      'Legal Services', 'Tax & Financial Services', 'Recruitment Services', 'Rental Services',
      'Chauffeur & Airport Transfer Services', 'Travel Agents & Tours', 'Classes & Courses',
      'Health & Beauty Services', 'Fitness & Personal Training', 'Party, Catering & Event Services',
      'DJ & Entertainment Services', 'Photography & Video Services', 'Landscaping & Gardening Services',
      'Pet Services'
    ],
    specifications: [
      { fieldName: 'serviceType', label: 'Service Type', type: 'select', required: true,
        options: ['One-time', 'Recurring', 'Project-based', 'Consultation'] },
      { fieldName: 'serviceExperience', label: 'Years of Experience', type: 'select', required: false,
        options: ['< 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'] },
      { fieldName: 'serviceArea', label: 'Service Area', type: 'text', required: false },
      { fieldName: 'serviceAvailability', label: 'Availability', type: 'select', required: false,
        options: ['Immediate', 'Within a week', 'Within 2 weeks', 'Within a month'] }
    ],
    filters: [
      { fieldName: 'serviceType', label: 'Service Type', type: 'checkbox', required: false },
      { fieldName: 'serviceExperience', label: 'Experience', type: 'checkbox', required: false },
      { fieldName: 'serviceAvailability', label: 'Availability', type: 'checkbox', required: false },
    ]
  },

  'Repair & Construction': {
    id: 'repair-construction',
    name: 'Repair & Construction',
    slug: 'repair-construction',
    subcategories: [
      'Electrical Equipment', 'Building Materials & Supplies', 'Plumbing & Water Systems',
      'Electrical Hand Tools', 'Hand Tools', 'Measuring & Testing Tools', 'Hardware & Fasteners',
      'Doors & Security', 'Windows & Glass', 'Building & Trade Services', 'Repair Services'
    ],
    specifications: [
      { fieldName: 'repairMaterialType', label: 'Material Type', type: 'select', required: true,
        options: ['Electrical', 'Plumbing', 'Construction', 'Hardware', 'Tools'] },
      { fieldName: 'repairBrand', label: 'Brand', type: 'text', required: false },
      { fieldName: 'repairCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair', 'For Parts'] },
      { fieldName: 'repairWeight', label: 'Weight', type: 'text', required: false, unit: 'kg' }
    ],
    filters: [
      { fieldName: 'repairMaterialType', label: 'Material Type', type: 'checkbox', required: false },
      { fieldName: 'repairCondition', label: 'Condition', type: 'checkbox', required: false },
    ]
  },

  'Commercial Equipment': {
    id: 'commercial-equipment',
    name: 'Commercial Equipment',
    slug: 'commercial-equipment',
    subcategories: [
      'Medical Equipment & Supplies', 'Manufacturing Equipment', 'Retail & Store Equipment',
      'Restaurant & Catering Equipment', 'Stationery & Office Equipment', 'Salon & Beauty Equipment',
      'Printing & Graphics Equipment', 'Stage & Event Equipment', 'Manufacturing Services'
    ],
    specifications: [
      { fieldName: 'commercialEquipmentType', label: 'Equipment Type', type: 'select', required: true,
        options: ['Medical', 'Manufacturing', 'Retail', 'Restaurant', 'Office', 'Beauty', 'Printing', 'Event'] },
      { fieldName: 'commercialBrand', label: 'Brand', type: 'text', required: false },
      { fieldName: 'commercialModel', label: 'Model', type: 'text', required: false },
      { fieldName: 'commercialCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair', 'Refurbished'] },
      { fieldName: 'commercialCapacity', label: 'Capacity', type: 'text', required: false }
    ],
    filters: [
      { fieldName: 'commercialEquipmentType', label: 'Equipment Type', type: 'checkbox', required: false },
      { fieldName: 'commercialCondition', label: 'Condition', type: 'checkbox', required: false },
    ]
  },

  'Leisure & Activities': {
    id: 'leisure-activities',
    name: 'Leisure & Activities',
    slug: 'leisure-activities',
    subcategories: [
      'Sports Equipment', 'Massagers', 'Musical Instruments & Gear', 'Books & Table Games',
      'Arts, Crafts & Awards', 'Outdoor Gear', 'Music & Video', 'Fitness & Personal Training'
    ],
    specifications: [
      { fieldName: 'leisureActivityType', label: 'Activity Type', type: 'select', required: true,
        options: ['Sports', 'Music', 'Arts', 'Outdoor', 'Entertainment'] },
      { fieldName: 'leisureSkillLevel', label: 'Skill Level', type: 'select', required: false,
        options: ['Beginner', 'Intermediate', 'Advanced', 'Professional'] },
      { fieldName: 'leisureCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] },
    ],
    filters: [
      { fieldName: 'leisureActivityType', label: 'Activity Type', type: 'checkbox', required: false },
      { fieldName: 'leisureSkillLevel', label: 'Skill Level', type: 'checkbox', required: false },
      { fieldName: 'leisureCondition', label: 'Condition', type: 'checkbox', required: false },
    ]
  },

  'Babies & Kids': {
    id: 'babies-kids',
    name: 'Babies & Kids',
    slug: 'babies-kids',
    subcategories: [
      'Toys, Games & Bikes', 'Children\'s Furniture', 'Children\'s Clothing', 'Children\'s Shoes',
      'Babies & Kids Accessories', 'Baby Gear & Equipment', 'Care & Feeding', 'Maternity & Pregnancy',
      'Transport & Safety', 'Playground Equipment', 'Child Care & Education'
    ],
    specifications: [
      { fieldName: 'kidsAgeRange', label: 'Age Range', type: 'select', required: true,
        options: ['0-6 months', '6-12 months', '1-2 years', '2-4 years', '4-6 years', '6-8 years', '8-12 years'] },
      { fieldName: 'kidsGender', label: 'Gender', type: 'select', required: false,
        options: ['Boys', 'Girls', 'Unisex'] },
      { fieldName: 'kidsCondition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Excellent', 'Used - Good', 'Used - Fair'] },
      { fieldName: 'kidsSafetyStandard', label: 'Safety Standard', type: 'select', required: false,
        options: ['Certified', 'Standard', 'Not Certified'] }
    ],
    filters: [
      { fieldName: 'kidsAgeRange', label: 'Age Range', type: 'checkbox', required: false },
      { fieldName: 'kidsGender', label: 'Gender', type: 'checkbox', required: false },
      { fieldName: 'kidsCondition', label: 'Condition', type: 'checkbox', required: false },
    ]
  },

  'Food, Agriculture & Farming': {
    id: 'food-agriculture-farming',
    name: 'Food, Agriculture & Farming',
    slug: 'food-agriculture-farming',
    subcategories: [
      'Food & Beverages', 'Farm Animals', 'Feeds, Supplements & Seeds', 'Farm Machinery & Equipment',
      'Farm Animal Feed & Supplies'
    ],
    specifications: [
      { fieldName: 'agricultureProductType', label: 'Product Type', type: 'select', required: true,
        options: ['Livestock', 'Crops', 'Equipment', 'Supplies', 'Produce'] },
      { fieldName: 'agricultureExpiryDate', label: 'Expiry/Shelf Life', type: 'text', required: false },
      { fieldName: 'agricultureQuantity', label: 'Quantity', type: 'text', required: false },
      { fieldName: 'agricultureStorage', label: 'Storage', type: 'select', required: false,
        options: ['Room Temp', 'Refrigerated', 'Frozen', 'Dry'] }
    ],
    filters: [
      { fieldName: 'agricultureProductType', label: 'Product Type', type: 'checkbox', required: false },
      { fieldName: 'agricultureStorage', label: 'Storage', type: 'checkbox', required: false },
    ]
  },

  'Animals & Pets': {
    id: 'animals-pets',
    name: 'Animals & Pets',
    slug: 'animals-pets',
    subcategories: [
      'Pet Accessories', 'Cats & Kittens', 'Dogs & Puppies', 'Fish', 'Birds',
      'Pet Services', 'Other Animals'
    ],
    specifications: [
      { fieldName: 'animalType', label: 'Animal Type', type: 'select', required: true,
        options: ['Cat', 'Dog', 'Fish', 'Bird', 'Other'] },
      { fieldName: 'petBreed', label: 'Breed', type: 'text', required: false },
      { fieldName: 'petAge', label: 'Age', type: 'select', required: false,
        options: ['Baby', 'Young', 'Adult', 'Senior'] },
      { fieldName: 'petGender', label: 'Gender', type: 'select', required: false,
        options: ['Male', 'Female'] },
      { fieldName: 'petVaccinated', label: 'Vaccinated', type: 'select', required: false,
        options: ['Yes', 'No', 'Partially'] }
    ],
    filters: [
      { fieldName: 'animalType', label: 'Animal Type', type: 'checkbox', required: false },
      { fieldName: 'petAge', label: 'Age', type: 'checkbox', required: false },
      { fieldName: 'petGender', label: 'Gender', type: 'checkbox', required: false },
    ]
  }
}

// Enhanced getCategoryConfig function to prevent duplicates
export const getCategoryConfig = (categoryName: string, subcategory?: string): CategoryConfig | null => {
  const baseConfig = categoryConfigs[categoryName]
  if (!baseConfig) return null

  // If subcategory exists and has configurations
  if (subcategory && subcategoryConfigs[categoryName] && subcategoryConfigs[categoryName][subcategory]) {
    const subConfig = subcategoryConfigs[categoryName][subcategory]
    
    // Create unique specifications by checking for duplicates
    const baseSpecs = baseConfig.specifications || []
    const subSpecs = subConfig.specifications || []
    
    // Filter out any duplicate fieldNames from subSpecs
    const uniqueSubSpecs = subSpecs.filter((subSpec: { fieldName: string }) => 
      !baseSpecs.some((baseSpec: { fieldName: string }) => baseSpec.fieldName === subSpec.fieldName)
    )
    
    return {
      ...baseConfig,
      specifications: [...baseSpecs, ...uniqueSubSpecs],
      filters: [...(baseConfig.filters || []), ...(subConfig.filters || [])]
    }
  }

  return baseConfig
}

export const getSubcategories = (categoryName: string): string[] => {
  return categoryConfigs[categoryName]?.subcategories || []
}

export const getAllCategories = () => {
  return Object.values(categoryConfigs).map(config => ({
    id: config.id,
    name: config.name,
    slug: config.slug,
    subcategories: config.subcategories || []
  }))
}

//     }
//   }

//   return baseConfig
// }

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

