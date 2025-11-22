
// 'use client'

// import Link from 'next/link'
// import { useState, useEffect } from 'react'
// import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline'
// import { 
//   FaMobileAlt, 
//   FaTshirt, 
//   FaGamepad, 
//   FaHome, 
//   FaSmile, 
//   FaFutbol, 
//   FaBook,
//   FaShippingFast,
//   FaShieldAlt,
//   FaUndo,
//   FaHeadset,
//   FaTags
// } from 'react-icons/fa'

// const sliderImages = [
//   {
//     url: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//     title: 'Summer Tech Sale',
//     subtitle: 'Up to 50% Off on Electronics',
//     buttonText: 'Shop Now',
//     buttonLink: '/search?category=Electronics'
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//     title: 'New Arrivals',
//     subtitle: 'Latest Gadgets & Accessories',
//     buttonText: 'Explore',
//     buttonLink: '/search?sort=newest'
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//     title: 'Free Shipping',
//     subtitle: 'On Orders Over $50',
//     buttonText: 'Learn More',
//     buttonLink: '/search'
//   }
// ]

// // Define categories based on your structure - MUST match search page categories
// const defaultCategories = [
//   { 
//     name: 'Electronics', 
//     subcategories: [
//       'Phones', 'Laptops & Computers', 'Video Game Consoles', 'Audio & Music Equipment', 
//       'Headphones', 'Photo & Video Cameras', 'Security & Surveillance', 'Networking Products',
//       'Printers & Scanners', 'Computer Monitors', 'Computer Hardware', 'Computer Accessories',
//       'Electronic Accessories & Supplies', 'Video Games', 'Software'
//     ],
//     icon: FaMobileAlt
//   },
//   { 
//     name: 'Vehicles', 
//     subcategories: [
//       'Vehicle Parts & Accessories', 'Cars', 'Motorcycles & Scooters', 'Buses & Microbuses',
//       'Trucks & Trailers', 'Construction & Heavy Machinery', 'Watercraft & Boats', 'Car Services'
//     ],
//     icon: FaShippingFast
//   },
//   { 
//     name: 'Property', 
//     subcategories: [
//       'New Builds', 'Houses & Apartments for Rent', 'Houses & Apartments for Sale', 
//       'Land & Plots for Rent', 'Short Let', 'Land & Plots for Sale',
//       'Event Centres, Venues & Workstations', 'Commercial Property for Rent', 
//       'Commercial Property for Sale'
//     ],
//     icon: FaHome
//   },
//   { 
//     name: 'Home, Furniture & Appliances', 
//     subcategories: [
//       'Furniture', 'Lighting', 'Storage & Organization', 'Home Accessories',
//       'Kitchen Appliances', 'Kitchenware & Cookware', 'Household Chemicals', 'Garden Supplies'
//     ],
//     icon: FaHome
//   },
//   { 
//     name: 'Clothing', 
//     subcategories: ['Men', 'Women', 'Kids', 'Baby', 'Shoes', 'Accessories'],
//     icon: FaTshirt
//   },
//   { 
//     name: 'Books & Media', 
//     subcategories: ['Fiction', 'Non-Fiction', 'Children', 'Educational', 'Audio Books'],
//     icon: FaBook
//   },
//   { 
//     name: 'Automotive', 
//     subcategories: ['Car Care', 'Tools', 'Accessories', 'Parts', 'Motorcycle'],
//     icon: FaShippingFast
//   },
//   { 
//     name: 'Beauty & Personal Care', 
//     subcategories: [
//       'Hair Care & Beauty', 'Face Care', 'Oral Care', 'Body Care', 'Fragrances',
//       'Makeup', 'Tools & Accessories', 'Vitamins & Supplements', 'Massagers',
//       'Health & Beauty Services'
//     ],
//     icon: FaSmile
//   },
//   { 
//     name: 'Services', 
//     subcategories: [
//       'Building & Trade Services', 'Car Services', 'Computer & IT Services', 'Repair Services',
//       'Cleaning Services', 'Printing Services', 'Manufacturing Services', 'Logistics Services',
//       'Legal Services', 'Tax & Financial Services', 'Recruitment Services', 'Rental Services',
//       'Chauffeur & Airport Transfer Services', 'Travel Agents & Tours', 'Classes & Courses',
//       'Health & Beauty Services', 'Fitness & Personal Training', 'Party, Catering & Event Services',
//       'DJ & Entertainment Services', 'Photography & Video Services', 'Landscaping & Gardening Services',
//       'Pet Services'
//     ],
//     icon: FaHeadset
//   },
//   { 
//     name: 'Repair & Construction', 
//     subcategories: [
//       'Electrical Equipment', 'Building Materials & Supplies', 'Plumbing & Water Systems',
//       'Electrical Hand Tools', 'Hand Tools', 'Measuring & Testing Tools', 'Hardware & Fasteners',
//       'Doors & Security', 'Windows & Glass', 'Building & Trade Services', 'Repair Services'
//     ],
//     icon: FaShieldAlt
//   },
//   { 
//     name: 'Commercial Equipment', 
//     subcategories: [
//       'Medical Equipment & Supplies', 'Manufacturing Equipment', 'Retail & Store Equipment',
//       'Restaurant & Catering Equipment', 'Stationery & Office Equipment', 'Salon & Beauty Equipment',
//       'Printing & Graphics Equipment', 'Stage & Event Equipment', 'Manufacturing Services'
//     ],
//     icon: FaGamepad
//   },
//   { 
//     name: 'Leisure & Activities', 
//     subcategories: [
//       'Sports Equipment', 'Massagers', 'Musical Instruments & Gear', 'Books & Table Games',
//       'Arts, Crafts & Awards', 'Outdoor Gear', 'Music & Video', 'Fitness & Personal Training'
//     ],
//     icon: FaFutbol
//   },
//   { 
//     name: 'Babies & Kids', 
//     subcategories: [
//       'Toys, Games & Bikes', 'Children\'s Furniture', 'Children\'s Clothing', 'Children\'s Shoes',
//       'Babies & Kids Accessories', 'Baby Gear & Equipment', 'Care & Feeding', 'Maternity & Pregnancy',
//       'Transport & Safety', 'Playground Equipment', 'Child Care & Education'
//     ],
//     icon: FaSmile
//   },
//   { 
//     name: 'Food, Agriculture & Farming', 
//     subcategories: [
//       'Food & Beverages', 'Farm Animals', 'Feeds, Supplements & Seeds', 'Farm Machinery & Equipment',
//       'Farm Animal Feed & Supplies'
//     ],
//     icon: FaShippingFast
//   },
//   { 
//     name: 'Animals & Pets', 
//     subcategories: [
//       'Pet Accessories', 'Cats & Kittens', 'Dogs & Puppies', 'Fish', 'Birds',
//       'Pet Services', 'Other Animals'
//     ],
//     icon: FaSmile
//   }
// ]
// export default function Hero() {
//   const [categories, setCategories] = useState(defaultCategories)
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [showMobileCategories, setShowMobileCategories] = useState(false)
//   const [openSubcategoryIndex, setOpenSubcategoryIndex] = useState<number | null>(null)
//   const [isDesktop, setIsDesktop] = useState(false)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)
//   const [isMounted, setIsMounted] = useState(false)

//   useEffect(() => {
//     setIsMounted(true)
    
//     async function fetchCategories() {
//       try {
//         const res = await fetch('/api/categories')
//         if (res.ok) {
//           const data = await res.json()
//           if (data.categories && data.categories.length > 0) {
//             // Add icons to fetched categories
//             const categoriesWithIcons = data.categories.map((cat: { name: string; subcategories: string[] }) => {
//               const defaultCat = defaultCategories.find(dc => 
//                 dc.name.toLowerCase() === cat.name.toLowerCase()
//               )
//               return {
//                 ...cat,
//                 icon: defaultCat?.icon || FaTags
//               }
//             })
//             setCategories(categoriesWithIcons)
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error)
//         // Use default categories if fetch fails
//         setCategories(defaultCategories)
//       }
//     }

//     fetchCategories()
//   }, [])

//   useEffect(() => {
//     function handleResize() {
//       setIsDesktop(window.innerWidth >= 1024)
//     }
    
//     if (isMounted) {
//       handleResize()
//       window.addEventListener('resize', handleResize)
//       return () => window.removeEventListener('resize', handleResize)
//     }
//   }, [isMounted])

//   useEffect(() => {
//     let interval: NodeJS.Timeout
//     if (isAutoPlaying) {
//       interval = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
//       }, 5000)
//     }
//     return () => clearInterval(interval)
//   }, [isAutoPlaying, isDesktop])

//   function nextSlide() {
//     setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
//   }

//   function prevSlide() {
//     setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
//   }

//   function goToSlide(index: number) {
//     setCurrentSlide(index)
//   }

//   function toggleSubcategory(index: number) {
//     setOpenSubcategoryIndex((prev) => (prev === index ? null : index))
//   }

//   // Updated function to generate search page URLs with proper filtering
//   const getCategoryUrl = (categoryName: string, subcategoryName?: string) => {
//     const params = new URLSearchParams()
    
//     if (subcategoryName) {
//       // Search for products in this specific subcategory
//       params.set('category', categoryName)
//       params.set('subcategory', subcategoryName)
//     } else {
//       // Show all products in this category
//       params.set('category', categoryName)
//     }
    
//     return `/search?${params.toString()}`
//   }

//   // Function to handle main category clicks
//   const handleCategoryClick = (categoryName: string) => {
//     // Navigate to search page with category filter
//     const url = getCategoryUrl(categoryName)
//     window.location.href = url
//   }

//   return (
//     <section className="bg-linear-to-b from-gray-900 to-gray-800 py-4 lg:py-8" role="banner" aria-label="Hero section with categories and promotions">
//       <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* MOBILE ONLY: Simple Image Carousel with Links */}
//         <div className="lg:hidden ">
//           <div className="relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden h-[100px]">
//             {/* Slides */}
//             <div className="relative h-[100px]">
//               {sliderImages.map((slide, index) => (
//                 <Link
//                   key={index}
//                   href={slide.buttonLink}
//                   className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//                     index === currentSlide ? 'opacity-100' : 'opacity-0'
//                   }`}
//                   aria-hidden={index !== currentSlide}
//                 >
//                   <div
//                     className="absolute inset-0 bg-cover bg-center"
//                     style={{ backgroundImage: `url(${slide.url})` }}
//                   />
//                   <div className="absolute inset-0 bg-black/40" />
                  
//                   {/* Simple text overlay for mobile */}
//                   <div className="absolute bottom-4 left-4 right-4">
//                     <div className=" rounded-xl p-4">
//                       <h3 className="text-white font-bold text-lg mb-1">{slide.title}</h3>
//                       <p className="text-gray-200 text-sm mb-3">{slide.subtitle}</p>
//                       <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">
//                         {slide.buttonText}
//                         <PlayIcon className="w-4 h-4" />
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>

//             {/* Mobile Navigation Arrows */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
//               aria-label="Previous slide"
//             >
//               <ChevronLeftIcon className="w-5 h-5" />
//             </button>
//             <button
//               onClick={nextSlide}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
//               aria-label="Next slide"
//             >
//               <ChevronRightIcon className="w-5 h-5" />
//             </button>

//             {/* Mobile Slide Indicators - SMALLER DOTS */}
//             {/* <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
//               {sliderImages.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={(e) => {
//                     e.preventDefault()
//                     e.stopPropagation()
//                     goToSlide(index)
//                   }}
//                   className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//                     index === currentSlide
//                       ? 'bg-yellow-500 scale-110'
//                       : 'bg-white/50 hover:bg-white/70'
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div> */}
//           </div>
//         </div>

//         {/* DESKTOP: Full Functionality */}
//         <div className="hidden lg:flex flex-col lg:flex-row gap-8">
//           {/* Categories Sidebar */}
//           <div className="lg:w-64 flex-shrink-0">
//             <nav 
//               className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden h-auto max-h-[600px] overflow-y-auto"
//               aria-label="Product categories navigation"
//             >
//               <div className="bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-4 sticky top-0 z-10">
//                 <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
//                   <FaTags className="w-5 h-5" />
//                   All Categories
//                 </h2>
//               </div>
//               <ul className="py-2">
//                 {categories.map((cat, index) => {
//                   const IconComponent = cat.icon
//                   return (
//                     <li key={cat.name} className="border-b border-gray-700 last:border-b-0">
//                       {/* Main Category - Clickable */}
//                       <button
//                         onClick={() => handleCategoryClick(cat.name)}
//                         className="flex justify-between items-center w-full py-4 px-6 text-left transition-all duration-200 text-gray-300 hover:bg-gray-700 hover:text-white group"
//                         aria-label={`Browse ${cat.name} category`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
//                           <span className="font-semibold">{cat.name}</span>
//                         </div>
//                         <ChevronRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//                       </button>
                      
//                       {/* Subcategories - Toggleable */}
//                       <div className="border-t border-gray-700">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             toggleSubcategory(index)
//                           }}
//                           className={`flex justify-between items-center w-full py-3 px-6 text-left transition-all duration-200 text-xs ${
//                             openSubcategoryIndex === index
//                               ? 'bg-yellow-500/10 text-yellow-400'
//                               : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
//                           }`}
//                           aria-expanded={openSubcategoryIndex === index}
//                           aria-controls={`subcat-${index}`}
//                           aria-label={`Toggle ${cat.name} subcategories`}
//                         >
//                           <span>Browse {cat.name}</span>
//                           <ChevronRightIcon 
//                             className={`w-3 h-3 transition-transform duration-200 ${
//                               openSubcategoryIndex === index ? 'rotate-90' : ''
//                             }`} 
//                           />
//                         </button>
                        
//                         {openSubcategoryIndex === index && (
//                           <div
//                             id={`subcat-${index}`}
//                             className="bg-gray-900/50 px-6 pb-4 border-t border-gray-700"
//                             role="region"
//                             aria-label={`${cat.name} subcategories`}
//                           >
//                             <ul className="space-y-2 pt-2">
//                               {cat.subcategories.map((subcat) => (
//                                 <li key={subcat}>
//                                   <Link
//                                     href={getCategoryUrl(cat.name, subcat)}
//                                     className="block py-2 px-3 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-800 transition-all duration-200 text-sm font-medium"
//                                     onClick={() => setOpenSubcategoryIndex(null)}
//                                     aria-label={`Browse ${subcat} subcategory`}
//                                   >
//                                     {subcat}
//                                   </Link>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}
//                       </div>
//                     </li>
//                   )
//                 })}
//               </ul>
//             </nav>
//           </div>

//           {/* Hero Slider */}
//           <div className="flex-1 min-w-0">
//             <div className="relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden h-[500px]">
//               {/* Slides */}
//               <div className="relative h-full">
//                 {sliderImages.map((slide, index) => (
//                   <div
//                     key={index}
//                     className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//                       index === currentSlide ? 'opacity-100' : 'opacity-0'
//                     }`}
//                     aria-hidden={index !== currentSlide}
//                     role="group"
//                     aria-label={`Slide ${index + 1} of ${sliderImages.length}`}
//                   >
//                     <div
//                       className="absolute inset-0 bg-cover bg-center"
//                       style={{ backgroundImage: `url(${slide.url})` }}
//                       aria-hidden="true"
//                     />
//                     <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
//                     <div className="absolute inset-0 flex items-center">
//                       <div className="max-w-4xl mx-auto px-8 text-center lg:text-left">
//                         <div className="max-w-2xl">
//                           <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
//                             {slide.title}
//                           </h1>
//                           <p className="text-xl lg:text-2xl text-gray-200 mb-8 animate-fade-in-up animation-delay-200">
//                             {slide.subtitle}
//                           </p>
//                           <Link
//                             href={slide.buttonLink}
//                             className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 px-8 py-4 rounded-xl font-bold hover:from-yellow-600 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fade-in-up animation-delay-400"
//                             aria-label={`${slide.buttonText} - ${slide.title}`}
//                           >
//                             {slide.buttonText}
//                             <PlayIcon className="w-5 h-5" />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Desktop Navigation Arrows */}
//               <button
//                 onClick={prevSlide}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
//                 aria-label="Previous slide"
//               >
//                 <ChevronLeftIcon className="w-6 h-6" />
//               </button>
//               <button
//                 onClick={nextSlide}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
//                 aria-label="Next slide"
//               >
//                 <ChevronRightIcon className="w-6 h-6" />
//               </button>

//               {/* Desktop Slide Indicators */}
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10" role="tablist" aria-label="Slide indicators">
//                 {sliderImages.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => goToSlide(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       index === currentSlide
//                         ? 'bg-yellow-500 scale-125'
//                         : 'bg-white/50 hover:bg-white/70'
//                     }`}
//                     aria-label={`Go to slide ${index + 1}`}
//                     aria-selected={index === currentSlide}
//                     role="tab"
//                   />
//                 ))}
//               </div>

//               {/* Auto-play Toggle */}
//               <button
//                 onClick={() => setIsAutoPlaying(!isAutoPlaying)}
//                 className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-all duration-200 z-10"
//                 aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
//               >
//                 {isAutoPlaying ? '⏸️' : '▶️'}
//               </button>
//             </div>

//             {/* Trust Badges - Desktop Only */}
//             <div className="mt-6 grid grid-cols-4 gap-4" role="complementary" aria-label="Trust badges">
//               <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700 hover:border-yellow-500/30 transition-all duration-200">
//                 <FaShippingFast className="w-8 h-8 text-yellow-500 mx-auto mb-2" aria-hidden="true" />
//                 <h3 className="font-semibold text-white text-sm">Free Shipping</h3>
//                 <p className="text-gray-400 text-xs">Over $50</p>
//               </div>
//               <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700 hover:border-yellow-500/30 transition-all duration-200">
//                 <FaShieldAlt className="w-8 h-8 text-yellow-500 mx-auto mb-2" aria-hidden="true" />
//                 <h3 className="font-semibold text-white text-sm">Secure Payment</h3>
//                 <p className="text-gray-400 text-xs">100% Protected</p>
//               </div>
//               <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700 hover:border-yellow-500/30 transition-all duration-200">
//                 <FaUndo className="w-8 h-8 text-yellow-500 mx-auto mb-2" aria-hidden="true" />
//                 <h3 className="font-semibold text-white text-sm">Easy Returns</h3>
//                 <p className="text-gray-400 text-xs">30 Days Policy</p>
//               </div>
//               <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700 hover:border-yellow-500/30 transition-all duration-200">
//                 <FaHeadset className="w-8 h-8 text-yellow-500 mx-auto mb-2" aria-hidden="true" />
//                 <h3 className="font-semibold text-white text-sm">24/7 Support</h3>
//                 <p className="text-gray-400 text-xs">Always Here</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//         }
//         .animation-delay-200 {
//           animation-delay: 0.2s;
//         }
//         .animation-delay-400 {
//           animation-delay: 0.4s;
//         }
//       `}</style>
//     </section>
//   )
// }
'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { 
  FaMobileAlt, 
  FaTshirt, 
  FaGamepad, 
  FaHome, 
  FaSmile, 
  FaFutbol, 
  FaBook,
  FaShippingFast,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
  FaTags,
  FaCar,
  FaWrench,
  FaBuilding,
  FaUtensils,
  FaMusic,
  FaChild,
  FaSeedling,
  FaPaw
} from 'react-icons/fa'
import { IconType } from 'react-icons/lib'
// TypeScript interfaces
interface SubcategoryIcons {
  [key: string]: IconType
}
interface Category {
  name: string
  subcategories: string[]
  icon: IconType
  subcategoryIcons: SubcategoryIcons
}

interface FetchedCategory {
  name: string
  subcategories: string[]
  icon?: IconType
  subcategoryIcons?: SubcategoryIcons
}

const sliderImages = [
  {
    url: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Summer Tech Sale',
    subtitle: 'Up to 50% Off on Electronics',
    buttonText: 'Shop Now',
    buttonLink: '/search?category=Electronics'
  },
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'New Arrivals',
    subtitle: 'Latest Gadgets & Accessories',
    buttonText: 'Explore',
    buttonLink: '/search?sort=newest'
  },
  {
    url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Free Shipping',
    subtitle: 'On Orders Over $50',
    buttonText: 'Learn More',
    buttonLink: '/search'
  }
]

// Define categories based on your structure - MUST match search page categories
const defaultCategories: Category[] = [
  { 
    name: 'Electronics', 
    subcategories: [
      'Phones', 'Laptops & Computers', 'Video Game Consoles', 'Audio & Music Equipment', 
      'Headphones', 'Photo & Video Cameras', 'Security & Surveillance', 'Networking Products',
      'Printers & Scanners', 'Computer Monitors', 'Computer Hardware', 'Computer Accessories',
      'Electronic Accessories & Supplies', 'Video Games', 'Software'
    ],
    icon: FaMobileAlt,
    subcategoryIcons: {
      'Phones': FaMobileAlt,
      'Laptops & Computers': FaGamepad,
      'Video Game Consoles': FaGamepad,
      'Audio & Music Equipment': FaMusic,
      'Headphones': FaHeadset,
      'Photo & Video Cameras': FaMobileAlt,
      'Security & Surveillance': FaShieldAlt,
      'Networking Products': FaWrench,
      'Printers & Scanners': FaWrench,
      'Computer Monitors': FaGamepad,
      'Computer Hardware': FaWrench,
      'Computer Accessories': FaWrench,
      'Electronic Accessories & Supplies': FaWrench,
      'Video Games': FaGamepad,
      'Software': FaGamepad
    }
  },
  { 
    name: 'Vehicles', 
    subcategories: [
      'Vehicle Parts & Accessories', 'Cars', 'Motorcycles & Scooters', 'Buses & Microbuses',
      'Trucks & Trailers', 'Construction & Heavy Machinery', 'Watercraft & Boats', 'Car Services'
    ],
    icon: FaCar,
    subcategoryIcons: {
      'Vehicle Parts & Accessories': FaWrench,
      'Cars': FaCar,
      'Motorcycles & Scooters': FaCar,
      'Buses & Microbuses': FaCar,
      'Trucks & Trailers': FaCar,
      'Construction & Heavy Machinery': FaWrench,
      'Watercraft & Boats': FaCar,
      'Car Services': FaWrench
    }
  },
  { 
    name: 'Property', 
    subcategories: [
      'New Builds', 'Houses & Apartments for Rent', 'Houses & Apartments for Sale', 
      'Land & Plots for Rent', 'Short Let', 'Land & Plots for Sale',
      'Event Centres, Venues & Workstations', 'Commercial Property for Rent', 
      'Commercial Property for Sale'
    ],
    icon: FaBuilding,
    subcategoryIcons: {
      'New Builds': FaHome,
      'Houses & Apartments for Rent': FaHome,
      'Houses & Apartments for Sale': FaHome,
      'Land & Plots for Rent': FaHome,
      'Short Let': FaHome,
      'Land & Plots for Sale': FaHome,
      'Event Centres, Venues & Workstations': FaBuilding,
      'Commercial Property for Rent': FaBuilding,
      'Commercial Property for Sale': FaBuilding
    }
  },
  { 
    name: 'Home, Furniture & Appliances', 
    subcategories: [
      'Furniture', 'Lighting', 'Storage & Organization', 'Home Accessories',
      'Kitchen Appliances', 'Kitchenware & Cookware', 'Household Chemicals', 'Garden Supplies'
    ],
    icon: FaHome,
    subcategoryIcons: {
      'Furniture': FaHome,
      'Lighting': FaHome,
      'Storage & Organization': FaHome,
      'Home Accessories': FaHome,
      'Kitchen Appliances': FaUtensils,
      'Kitchenware & Cookware': FaUtensils,
      'Household Chemicals': FaHome,
      'Garden Supplies': FaHome
    }
  },
  { 
    name: 'Clothing', 
    subcategories: ['Men', 'Women', 'Kids', 'Baby', 'Shoes', 'Accessories'],
    icon: FaTshirt,
    subcategoryIcons: {
      'Men': FaTshirt,
      'Women': FaTshirt,
      'Kids': FaChild,
      'Baby': FaChild,
      'Shoes': FaTshirt,
      'Accessories': FaTshirt
    }
  },
  { 
    name: 'Books & Media', 
    subcategories: ['Fiction', 'Non-Fiction', 'Children', 'Educational', 'Audio Books'],
    icon: FaBook,
    subcategoryIcons: {
      'Fiction': FaBook,
      'Non-Fiction': FaBook,
      'Children': FaBook,
      'Educational': FaBook,
      'Audio Books': FaHeadset
    }
  },
  { 
    name: 'Beauty & Personal Care', 
    subcategories: [
      'Hair Care & Beauty', 'Face Care', 'Oral Care', 'Body Care', 'Fragrances',
      'Makeup', 'Tools & Accessories', 'Vitamins & Supplements', 'Massagers',
      'Health & Beauty Services'
    ],
    icon: FaSmile,
    subcategoryIcons: {
      'Hair Care & Beauty': FaSmile,
      'Face Care': FaSmile,
      'Oral Care': FaSmile,
      'Body Care': FaSmile,
      'Fragrances': FaSmile,
      'Makeup': FaSmile,
      'Tools & Accessories': FaSmile,
      'Vitamins & Supplements': FaSmile,
      'Massagers': FaSmile,
      'Health & Beauty Services': FaSmile
    }
  },
  { 
    name: 'Sports & Outdoors', 
    subcategories: ['Football', 'Basketball', 'Running', 'Fitness', 'Cycling', 'Swimming', 'Hiking', 'Camping'],
    icon: FaFutbol,
    subcategoryIcons: {
      'Football': FaFutbol,
      'Basketball': FaFutbol,
      'Running': FaFutbol,
      'Fitness': FaFutbol,
      'Cycling': FaFutbol,
      'Swimming': FaFutbol,
      'Hiking': FaFutbol,
      'Camping': FaFutbol
    }
  },
  { 
    name: 'Services', 
    subcategories: [
      'Building & Trade Services', 'Car Services', 'Computer & IT Services', 'Repair Services',
      'Cleaning Services', 'Printing Services', 'Manufacturing Services', 'Logistics Services'
    ],
    icon: FaHeadset,
    subcategoryIcons: {
      'Building & Trade Services': FaWrench,
      'Car Services': FaCar,
      'Computer & IT Services': FaGamepad,
      'Repair Services': FaWrench,
      'Cleaning Services': FaHome,
      'Printing Services': FaWrench,
      'Manufacturing Services': FaWrench,
      'Logistics Services': FaShippingFast
    }
  }
]

// Number of categories to show by default
const DEFAULT_VISIBLE_CATEGORIES = 6

export default function Hero() {
  const [categories, setCategories] = useState(defaultCategories)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showMobileCategories, setShowMobileCategories] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const [visibleCategoriesCount, setVisibleCategoriesCount] = useState(DEFAULT_VISIBLE_CATEGORIES)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  const visibleCategories = categories.slice(0, visibleCategoriesCount)
  const hasMoreCategories = visibleCategoriesCount < categories.length

  useEffect(() => {
    setIsMounted(true)
    
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          if (data.categories && data.categories.length > 0) {
            const categoriesWithIcons = data.categories.map((cat: { name: string; subcategories: string[] }) => {
              const defaultCat = defaultCategories.find(dc => 
                dc.name.toLowerCase() === cat.name.toLowerCase()
              )
              return {
                ...cat,
                icon: defaultCat?.icon || FaTags,
                subcategoryIcons: defaultCat?.subcategoryIcons || {}
              }
            })
            setCategories(categoriesWithIcons)
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories(defaultCategories)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    if (isMounted) {
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [isMounted])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, isDesktop])

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  function prevSlide() {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  function goToSlide(index: number) {
    setCurrentSlide(index)
  }

  const toggleShowMore = () => {
    if (hasMoreCategories) {
      // Show 2 more categories each click
      setVisibleCategoriesCount(prev => Math.min(prev + 2, categories.length))
    } else {
      // Reset to default
      setVisibleCategoriesCount(DEFAULT_VISIBLE_CATEGORIES)
    }
  }

  // Updated function to generate search page URLs with proper filtering
  const getCategoryUrl = (categoryName: string, subcategoryName?: string) => {
    const params = new URLSearchParams()
    
    if (subcategoryName) {
      params.set('category', categoryName)
      params.set('subcategory', subcategoryName)
    } else {
      params.set('category', categoryName)
    }
    
    return `/search?${params.toString()}`
  }

  // Function to handle main category clicks
  const handleCategoryClick = (categoryName: string) => {
    const url = getCategoryUrl(categoryName)
    window.location.href = url
  }

  // Function to split subcategories into columns for better layout
  const getSubcategoryColumns = (subcategories: string[], columns: number = 3) => {
    const result = []
    const itemsPerColumn = Math.ceil(subcategories.length / columns)
    
    for (let i = 0; i < columns; i++) {
      result.push(subcategories.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn))
    }
    
    return result
  }

  return (
    <section className="bg-linear-to-b from-gray-900 to-gray-800 py-4 lg:py-8" role="banner" aria-label="Hero section with categories and promotions">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MOBILE ONLY: Simple Image Carousel with Links */}
        <div className="lg:hidden ">
          <div className="relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden h-[100px]">
            {/* Slides */}
            <div className="relative h-[100px]">
              {sliderImages.map((slide, index) => (
                <Link
                  key={index}
                  href={slide.buttonLink}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden={index !== currentSlide}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.url})` }}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Simple text overlay for mobile */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className=" rounded-xl p-4">
                      <h3 className="text-white font-bold text-lg mb-1">{slide.title}</h3>
                      <p className="text-gray-200 text-sm mb-3">{slide.subtitle}</p>
                      <span className="inline-flex items-center gap-1 bg-linear-to-r from-yellow-500 to-amber-500 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">
                        {slide.buttonText}
                        <PlayIcon className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DESKTOP: Full Functionality */}
        <div className="hidden lg:flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-80 shrink-0">
            <nav 
              className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-visible h-auto relative"
              aria-label="Product categories navigation"
            >
              <div className="bg-linear-to-r from-yellow-500 to-amber-500 px-6 py-4 sticky top-0 z-20 rounded-t-2xl">
                <h2 className="text-gray-900 font-bold text-lg flex items-center gap-2">
                  <FaTags className="w-5 h-5" />
                  All Categories
                </h2>
              </div>
              <ul className="py-2 relative">
                {visibleCategories.map((cat, index) => {
                  const IconComponent = cat.icon
                  const subcategoryColumns = getSubcategoryColumns(cat.subcategories, 3)
                  
                  return (
                    <li 
                      key={cat.name} 
                      className="border-b border-gray-700 last:border-b-0 relative group"
                      onMouseEnter={() => setHoveredCategory(index)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {/* Main Category - Clickable */}
                      <button
                        onClick={() => handleCategoryClick(cat.name)}
                        className="flex justify-between items-center w-full py-4 px-6 text-left transition-all duration-200 text-gray-300 hover:bg-gray-700 hover:text-white group"
                        aria-label={`Browse ${cat.name} category`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-semibold">{cat.name}</span>
                        </div>
                        <ChevronRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </button>
                      
                      {/* Subcategories Dropdown - Jiji Style */}
                      {hoveredCategory === index && (
                        <div 
                          className="absolute left-full top-0 ml-1 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 min-w-[600px] max-w-2xl overflow-hidden"
                          style={{ 
                            maxHeight: '70vh', 
                            overflowY: 'auto'
                          }}
                          onMouseEnter={() => setHoveredCategory(index)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >
                          <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <IconComponent className="w-6 h-6 text-yellow-500" />
                                {cat.name}
                              </h3>
                              <Link
                                href={getCategoryUrl(cat.name)}
                                className="text-yellow-500 hover:text-yellow-600 font-semibold text-sm"
                                onClick={() => setHoveredCategory(null)}
                              >
                                View All
                              </Link>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-6">
                              {subcategoryColumns.map((column, columnIndex) => (
                                <div key={columnIndex} className="space-y-2">
                                  {column.map((subcat) => {
                                    const SubIconComponent = cat.subcategoryIcons?.[subcat] || FaTags
                                    return (
                                      <Link
                                        key={subcat}
                                        href={getCategoryUrl(cat.name, subcat)}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                                        onClick={() => setHoveredCategory(null)}
                                      >
                                        <div className="shrink-0 w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center group-hover:bg-yellow-100 transition-colors duration-200">
                                          <SubIconComponent className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        <span className="text-gray-700 font-medium text-sm group-hover:text-gray-900">
                                          {subcat}
                                        </span>
                                      </Link>
                                    )
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  )
                })}

                {/* Show More/Less Button */}
                {categories.length > DEFAULT_VISIBLE_CATEGORIES && (
                  <li className="border-t border-gray-700">
                    <button
                      onClick={toggleShowMore}
                      className="flex justify-between items-center w-full py-4 px-6 text-left transition-all duration-200 text-gray-300 hover:bg-gray-700 hover:text-white group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${hasMoreCategories ? '' : 'rotate-180'}`} />
                        </div>
                        <span className="font-semibold">
                          {hasMoreCategories ? `Show More (${categories.length - visibleCategoriesCount} more)` : 'Show Less'}
                        </span>
                      </div>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          {/* Hero Slider */}
          <div className="flex-1 min-w-0">
            <div className="relative bg-gray-800 rounded-2xl shadow-2xl overflow-hidden h-[500px]">
              {/* Slides */}
              <div className="relative h-full">
                {sliderImages.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={index !== currentSlide}
                    role="group"
                    aria-label={`Slide ${index + 1} of ${sliderImages.length}`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${slide.url})` }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
                    <div className="absolute inset-0 flex items-center">
                      <div className="max-w-4xl mx-auto px-8 text-center lg:text-left">
                        <div className="max-w-2xl">
                          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
                            {slide.title}
                          </h1>
                          <p className="text-xl lg:text-2xl text-gray-200 mb-8 animate-fade-in-up animation-delay-200">
                            {slide.subtitle}
                          </p>
                          <Link
                            href={slide.buttonLink}
                            className="inline-flex items-center gap-2 bg-linear-to-r from-yellow-500 to-amber-500 text-gray-900 px-8 py-4 rounded-xl font-bold hover:from-yellow-600 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fade-in-up animation-delay-400"
                            aria-label={`${slide.buttonText} - ${slide.title}`}
                          >
                            {slide.buttonText}
                            <PlayIcon className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>

              {/* Desktop Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10" role="tablist" aria-label="Slide indicators">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-yellow-500 scale-125'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-selected={index === currentSlide}
                    role="tab"
                  />
                ))}
              </div>

              {/* Auto-play Toggle */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-all duration-200 z-10"
                aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isAutoPlaying ? '⏸️' : '▶️'}
              </button>
            </div>

            {/* Trust Badges - Desktop Only */}
            <div className="mt-6 grid grid-cols-4 gap-4" role="complementary" aria-label="Trust badges">
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700 hover:border-yellow-500/30 transition-all duration-200">
                <FaShippingFast className="w-8 h-8 text-yellow-500 mx-auto mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-white text-sm">Free Shipping</h3>
                <p className="text-gray-400 text-xs">Over $50</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700 hover:border-yellow-500/30 transition-all duration-200">
                <FaShieldAlt className="w-8 h-8 text-yellow-500 mx-auto mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-white text-sm">Secure Payment</h3>
                <p className="text-gray-400 text-xs">100% Protected</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700 hover:border-yellow-500/30 transition-all duration-200">
                <FaUndo className="w-8 h-8 text-yellow-500 mx-auto mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-white text-sm">Easy Returns</h3>
                <p className="text-gray-400 text-xs">30 Days Policy</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700 hover:border-yellow-500/30 transition-all duration-200">
                <FaHeadset className="w-8 h-8 text-yellow-500 mx-auto mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-white text-sm">24/7 Support</h3>
                <p className="text-gray-400 text-xs">Always Here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  )
}