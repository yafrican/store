import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Starting category debug...');
    
    // Check if already connected
    if (mongoose.connection.readyState !== 1) {
      console.log('🔄 Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log('✅ Connected to MongoDB');
    }

    // Get the Product model
    console.log('📋 Checking Product schema...');
    
    // Method 1: Check schema paths directly (fixed)
    const categoryPath = Product.schema.path('category');
    console.log('📝 Category path instance:', categoryPath?.instance);
    
    // Get enum values safely
    const schemaObj = Product.schema.obj as any;
    const categoryDefinition = schemaObj?.category;
    const enumValues = categoryDefinition?.enum || [];
    console.log('🎯 Category enum values from schema:', enumValues);
    
    // Check if BEAUTY_HEALTH is in enum
    const hasBeautyHealth = enumValues.includes('BEAUTY_HEALTH');
    console.log('✅ BEAUTY_HEALTH in enum?', hasBeautyHealth);
    
    // Method 2: Check actual products in database
    console.log('📊 Checking existing products...');
    const existingCategories = await Product.distinct('category');
    console.log('📦 Existing categories in DB:', existingCategories);
    
    console.log('📄 Full schema category definition:', categoryDefinition);
    
    // Method 3: Try to create a product with BEAUTY_HEALTH
    console.log('🧪 Testing BEAUTY_HEALTH validation...');
    const testProduct = new Product({
      name: 'Test Product',
      price: 100,
      category: 'BEAUTY_HEALTH',
      seller: new mongoose.Types.ObjectId(), // dummy ID
      images: [],
      stock: 1,
      inStock: true,
      status: 'pending'
    });
    
    let validationResult = { isValid: false, error: '' };
    try {
      await testProduct.validate();
      validationResult.isValid = true;
      console.log('✅ BEAUTY_HEALTH validation: PASSED');
    } catch (validationError: any) {
      validationResult.isValid = false;
      validationResult.error = validationError.message;
      console.log('❌ BEAUTY_HEALTH validation: FAILED');
      console.log('Validation error details:', validationError.errors?.category || validationError.message);
    }

    // Method 4: Check what happens with a known valid category
    console.log('🧪 Testing with ELECTRONICS (should work)...');
    const testProduct2 = new Product({
      name: 'Test Product 2',
      price: 100,
      category: 'ELECTRONICS',
      seller: new mongoose.Types.ObjectId(),
      images: [],
      stock: 1,
      inStock: true,
      status: 'pending'
    });
    
    let electronicsValidation = { isValid: false, error: '' };
    try {
      await testProduct2.validate();
      electronicsValidation.isValid = true;
      console.log('✅ ELECTRONICS validation: PASSED');
    } catch (validationError: any) {
      electronicsValidation.isValid = false;
      electronicsValidation.error = validationError.message;
      console.log('❌ ELECTRONICS validation: FAILED');
    }

    return NextResponse.json({
      success: true,
      debugInfo: {
        enumValues,
        hasBeautyHealth,
        existingCategories,
        schemaDefinition: categoryDefinition,
        mongooseState: mongoose.connection.readyState,
        validationTests: {
          beautyHealth: validationResult,
          electronics: electronicsValidation
        },
        allEnumValues: enumValues
      }
    });

  } catch (error: any) {
    console.error('❌ Debug error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}