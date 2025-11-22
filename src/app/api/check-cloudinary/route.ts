// app/api/check-cloudinary/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CLOUDINARY_CONFIG = {
  cloud_name: 'dh3ehrc3p',
  api_key: '954112281589694',
  upload_preset: 'ml_default'
};

export async function GET(request: NextRequest) {
  try {
    console.log('🔧 Checking Cloudinary configuration...');
    
    // Test if we can reach Cloudinary
    const testUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloud_name}/image/upload`;
    
    console.log('🌐 Testing Cloudinary endpoint:', testUrl);
    
    // Create a simple test image
    const simpleSvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#4A90E2"/>
      <text x="50" y="50" text-anchor="middle" fill="white">Test</text>
    </svg>`;
    
    const svgBuffer = Buffer.from(simpleSvg);
    const blob = new Blob([svgBuffer], { type: 'image/svg+xml' });
    
    const formData = new FormData();
    formData.append('file', blob, 'test-config.svg');
    formData.append('upload_preset', CLOUDINARY_CONFIG.upload_preset);
    formData.append('cloud_name', CLOUDINARY_CONFIG.cloud_name);
    formData.append('api_key', CLOUDINARY_CONFIG.api_key);

    const response = await fetch(testUrl, {
      method: 'POST',
      body: formData,
    });

    console.log('📡 Cloudinary config test response:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        success: true,
        cloudinary: CLOUDINARY_CONFIG,
        testResult: 'PASSED',
        uploadedImage: data.secure_url,
        message: 'Cloudinary configuration is working correctly!'
      });
    } else {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        cloudinary: CLOUDINARY_CONFIG,
        testResult: 'FAILED',
        error: `Cloudinary responded with ${response.status}: ${errorText}`,
        tip: 'Check your upload preset configuration in Cloudinary dashboard'
      });
    }

  } catch (error) {
    console.error('❌ Cloudinary config check failed:', error);
    
    return NextResponse.json({
      success: false,
      cloudinary: CLOUDINARY_CONFIG,
      testResult: 'FAILED',
      error: error instanceof Error ? error.message : 'Configuration check failed',
      commonIssues: [
        '1. Upload preset "ml_default" might not exist',
        '2. Upload preset might require signed uploads',
        '3. Cloud name might be incorrect',
        '4. API key might be invalid'
      ]
    });
  }
}