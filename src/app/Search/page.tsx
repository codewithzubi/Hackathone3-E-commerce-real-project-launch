"use client"
import { Suspense, useState, useEffect } from "react"
import { client } from "@/lib/sanity"
import { groq } from "next-sanity"
import SearchResults from "./SearchResults"
import type { Product } from "@/types/product"

const searchQuery = groq`*[_type == "product" && (name match $searchTerm || category match $searchTerm)] {
  _id,
  name,
  price,
  oldPrice,
  "slug": slug.current,
  "imageUrl": image.asset->url,
  category,
  isNew,
  isSale
}`

async function searchProducts(searchTerm: string) {
  if (!searchTerm) {
    return []
  }

  try {
    const products = await client.fetch<Product[]>(searchQuery, { searchTerm: `*${searchTerm}*` })
    return products
  } catch (error) {
    console.error("Search error:", error)
    return []
  }
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q ?? ""
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const results = await searchProducts(query)
      setProducts(results)
    }

    fetchProducts()
  }, [query])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for &quot;{query}&quot;</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults products={products} />
      </Suspense>
    </div>
  )
}
