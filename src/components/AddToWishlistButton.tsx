"use client"

import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlistStore"
import { Heart } from "lucide-react"
import { toast } from "react-hot-toast"

interface Product {
  _id: string
  name: string
  price: number
  imageUrl: string
}

export default function AddToWishlistButton({ product }: { product: Product }) {
  const addToWishlist = useWishlist((state) => state.addItem)
  const removeFromWishlist = useWishlist((state) => state.removeItem)
  const isInWishlist = useWishlist((state) => state.isInWishlist)

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
      toast.success(`${product.name} removed from wishlist`)
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
      })
      toast.success(`${product.name} added to wishlist`)
    }
  }

  return (
    <Button
      onClick={handleWishlistToggle}
      variant={isInWishlist(product._id) ? "default" : "outline"}
      className="flex items-center"
    >
      <Heart className={`mr-2 h-4 w-4 ${isInWishlist(product._id) ? "fill-current" : ""}`} />
      {isInWishlist(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  )
}

