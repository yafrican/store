import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Simple model check...');
    
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Dynamic import to get fresh model
    const ProductModule = await import('@/models/Product');
    const Product = ProductModule.default;
    
    // Get the schema definition directly
    const schemaDefinition = (Product.schema as any).obj;
    const categoryEnum = schemaDefinition?.category?.enum || [];
    
    console.log('📋 Current category enum values:', categoryEnum);
    console.log('✅ BEAUTY_HEALTH present:', categoryEnum.includes('BEAUTY_HEALTH'));
    
    // List all available categories from the schema
    console.log('📝 All available categories:', categoryEnum.join(', '));
    
    return NextResponse.json({
      success: true,
      categoryEnum: categoryEnum,
      hasBeautyHealth: categoryEnum.includes('BEAUTY_HEALTH'),
      totalCategories: categoryEnum.length
    });
    
  } catch (error: any) {
    console.error('❌ Simple check error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}