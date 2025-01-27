import { ProductCard } from "@/components/ui/product-card"
import { client } from "@/lib/sanity"

async function searchProducts(query: string) {
  const searchQuery = `*[_type == "product" && (name match $query || category match $query)] {
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
  return client.fetch(searchQuery, { query: `*${query}*` })
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q ?? ""
  const products = await searchProducts(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product:any) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </div>
  )
}

