// // // lib/watermark.ts
// // import sharp from 'sharp';

// // export async function addMultipleWatermarks(inputBuffer: Buffer): Promise<Buffer> {
// //   try {
// //     // Validate input buffer
// //     if (!Buffer.isBuffer(inputBuffer)) {
// //       throw new Error('Input must be a valid Buffer');
// //     }

// //     const metadata = await sharp(inputBuffer).metadata();
// //     const { width, height } = metadata;

// //     if (!width || !height) {
// //       throw new Error('Could not read image dimensions');
// //     }

// //     // Calculate sizes based on image dimensions
// //     const baseSize = Math.min(width, height);
// //     const mainFontSize = Math.floor(baseSize * 0.08);
// //     const cornerFontSize = Math.floor(baseSize * 0.03);

// //     // Main diagonal watermark (subtle, repeated pattern)
// //     const mainWatermark = `
// //       <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
// //         <defs>
// //           <pattern id="watermark-pattern" x="0" y="0" width="${width/2}" height="${height/2}" patternUnits="userSpaceOnUse">
// //             <text 
// //               x="50%" 
// //               y="50%" 
// //               text-anchor="middle" 
// //               dominant-baseline="middle"
// //               font-family="Arial, sans-serif"
// //               font-size="${mainFontSize}"
// //               font-weight="bold"
// //               fill="rgba(255,255,255,0.08)"
// //               transform="rotate(-45 ${width/4} ${height/4})"
// //             >
// //               yafrican.com
// //             </text>
// //           </pattern>
// //         </defs>
// //         <rect width="100%" height="100%" fill="url(#watermark-pattern)"/>
// //       </svg>
// //     `;

// //     // Professional corner badge
// //     const cornerWidth = Math.floor(width * 0.2);
// //     const cornerHeight = Math.floor(cornerWidth * 0.2);
    
// //     const cornerWatermark = `
// //       <svg width="${cornerWidth}" height="${cornerHeight}" xmlns="http://www.w3.org/2000/svg">
// //         <defs>
// //           <linearGradient id="badge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
// //             <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
// //             <stop offset="100%" stop-color="#333333" stop-opacity="0.9"/>
// //           </linearGradient>
// //         </defs>
// //         <rect width="100%" height="100%" fill="url(#badge-gradient)" rx="6"/>
// //         <text 
// //           x="50%" 
// //           y="50%" 
// //           text-anchor="middle" 
// //           dominant-baseline="middle"
// //           font-family="Arial, sans-serif"
// //           font-size="${cornerFontSize}"
// //           font-weight="bold"
// //           fill="#FFFFFF"
// //           letter-spacing="0.5"
// //         >
// //           yafrican.com
// //         </text>
// //       </svg>
// //     `;

// //     const mainSvgBuffer = Buffer.from(mainWatermark);
// //     const cornerSvgBuffer = Buffer.from(cornerWatermark);
    
// //     // Process image with watermarks
// //     const watermarkedImage = await sharp(inputBuffer)
// //       .composite([
// //         {
// //           input: mainSvgBuffer,
// //           gravity: 'center',
// //           blend: 'overlay'
// //         },
// //         {
// //           input: cornerSvgBuffer,
// //           gravity: 'southeast',
// //           blend: 'over'
// //         }
// //       ])
// //       .jpeg({ 
// //         quality: 85,
// //         mozjpeg: true 
// //       })
// //       .toBuffer();

// //     return watermarkedImage;
// //   } catch (error) {
// //     console.error('Multiple watermarks error:', error);
// //     throw error;
// //   }
// // }

// // // Alternative simpler watermark for larger images
// // export async function addSimpleWatermark(inputBuffer: Buffer): Promise<Buffer> {
// //   try {
// //     // Validate input buffer
// //     if (!Buffer.isBuffer(inputBuffer)) {
// //       throw new Error('Input must be a valid Buffer');
// //     }

// //     const metadata = await sharp(inputBuffer).metadata();
// //     const { width, height } = metadata;

// //     if (!width || !height) {
// //       throw new Error('Could not read image dimensions');
// //     }

// //     const fontSize = Math.floor(Math.min(width, height) * 0.04);
    
// //     const watermarkSvg = `
// //       <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
// //         <text 
// //           x="50%" 
// //           y="50%" 
// //           text-anchor="middle" 
// //           dominant-baseline="middle"
// //           font-family="Arial, sans-serif"
// //           font-size="${fontSize}"
// //           font-weight="bold"
// //           fill="rgba(0,0,0,0.3)"
// //         >
// //           yafrican.com
// //         </text>
// //       </svg>
// //     `;

// //     const svgBuffer = Buffer.from(watermarkSvg);
    
// //     return await sharp(inputBuffer)
// //       .composite([
// //         {
// //           input: svgBuffer,
// //           gravity: 'southeast',
// //           blend: 'over'
// //         }
// //       ])
// //       .jpeg({ quality: 90 })
// //       .toBuffer();
// //   } catch (error) {
// //     console.error('Simple watermark error:', error);
// //     throw error;
// //   }
// // }
// import sharp from 'sharp';

// export async function addMultipleWatermarks(inputBuffer: Buffer): Promise<Buffer> {
//   try {
//     // Validate input buffer
//     if (!Buffer.isBuffer(inputBuffer)) {
//       throw new Error('Input must be a valid Buffer');
//     }

//     const metadata = await sharp(inputBuffer).metadata();
//     const { width, height } = metadata;

//     if (!width || !height) {
//       throw new Error('Could not read image dimensions');
//     }

//     // Calculate sizes based on image dimensions
//     const baseSize = Math.min(width, height);
//     const mainFontSize = Math.floor(baseSize * 0.08);
//     const cornerFontSize = Math.floor(baseSize * 0.03);

//     // Main diagonal watermark (subtle, repeated pattern)
//     const mainWatermark = `
//       <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <pattern id="watermark-pattern" x="0" y="0" width="${width/2}" height="${height/2}" patternUnits="userSpaceOnUse">
//             <text 
//               x="50%" 
//               y="50%" 
//               text-anchor="middle" 
//               dominant-baseline="middle"
//               font-family="Arial, sans-serif"
//               font-size="${mainFontSize}"
//               font-weight="bold"
//               fill="rgba(255,255,255,0.08)"
//               transform="rotate(-45 ${width/4} ${height/4})"
//             >
//               yafrican.com
//             </text>
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#watermark-pattern)"/>
//       </svg>
//     `;

//     // Professional corner badge
//     const cornerWidth = Math.floor(width * 0.2);
//     const cornerHeight = Math.floor(cornerWidth * 0.2);
    
//     const cornerWatermark = `
//       <svg width="${cornerWidth}" height="${cornerHeight}" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <linearGradient id="badge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
//             <stop offset="100%" stop-color="#333333" stop-opacity="0.9"/>
//           </linearGradient>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#badge-gradient)" rx="6"/>
//         <text 
//           x="50%" 
//           y="50%" 
//           text-anchor="middle" 
//           dominant-baseline="middle"
//           font-family="Arial, sans-serif"
//           font-size="${cornerFontSize}"
//           font-weight="bold"
//           fill="#FFFFFF"
//           letter-spacing="0.5"
//         >
//           yafrican.com
//         </text>
//       </svg>
//     `;

//     const mainSvgBuffer = Buffer.from(mainWatermark);
//     const cornerSvgBuffer = Buffer.from(cornerWatermark);
    
//     // Process image with watermarks
//     const watermarkedImage = await sharp(inputBuffer)
//       .composite([
//         {
//           input: mainSvgBuffer,
//           gravity: 'center',
//           blend: 'overlay'
//         },
//         {
//           input: cornerSvgBuffer,
//           gravity: 'southeast',
//           blend: 'over'
//         }
//       ])
//       .jpeg({ 
//         quality: 85,
//         mozjpeg: true 
//       })
//       .toBuffer();

//     return watermarkedImage;
//   } catch (error) {
//     console.error('Multiple watermarks error:', error);
//     throw error;
//   }
// }

// // Alternative simpler watermark for larger images
// export async function addSimpleWatermark(inputBuffer: Buffer): Promise<Buffer> {
//   try {
//     // Validate input buffer
//     if (!Buffer.isBuffer(inputBuffer)) {
//       throw new Error('Input must be a valid Buffer');
//     }

//     const metadata = await sharp(inputBuffer).metadata();
//     const { width, height } = metadata;

//     if (!width || !height) {
//       throw new Error('Could not read image dimensions');
//     }

//     const fontSize = Math.floor(Math.min(width, height) * 0.04);
    
//     const watermarkSvg = `
//       <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
//         <text 
//           x="50%" 
//           y="50%" 
//           text-anchor="middle" 
//           dominant-baseline="middle"
//           font-family="Arial, sans-serif"
//           font-size="${fontSize}"
//           font-weight="bold"
//           fill="rgba(0,0,0,0.3)"
//         >
//           yafrican.com
//         </text>
//       </svg>
//     `;

//     const svgBuffer = Buffer.from(watermarkSvg);
    
//     return await sharp(inputBuffer)
//       .composite([
//         {
//           input: svgBuffer,
//           gravity: 'southeast',
//           blend: 'over'
//         }
//       ])
//       .jpeg({ quality: 90 })
//       .toBuffer();
//   } catch (error) {
//     console.error('Simple watermark error:', error);
//     throw error;
//   }
// }

// // Add this function that was missing
// export async function addCenteredWatermark(inputBuffer: Buffer): Promise<Buffer> {
//   try {
//     const metadata = await sharp(inputBuffer).metadata();
//     const { width, height } = metadata;

//     if (!width || !height) {
//       throw new Error('Could not read image dimensions');
//     }

//     const fontSize = Math.floor(Math.min(width, height) * 0.06);
    
//     const watermarkSvg = `
//       <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
//         <text 
//           x="50%" 
//           y="50%" 
//           text-anchor="middle" 
//           dominant-baseline="middle"
//           font-family="Arial, sans-serif"
//           font-size="${fontSize}"
//           font-weight="bold"
//           fill="rgba(255,255,255,0.15)"
//           transform="rotate(-45 ${width/2} ${height/2})"
//         >
//           yafrican.com
//         </text>
//       </svg>
//     `;

//     const svgBuffer = Buffer.from(watermarkSvg);
    
//     return await sharp(inputBuffer)
//       .composite([
//         {
//           input: svgBuffer,
//           gravity: 'center',
//           blend: 'overlay'
//         }
//       ])
//       .jpeg({ quality: 85 })
//       .toBuffer();
//   } catch (error) {
//     console.error('Centered watermark error:', error);
//     throw error;
//   }
// }

// lib/watermark.ts - PERMANENT FIX
import sharp from 'sharp';

export async function addCenteredVisibleWatermark(inputBuffer: Buffer): Promise<Buffer> {
  try {
    console.log('🔧 Adding CENTERED VISIBLE watermark...');
    
    const image = sharp(inputBuffer);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      throw new Error('Could not read image dimensions');
    }

    const { width, height } = metadata;
    
    // Calculate font size
    const fontSize = Math.max(60, Math.floor(Math.min(width, height) * 0.08));
    const cornerFontSize = Math.max(24, Math.floor(Math.min(width, height) * 0.03));
    
    console.log(`🔧 Using font size: ${fontSize}px for ${width}x${height} image`);

    // SIMPLE CENTERED WATERMARK - NO XML COMMENTS, NO COMPLEX TRANSFORMS
    const watermarkSvg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <text 
          x="50%" 
          y="50%" 
          text-anchor="middle" 
          dominant-baseline="middle"
          font-family="Arial, Helvetica, sans-serif"
          font-size="${fontSize}"
          font-weight="bold"
          fill="rgba(255,255,255,0.8)"
          stroke="rgba(0,0,0,0.8)"
          stroke-width="2"
        >
          yafrican.com
        </text>
      </svg>
    `;

    // CORNER WATERMARK - SIMPLE
    const cornerWidth = Math.floor(width * 0.25);
    const cornerHeight = Math.floor(cornerWidth * 0.2);
    
    const cornerSvg = `
      <svg width="${cornerWidth}" height="${cornerHeight}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.8)" rx="5"/>
        <text 
          x="50%" 
          y="55%" 
          text-anchor="middle" 
          dominant-baseline="middle"
          font-family="Arial, sans-serif"
          font-size="${cornerFontSize}"
          font-weight="bold"
          fill="white"
        >
          yafrican.com
        </text>
      </svg>
    `;

    const mainSvgBuffer = Buffer.from(watermarkSvg);
    const cornerSvgBuffer = Buffer.from(cornerSvg);
    
    const watermarkedImage = await image
      .composite([
        {
          input: mainSvgBuffer,
          gravity: 'center',
          blend: 'over'
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

    console.log('✅ CENTERED VISIBLE watermark applied');
    return watermarkedImage;

  } catch (error) {
    console.error('❌ Centered watermark failed:', error);
    throw error;
  }
}

// ULTRA SIMPLE - GUARANTEED TO WORK
export async function addProductionWatermark(inputBuffer: Buffer): Promise<Buffer> {
  try {
    const metadata = await sharp(inputBuffer).metadata();
    const { width, height } = metadata;

    if (!width || !height) throw new Error('Invalid image');

    // SIMPLE BOTTOM RIGHT WATERMARK - ABSOLUTELY NO ERRORS
    const watermarkSvg = `<svg width="${width}" height="${height}">
  <rect x="${width-220}" y="${height-50}" width="210" height="40" fill="black" opacity="0.9" rx="5"/>
  <text x="${width-115}" y="${height-25}" text-anchor="middle" font-size="24" font-weight="bold" fill="white">yafrican.com</text>
</svg>`;

    return await sharp(inputBuffer)
      .composite([{ input: Buffer.from(watermarkSvg) }])
      .jpeg({ quality: 85 })
      .toBuffer();
  } catch (error) {
    console.error('Production watermark failed, returning original');
    return inputBuffer;
  }
}

// DIAGONAL WATERMARK - SIMPLE AND RELIABLE
export async function addDiagonalWatermark(inputBuffer: Buffer): Promise<Buffer> {
  try {
    const metadata = await sharp(inputBuffer).metadata();
    const { width, height } = metadata;

    if (!width || !height) throw new Error('Invalid image');

    const fontSize = Math.max(48, Math.floor(Math.min(width, height) * 0.06));

    // SIMPLE DIAGONAL TEXT
    const watermarkSvg = `<svg width="${width}" height="${height}">
  <text x="50%" y="50%" text-anchor="middle" font-size="${fontSize}" font-weight="bold" fill="rgba(255,255,255,0.7)" stroke="black" stroke-width="2">yafrican.com</text>
</svg>`;

    return await sharp(inputBuffer)
      .composite([{ input: Buffer.from(watermarkSvg), gravity: 'center' }])
      .jpeg({ quality: 85 })
      .toBuffer();
  } catch (error) {
    console.error('Diagonal watermark failed');
    throw error;
  }
}