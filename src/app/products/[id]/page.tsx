"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "../../../lib/store"
import { Button } from "@/components/ui/button"
import { ProductCard } from "../../../components/ui/product-card"
import { toast } from "react-hot-toast"

// In a real app, this would come from an API or database
const product = {
  id: "1",
  name: "Library Stool Chair",
  price: 20,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim, Lorem ipsum dolor sit amet, consectetur adipiscing",
  images: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Single%20Product%20Page%20(2).jpg-HaAcrF3HvAxS01sm37TQIWPPrFd2s5.jpeg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
}

const relatedProducts = [
  {
    id: "2",
    name: "Library Stool Chair",
    price: 99,
    image: "/placeholder.svg",
  },
  // Add more related products
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const addItem = useCart((state) => state.addItem)

  console.log(params)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative overflow-hidden rounded-lg bg-gray-100 ${
                  selectedImage === index ? "ring-2 ring-teal-500" : ""
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="text-2xl font-bold text-teal-500">${product.price} USD</div>
          <p className="text-gray-600">{product.description}</p>
          <Button
            size="lg"
            onClick={() => {
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: 1,
              })
              toast.success(`${product.name} added to cart`)
            }}
            className="w-full md:w-auto"
          >
            Add To Cart
          </Button>
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard category={""} key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  )
}

