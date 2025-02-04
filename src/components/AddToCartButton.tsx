"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store"
import { toast } from "react-hot-toast"

interface Product {
  _id: string
  name: string
  price: number
  imageUrl: string
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: quantity,
      _id: 0,
      imageUrl: ""
    })
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center border rounded-md">
        <button className="px-3 py-1 text-xl" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
          -
        </button>
        <span className="px-3 py-1">{quantity}</span>
        <button className="px-3 py-1 text-xl" onClick={() => setQuantity(quantity + 1)}>
          +
        </button>
      </div>
      <Button onClick={handleAddToCart} className="flex-grow">
        Add to Cart
      </Button>
    </div>
  )
}

