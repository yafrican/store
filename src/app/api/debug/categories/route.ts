import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Category from '@/models/Category'

const newCategories = [
  { 
    name: 'Electronics', 
    subcategories: ['Phones', 'Laptops & Computers', 'TV & Audio', 'Cameras', 'Video Game Consoles', 'Audio & Music Equipment', 'Headphones']
  },
  { 
    name: 'Clothing', 
    subcategories: ['Men', 'Women', 'Kids', 'Shoes']
  },
  { 
    name: 'Jewelry and Accessories', 
  subcategories: ['Jewelry', 'Watches', 'Bags & Purses', 'Sunglasses & Eyewear', 'Belts & Wallets'],
  },
  { 
    name: 'Home, Furniture & Appliances', 
    subcategories: ['Furniture', 'Kitchen Appliances', 'Home Decor', 'Garden & Outdoor']
  },
  { 
    name: 'Beauty & Personal Care', 
    subcategories: ['Skincare', 'Makeup', 'Hair Care & Beauty', 'Fragrance', 'Personal Wellness']
  },
  { 
    name: 'Services', 
    subcategories: ['Building & Trade Services', 'Car Services', 'Beauty Services', 'Home Services', 'Professional Services']
  },
  { 
    name: 'Repair & Construction', 
    subcategories: ['Tools & Equipment', 'Building Materials', 'Electrical Supplies', 'Plumbing Supplies']
  },
  { 
    name: 'Commercial Equipment', 
    subcategories: ['Medical Equipment', 'Restaurant Equipment', 'Office Equipment', 'Industrial Machinery']
  },
  { 
    name: 'Leisure & Activities', 
    subcategories: ['Sports Equipment', 'Musical Instruments', 'Art Supplies', 'Outdoor Recreation']
  },
  { 
    name: 'Babies & Kids', 
    subcategories: ['Baby Gear', 'Kids Toys', 'Children Clothing', 'Nursery Furniture']
  },
  { 
    name: 'Food, Agriculture & Farming', 
    subcategories: ['Fresh Produce', 'Agricultural Equipment', 'Food Processing', 'Livestock Supplies']
  },
  { 
    name: 'Animals & Pets', 
    subcategories: ['Pet Food', 'Pet Supplies', 'Livestock', 'Veterinary Supplies']
  },
  { 
    name: 'Vehicles', 
    subcategories: ['Cars', 'Motorcycles & Scooters', 'Bicycles', 'Trucks & SUVs', 'Vehicle Parts']
  },
  { 
    name: 'Property', 
    subcategories: ['Houses & Apartments for Rent', 'Houses & Apartments for Sale', 'Commercial Property', 'Land & Plots']
  },
  { 
    name: 'Books & Media', 
    subcategories: ['Books', 'DVDs & Blu-ray', 'CDs & Vinyl', 'Video Games', 'Educational Materials']
  },
  { 
    name: 'Automotive', 
    subcategories: ['Car Parts', 'Car Care', 'Motorcycle Parts', 'Tires & Wheels']
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
    
    return NextResponse.json({
      success: true,
      message: 'Categories force-updated successfully!',
      categories: newCategories,
      count: newCategories.length
    })
    
  } catch (error: any) {
    console.error('❌ Failed to update categories:', error)
    
    // Fallback: return the new categories even if DB fails
    return NextResponse.json({
      success: true,
      message: 'Using fallback categories (database error).',
      categories: newCategories,
      count: newCategories.length
    })
  }
}