export interface Product {
    _id: string
    name: string
    slug: string
    imageUrl: string
    category: string
    price: number
    oldPrice?: number
    description: string
    colors?: string[]
    sizes?: string[]
    isFeatured?: boolean
    isNew?: boolean
    isSale?: boolean
  }
  
  export interface Category {
    title: string
    image: string
    products: Product[]
  }
  
  