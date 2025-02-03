import { NextResponse } from "next/server"
import { getUser } from "@/lib/auth"

// In a real app, you would use a database
const reviews: any[] = []

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const productId = params.id
  const productReviews = reviews.filter((review) => review.productId === productId)
  return NextResponse.json(productReviews)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const user = await getUser(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const productId = params.id
  const { rating, comment } = await request.json()

  const newReview = {
    id: `review_${Date.now()}`,
    productId,
    userId: user.userId,
    userName: user.name || "Anonymous",
    rating,
    comment,
    createdAt: new Date().toISOString(),
  }

  reviews.push(newReview)

  return NextResponse.json(newReview, { status: 201 })
}

