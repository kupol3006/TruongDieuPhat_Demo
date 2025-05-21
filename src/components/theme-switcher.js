// File: src/components/theme-switcher.js
"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Đảm bảo component chỉ render sau khi đã mount để tránh hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <button className="rounded-md p-2 hover:bg-muted">
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => {
        const newTheme = theme === "dark" || 
          (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
          ? "light" 
          : "dark"
        setTheme(newTheme)
      }}
      className="rounded-md p-2 hover:bg-muted"
    >
      {theme === "dark" || 
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
