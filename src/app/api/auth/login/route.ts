import { NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

const users = [
  {
    id: 1,
    email: "test@example.com",
    password: "$2b$10$Xv.s.k.k.e.t.w.u.a.o.e.u.P.a.s.s.w.o.r.d", //hashed password
  },
]

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // In a real app, fetch user from database
    const user = users.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const isValid = await compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    // Create token
    const token = sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" })

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

