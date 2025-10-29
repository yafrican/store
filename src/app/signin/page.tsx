'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email || !password) {
      setError('Email and password are required')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      // Role-based redirect
      switch (data.user.role) {
        case 'admin':
          window.location.href = '/admin/dashboard'
          break
        case 'seller':
          window.location.href = '/seller/dashboard'
          break
        case 'customer':
        default:
          window.location.href = '/'
          break
      }
    } catch (err: any) {
      console.error('Login fetch error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    alert('Google login clicked — implement your OAuth flow here')
  }

  const handleFacebookLogin = () => {
    alert('Facebook login clicked — implement your OAuth flow here')
  }

  // Demo credentials for testing
  const fillDemoCredentials = (role: 'admin' | 'seller' | 'customer') => {
    switch (role) {
      case 'admin':
        setEmail('admin@yafrican.com')
        setPassword('yafrican@admin123')
        break
      case 'seller':
        setEmail('seller@example.com')
        setPassword('seller123')
        break
      case 'customer':
        setEmail('customer@example.com')
        setPassword('customer123')
        break
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-200">
        <h1 className="text-3xl font-bold mb-2 text-yellow-700 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-8">Sign in to your account</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Demo Credentials for Testing */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-sm">
            <button
              type="button"
              onClick={() => fillDemoCredentials('admin')}
              className="text-blue-700 hover:text-blue-900 hover:underline"
            >
              Admin: admin@yafrican.com / yafrican@admin123
            </button>
            <br />
            <button
              type="button"
              onClick={() => fillDemoCredentials('seller')}
              className="text-green-700 hover:text-green-900 hover:underline"
            >
              Seller: seller@example.com / seller123
            </button>
            <br />
            <button
              type="button"
              onClick={() => fillDemoCredentials('customer')}
              className="text-purple-700 hover:text-purple-900 hover:underline"
            >
              Customer: customer@example.com / customer123
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700 flex items-center gap-1"
            >
              <EnvelopeIcon className="w-5 h-5" />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700 flex items-center gap-1"
            >
              <LockClosedIcon className="w-5 h-5" />
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                placeholder="Your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-green-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6 shadow-sm hover:shadow-md"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-green-900 border-t-transparent rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* OR separator */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500 font-semibold text-sm">OR CONTINUE WITH</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <FcGoogle className="w-5 h-5" />
            Sign in with Google
          </button>

          <button
            type="button"
            onClick={handleFacebookLogin}
            className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
          >
            <FaFacebook className="w-5 h-5 text-blue-600" />
            Sign in with Facebook
          </button>
        </div>

        {/* Register link */}
        <div className="text-center space-y-2">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-yellow-700 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-yellow-700 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-yellow-700 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}