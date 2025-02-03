export interface User {
    id: string
    email: string
    name?: string
    image?: string
  }
  
  export interface Review {
    id: string
    userId: string
    userName: string
    rating: number
    comment: string
    createdAt: string
  }
  
  export interface Order {
    id: string
    userId: string
    items: OrderItem[]
    total: number
    status: "pending" | "processing" | "shipped" | "delivered"
    shippingAddress: ShippingAddress
    createdAt: string
  }
  
  export interface OrderItem {
    productId: string
    name: string
    price: number
    quantity: number
    image: string
  }
  
  export interface ShippingAddress {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
  }
  
  export interface UserProfile {
    id: string
    email: string
    name: string
    image?: string
    addresses: ShippingAddress[]
  }
  
  