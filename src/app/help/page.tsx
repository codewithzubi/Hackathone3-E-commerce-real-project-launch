export default function HelpPage() {
  return (
    <div className="container mx-auto px-6 py-12 bg-[#F8F9FA]">
     <h1 className="text-4xl font-extrabold text-center text-[#343A40] mb-10">
  Need Help? We&apos;re here to assist!
</h1>


      <div className="grid md:grid-cols-2 gap-16">
        {/* Contact Us Section */}
        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold text-[#007BFF] mb-4">Contact Us</h2>
          <p className="text-[#495057] mb-4 text-lg">
            Our dedicated customer service team is available 24/7 to provide you with assistance.
          </p>
          <div className="space-y-3">
            <p className="text-[#495057] text-lg">
              <span className="font-medium">Email:</span> zubairahmedarain12@gmail.com
            </p>
            <p className="text-[#495057] text-lg">
              <span className="font-medium">Phone:</span> +92-318-3102960
            </p>
            <p className="text-[#495057] text-lg">
              <span className="font-medium">Hours:</span> Monday - Sunday, 24/7
            </p>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold text-[#007BFF] mb-4">Quick Links</h2>
          <ul className="space-y-4">
            <li>
              <a
                href="/faqs"
                className="text-[#20C997] hover:text-[#0056b3] text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="/shipping"
                className="text-[#20C997] hover:text-[#0056b3] text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Shipping Information
              </a>
            </li>
            <li>
              <a
                href="/returns"
                className="text-[#20C997] hover:text-[#0056b3] text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a
                href="/track-order"
                className="text-[#20C997] hover:text-[#0056b3] text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Track Your Order
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-[#343A40] mb-6">Need More Assistance?</h2>
        <p className="text-lg text-[#495057] mb-4">
          If you have any other questions or require additional support, feel free to reach out to our team anytime.
        </p>
        <a
          href="/contact"
          className="bg-[#007BFF] text-white py-3 px-8 rounded-lg shadow-md hover:bg-[#0056b3] transition-all duration-300 ease-in-out"
        >
          Contact Us Now
        </a>
      </div>

      {/* Footer Section */}
      <footer className="text-center mt-16">
        <p className="text-[#495057] text-sm">
          &copy; 2025 Your Company. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
