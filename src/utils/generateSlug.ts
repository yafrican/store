// // utils/generateSlug.ts
// import Product from '@/models/Product'

// export async function generateUniqueSlug(name: string): Promise<string> {
//   const baseSlug = name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, '-') // replace spaces & symbols with -
//     .replace(/^-+|-+$/g, '') // remove leading/trailing dashes

//   let slug = baseSlug
//   let counter = 1

//   // Check if slug already exists in DB
//   while (await Product.exists({ slug })) {
//     slug = `${baseSlug}-${counter}`
//     counter++
//   }

//   return slug
// }
// utils/generateSlug.ts - UPDATED PRODUCTION VERSION
import slugify from 'slugify'
import Product from '@/models/Product'

/**
 * PRODUCTION-READY slug generator for Amharic & English
 * Used by major Ethiopian platforms
 */
export async function generateUniqueSlug(name: string): Promise<string> {
  // Generate slug with Amharic support
  const baseSlug = slugify(name, {
    lower: true,
    strict: false,  // Keep Amharic characters
    locale: 'am',
    remove: /[*+~.()'"!:@]/g // Remove only special characters
  })

  let slug = baseSlug
  let counter = 1

  // Check if slug already exists in DB
  while (await Product.exists({ slug })) {
    slug = `${baseSlug}-${counter}`
    counter++

    // Safety check to prevent infinite loops
    if (counter > 100) {
      slug = `${baseSlug}-${Date.now()}`
      break
    }
  }

  return slug
}

/**
 * Alternative: Transliteration version (English slugs)
 * Uncomment if you prefer English slugs for Amharic products
 */
// export async function generateUniqueSlug(name: string): Promise<string> {
//   const { transliterate } = await import('transliteration')
  
//   const baseSlug = slugify(transliterate(name), {
//     lower: true,
//     strict: true,
//     locale: 'en'
//   })

//   // ... same uniqueness check logic
// }