"use client"

import { ProductCard } from "@/components/ui/product-card"
import type { Product } from "@/types/product"

export default function SearchResults({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          _id={product._id}
          name={product.name}
          price={product.price}
          oldPrice={product.oldPrice}
          imageUrl={product.imageUrl}
          slug={product.slug}
          category={product.category}
          isNew={product.isNew}
          isSale={product.isSale} description={""} title={""}        />
      ))}
    </div>
  )
}

