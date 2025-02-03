"use client"

import { useState } from "react"
import { useCart } from "@/lib/store"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"

export function CheckoutForm() {
  const router = useRouter()
  const { items, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const orderData = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      orderItems: items.map((item) => ({
        product: { _ref: item._id },
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: items.reduce((total, item) => total + item.price * item.quantity, 0),
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const data = await response.json()
        clearCart()
        toast.success("Order placed successfully!")
        router.push(`/order-confirmation/${data.orderId}`)
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Failed to place order. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("An error occurred. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="street">Street</Label>
        <Input type="text" id="street" name="street" value={formData.street} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <Input type="text" id="state" name="state" value={formData.state} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="zipCode">Zip Code</Label>
        <Input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
      </div>
      <Button type="submit" className="w-full">
        Place Order
      </Button>
    </form>
  )
}

