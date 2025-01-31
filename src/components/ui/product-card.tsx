"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store"
import { useWishlist } from "@/lib/wishlistStore"
import { toast } from "react-hot-toast"
import type { Product } from "@/types/product"

export function ProductCard({ _id, title, price, priceWithoutDiscount, badge, imageUrl, slug, category }: Product) {
  const addItem = useCart((state) => state.addItem)
  const addToWishlist = useWishlist((state) => state.addItem)


  console.log(category)

  return (
    <div className="group relative">
      <Link href={`/products/${slug}`} className="block">
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          {badge && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">{badge}</div>
          )}
        </div>
      </Link>
      <div className="mt-4 space-y-2">
        <h3 className="text-sm text-gray-700 font-medium">
          <Link href={`/products/${slug}`}>{title}</Link>
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-900">${price}</p>
            {priceWithoutDiscount && typeof priceWithoutDiscount === "number" && priceWithoutDiscount > price && (
              <p className="text-sm text-gray-500 line-through">${priceWithoutDiscount}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                addItem({
                  id: _id,
                  name: title,
                  price,
                  image: imageUrl,
                  quantity: 1,
                })
                toast.success(`${title} added to cart`)
              }}
              className="relative z-10"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                addToWishlist({
                  id: _id,
                  name: title,
                  price,
                  image: imageUrl,
                })
                toast.success(`${title} added to wishlist`)
              }}
              className="relative z-10"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

