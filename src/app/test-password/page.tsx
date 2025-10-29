// src/app/test-password/page.tsx
'use client'

import { useState } from 'react'

export default function TestPasswordPage() {
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testPassword = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to test password' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Test Password Hash</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password to test:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter password"
          />
        </div>

        <button
          onClick={testPassword}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Password'}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h2 className="font-semibold mb-2">Results:</h2>
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 rounded">
          <h3 className="font-semibold mb-2">Try these passwords:</h3>
          <div className="space-y-1 text-sm">
            <button onClick={() => setPassword('yafrican@admin123')} className="block text-blue-600 hover:underline">
              yafrican@admin123
            </button>
            <button onClick={() => setPassword('admin123')} className="block text-blue-600 hover:underline">
              admin123
            </button>
            <button onClick={() => setPassword('password')} className="block text-blue-600 hover:underline">
              password
            </button>
            <button onClick={() => setPassword('test')} className="block text-blue-600 hover:underline">
              test
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}