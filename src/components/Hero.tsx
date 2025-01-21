import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "../components/ui/product-card"

const featuredProducts = [
  {
    id: "1",
    name: "Library Stool Chair",
    price: 20,
    image:
      "/img1.png",
  },

  {
    id: "1",
    name: "Library Stool Chair",
    price: 20,
    image:
      "/img2.png",
  },

  {
    id: "1",
    name: "Library Stool Chair",
    price: 20,
    image:
      "/img3.png",
  },

  {
    id: "1",
    name: "Library Stool Chair",
    price: 20,
    image:
      "/img4.png",
  },
  // Add more products here
]

export default function Home() {
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
              src="/chair.png"
              alt="Hero Furniture"
              width={500}
              height={400}
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
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
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
                  src="/img7.png"
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

