import Hero from '@/components/Hero'
import ProductListing from '@/components/ProductListing'

export default function HomePage() {
  return (
    <div className="w-full mx-auto bg-yellow-50">
      <Hero />
      <ProductListing />
      {/* other homepage content */}
    </div>
  )
}
