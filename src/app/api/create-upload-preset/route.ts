// app/api/create-upload-preset/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CLOUDINARY_CONFIG = {
  cloud_name: 'dh3ehrc3p',
  api_key: '954112281589694',
  api_secret: 'kWi_7ggA3-E8rRjCvV08MSBcXiQ'
};

export async function POST(request: NextRequest) {
  try {
    console.log('🛠️ Creating upload preset...');
    
    const { presetName = 'ml_default' } = await request.json();
    
    // Create upload preset using Cloudinary API
    const formData = new FormData();
    formData.append('name', presetName);
    formData.append('unsigned', 'true'); // Allow unsigned uploads
    formData.append('folder', 'yafrican-products'); // Optional: organize in folder
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloud_name}/upload_presets`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${CLOUDINARY_CONFIG.api_key}:${CLOUDINARY_CONFIG.api_secret}`).toString('base64')}`
        },
        body: formData
      }
    );

    console.log('📡 Create preset response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Upload preset created successfully:', data);
      
      return NextResponse.json({
        success: true,
        message: `Upload preset "${presetName}" created successfully!`,
        preset: data,
        nextSteps: [
          'Now test the watermark functionality',
          'Use this preset in all your uploads'
        ]
      });
    } else {
      const errorText = await response.text();
      console.error('❌ Failed to create upload preset:', errorText);
      
      // If creation fails, let's try the manual approach
      return NextResponse.json({
        success: false,
        error: `Failed to create upload preset: ${response.status} - ${errorText}`,
        manualSteps: [
          '1. Go to https://cloudinary.com/console',
          '2. Click Settings (gear icon)',
          '3. Go to Upload tab',
          '4. Scroll to "Upload presets" section',
          '5. Click "Add upload preset"',
          '6. Name it: ml_default',
          '7. Set "Signing mode" to: Unsigned',
          '8. Click "Save"'
        ]
      });
    }

  } catch (error) {
    console.error('❌ Create preset failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create upload preset',
      emergencySolution: 'Use signed uploads without preset (see alternative route)'
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to create an upload preset',
    example: {
      method: 'POST',
      body: {
        presetName: 'ml_default' // or any name you prefer
      }
    },
    presetDetails: {
      name: 'ml_default',
      type: 'unsigned',
      purpose: 'Allow image uploads without authentication'
    }
  });
}