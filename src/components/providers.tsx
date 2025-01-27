"use client"

import { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  )
}

