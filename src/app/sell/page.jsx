'use client'

import Link from 'next/link'

export default function SellPage() {
  return (
    <main className="max-w-4xl mx-auto p-8 mt-12 bg-white rounded shadow-md">
      <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
        Sell on Yafrican
      </h1>

      <p className="text-lg mb-8 text-gray-700 text-center">
        Join thousands of sellers who use Yafrican to reach customers all over Ethiopia and beyond.
        Selling on Yafrican is easy, fast, and secure.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">Step 1: Create Your Seller Account</h2>
          <p className="text-gray-700">
            Register for a seller account on Yafrican by providing your basic details and business information.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">Step 2: List Your Products</h2>
          <p className="text-gray-700">
            Add product details, prices, images, and descriptions to showcase what you want to sell.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">Step 3: Manage Orders & Shipping</h2>
          <p className="text-gray-700">
            Track your orders easily and coordinate shipping with your customers for a smooth transaction.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">Step 4: Receive Payments Securely</h2>
          <p className="text-gray-700">
            Get paid securely through our trusted payment gateways, ensuring timely payouts.
          </p>
        </div>
      </section>

      <div className="text-center mt-10">
        <Link
          href="/register"
          className="inline-block bg-green-700 text-white px-8 py-3 rounded font-semibold hover:bg-green-800 transition"
        >
          Start Selling Now
        </Link>
      </div>
    </main>
  )
}
