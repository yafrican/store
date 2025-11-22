// app/api/upload-signed/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addCenteredWatermark } from '@/lib/watermark';
import crypto from 'crypto';

const CLOUDINARY_CONFIG = {
  cloud_name: 'dh3ehrc3p',
  api_key: '954112281589694',
  api_secret: 'kWi_7ggA3-E8rRjCvV08MSBcXiQ'
};

export async function POST(request: NextRequest) {
  try {
    console.log('📤 Signed upload started...');
    
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    const addWatermark = formData.get('addWatermark') === 'true';
    
    console.log(`📤 Processing ${files.length} files, watermark: ${addWatermark}`);

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files uploaded' },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      try {
        if (!file.type.startsWith('image/')) {
          console.warn(`⚠️ Skipping non-image file: ${file.name}`);
          continue;
        }

        const arrayBuffer = await file.arrayBuffer();
        let finalBuffer = Buffer.from(arrayBuffer);

        // Apply watermark if requested
        if (addWatermark) {
          console.log(`🎨 Adding watermark to: ${file.name}`);
          try {
            finalBuffer = await addCenteredWatermark(finalBuffer);
            console.log(`✅ Watermark applied to: ${file.name}`);
          } catch (watermarkError) {
            console.error(`❌ Watermark failed for ${file.name}:`, watermarkError);
          }
        }

        // Generate signature for signed upload
        const timestamp = Math.round(Date.now() / 1000);
        const params = {
          timestamp: timestamp,
          // You can add other parameters here if needed
        };
        
        // Create signature
        const signatureString = Object.keys(params)
          .sort()
          .map(key => `${key}=${params[key]}`)
          .join('&') + CLOUDINARY_CONFIG.api_secret;
          
        const signature = crypto
          .createHash('sha1')
          .update(signatureString)
          .digest('hex');

        // Upload to Cloudinary with signed request
        const cloudinaryFormData = new FormData();
        const blob = new Blob([finalBuffer], { type: file.type });
        cloudinaryFormData.append('file', blob, file.name);
        cloudinaryFormData.append('cloud_name', CLOUDINARY_CONFIG.cloud_name);
        cloudinaryFormData.append('api_key', CLOUDINARY_CONFIG.api_key);
        cloudinaryFormData.append('timestamp', params.timestamp.toString());
        cloudinaryFormData.append('signature', signature);

        console.log(`📤 Uploading to Cloudinary (signed): ${file.name}`);
        
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloud_name}/image/upload`,
          {
            method: 'POST',
            body: cloudinaryFormData,
          }
        );

        console.log('📡 Cloudinary response status:', cloudinaryResponse.status);
        
        if (!cloudinaryResponse.ok) {
          const errorText = await cloudinaryResponse.text();
          throw new Error(`Cloudinary upload failed: ${cloudinaryResponse.status} - ${errorText}`);
        }

        const cloudinaryData = await cloudinaryResponse.json();
        
        if (cloudinaryData.secure_url) {
          console.log(`✅ Upload successful: ${cloudinaryData.secure_url}`);
          uploadedUrls.push(cloudinaryData.secure_url);
        } else {
          throw new Error('No secure_url in Cloudinary response');
        }

      } catch (fileError) {
        console.error(`❌ Error processing file ${file.name}:`, fileError);
      }
    }

    if (uploadedUrls.length === 0) {
      throw new Error('All file uploads failed');
    }

    console.log('✅ All signed uploads completed:', uploadedUrls);
    
    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      uploadType: 'signed',
      message: addWatermark ? 'Images uploaded with watermark' : 'Images uploaded without watermark'
    });

  } catch (error) {
    console.error('❌ Signed upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Signed upload failed'
      },
      { status: 500 }
    );
  }
}