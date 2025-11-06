'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaUserPlus, 
  FaBoxOpen, 
  FaShippingFast, 
  FaCreditCard,
  FaCheckCircle,
  FaChartLine,
  FaShieldAlt,
  FaGlobeAfrica
} from 'react-icons/fa'
import { 
  HiOutlineBadgeCheck, 
  HiOutlineShoppingBag,
  HiOutlineTruck,
  HiOutlineCash
} from 'react-icons/hi'

export default function SellPage() {
  const steps = [
    {
      icon: <FaUserPlus className="text-2xl" />,
      title: "Create Seller Account",
      description: "Register your business in minutes with basic details and verification.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <HiOutlineShoppingBag className="text-2xl" />,
      title: "List Your Products",
      description: "Upload products with high-quality images and detailed descriptions.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <HiOutlineTruck className="text-2xl" />,
      title: "Manage Orders & Shipping",
      description: "Track orders and coordinate nationwide delivery across Ethiopia.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: <HiOutlineCash className="text-2xl" />,
      title: "Receive Payments",
      description: "Get paid securely through multiple trusted payment methods.",
      color: "from-yellow-500 to-amber-500"
    }
  ]

  const features = [
    { icon: <FaChartLine />, text: "Grow Your Business" },
    { icon: <FaShieldAlt />, text: "Secure Platform" },
    { icon: <FaGlobeAfrica />, text: "Reach All Ethiopia" },
    { icon: <FaCheckCircle />, text: "Verified Sellers" }
  ]

  const stats = [
    { number: "10K+", label: "Sellers" },
    { number: "500K+", label: "Products" },
    { number: "98%", label: "Success Rate" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pt-12 pb-8"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full mb-6"
          >
            <HiOutlineBadgeCheck className="text-yellow-600 dark:text-yellow-400" />
            <span className="text-yellow-700 dark:text-yellow-300 font-medium">Trusted E-commerce Platform</span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Sell on{' '}
            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Yafrican
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Join Ethiopia's fastest-growing marketplace. Reach millions of customers, 
            grow your business, and start selling with confidence.
          </motion.p>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  x: 10
                }}
                className="group relative"
              >
                <div className="flex items-start space-x-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300">
                  {/* Step Number */}
                  <div className="flex-shrink-0 relative">
                    <div className={`w-14 h-14 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {index + 1}
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-200 to-amber-200 dark:from-yellow-800 dark:to-amber-800 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300 -z-10" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 bg-gradient-to-r ${step.color} rounded-lg text-white shadow-md`}>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-7 top-full w-0.5 h-6 bg-gradient-to-b from-gray-300 dark:from-gray-600 to-transparent ml-3" />
                )}
              </motion.div>
            ))}

            {/* Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 rounded-lg">
                    {feature.icon}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Visual & CTA */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual Placeholder */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8 mb-8">
                <div className="flex justify-center items-center space-x-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-3">
                      <HiOutlineShoppingBag className="text-3xl text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Easy Listing</div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-3">
                      <FaShippingFast className="text-3xl text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Fast Shipping</div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-3">
                      <FaCreditCard className="text-3xl text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Secure Payments</div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-4"
                >
                  <Link href="/register">
                    <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-gray-900 py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                      Start Selling Today
                    </button>
                  </Link>
                </motion.div>
                
                <div className="text-gray-500 dark:text-gray-400 text-sm space-y-1">
                  <p>✓ No setup fees</p>
                  <p>✓ Commission-based pricing</p>
                  <p>✓ 24/7 seller support</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 rounded-full shadow-lg"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-amber-400 rounded-full shadow-lg"
            />
          </motion.div>
        </div>

        {/* Additional Benefits Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Why Sell With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                <FaChartLine className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Grow Faster
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access millions of customers and advanced marketing tools to scale your business.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                <FaShieldAlt className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your transactions and data are protected with enterprise-grade security.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center text-white mb-4 mx-auto">
                <FaGlobeAfrica className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nationwide Reach
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sell to customers across Ethiopia with our integrated logistics network.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}