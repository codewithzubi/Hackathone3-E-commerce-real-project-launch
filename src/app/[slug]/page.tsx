import { client, urlFor } from "@/lib/sanity"
import Image from "next/image"
import { ProductCard } from "@/components/ui/product-card"
import AddToCartButton from "@/components/AddToCartButton"

async function getProduct(slug: string) {
  const product = await client.fetch(
    `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      price,
      description,
      "image": image.asset->url,
      "slug": slug.current
    }
  `,
    { slug },
  )
  return product
}

async function getRelatedProducts() {
  const products = await client.fetch(`
    *[_type == "product"][0...4] {
      _id,
      name,
      price,
      "image": image.asset->url,
      "slug": slug.current
    }
  `)
  return products
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  const relatedProducts = await getRelatedProducts()

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={urlFor(product.image).url() || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="text-2xl font-bold text-teal-500">${product.price} USD</div>
          <p className="text-gray-600">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct:any) => (
            <ProductCard key={relatedProduct._id} {...relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}

