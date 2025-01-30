import { client } from "@/lib/sanity"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const query = `*[_type == "products" && _id == $id][0]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "imageUrl": image.asset->url,
    category->{
      _id,
      title
    },
    description,
    inventory,
    tags
  }`

  try {
    const product = await client.fetch(query, { id })
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}