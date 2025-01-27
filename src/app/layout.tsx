import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { TopBar } from "@/components/TopBar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Providers } from "@/components/providers"
// import LoadingSpinner from "@/components/LoadingSpinner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ecommerce Store",
  description: "Your one-stop shop for all products",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TopBar />
          <Header />
          {/* <LoadingSpinner /> */}
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

