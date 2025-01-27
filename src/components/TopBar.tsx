"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, HelpCircle } from "lucide-react"

const languages = [
  { code: "eng", name: "English" },
  { code: "esp", name: "Español" },
  { code: "fra", name: "Français" },
  { code: "deu", name: "Deutsch" },
  { code: "ita", name: "Italiano" },
]

export function TopBar() {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(languages[0])

  return (
    <div className="bg-[#17152c] text-white py-2 px-4">
      <div className="container mx-auto flex justify-between items-center text-sm">
        <div>✓ Free Shipping On All Orders Over $50</div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <span>{currentLang.code.toUpperCase()}</span>
              <ChevronDown size={16} />
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-1 w-32 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang)
                      setIsLangOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/faq" className="hover:text-gray-200">
            Faqs
          </Link>

          <Link href="/help" className="flex items-center space-x-1 hover:text-gray-200">
            <HelpCircle size={16} />
            <span>Need Help</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

