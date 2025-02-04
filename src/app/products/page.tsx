import { Suspense } from "react"
import { ProductList } from "../../components/ProductList"
import { client } from "@/lib/sanity"

async function getProducts() {
  const query = `*[_type == "products"][0...12]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    "imageUrl": image.asset->url,
    "slug": slug.current,
    category->{
      _id,
      title
    },
    description,
    inventory,
    tags
  }`

  return client.fetch(query)
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList products={products} />
      </Suspense>

       {/* Newsletter */}
       <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Subscribe To Our Newsletter</h2>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

