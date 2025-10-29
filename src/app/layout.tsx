import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { WishlistProvider } from './contexts/WishlistContext'
import { CartProvider } from './contexts/CartContext'
import Footer from '@/components/Footer'
export const metadata: Metadata = {
  title: 'Yafrican | Local Marketplace for Ethiopia',
  description: 'Discover and shop from local sellers in Ethiopia. Yafrican makes it easy to connect buyers and sellers.',
  keywords: ['Yafrican', 'Ethiopia Marketplace', 'Local Shopping', 'Buy and Sell Ethiopia'],
  authors: [{ name: 'Yafrican Team' }],
  openGraph: {
    title: 'Yafrican | Local Marketplace for Ethiopia',
    description: 'Buy and sell locally in Ethiopia with Yafrican.',
    url: 'https://yafrican.com',
    siteName: 'Yafrican',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yafrican | Local Marketplace for Ethiopia',
    description: 'Discover and shop from local sellers in Ethiopia.',
    creator: '@yafrican',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased w-full">
                <CartProvider>

        <WishlistProvider>
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <div className="w-full flex justify-center">
            <div className="w-full">
              {children}
            </div>
          </div>

          {/* Footer */}
          {/* <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600 border-t w-full">
            © {new Date().getFullYear()} Yafrican. All rights reserved.
          </footer> */}
          <Footer/>
        </WishlistProvider>
                </CartProvider>

      </body>
    </html>
  )
}