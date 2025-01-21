import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About Us</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="mb-4">
            Welcome to EStore, your one-stop shop for all your furniture needs. We are passionate about providing
            high-quality, stylish, and affordable furniture to make your house feel like a home.
          </p>
          <p className="mb-4">
            Founded in 2023, EStore has quickly become a leader in the online furniture retail space. Our mission is to
            offer a wide range of furniture options that cater to various tastes and budgets, all while providing
            exceptional customer service.
          </p>
          <p>
            At EStore, we believe that everyone deserves to live in a space they love. That's why we work tirelessly to
            curate a collection of furniture that combines comfort, style, and durability. From cozy sofas to elegant
            dining sets, we have everything you need to transform your living space.
          </p>
        </div>
        <div className="relative h-96">
          <Image src="/Eabout.jpg" alt="About EStore" fill className="object-cover rounded-lg" />
        </div>
      </div>
    </div>
  )
}

