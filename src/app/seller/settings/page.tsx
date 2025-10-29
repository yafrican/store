'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import SellerNav from "@/components/SellerNav"

export default function SellerSettings() {
  const router = useRouter()
  const [form, setForm] = useState({
    storeName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
  })
  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check", { method: "GET", credentials: "include" })
        const data = await res.json()
        if (!data.loggedIn) return router.push("/signin")

        // Optional: prefill form with existing data
        setForm(prev => ({ ...prev, ...data.user }))
        setAuthenticated(true)
      } catch (err) {
        console.error(err)
        router.push("/signin")
      } finally {
        setCheckingAuth(false)
      }
    }
    checkAuth()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/sellers/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        alert("✅ Settings saved successfully!")
        router.push("/seller/dashboard")
      } else {
        alert("❌ Error: " + (data.error || "Failed to save settings"))
      }
    } catch (err) {
      console.error(err)
      alert("⚠️ Something went wrong, please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (checkingAuth) return <div className="flex justify-center items-center h-screen">Checking authentication...</div>
  if (!authenticated) return null

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-br from-amber-50 to-orange-100">
      <SellerNav />

      <main className="flex-1 p-6 md:p-10 flex justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl w-full"
        >
          <Card className="shadow-2xl border border-amber-200 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-extrabold text-amber-700">⚡ Seller Settings</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {["storeName", "email", "phone", "address", "paymentMethod"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 text-sm font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                    <Input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      name={field}
                      value={form[field as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                      required={field === "storeName" || field === "email"}
                    />
                  </div>
                ))}

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={loading} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg">
                    {loading ? "Saving..." : "💾 Save Settings"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
