import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received order data:", body);

    // Check if SANITY_API_TOKEN is available in process.env
    if (!process.env.SANITY_API_TOKEN) {
      console.error("Error: Sanity API token is missing!");
      return NextResponse.json(
        { error: "Sanity API token is missing." },
        { status: 500 }
      );
    }

    // Test Sanity connection
    try {
      const testQuery = await client.fetch('*[_type == "product"][0]');
      console.log("Sanity connection test successful:", testQuery);
    } catch (testError) {
      console.error("Sanity connection test failed:", testError);
      throw new Error("Failed to connect to Sanity");
    }

    // Proceed with order creation logic...
    const order = {
      _type: "order",
      firstName: body.customer.firstName,
      lastName: body.customer.lastName,
      email: body.customer.email,
      phone: body.customer.phone,
      address: body.customer.address,
      city: body.customer.city,
      zip: body.customer.zipCode,
      country: body.customer.country,
      cartItems: body.items.map((item: string) => ({
        _type: "reference",
        _ref: item,
      })),
      total: body.totalAmount,
      status: "pending",
    };

    const sanityResponse = await client.create(order);
    console.log("Order created successfully:", sanityResponse);

    return NextResponse.json({ orderId: sanityResponse._id }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);

    return NextResponse.json(
      {
        error: "Failed to create order",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
