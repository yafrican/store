// app/api/list-upload-presets/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CLOUDINARY_CONFIG = {
  cloud_name: 'dh3ehrc3p',
  api_key: '954112281589694',
  api_secret: 'kWi_7ggA3-E8rRjCvV08MSBcXiQ'
};

export async function GET(request: NextRequest) {
  try {
    console.log('📋 Listing Cloudinary upload presets...');
    console.log('🔑 Using Cloudinary account:', CLOUDINARY_CONFIG.cloud_name);
    
    // Use Cloudinary Admin API to list upload presets
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloud_name}/upload_presets`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${CLOUDINARY_CONFIG.api_key}:${CLOUDINARY_CONFIG.api_secret}`).toString('base64')}`
        }
      }
    );

    console.log('📡 Cloudinary Admin API response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Found upload presets:', data);
      
      return NextResponse.json({
        success: true,
        cloudinaryAccount: CLOUDINARY_CONFIG.cloud_name,
        uploadPresets: data,
        message: `Found ${data.presets?.length || 0} upload preset(s) in your account`
      });
    } else {
      const errorText = await response.text();
      console.error('❌ Failed to fetch upload presets:', errorText);
      
      return NextResponse.json({
        success: false,
        cloudinaryAccount: CLOUDINARY_CONFIG.cloud_name,
        error: `Failed to fetch upload presets: ${response.status}`,
        details: errorText,
        tip: 'Check if your API key and secret are correct'
      });
    }

  } catch (error) {
    console.error('❌ Failed to list upload presets:', error);
    
    return NextResponse.json({
      success: false,
      cloudinaryAccount: CLOUDINARY_CONFIG.cloud_name,
      error: error instanceof Error ? error.message : 'Failed to list upload presets',
      manualCheck: 'Please check your Cloudinary dashboard manually at https://cloudinary.com/console',
      steps: [
        '1. Go to Cloudinary Console',
        '2. Click Settings (gear icon)',
        '3. Go to Upload tab',
        '4. Scroll to Upload presets section'
      ]
    });
  }
}