// lib/watermark.ts
import sharp from 'sharp';

export async function addMultipleWatermarks(inputBuffer: Buffer): Promise<Buffer> {
  try {
    const metadata = await sharp(inputBuffer).metadata();
    const { width, height } = metadata;

    if (!width || !height) {
      throw new Error('Could not read image dimensions');
    }

    // Main diagonal watermark (subtle)
    const mainWatermark = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="50%" 
          y="50%" 
          text-anchor="middle" 
          dominant-baseline="middle"
          font-family="Arial, sans-serif"
          font-size="${Math.floor(Math.min(width, height) * 0.08)}"
          font-weight="bold"
          fill="rgba(255,255,255,0.15)"
          transform="rotate(-45 ${width/2} ${height/2})"
        >
          yafrican.com
        </text>
      </svg>
    `;

    // Corner watermark (visible but professional)
    const cornerWatermark = `
      <svg width="180" height="30" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#000000" opacity="0.7" rx="4"/>
        <text 
          x="50%" 
          y="50%" 
          text-anchor="middle" 
          dominant-baseline="middle"
          font-family="Arial, sans-serif"
          font-size="14"
          font-weight="bold"
          fill="#FFFFFF"
        >
          yafrican.com
        </text>
      </svg>
    `;

    const mainSvgBuffer = Buffer.from(mainWatermark);
    const cornerSvgBuffer = Buffer.from(cornerWatermark);
    
    const watermarkedImage = await sharp(inputBuffer)
      .composite([
        {
          input: mainSvgBuffer,
          gravity: 'center',
          blend: 'overlay'
        },
        {
          input: cornerSvgBuffer,
          gravity: 'southeast',
          blend: 'over'
        }
      ])
      .jpeg({ 
        quality: 85,
        mozjpeg: true 
      })
      .toBuffer();

    return watermarkedImage;
  } catch (error) {
    console.error('Multiple watermarks error:', error);
    throw error;
  }
}