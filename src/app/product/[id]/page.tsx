'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  PhoneIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/solid'

const mockProduct = {
  id: 1,
  name: 'MSI GF66 Gaming Laptop',
  description: 'High-performance laptop for gamers with NVIDIA graphics, 16GB RAM, and 512GB SSD.',
  price: 120000,
  images: [
    'https://m.media-amazon.com/images/I/61-TMUCSYPL.__AC_SY300_SX300_QL70_FMwebp_.jpg',
    'https://m.media-amazon.com/images/I/71MHnBYHUlL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    'https://m.media-amazon.com/images/I/81GrCeuCzxL.__AC_SY300_SX300_QL70_FMwebp_.jpg',
  ],
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(mockProduct.images[0])
  const [phone, setPhone] = useState('')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Main Image & Thumbnails */}
        <div className="flex-1">
          <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
            <img
              src={selectedImage}
              alt={mockProduct.name}
              className="object-contain h-full"
            />
          </div>

          <div className="mt-4 flex gap-3 flex-wrap">
            {mockProduct.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 border-2 ${
                  selectedImage === img ? 'border-green-500' : 'border-transparent'
                } rounded hover:border-green-600 overflow-hidden`}
              >
                <img
                  src={img}
                  alt={`thumb-${idx}`}
                  className="object-contain w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold text-green-700">{mockProduct.name}</h1>
          <p className="text-gray-700 text-lg">{mockProduct.description}</p>
          <p className="text-green-700 text-2xl font-bold">{mockProduct.price.toFixed(2)} Br</p>

          {/* Call Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+251911000000"
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold"
            >
              <PhoneIcon className="w-5 h-5" />
              Call 0911 000 000
            </a>
            <a
              href="tel:+251922000000"
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold"
            >
              <PhoneIcon className="w-5 h-5" />
              Call 0922 000 000
            </a>
          </div>

          {/* Telegram & WhatsApp */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://t.me/YOUR_CHANNEL"
              target="_blank"
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-semibold"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              Telegram
            </a>
            <a
              href="https://wa.me/251911000000"
              target="_blank"
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition font-semibold"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              WhatsApp
            </a>
          </div>

          {/* Order by Phone (Input + Button) */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              alert(`Order placed with phone: ${phone}`)
            }}
            className="flex flex-wrap gap-3 items-center pt-2"
          >
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              required
              className="flex-[2] min-w-[220px] px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="flex-[1] min-w-[140px] flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded font-semibold transition"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Order Now
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
