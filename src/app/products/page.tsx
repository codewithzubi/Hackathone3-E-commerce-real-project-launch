"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { ProductCard } from "@/components/ui/product-card"
import { Pagination } from "@/components/ui/pagination"

const products = [
  {
    _id: "1",
    name: "Library Stool Chair",
    price: 20,
    image:
      "/img1.png",
    category: "Chair",
    isNew: true,
  },
  {
    _id: "2",
    name: "Comfortable Sofa",
    price: 499,
    image: "/img2.png",
    category: "Sofa",
    isSale: true,
  },
  {
    _id: "3",
    name: "Wooden Dining Table",
    price: 299,
    image: "/img3.png",
    category: "Table",
  },

  {
    _id: "4",
    name: "Wooden Dining Table",
    price: 299,
    image: "/img4.png",
    category: "Table",
  },
  {
    _id: "5",
    name: "Wooden Dining Table",
    price: 299,
    image: "/img4.png",
    category: "Table",
  },

  {
    _id: "5",
    name: "Wooden Dining Table",
    price: 299,
    image: "/img1.png",
    category: "Table",
  },

  {
    _id: "5",
    name: "Wooden Dining Table",
    price: 299,
    image: "/img3.png",
    category: "Table",
  },


  {
    _id: "5",
    name: "Wooden Dining Table",
    price: 299,
    image: "/img2.png",
    category: "Table",
  },




  {
    _id: "5",
    name: "Wooden Dining Table",
    price: 299,
    image: "/img3.png",
    category: "Table",
  },

  {
    _id: "5",
    name: "Wooden Dining Table",
    price: 299,
    image: "/img3.png",
    category: "Table",
  },

  
 
  // Add more products with different categories, prices, etc.
]

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("name")
  const [filterCategory, setFilterCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  const categories = useMemo(() => {
    const categorySet = new Set(products.map((product) => product.category))
    return ["All", ...Array.from(categorySet)]
  }, [])

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => filterCategory === "All" || product.category === filterCategory)
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name)
        if (sortBy === "priceLow") return a.price - b.price
        if (sortBy === "priceHigh") return b.price - a.price
        return 0
      })
  }, [filterCategory, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <label htmlFor="category" className="mr-2">
            Filter by:
          </label>
          <select
            id="category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded-md px-2 py-1"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-2 py-1"
          >
            <option value="name">Name</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  {
  relatedProducts.map((relatedProduct:any) => (
    <ProductCard 
      key={relatedProduct._id} 
      _id={relatedProduct._id} 
      name={relatedProduct.name} 
      price={relatedProduct.price} 
      imageUrl={relatedProduct.imageUrl} 
      category={relatedProduct.category} 
      isNew={relatedProduct.isNew} 
      isSale={relatedProduct.isSale} 
      slug={relatedProduct.slug} // Make sure to pass the slug here
    />
  ))}
</div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

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
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square relative overflow-hidden rounded-lg">

              <Image
               src={`/img6.png`}
               alt={`Instagram post ${i + 1}`}
               width={100}
               height={100}
               className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
              />

             
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

