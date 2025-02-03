import { NextResponse } from "next/server"
import { client } from "@/lib/sanity"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const order = await client.create({
      _type: "order",
      customer: body.customer,
      shippingAddress: body.shippingAddress,
      orderItems: body.orderItems,
      totalAmount: body.totalAmount,
      status: "pending",
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ orderId: order._id }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order. Please try again." }, { status: 500 })
  }
}

