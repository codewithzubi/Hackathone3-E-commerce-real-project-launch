"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Heart } from "lucide-react"
import { useCart } from "@/lib/store"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()
  const [couponCode, setCouponCode] = useState("")

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-teal-50 to-teal-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-teal-700 mb-10">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white shadow-xl rounded-xl p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4 text-lg">Your cart is empty</p>
              <Link href="/products" className="text-teal-500 hover:text-teal-700 font-medium text-lg">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 border rounded-lg p-5 bg-gray-50 hover:shadow-md">
                  <div className="relative w-28 h-28 rounded-lg overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="font-bold text-teal-600 text-lg">${item.price * item.quantity}</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Size: L</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="border rounded px-3 py-2 text-lg focus:ring-teal-400 focus:border-teal-400"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="border rounded px-3 py-2 text-lg focus:ring-teal-400 focus:border-teal-400"
                      >
                        +
                      </button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Heart className="w-5 h-5 text-pink-500 hover:text-pink-700" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1 bg-white shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3 text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">{shipping === 0 ? "Free" : `$${shipping}`}</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link href="/checkout">
            <Button className="w-full mt-6 bg-teal-600 text-white text-lg py-3 rounded-lg shadow-md hover:bg-teal-700">
              Proceed to Checkout
            </Button>
          </Link>
          <div className="mt-6 space-y-3">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-400"
            />
            <Button variant="outline" className="w-full text-lg py-3 border-teal-600 text-teal-600 hover:bg-teal-100">
              Apply Coupon
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
