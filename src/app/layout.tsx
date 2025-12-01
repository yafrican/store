// // src/app/layout.tsx
// import './globals.css'
// import type { Metadata } from 'next'
// import Navbar from '@/components/Navbar'
// import MobileBottomNav from '@/components/MobileBottomNav'
// import { WishlistProvider } from './contexts/WishlistContext'
// import { CartProvider } from './contexts/CartContext'
// import Footer from '@/components/Footer'
// import ToastProvider from '@/components/ToastProvider'

// export const metadata: Metadata = {
//   title: 'Yafrican | Local Marketplace for Ethiopia',
//   description: 'Discover and shop from local sellers in Ethiopia. Yafrican makes it easy to connect buyers and sellers.',
//   keywords: 'ethiopia, marketplace, shopping, local sellers, online store',
//   authors: [{ name: 'Yafrican Team' }],
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </head>
//       <body className="bg-white text-gray-900 antialiased w-full">
//         <CartProvider>
//           <WishlistProvider>
//             {/* Navbar - Visible on all devices */}
//             <Navbar />

//             {/* Main Content */}
//             <main className="w-full flex justify-center min-h-screen">
//               <div className="w-full">
//                 {children}
//               </div>
//             </main>

//             {/* Mobile Bottom Navigation - Only on mobile */}
//             <MobileBottomNav />

//             {/* Footer - Visible on all devices */}
//             <Footer />
//             <ToastProvider />

//           </WishlistProvider>
//         </CartProvider>
//       </body>
//     </html>
//   )
// }

// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import MobileBottomNav from '@/components/MobileBottomNav'
import { WishlistProvider } from './contexts/WishlistContext'
import { CartProvider } from './contexts/CartContext'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ToastProvider'

// Generate a unique build ID
const BUILD_ID = process.env.BUILD_ID || Date.now().toString();

export const metadata: Metadata = {
  title: 'Yafrican | Local Marketplace for Ethiopia',
  description: 'Discover and shop from local sellers in Ethiopia. Yafrican makes it easy to connect buyers and sellers.',
  keywords: 'ethiopia, marketplace, shopping, local sellers, online store',
  authors: [{ name: 'Yafrican Team' }],
  icons: {
    icon: `/favicon.ico?v=${BUILD_ID}`,
    shortcut: `/favicon.ico?v=${BUILD_ID}`,
    apple: `/favicon.ico?v=${BUILD_ID}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* ✅ MULTIPLE FAVICON LINKS WITH CACHE BUSTING */}
        <link rel="icon" href={`/favicon.ico?v=${BUILD_ID}`} type="image/x-icon" />
        <link rel="shortcut icon" href={`/favicon.ico?v=${BUILD_ID}`} type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="32x32" href={`/favicon.ico?v=${BUILD_ID}`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`/favicon.ico?v=${BUILD_ID}`} />
        <link rel="apple-touch-icon" href={`/favicon.ico?v=${BUILD_ID}`} />
        
        {/* ✅ Also try data URL as fallback */}
        <link 
          rel="icon" 
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23f59e0b%22/><text x=%2250%22 y=%2265%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2248%22 font-weight=%22bold%22 fill=%22white%22>Y</text></svg>" 
          type="image/svg+xml" 
        />
        
        <title>Yafrican | Local Marketplace for Ethiopia</title>
      </head>
      <body className="bg-white text-gray-900 antialiased w-full">
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="w-full flex justify-center min-h-screen">
              <div className="w-full">
                {children}
              </div>
            </main>
            <MobileBottomNav />
            <Footer />
            <ToastProvider />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}