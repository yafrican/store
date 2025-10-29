'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<'customer' | 'seller'>('customer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name) return setError('Name is required')
    if (!email) return setError('Email is required')
    if (!phone) return setError('Phone number is required')
    if (!password) return setError('Password is required')
    if (password !== confirmPassword) return setError('Passwords do not match')

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, role }),
      })
      const data = await res.json()
      if (!res.ok) setError(data.error || 'Registration failed')
      else {
        alert(data.message)
        setName('')
        setEmail('')
        setPhone('')
        setPassword('')
        setConfirmPassword('')
        setRole('customer')
      }
    } catch {
      setError('Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full"
        noValidate
      >
        <h1 className="text-3xl font-bold mb-8 text-yellow-700 text-center">Register</h1>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="+251 912 345 678"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Your password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block mb-1 font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        {/* Role selection */}
        <div className="mb-6 mt-4">
          <p className="mb-2 font-semibold text-gray-700">Register as:</p>
          <div className="flex gap-4">
            <label
              htmlFor="role-customer"
              className={`flex-1 flex justify-center items-center cursor-pointer rounded-lg border-2 px-4 py-2 transition ${
                role === 'customer' ? 'border-yellow-700 text-yellow-700' : 'border-gray-300 text-gray-700'
              } hover:border-yellow-600`}
            >
              <input
                type="radio"
                id="role-customer"
                name="role"
                value="customer"
                checked={role === 'customer'}
                onChange={() => setRole('customer')}
                className="hidden"
              />
              Customer
            </label>

            <label
              htmlFor="role-seller"
              className={`flex-1 flex justify-center items-center cursor-pointer rounded-lg border-2 px-4 py-2 transition ${
                role === 'seller' ? 'border-yellow-700 text-yellow-700' : 'border-gray-300 text-gray-700'
              } hover:border-yellow-600`}
            >
              <input
                type="radio"
                id="role-seller"
                name="role"
                value="seller"
                checked={role === 'seller'}
                onChange={() => setRole('seller')}
                className="hidden"
              />
              Seller
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700 transition disabled:opacity-50 mb-6"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {/* Social Login */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => alert('Google login clicked — implement your OAuth flow here')}
            className="flex-1 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-yellow-100 transition"
          >
            <FcGoogle className="w-6 h-6" />
            Google
          </button>
          <button
            type="button"
            onClick={() => alert('Facebook login clicked — implement your OAuth flow here')}
            className="flex-1 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-yellow-100 transition text-blue-700"
          >
            <FaFacebook className="w-5 h-5" />
            Facebook
          </button>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/signin" className="text-yellow-700 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
