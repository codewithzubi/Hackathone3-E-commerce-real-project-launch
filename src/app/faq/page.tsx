"use client"
import { useState } from "react"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null) // State to manage open accordion
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping typically takes 3-5 business days for domestic orders and 7-14 business days for international orders.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary depending on the destination.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email that you can use to track your package.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="w-full">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            {/* Trigger Question */}
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)} // Toggle open/close
              className="w-full text-left text-lg font-medium text-gray-800 bg-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 hover:bg-gray-300 transition-all duration-300 ease-in-out"
            >
              {faq.question}
            </button>

            {/* Answer with smooth animation */}
            <div
              className={`overflow-hidden max-h-0 transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-40" : "" // Apply max-height when expanded
              }`}
            >
              <p className="px-4 py-2 text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
