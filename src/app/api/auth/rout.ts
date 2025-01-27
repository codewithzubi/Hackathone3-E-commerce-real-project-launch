import { NextResponse } from "next/server"

// This is a mock user database. In a real application, you'd use a proper database.
const users = [{ id: 1, email: "user@example.com", password: "password123" }]

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = users.find((u) => u.email === email && u.password === password)

  if (user) {
    // In a real application, you'd use a proper authentication token
    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } })
  } else {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  }
}

