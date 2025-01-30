import { ProductCard } from "@/components/ui/product-card"
import { client } from "@/lib/sanity"
import Image from "next/image"
import type { Product } from "../../types/product"

async function getProducts() {
  const query = `*[_type == "products"]{
    _id,
    title, 
    price, 
    priceWithoutDiscount, 
    badge, 
    "imageUrl": image.asset->url, 
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

const images = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png"]

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-20 mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Or Subscribe To The Newsletter</h2>
        <form className="max-w-md mx-auto flex gap-4">
          <input type="email" placeholder="Email Address..." className="flex-1 px-4 py-2 border rounded-md" />
          <button type="submit" className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600">
            SUBMIT
          </button>
        </form>
      </div>

      {/* Instagram Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-8">Follow Products And Discounts On Instagram</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((image, i) => (
            <div key={i} className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={`/img${i + 1}.png`}
                alt={`Instagram post ${i + 1}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

