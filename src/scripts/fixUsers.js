import connectMongo from "../lib/mongodb"
import User from "../models/User"


async function fixUsers() {
  try {
    await connectMongo()
    console.log("✅ Connected to MongoDB")

    // Fetch all users
    const users = await User.find({})
    console.log(`Found ${users.length} users`)

    for (const user of users) {
      let updated = false

      // Add missing fields with default values
      if (user.storeName === undefined) {
        user.storeName = ""
        updated = true
      }
      if (user.address === undefined) {
        user.address = ""
        updated = true
      }
      if (user.phone === undefined) {
        user.phone = ""
        updated = true
      }
      if (user.paymentMethod === undefined) {
        user.paymentMethod = ""
        updated = true
      }

      if (updated) {
        await user.save()
        console.log(`Updated user: ${user._id}`)
      }
    }

    console.log("✅ All users processed successfully")
    process.exit(0)
  } catch (err) {
    console.error("❌ Error fixing users:", err)
    process.exit(1)
  }
}

fixUsers()
