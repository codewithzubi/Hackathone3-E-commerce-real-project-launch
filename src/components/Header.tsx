"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { useCart } from "@/lib/store"
import { SearchBar } from "./SearchBar"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<{ id: number; email: string } | null>(null)
  const cartItems = useCart((state) => state.items)
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            EStore
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
            <SearchBar />
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartQuantity}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <User size={24} />
                  <span>{user.email}</span>
                </button>
                <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl hidden group-hover:block">
                  <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Wishlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hover:text-primary transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden">
              <div className="flex flex-col p-4 space-y-4">
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/products" className="hover:text-primary transition-colors">
                  Products
                </Link>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
                <SearchBar />
                <Link href="/cart" className="flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  Cart ({cartQuantity})
                </Link>
                {user ? (
                  <>
                    <Link href="/wishlist" className="hover:text-primary transition-colors">
                      Wishlist
                    </Link>
                    <button onClick={handleLogout} className="text-left hover:text-primary transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="hover:text-primary transition-colors">
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

