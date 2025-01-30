export interface Product {
  _id: string
  title: string
  slug: string
  price: number
  priceWithoutDiscount?: number
  imageUrl: string
  category:
    | string
    | {
        _id: string
        title: string
      }
  description: string
  inventory?: number
  tags?: string[]
  badge?: string
  isNew?: boolean
  isSale?: boolean
}

export interface Category {
  title: string
  image: string
  products: Product[]
}

