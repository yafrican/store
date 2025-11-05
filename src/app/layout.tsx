import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import MobileBottomNav from '@/components/MobileBottomNav'
import { WishlistProvider } from './contexts/WishlistContext'
import { CartProvider } from './contexts/CartContext'
import Footer from '@/components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'Yafrican | Local Marketplace for Ethiopia',
  description: 'Discover and shop from local sellers in Ethiopia. Yafrican makes it easy to connect buyers and sellers.',
  keywords: 'ethiopia, marketplace, shopping, local sellers, online store',
  authors: [{ name: 'Yafrican Team' }],
  viewport: 'width=device-width, initial-scale=1',
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
            {/* Navbar - Visible on all devices */}
            <Navbar />

            {/* Main Content */}
            <main className="w-full flex justify-center min-h-screen">
              <div className="w-full">
                {children}
              </div>
            </main>

            {/* Mobile Bottom Navigation - Only on mobile */}
            <MobileBottomNav />

            {/* Footer - Visible on all devices */}
            <Footer />

            {/* React Toastify Container */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}