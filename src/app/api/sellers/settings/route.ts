import { NextResponse } from "next/server"
import connectMongo from "@/lib/mongodb"
import User from "@/models/User"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!
if (!JWT_SECRET) throw new Error("JWT_SECRET not set in environment variables")

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || ""
    const match = cookieHeader.match(/authToken=([^;]+)/)
    const token = match ? match[1] : null

    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string }

    if (payload.role !== "seller") return NextResponse.json({ error: "Access denied" }, { status: 403 })

    const data = await req.json()

    await connectMongo()

    const user = await User.findById(payload.id)
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    // Only update fields that are provided (non-undefined)
    const fields: (keyof typeof data)[] = ["storeName", "email", "phone", "address", "paymentMethod"]
    fields.forEach(field => {
      if (data[field] !== undefined) {
        user[field] = data[field]
      }
    })

    await user.save()

    console.log("Updated user:", user) // Debug log

    return NextResponse.json({ success: true, user })
  } catch (err) {
    console.error("Settings update error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
