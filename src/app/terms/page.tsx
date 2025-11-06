'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaChild, FaUsers, FaFileContract, FaExclamationTriangle } from 'react-icons/fa'

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
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
              <FaFileContract className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Introduction</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to Yafrican, Ethiopia's premier online marketplace. These Terms of Service govern your use of our platform and services. By accessing or using Yafrican, you agree to be bound by these terms and our Privacy Policy.
            </p>
          </motion.section>

          {/* User Responsibilities */}
          <motion.section variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <FaUsers className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Responsibilities</h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
              <p><strong>Accurate Information:</strong> You must provide accurate and complete information when creating an account and keep it updated.</p>
              <p><strong>Legal Compliance:</strong> You agree to comply with all applicable laws and regulations in Ethiopia and your jurisdiction.</p>
            </div>
          </motion.section>

          {/* Marketplace Rules */}
          <motion.section variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Marketplace Rules</h2>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">Prohibited Activities:</h3>
              <ul className="list-disc list-inside space-y-2 text-amber-700 dark:text-amber-300">
                <li>Selling counterfeit or illegal products</li>
                <li>Engaging in fraudulent activities</li>
                <li>Infringing on intellectual property rights</li>
                <li>Harassing other users</li>
                <li>Posting misleading product information</li>
                <li>Circumventing platform fees</li>
              </ul>
            </div>
          </motion.section>

          {/* Payments & Fees */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payments & Fees</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p><strong>Transaction Fees:</strong> Yafrican charges a small percentage fee on successful transactions to maintain and improve our platform.</p>
              <p><strong>Payment Processing:</strong> All payments are processed through secure third-party payment processors.</p>
              <p><strong>Refunds:</strong> Refund policies are determined by individual sellers and must be clearly stated in product listings.</p>
            </div>
          </motion.section>

          {/* Intellectual Property */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p><strong>Platform Content:</strong> All Yafrican platform content, including logos, design, and code, is protected by copyright and trademark laws.</p>
              <p><strong>User Content:</strong> You retain rights to the content you create and share on Yafrican, but grant us a license to display and distribute it on our platform.</p>
              <p><strong>Respect IP:</strong> Do not infringe on others' intellectual property rights when listing products.</p>
            </div>
          </motion.section>

          {/* Limitation of Liability */}
          <motion.section variants={itemVariants} className="mb-8">
            <div className="flex items-center mb-4">
              <FaChild className="w-6 h-6 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Limitation of Liability</h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>Yafrican acts as a marketplace platform and is not directly involved in transactions between buyers and sellers. We are not responsible for:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Product quality or authenticity</li>
                <li>Seller fulfillment issues</li>
                <li>Delivery problems</li>
                <li>Payment disputes between users</li>
              </ul>
            </div>
          </motion.section>

          {/* Termination */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Termination</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful activities. You may also delete your account at any time through your account settings.
            </p>
          </motion.section>

          {/* Changes to Terms */}
          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update these Terms of Service from time to time. We will notify users of significant changes via email or platform notifications. Continued use of Yafrican after changes constitutes acceptance of the new terms.
            </p>
          </motion.section>

          {/* Contact */}
          <motion.section variants={itemVariants} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>📧 Email: legal@yafrican.com</p>
              <p>📍 Address: Addis Ababa, Ethiopia</p>
              <p>🌐 Website: <Link href="/contact" className="text-yellow-500 hover:text-yellow-600">Contact Form</Link></p>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              By using Yafrican, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}