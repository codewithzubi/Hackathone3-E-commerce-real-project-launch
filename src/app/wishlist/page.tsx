"use client"

import { useEffect, useState } from "react"
import { useWishlist } from "@/lib/wishlistStore"
import { ProductCard } from "@/components/ui/product-card"
import Link from "next/link"

export default function WishlistPage() {
  const [isClient, setIsClient] = useState(false)
  const wishlistItems = useWishlist((state) => state.items)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Your wishlist is empty.</p>
          <Link href="/products" className="text-blue-500 hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <ProductCard key={item.id} _id={item.id} name={item.name} price={item.price} imageUrl={item.image} category={""} slug={""} />
          ))}
        </div>
      )}
    </div>
  )
}

