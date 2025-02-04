import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/ui/product-card"
import { client } from "@/lib/sanity"
import type { Product, Category } from "@/types/product"

async function getFeaturedProducts(): Promise<Product[]> {
  const query = `*[_type == "products"][0...4]{
    _id,
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    category,
    price,
    oldPrice,
    description,
    colors,
    sizes,
    isFeatured,
    isNew,
    isSale
  }`
  return client.fetch(query)
}

async function getCategoriesProducts(): Promise<Category[]> {
  const query = `
  *[_type == "categories"]{
    title,
    "image": image.asset->url,
    "products": products[]->{
      _id,
      name,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      category,
      price,
      oldPrice,
      description,
      colors,
      sizes,
      isFeatured,
      isNew,
      isSale
    }
  }
  `
  return client.fetch(query)
}

async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "products"][0...8]{
    _id,
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    category,
    price,
    oldPrice,
    description,
    colors,
    sizes,
    isFeatured,
    isNew,
    isSale
  }`
  return client.fetch(query)
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()
  const categories = await getCategoriesProducts()
  const products = await getProducts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-100 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Stylish Furniture For Your Home
            </h1>
            <p className="text-lg text-gray-600 mb-8">Transform your living space with our curated collection</p>
            <Link
              href="/products"
              className="bg-teal-500 text-white px-8 py-3 rounded-md hover:bg-teal-600 transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/chair.png"
              alt="Stylish Chair"
              width={600}
              height={600}
              
            />
          </div>
        </div>
      </section>
      {/* Logos Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <Image
                key={index}
                src={`/logo1-${index}.png`}
                alt={`Brand Logo ${index}`}
                width={100}
                height={50}
                
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product: Product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Top Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category: Category) => (
              <Link key={category.title} href={`/category/${category.title.toLowerCase().replace(" ", "-")}`}>
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] group">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                    <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Explore New and Popular Styles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore New and Popular Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Modern", "Contemporary", "Minimalist"].map((style, index) => (
              <div key={style} className="relative overflow-hidden rounded-lg aspect-[3/4] group">
                <Image
                  src={`/style-${index + 1}.jpg`}
                  alt={style}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{style}</h3>
                  <Link href={`/style/${style.toLowerCase()}`} className="text-white underline">
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="bg-teal-500 text-white px-8 py-3 rounded-md hover:bg-teal-600 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Logos Section */}
     

     
    </div>
  )
}

