import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "../components/ui/product-card";
import HotCategories from "../components/HotCategories"; // HotCategories component ko import karenge

const featuredProducts = [
  {
    id: "1",
    name: "Library Stool Chair",
    price: 20,
    image: "/img1.png",
  },
  {
    id: "2",
    name: "Library Stool Chair",
    price: 20,
    image: "/img2.png",
  },
  {
    id: "3",
    name: "Library Stool Chair",
    price: 20,
    image: "/img3.png",
  },
  {
    id: "4",
    name: "Library Stool Chair",
    price: 20,
    image: "/img4.png",
  },
];

const logos = [
  { src: "/Logo4.png", alt: "Logo 4", width: 85, height: 87 },
  { src: "/Logo1.png", alt: "Logo 1", width: 107, height: 109 },
  { src: "/Logo7.png", alt: "Logo 7", width: 135, height: 139 },
  { src: "/Logo2.png", alt: "Logo 2", width: 63, height: 65 },
  { src: "/Logo6.png", alt: "Logo 6", width: 98, height: 101 },
  { src: "/Logo3.png", alt: "Logo 3", width: 113, height: 115 },
  { src: "/Logo5.png", alt: "Logo 5", width: 84, height: 87 },
];

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

      {/* Logos Section */}
      <section>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-full h-full"
              >
                <Image
                  className="object-contain w-auto h-auto max-h-16 sm:max-h-20 md:max-h-24"
                  width={logo.width}
                  height={logo.height}
                  alt={logo.alt}
                  src={logo.src}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard _id={""} slug={""} imageUrl={""} description={""} category={""} key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Top Categories
          </h2>
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
                  <h3 className="text-xl font-semibold text-white">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Categories Section */}
      <HotCategories /> {/* Yahan par HotCategories component render kiya */}

      
    </div>
  );
}
