// lib/categories.ts
export const categoryConfigs: { [key: string]: CategoryConfig } = {
  // MOBILE PHONES
  'mobile-phones': {
    id: 'mobile-phones',
    name: 'Mobile Phones',
    slug: 'mobile-phones',
    specifications: [
      { fieldName: 'brand', label: 'Brand', type: 'select', required: true, 
        options: ['Samsung', 'Apple', 'Tecno', 'Infinix', 'Xiaomi', 'Oppo', 'Vivo', 'Huawei', 'Nokia', 'Other'] },
      { fieldName: 'model', label: 'Model', type: 'text', required: true },
      { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used', 'Refurbished'] },
      { fieldName: 'ram', label: 'RAM', type: 'select', required: false,
        options: ['2GB', '4GB', '6GB', '8GB', '12GB', '16GB'] },
      { fieldName: 'storage', label: 'Storage', type: 'select', required: false,
        options: ['32GB', '64GB', '128GB', '256GB', '512GB', '1TB'] },
      { fieldName: 'screenSize', label: 'Screen Size', type: 'text', required: false, unit: 'inches' },
      { fieldName: 'battery', label: 'Battery', type: 'text', required: false, unit: 'mAh' },
      { fieldName: 'camera', label: 'Camera', type: 'text', required: false, unit: 'MP' },
    ],
    filters: [
      { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
      { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
      { fieldName: 'ram', label: 'RAM', type: 'checkbox', required: false },
      { fieldName: 'storage', label: 'Storage', type: 'checkbox', required: false },
      { fieldName: 'price', label: 'Price Range', type: 'range', required: false, min: 0, max: 50000 }
    ]
  },

  // CLOTHING
  'clothing': {
    id: 'clothing',
    name: 'Clothing',
    slug: 'clothing',
    specifications: [
      { fieldName: 'brand', label: 'Brand', type: 'select', required: false,
        options: ['Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Local Brand', 'Other'] },
      { fieldName: 'size', label: 'Size', type: 'select', required: true,
        options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
      { fieldName: 'color', label: 'Color', type: 'text', required: true },
      { fieldName: 'material', label: 'Material', type: 'select', required: false,
        options: ['Cotton', 'Polyester', 'Silk', 'Wool', 'Denim', 'Linen'] },
      { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'] },
      { fieldName: 'gender', label: 'Gender', type: 'select', required: true,
        options: ['Men', 'Women', 'Unisex', 'Kids'] },
    ],
    filters: [
      { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
      { fieldName: 'size', label: 'Size', type: 'checkbox', required: false },
      { fieldName: 'gender', label: 'Gender', type: 'checkbox', required: false },
      { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
      { fieldName: 'price', label: 'Price Range', type: 'range', required: false, min: 0, max: 10000 }
    ]
  },

  // ELECTRONICS
  'electronics': {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    specifications: [
      { fieldName: 'brand', label: 'Brand', type: 'select', required: true,
        options: ['Samsung', 'Apple', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Other'] },
      { fieldName: 'model', label: 'Model', type: 'text', required: true },
      { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used', 'Refurbished'] },
      { fieldName: 'warranty', label: 'Warranty', type: 'select', required: false,
        options: ['No Warranty', '1 Month', '3 Months', '6 Months', '1 Year', '2 Years'] },
    ],
    filters: [
      { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
      { fieldName: 'condition', label: 'Condition', type: 'checkbox', required: false },
      { fieldName: 'warranty', label: 'Warranty', type: 'checkbox', required: false },
      { fieldName: 'price', label: 'Price Range', type: 'range', required: false, min: 0, max: 100000 }
    ]
  },

  // VEHICLES
  'vehicles': {
    id: 'vehicles',
    name: 'Vehicles',
    slug: 'vehicles',
    specifications: [
      { fieldName: 'brand', label: 'Brand', type: 'select', required: true,
        options: ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Hyundai', 'Other'] },
      { fieldName: 'model', label: 'Model', type: 'text', required: true },
      { fieldName: 'year', label: 'Year', type: 'number', required: true, min: 1990, max: 2024 },
      { fieldName: 'condition', label: 'Condition', type: 'select', required: true,
        options: ['New', 'Used', 'Reconditioned'] },
      { fieldName: 'fuelType', label: 'Fuel Type', type: 'select', required: true,
        options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
      { fieldName: 'transmission', label: 'Transmission', type: 'select', required: true,
        options: ['Manual', 'Automatic'] },
      { fieldName: 'mileage', label: 'Mileage', type: 'number', required: false, unit: 'km' },
    ],
    filters: [
      { fieldName: 'brand', label: 'Brand', type: 'checkbox', required: false },
      { fieldName: 'year', label: 'Year', type: 'range', required: false, min: 1990, max: 2024 },
      { fieldName: 'fuelType', label: 'Fuel Type', type: 'checkbox', required: false },
      { fieldName: 'transmission', label: 'Transmission', type: 'checkbox', required: false },
      { fieldName: 'price', label: 'Price Range', type: 'range', required: false, min: 0, max: 5000000 }
    ]
  },

  // REAL ESTATE
  'real-estate': {
    id: 'real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    specifications: [
      { fieldName: 'propertyType', label: 'Property Type', type: 'select', required: true,
        options: ['Apartment', 'Villa', 'Office', 'Land', 'Commercial'] },
      { fieldName: 'bedrooms', label: 'Bedrooms', type: 'select', required: true,
        options: ['1', '2', '3', '4', '5+'] },
      { fieldName: 'bathrooms', label: 'Bathrooms', type: 'select', required: true,
        options: ['1', '2', '3', '4+'] },
      { fieldName: 'area', label: 'Area', type: 'number', required: true, unit: 'sqm' },
      { fieldName: 'furnishing', label: 'Furnishing', type: 'select', required: false,
        options: ['Furnished', 'Semi-Furnished', 'Unfurnished'] },
    ],
    filters: [
      { fieldName: 'propertyType', label: 'Property Type', type: 'checkbox', required: false },
      { fieldName: 'bedrooms', label: 'Bedrooms', type: 'checkbox', required: false },
      { fieldName: 'bathrooms', label: 'Bathrooms', type: 'checkbox', required: false },
      { fieldName: 'price', label: 'Price Range', type: 'range', required: false, min: 0, max: 10000000 }
    ]
  }
}

export const getCategoryConfig = (categorySlug: string): CategoryConfig | null => {
  return categoryConfigs[categorySlug] || null
}

export const getAllCategories = () => {
  return Object.values(categoryConfigs).map(config => ({
    id: config.id,
    name: config.name,
    slug: config.slug
  }))
}