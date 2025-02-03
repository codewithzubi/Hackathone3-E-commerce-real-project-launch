import { NextResponse } from "next/server"
import { hash } from "bcryptjs"

// In a real app, you would use a database
const users: any[] = []

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Check if user exists
    if (users.find((user) => user.email === email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const user = {
      id: `user_${Date.now()}`,
      name,
      email,
      password: hashedPassword,
    }

    users.push(user)

    // Don't send the password back
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

