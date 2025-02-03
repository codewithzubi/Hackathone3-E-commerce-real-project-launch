"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    clearCart()
    toast.success("Order placed successfully!")
    router.push("/order-confirmation")
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white text-center">
        <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Your cart is empty</h1>
        <Button 
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold rounded-full shadow-lg transition duration-300"
          onClick={() => router.push("/products")}
        >
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">
        <h1 className="text-4xl font-bold text-center mb-8 drop-shadow-lg">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white/20 p-4 rounded-xl shadow-md">
                  <span className="font-medium text-lg">{item.name} x {item.quantity}</span>
                  <span className="font-bold text-pink-400 text-xl">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="text-2xl font-bold mt-6 text-pink-500 drop-shadow-lg">Total: ${getTotalPrice().toFixed(2)}</div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input 
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="p-4 bg-white/20 rounded-xl text-black focus:ring-2 focus:ring-pink-400"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="p-4 bg-white/20 rounded-xl text-black focus:ring-2 focus:ring-pink-400"
              />
              <Input
                type="text"
                name="address"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="p-4 bg-white/20 rounded-xl text-black focus:ring-2 focus:ring-pink-400"
              />
              <Button 
                type="submit" 
                className="w-full px-6 py-4 bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold rounded-full shadow-lg transition duration-300">
                Place Order
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}