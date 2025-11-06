'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaUserShield, FaAt, FaCookie, FaUserCheck } from 'react-icons/fa'

export default function PrivacyPage() {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link href="/" className="text-3xl font-bold text-yellow-500 mb-4 inline-block">
            Yafrican
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we protect and manage your data.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
        >
          {/* Introduction */}
          <motion.section variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <FaUserShield className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At Yafrican, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our marketplace platform.
            </p>
          </motion.section>

          {/* Information We Collect */}
          <motion.section variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <FaAt className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Name, email address, and phone number</li>
                  <li>Profile information and preferences</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely by third parties)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Usage Data</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>IP address and browser information</li>
                  <li>Pages visited and features used</li>
                  <li>Search queries and product views</li>
                  <li>Device information and operating system</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Transaction Data</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Purchase history and order details</li>
                  <li>Seller performance metrics</li>
                  <li>Communication between buyers and sellers</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* How We Use Your Information */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Service Operation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Process transactions and orders</li>
                  <li>Provide customer support</li>
                  <li>Verify user accounts</li>
                  <li>Send service notifications</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Improvement & Personalization</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Personalize product recommendations</li>
                  <li>Improve platform features</li>
                  <li>Develop new services</li>
                  <li>Optimize user experience</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Communication</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Send marketing communications (with consent)</li>
                  <li>Notify about platform updates</li>
                  <li>Share important service changes</li>
                  <li>Provide order updates</li>
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Security & Legal</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Prevent fraud and abuse</li>
                  <li>Comply with legal obligations</li>
                  <li>Enforce our terms of service</li>
                  <li>Protect user safety</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Data Sharing */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Sharing</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p><strong>With Other Users:</strong> Necessary information is shared to facilitate transactions (e.g., sellers see buyer shipping addresses).</p>
              <p><strong>Service Providers:</strong> We work with trusted partners for payment processing, analytics, and hosting.</p>
              <p><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights.</p>
              <p><strong>Business Transfers:</strong> In case of merger or acquisition, user data may be transferred.</p>
            </div>
          </motion.section>

          {/* Cookies & Tracking */}
          <motion.section variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <FaCookie className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookies & Tracking</h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and login sessions</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Personalize content and recommendations</li>
                <li>Measure advertising effectiveness</li>
              </ul>
              <p className="text-sm bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                You can control cookie settings through your browser. However, disabling cookies may affect some platform features.
              </p>
            </div>
          </motion.section>

          {/* Your Rights */}
          <motion.section variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <FaUserCheck className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-200">Access & Correction</h3>
                <p className="text-sm mt-2">View and update your personal information in account settings.</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">Data Portability</h3>
                <p className="text-sm mt-2">Request a copy of your data in a readable format.</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 dark:text-purple-200">Deletion</h3>
                <p className="text-sm mt-2">Delete your account and associated data (with some exceptions).</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200">Opt-Out</h3>
                <p className="text-sm mt-2">Unsubscribe from marketing communications at any time.</p>
              </div>
            </div>
          </motion.section>

          {/* Data Security */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>We implement industry-standard security measures to protect your data:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure server infrastructure</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
            </div>
          </motion.section>

          {/* Changes to Privacy Policy */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes and update the "Last Updated" date at the top of this page.
            </p>
          </motion.section>

          {/* Contact Information */}
          <motion.section variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have questions about this Privacy Policy or your data, please contact our Privacy Team:
            </p>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>📧 Email: privacy@yafrican.com</p>
              <p>📞 Phone: +251 XXX XXX XXX</p>
              <p>📍 Address: Addis Ababa, Ethiopia</p>
              <p>⏰ Response Time: Within 48 hours</p>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Thank you for trusting Yafrican with your information. We are committed to protecting your privacy and providing a secure marketplace experience.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}