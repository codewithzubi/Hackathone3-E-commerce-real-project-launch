"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useCart } from "@/lib/store"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { FiCheckCircle } from "react-icons/fi"

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  zipCode: string
}

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('/api/order', {
        customer: data,
        items: items.map(item => item.id),
        totalAmount: total
      })
      
      setShowSuccess(true)
      clearCart()
    } catch (error) {
      console.error('Order submission failed:', error)
    }
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md text-center">
          <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is being processed.</p>
          <Link href="/">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <h1 className="text-4xl font-extrabold text-center text-teal-700 mb-10">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Summary */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-6">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                  <p className="text-teal-600 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Form */}
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Customer Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  {...register("firstName", { required: true })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
                />
                {errors.firstName && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  {...register("lastName", { required: true })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
                />
                {errors.lastName && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
              />
              {errors.email && <span className="text-red-500 text-sm">Valid email is required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                {...register("phone", { required: true })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
              />
              {errors.phone && <span className="text-red-500 text-sm">Phone number is required</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                {...register("address", { required: true })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
              />
              {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  {...register("city", { required: true })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
                />
                {errors.city && <span className="text-red-500 text-sm">City is required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input
                  {...register("country", { required: true })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
                />
                {errors.country && <span className="text-red-500 text-sm">Country is required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                <input
                  {...register("zipCode", { required: true })}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
                />
                {errors.zipCode && <span className="text-red-500 text-sm">ZIP Code is required</span>}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg shadow-md"
            >
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}