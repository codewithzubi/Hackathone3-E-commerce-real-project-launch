export default function HelpPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Need Help?</h1>
  
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="text-gray-600">Our customer service team is available 24/7 to assist you.</p>
            <div className="space-y-2">
              <p>Email: support@example.com</p>
              <p>Phone: 1-800-123-4567</p>
              <p>Hours: Monday - Sunday, 24/7</p>
            </div>
          </div>
  
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/faqs" className="text-teal-600 hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-teal-600 hover:underline">
                  Shipping Information
                </a>
              </li>
              <li>
                <a href="/returns" className="text-teal-600 hover:underline">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="/track-order" className="text-teal-600 hover:underline">
                  Track Your Order
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
  