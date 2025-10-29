// utils/generateSlug.ts
import Product from '@/models/Product'

export async function generateUniqueSlug(name: string): Promise<string> {
  const baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces & symbols with -
    .replace(/^-+|-+$/g, '') // remove leading/trailing dashes

  let slug = baseSlug
  let counter = 1

  // Check if slug already exists in DB
  while (await Product.exists({ slug })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}
