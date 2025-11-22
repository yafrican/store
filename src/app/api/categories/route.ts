// import { NextResponse } from 'next/server'
// import connectMongo from '@/lib/mongodb'
// import Category from '@/models/Category'

// const categories = [
//   { name: 'Electronics', subcategories: ['Phones', 'Laptops', 'Cameras'] },
//   { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids'] },
//   { name: 'Toys', subcategories: ['Action Figures', 'Puzzles', 'Board Games'] },
//   { name: 'Home & Kitchen', subcategories: ['Furniture', 'Appliances', 'Decor'] },
//   { name: 'Beauty', subcategories: ['Makeup', 'Skincare', 'Hair Care'] },
//   { name: 'Sports', subcategories: ['Outdoor', 'Gym', 'Team Sports'] },
//   { name: 'Books', subcategories: ['Fiction', 'Non-fiction', 'Children'] },
// ]

// export async function GET() {
//   try {
//     await connectMongo()

//     // Optional: Clear old data
//     await Category.deleteMany({})
//     await Category.insertMany(categories)

//     return NextResponse.json({
//       message: 'Categories created successfully.',
//       categories,
//     })
//   } catch (error: any) {
//     console.error('❌ Failed to create categories:', error)
//     return NextResponse.json(
//       { error: 'Failed to create categories', detail: error.message },
//       { status: 500 }
//     )
//   }
// }
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Category from '@/models/Category'

const newCategories = [
  { 
    name: 'Electronics', 
    subcategories: [
      'Phones', 'Laptops & Computers', 'Video Game Consoles', 'Audio & Music Equipment', 
      'Headphones', 'Photo & Video Cameras', 'Security & Surveillance', 'Networking Products',
      'Printers & Scanners', 'Computer Monitors', 'Computer Hardware', 'Computer Accessories',
      'Electronic Accessories & Supplies', 'Video Games', 'Software'
    ]
  },
  { 
    name: 'Vehicles', 
    subcategories: [
      'Vehicle Parts & Accessories', 'Cars', 'Motorcycles & Scooters', 'Buses & Microbuses',
      'Trucks & Trailers', 'Construction & Heavy Machinery', 'Watercraft & Boats', 'Car Services'
    ]
  },
  { 
    name: 'Property', 
    subcategories: [
      'New Builds', 'Houses & Apartments for Rent', 'Houses & Apartments for Sale', 
      'Land & Plots for Rent', 'Short Let', 'Land & Plots for Sale',
      'Event Centres, Venues & Workstations', 'Commercial Property for Rent', 
      'Commercial Property for Sale'
    ]
  },
  { 
    name: 'Home, Furniture & Appliances', 
    subcategories: [
      'Furniture', 'Lighting', 'Storage & Organization', 'Home Accessories',
      'Kitchen Appliances', 'Kitchenware & Cookware', 'Household Chemicals', 'Garden Supplies'
    ]
  },
  { 
    name: 'Clothing', 
    subcategories: ['Men', 'Women', 'Kids', 'Baby', 'Shoes', 'Accessories']
  },
  { 
    name: 'Jewelry and Accessories', 
  subcategories: ['Jewelry', 'Watches', 'Bags & Purses', 'Sunglasses & Eyewear', 'Belts & Wallets'],
  },
  { 
    name: 'Books & Media', 
    subcategories: ['Fiction', 'Non-Fiction', 'Children', 'Educational', 'Audio Books']
  },
  { 
    name: 'Automotive', 
    subcategories: ['Car Care', 'Tools', 'Accessories', 'Parts', 'Motorcycle']
  },
  { 
    name: 'Beauty & Personal Care', 
    subcategories: [
      'Hair Care & Beauty', 'Face Care', 'Oral Care', 'Body Care', 'Fragrances',
      'Makeup', 'Tools & Accessories', 'Vitamins & Supplements', 'Massagers',
      'Health & Beauty Services'
    ]
  },
  { 
    name: 'Services', 
    subcategories: [
      'Building & Trade Services', 'Car Services', 'Computer & IT Services', 'Repair Services',
      'Cleaning Services', 'Printing Services', 'Manufacturing Services', 'Logistics Services',
      'Legal Services', 'Tax & Financial Services', 'Recruitment Services', 'Rental Services',
      'Chauffeur & Airport Transfer Services', 'Travel Agents & Tours', 'Classes & Courses',
      'Health & Beauty Services', 'Fitness & Personal Training', 'Party, Catering & Event Services',
      'DJ & Entertainment Services', 'Photography & Video Services', 'Landscaping & Gardening Services',
      'Pet Services'
    ]
  },
  { 
    name: 'Repair & Construction', 
    subcategories: [
      'Electrical Equipment', 'Building Materials & Supplies', 'Plumbing & Water Systems',
      'Electrical Hand Tools', 'Hand Tools', 'Measuring & Testing Tools', 'Hardware & Fasteners',
      'Doors & Security', 'Windows & Glass', 'Building & Trade Services', 'Repair Services'
    ]
  },
  { 
    name: 'Commercial Equipment', 
    subcategories: [
      'Medical Equipment & Supplies', 'Manufacturing Equipment', 'Retail & Store Equipment',
      'Restaurant & Catering Equipment', 'Stationery & Office Equipment', 'Salon & Beauty Equipment',
      'Printing & Graphics Equipment', 'Stage & Event Equipment', 'Manufacturing Services'
    ]
  },
  { 
    name: 'Leisure & Activities', 
    subcategories: [
      'Sports Equipment', 'Massagers', 'Musical Instruments & Gear', 'Books & Table Games',
      'Arts, Crafts & Awards', 'Outdoor Gear', 'Music & Video', 'Fitness & Personal Training'
    ]
  },
  { 
    name: 'Babies & Kids', 
    subcategories: [
      'Toys, Games & Bikes', 'Children\'s Furniture', 'Children\'s Clothing', 'Children\'s Shoes',
      'Babies & Kids Accessories', 'Baby Gear & Equipment', 'Care & Feeding', 'Maternity & Pregnancy',
      'Transport & Safety', 'Playground Equipment', 'Child Care & Education'
    ]
  },
  { 
    name: 'Food, Agriculture & Farming', 
    subcategories: [
      'Food & Beverages', 'Farm Animals', 'Feeds, Supplements & Seeds', 'Farm Machinery & Equipment',
      'Farm Animal Feed & Supplies'
    ]
  },
  { 
    name: 'Animals & Pets', 
    subcategories: [
      'Pet Accessories', 'Cats & Kittens', 'Dogs & Puppies', 'Fish', 'Birds',
      'Pet Services', 'Other Animals'
    ]
  }
]
export async function GET() {
  try {
    await connectMongo()

    console.log('🔄 FORCE UPDATING CATEGORIES...')
    
    // ALWAYS delete and recreate to ensure latest categories
    await Category.deleteMany({})
    console.log('🗑️ Cleared all existing categories')
    
    const insertedCategories = await Category.insertMany(newCategories)
    console.log('✅ Inserted new categories:', insertedCategories.length)
    
    const response = NextResponse.json({
      success: true,
      message: 'Categories force-updated successfully!',
      categories: newCategories,
      count: newCategories.length
    })
    
    // Disable caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')
    
    return response
    
  } catch (error: any) {
    console.error('❌ Failed to update categories:', error)
    
    // Fallback: return the new categories even if DB fails
    const response = NextResponse.json({
      success: true,
      message: 'Using fallback categories (database error).',
      categories: newCategories,
      count: newCategories.length
    })
    
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    
    return response
  }
}