import { ProductCard } from "@/components/ui/product-card"

// This would typically come from an API or database
const allProducts = [
  {
    _id: "1",
    name: "Library Stool Chair",
    price: 20,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Products%20Page%20(1).jpg-ddcnZIMzY1ZGdIfsBiE57LtCvcxpgX.jpeg",
    category: "Furniture",
    isNew: false,
    isSale: false,
  },
  // Add more products here
]

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q ?? ""
  const products = allProducts.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              isNew={product.isNew}
              isSale={product.isSale}
            />
          ))}
        </div>
      )}
    </div>
  )
}

