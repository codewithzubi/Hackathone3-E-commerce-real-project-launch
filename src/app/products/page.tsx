import { Suspense } from "react"
import { ProductList } from "../../components/ProductList"
import { client } from "@/lib/sanity"

async function getProducts() {
  const query = `*[_type == "products"]{
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
    </div>
  )
}

