import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import Product from '@/models/Product';

// Category mapping between display names and database values
const categoryMap: { [key: string]: string } = {
  'Electronics': 'ELECTRONICS',
  'Clothing': 'CLOTHING',
  'Home, Furniture & Appliances': 'HOME_FURNITURE_APPLIANCES',
  'Beauty & Personal Care': 'BEAUTY_PERSONAL_CARE',
  'Leisure & Activities': 'LEISURE_ACTIVITIES',
  'Babies & Kids': 'BABIES_KIDS',
  'Automotive': 'AUTOMOTIVE',
  'Books & Media': 'BOOKS_MEDIA',
  'Fashion': 'FASHION',
  'Food, Agriculture & Farming': 'FOOD_AGRICULTURE_FARMING',
  'Services': 'SERVICES',
  'Property': 'PROPERTY',
  'Vehicles': 'VEHICLES',
  'Commercial Equipment': 'COMMERCIAL_EQUIPMENT',
  'Repair & Construction': 'REPAIR_CONSTRUCTION',
  'Animals & Pets': 'ANIMALS_PETS'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.length < 1) {
      return NextResponse.json({ suggestions: [] });
    }

    await connectMongo();

    console.log('🔍 Search suggestions API called with query:', query);

    // Build search filter - match your main search API structure
    const filter: any = { 
      status: 'approved', // Use 'approved' instead of 'active'
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'specifications.model': { $regex: query, $options: 'i' } },
        { 'specifications.brand': { $regex: query, $options: 'i' } }
      ]
    };

    // Search for products that match the query
    const suggestions = await Product.find(filter)
      .select('name slug category subcategory specifications') // Select necessary fields
      .limit(8) // Limit number of suggestions
      .lean();

    console.log(`✅ Found ${suggestions.length} suggestions for query: "${query}"`);

    // Format suggestions to match the expected interface
    const formattedSuggestions = suggestions.map((product: any) => ({
      _id: product._id.toString(),
      name: product.name,
      slug: product.slug || product._id.toString(),
      category: product.category,
      // Map database category to display category if needed
      displayCategory: Object.keys(categoryMap).find(
        key => categoryMap[key] === product.category
      ) || product.category
    }));

    return NextResponse.json({ 
      success: true,
      suggestions: formattedSuggestions 
    });
    
  } catch (error) {
    console.error('Search suggestions error:', error);
    return NextResponse.json({ 
      success: false,
      suggestions: [] 
    }, { status: 500 });
  }
}