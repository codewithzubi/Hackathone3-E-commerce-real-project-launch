"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function OrderConfirmationPage() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate order placing process (for animation demo)
  setTimeout(() => {
    setIsLoading(false)
  }, 3000); // 3 seconds to simulate order placement

  return (
    <div className="relative min-h-screen bg-gray-100 flex justify-center items-center">
      {/* Loader Animation */}
      {isLoading ? (
        <div className="flex flex-col items-center space-y-8 animate-fadeIn">
          <div className="w-16 h-16 border-8 border-t-8 border-teal-400 rounded-full animate-spin"></div>
          <p className="text-xl font-medium text-gray-600">Placing your order...</p>
        </div>
      ) : (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center p-6">
          {/* Confirmation Modal */}
          <div className="bg-white rounded-xl shadow-lg p-12 max-w-md w-full transform transition-all duration-300 scale-105 opacity-100 animate-slideIn">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-semibold text-gray-800">Thank You for Your Order!</h1>
              <p className="text-lg text-gray-500 mt-2">Your order has been placed successfully.</p>
            </div>

            <div className="space-y-6">
              <Button
                className="w-full bg-teal-500 text-white px-8 py-3 rounded-lg text-lg font-medium transform transition-all duration-200 hover:bg-teal-600 shadow-md hover:scale-105"
              >
                <Link href="/products">Continue Shopping</Link>
              </Button>

              <p className="text-center text-gray-600">
                Or <Link href="/orders" className="text-teal-600 font-medium hover:underline">view your orders</Link>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
