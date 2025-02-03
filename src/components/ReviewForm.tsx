"use client"

import { useState } from "react"
import { useUser } from "@/lib/userStore"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-hot-toast"

export function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const { user, token } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast.error("Please login to leave a review")
      return
    }

    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      })

      if (!res.ok) {
        throw new Error("Failed to submit review")
      }

      toast.success("Review submitted successfully")
      setRating(0)
      setComment("")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Rating:</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block mb-2">
          Comment:
        </label>
        <Textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
      </div>
      <Button type="submit">Submit Review</Button>
    </form>
  )
}

