import Image from "next/image"
import { notFound } from "next/navigation"
import { client } from "@/lib/sanity"
import AddToCartButton from "@/components/AddToCartButton"
import AddToWishlistButton from "@/components/AddToWishlistButton"

async function getProduct(slug: string) {
  // console.log("object", slug)
  const query = `*[_type == "products"  && slug.current == '${slug}' ][0]{
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

  const product = await client.fetch(query, { slug })

  if (!product) {
    notFound()
  }


  return product
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  console.log("sdas",product)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="border-b pb-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-bold text-teal-600">${product.price}</span>
              {product.oldPrice && <span className="text-xl text-gray-500 line-through">${product.oldPrice}</span>}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Available Colors</h2>
                <div className="flex gap-2">
                  {product.colors.map((color: string) => (
                    <div
                      key={color}
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Available Sizes</h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <div key={size} className="px-4 py-2 border rounded-md hover:border-teal-500 cursor-pointer">
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 space-y-4">
              <AddToCartButton product={product} />
              <AddToWishlistButton product={product} />
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t pt-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Free Delivery</h3>
                <p className="text-sm text-gray-600">For orders over $50</p>
              </div>
              <div>
                <h3 className="font-semibold">Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

