"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store"
import { toast } from "react-hot-toast"

interface AddToCartButtonProps {
  product: {
    _id: string
    name: string
    price: number
    image: string
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCart((state) => state.addItem)

  return (
    <Button
      size="lg"
      onClick={() => {
        addItem({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        })
        toast.success(`${product.name} added to cart`)
      }}
      className="w-full md:w-auto"
    >
      Add To Cart
    </Button>
  )
}

