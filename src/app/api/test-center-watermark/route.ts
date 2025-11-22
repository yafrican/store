import { NextResponse } from 'next/server'
import { addMultipleWatermarks } from '@/lib/watermark'
import sharp from 'sharp'

export async function GET() {
  try {
    console.log('🎨 Testing watermark functions...')

    // Create a test image
    const testImage = await sharp({
      create: {
        width: 600,
        height: 400,
        channels: 3,
        background: { r: 200, g: 200, b: 200 }
      }
    })
      .jpeg()
      .toBuffer()

    // Apply watermark
    const watermarked = await addMultipleWatermarks(testImage)

    console.log('✅ Watermark test successful')

    return new NextResponse(new Uint8Array(watermarked), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'inline; filename="test-watermark.jpg"'
      }
    })
  } catch (error) {
    console.error('❌ Watermark test failed:', error)

    return NextResponse.json(
      {
        success: false,
        error:
          'Watermark test failed: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    )
  }
}
