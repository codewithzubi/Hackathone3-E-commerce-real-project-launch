

import { notFound } from "next/navigation"
import { client } from "@/lib/sanity"

async function getPage(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0]`
  const page = await client.fetch(query, { slug })
  return page
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
      <div className="prose max-w-none">{page.content}</div>
    </div>
  )
}











// import Image from "next/image"
// import { client } from "@/lib/sanity"
// import { ProductCard } from "@/components/ui/product-card"
// import AddToCartButton from "@/components/AddToCartButton"

// async function getProduct(slug: string) {
//   const query = `*[_type == "product"]{
//     _id,
//     name,
//     price,
//     description,
//     "imageUrl": image.asset->url,
//     category,
//     isNew,
//     isSale
//   }`
//   return client.fetch(query, { slug })
// }

// async function getRelatedProducts(category: string | null, currentProductId: string) {
//   if (!category) {
//     return [] // Agar category null hai, toh empty array return karein.
//   }

//   const query = `*[_type == "product"] {
//     _id,
//     name,
//     price,
//     "slug": slug.current,
//     "imageUrl": image.asset->url,
//     category,
//     isNew,
//     isSale
//   }`
//   return client.fetch(query, { category, currentProductId })
// }

// export default async function ProductPage({ params }: { params: { slug: string } }) {
//   const product = await getProduct(params.slug)

//   // Defensive check for product
//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
//       </div>
//     )
//   }

//   // Related Products Fetching
//   const relatedProducts = await getRelatedProducts(product.category || null, product._id || "")

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid md:grid-cols-2 gap-8 mb-16">
//         {/* Product Images */}
//         <div className="space-y-4">
//           <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
//             <Image
//               src={product.imageUrl || "/placeholder.svg"} // Placeholder agar imageUrl missing ho
//               alt={product.name || "Product Image"}
//               fill
//               className="object-cover"
//             />
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="space-y-6">
//           <h1 className="text-3xl font-bold">{product.name || "No Name"}</h1>
//           <div className="text-2xl font-bold text-teal-500">
//             ${product.price || "N/A"} USD
//           </div>
//           <p className="text-gray-600">{product.description || "No Description Available"}</p>
//           <AddToCartButton product={product} />
//         </div>
//       </div>

//       {/* Related Products */}
//       <div>
//         <h2 className="text-2xl font-bold mb-8">Related Products</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {relatedProducts.length > 0 ? (
//             relatedProducts.map((relatedProduct: any) => (
//               <ProductCard key={relatedProduct._id} {...relatedProduct} />
//             ))
//           ) : (
//             <p>No related products available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
