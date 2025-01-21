"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store"
import { useWishlist } from "@/lib/wishlistStore"
import { toast } from "react-hot-toast"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  isNew?: boolean
  isSale?: boolean
}

export function ProductCard({ id, name, price, image, isNew, isSale }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem)
  const addToWishlist = useWishlist((state) => state.addItem)

  return (
    <div className="group relative">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={typeof image === "string" ? image : "/placeholder.svg"}
          alt={name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {isNew && <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">New</div>}
        {isSale && <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">Sale</div>}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">${price}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              addItem({ id, name, price, image, quantity: 1 })
              toast.success(`${name} added to cart`)
            }}
            className="relative z-10"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              addToWishlist({ id, name, price, image })
              toast.success(`${name} added to wishlist`)
            }}
            className="relative z-10"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

