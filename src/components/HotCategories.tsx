import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  image: string
  href: string
  featured?: boolean
}

export default function HotCategories() {
  const products: Product[] = [
    {
      id: '1',
      name: 'Modern Orange Chair',
      image: '/img3.png',
      href: '/products/modern-orange-chair',
      featured: true
    },
    {
      id: '2',
      name: 'Tufted Accent Chair',
      image: '/img4.png',
      href: '/products/tufted-accent-chair'
    },
    {
      id: '3',
      name: 'Vintage Dining Chair',
      image: '/img1.png',
      href: '/products/vintage-dining-chair'
    },
    {
      id: '4',
      name: 'Gray Upholstered Chair',
      image: '/img8.png',
      href: '/products/gray-upholstered-chair'
    },
    {
        id: '5',
        name: 'Gray Upholstered Chair',
        image: '/img4.png',
        href: '/products/gray-upholstered-chair'
      }
  ]

  return (
    <section className="py-16 bg-white">
      <div>
        
      </div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold  mb-12 text-black">
          Hot Categories
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Product */}
          {products.filter(p => p.featured).map(product => (
            <Link
              key={product.id}
              href={product.href}
              className="relative aspect-[4/3] overflow-hidden rounded-lg group"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
            </Link>
          ))}

          {/* Grid of smaller products */}
          <div className="grid grid-cols-2 gap-6">
            {products.filter(p => !p.featured).map(product => (
              <Link
                key={product.id}
                href={product.href}
                className="relative aspect-[4/3] overflow-hidden rounded-lg group"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
