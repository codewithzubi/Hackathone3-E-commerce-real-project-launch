"use client"

import { ProductCard } from "@/components/ui/product-card"
import type { Product } from "@/types/product"

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  )
}

