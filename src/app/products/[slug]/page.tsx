import { FaShippingFast, FaUndo } from 'react-icons/fa'
import { GiConfirmed } from 'react-icons/gi'
import Image from "next/image"
import { notFound } from "next/navigation"
import { client } from "@/lib/sanity"
import AddToCartButton from "@/components/AddToCartButton"
import AddToWishlistButton from "@/components/AddToWishlistButton"

async function getProduct(slug: string) {
  const query = `*[_type == "products" && slug.current == '${slug}' ][0]{
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
    tags,
    colors,
    sizes,
    oldPrice
  }`

  const product = await client.fetch(query, { slug })

  if (!product) {
    notFound()
  }

  return product
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-r from-teal-100 to-white">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-lg bg-gray-200 hover:shadow-xl transition-shadow duration-500">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110 hover:glow-effect"
              priority
            />
          </div>
          {product.images && (
            <div className="grid grid-cols-4 gap-4 mt-6">
              {product.images.map((image: string, index: number) => (
                <div key={index} className="relative overflow-hidden rounded-xl shadow-sm hover:scale-110 transform transition-all duration-300">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="border-b pb-6">
            <h1 className="text-5xl font-semibold text-gray-800 text-shadow-lg">{product.title}</h1>
            <div className="flex items-baseline gap-6 mt-2">
  <span className="text-4xl font-bold text-teal-600">${product.price}</span>
  {product.oldPrice && (
    <span className="text-xl text-gray-500 line-through">${product.oldPrice}</span>
  )}
</div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Description</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            {product.colors && product.colors.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Available Colors</h2>
                <div className="flex gap-4 mt-2">
                  {product.colors.map((color: string) => (
                    <div
                      key={color}
                      className="w-12 h-12 rounded-full border-2 border-teal-500 cursor-pointer transform transition-all duration-300 hover:scale-110 hover:border-teal-700"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Available Sizes</h2>
                <div className="flex gap-4 mt-2">
                  {product.sizes.map((size: string) => (
                    <div
                      key={size}
                      className="px-6 py-3 border rounded-full text-gray-600 font-semibold cursor-pointer transform transition-all duration-200 hover:bg-teal-100 hover:scale-105"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 pt-8">
              <AddToCartButton product={product} />
              <AddToWishlistButton product={product} />
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t pt-8 mt-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-2 text-teal-600">
                <FaShippingFast size={30} />
                <div>
                  <h3 className="font-semibold text-lg">Free Delivery</h3>
                  <p className="text-sm text-gray-600">For orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-teal-600">
                <FaUndo size={30} />
                <div>
                  <h3 className="font-semibold text-lg">Returns</h3>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-teal-600">
                <GiConfirmed size={30} />
                <div>
                  <h3 className="font-semibold text-lg">Secure Payment</h3>
                  <p className="text-sm text-gray-600">Safe and easy checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
