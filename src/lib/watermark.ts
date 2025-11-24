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

// lib/watermark.ts
import sharp from "sharp";

// Centered watermark
export async function addCenteredVisibleWatermark(input: Buffer): Promise<Buffer> {
  const image = sharp(input);
  const meta = await image.metadata();

  if (!meta.width || !meta.height) throw new Error("Invalid image dimensions");

  const font = Math.floor(Math.min(meta.width, meta.height) * 0.08);

  const svg = `
    <svg width="${meta.width}" height="${meta.height}">
      <text x="50%" y="50%" text-anchor="middle"
        font-family="Arial" font-size="${font}" font-weight="bold"
        fill="rgba(255,255,255,0.85)"
        stroke="rgba(0,0,0,0.8)" stroke-width="2">
        yafrican.com
      </text>
    </svg>
  `;

  return image
    .composite([{ input: Buffer.from(svg), gravity: "center" }])
    .jpeg({ quality: 85 })
    .toBuffer();
}

// Fallback watermark
export async function addProductionWatermark(input: Buffer): Promise<Buffer> {
  try {
    const meta = await sharp(input).metadata();
    if (!meta.width || !meta.height) return input;

    const svg = `
      <svg width="${meta.width}" height="${meta.height}">
        <rect x="${meta.width - 230}" y="${meta.height - 60}" width="220" height="50"
          fill="black" opacity="0.8" rx="8"/>
        <text x="${meta.width - 120}" y="${meta.height - 25}"
          text-anchor="middle" font-size="26" font-weight="bold"
          fill="white">
          yafrican.com
        </text>
      </svg>
    `;

    return sharp(input)
      .composite([{ input: Buffer.from(svg) }])
      .jpeg({ quality: 85 })
      .toBuffer();
  } catch {
    return input;
  }
}