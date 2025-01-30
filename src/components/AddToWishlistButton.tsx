"use client"

import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlistStore"
import { Heart } from 'lucide-react'
import { toast } from "react-hot-toast"
import { Product } from "@/types/product"

export default function AddToWishlistButton({ product }: { product: Product }) {
  const addToWishlist = useWishlist((state) => state.addItem)

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.imageUrl,
    })
    toast.success(`${product.title} added to wishlist`)
  }

  return (
    <Button onClick={handleAddToWishlist} variant="outline" className="flex items-center">
      <Heart className="mr-2 h-4 w-4" />
      Add to Wishlist
    </Button>
  )
}