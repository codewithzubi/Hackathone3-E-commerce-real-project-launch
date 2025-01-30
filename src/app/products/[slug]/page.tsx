import Image from "next/image"
import { notFound } from "next/navigation"
import AddToCartButton from "@/components/AddToCartButton"
import AddToWishlistButton from "@/components/AddToWishlistButton"
import type { Product } from "@/types/product"
import { client } from "@/lib/sanity"

async function getProduct(slug: string): Promise<Product | null> {
  const query = `*[_type == "products" && slug.current == $slug][0]{
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

  try {
    const product = await client.fetch(query, { slug })
    return product
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="border-b pb-6">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-bold text-teal-600">${product.price}</span>
              {product.priceWithoutDiscount && product.priceWithoutDiscount > product.price && (
                <span className="text-xl text-gray-500 line-through">${product.priceWithoutDiscount}</span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-200 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.inventory && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Availability</h2>
                <p className="text-gray-600">
                  {product.inventory > 0 ? `In stock (${product.inventory} available)` : "Out of stock"}
                </p>
              </div>
            )}

            <div className="pt-6 space-y-4">
              <AddToCartButton product={product} />
              <AddToWishlistButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

