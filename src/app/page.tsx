import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/ui/product-card"
import { client } from "@/lib/sanity"

async function getFeaturedProducts() {
  const query = `*[_type == "product" && isFeatured == true] {
    _id,
    name,
    price,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    category,
    isNew,
    isSale
  }`
  return client.fetch(query)
}

async function getAllProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    price,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    category,
    isNew,
    isSale
  }`
  return client.fetch(query)
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()
  const allProducts = await getAllProducts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-100 h-[600px]">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Best Furniture Collection For Your Interior.
            </h1>
            <p className="text-lg text-gray-600 mb-8">WELCOME TO COMFORTY</p>
            <Link
              href="/products"
              className="bg-teal-500 text-white px-8 py-3 rounded-md hover:bg-teal-600 transition-colors"
            >
              Shop Now →
            </Link>
          </div>
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Homepage.jpg-L5AXjsnEZZre0piilbcktz8fq1bD55.jpeg"
              alt="Hero Furniture"
              width={600}
              height={600}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product:any) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Wing Chair", "Wooden Chair", "Desk Chair"].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase().replace(" ", "-")}`}
                className="relative overflow-hidden rounded-lg aspect-[4/3] group"
              >
                <Image
                  src="/placeholder.svg"
                  alt={category}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((product:any) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Subscribe To The Newsletter</h2>
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

