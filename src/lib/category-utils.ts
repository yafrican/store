// lib/category-utils.ts

// Map between display names and database values
export const categoryMappings = {
  // Display Name -> Database Value
  'Electronics': 'ELECTRONICS',
  'Clothing': 'CLOTHING', 
  'Home & Garden': 'HOME_GARDEN',
  'Beauty & Health': 'BEAUTY_HEALTH',
  'Sports & Outdoors': 'SPORTS_OUTDOORS',
  'Toys & Games': 'TOYS_GAMES',
  'Automotive': 'AUTOMOTIVE',
  'Books & Media': 'BOOKS_MEDIA',
  'Jewelry & Accessories': 'JEWELRY_ACCESSORIES',
  'Food & Beverages': 'FOOD_BEVERAGES'
} as const;

// Reverse mapping for database to display
export const reverseCategoryMappings = {
  'ELECTRONICS': 'Electronics',
  'CLOTHING': 'Clothing',
  'HOME_GARDEN': 'Home & Garden', 
  'BEAUTY_HEALTH': 'Beauty & Health',
  'SPORTS_OUTDOORS': 'Sports & Outdoors',
  'TOYS_GAMES': 'Toys & Games',
  'AUTOMOTIVE': 'Automotive',
  'BOOKS_MEDIA': 'Books & Media',
  'JEWELRY_ACCESSORIES': 'Jewelry & Accessories',
  'FOOD_BEVERAGES': 'Food & Beverages'
} as const;

// Convert display category to database format
export const toDatabaseCategory = (displayCategory: string): string => {
  return categoryMappings[displayCategory as keyof typeof categoryMappings] || displayCategory.toUpperCase();
}

// Convert database category to display format  
export const toDisplayCategory = (dbCategory: string): string => {
  return reverseCategoryMappings[dbCategory as keyof typeof reverseCategoryMappings] || dbCategory;
}

// Check if a category matches (handles both formats)
export const categoryMatches = (category1: string, category2: string): boolean => {
  const normalized1 = toDatabaseCategory(category1);
  const normalized2 = toDatabaseCategory(category2);
  return normalized1 === normalized2;
}

// Get all display categories for UI
export const getAllDisplayCategories = (): string[] => {
  return Object.keys(categoryMappings);
}

// Get all database categories for queries
export const getAllDatabaseCategories = (): string[] => {
  return Object.values(categoryMappings);
}