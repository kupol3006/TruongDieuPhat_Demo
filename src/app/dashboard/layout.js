// File: src/app/dashboard/layout.js
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { UserNav } from "@/components/dashboard/user-nav"
import { Search, BellIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dashboard-theme">
      <div className="flex min-h-screen bg-muted/10">
        <Sidebar />
        <div className="flex-1 md:pl-[260px]">          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/90 backdrop-blur-sm px-6 shadow-sm">
            <div className="md:hidden w-8" />
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center h-9 w-full max-w-sm rounded-md border bg-background px-3 text-sm text-muted-foreground ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all hover:border-primary/50">
              <Search className="h-4 w-4 mr-2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Tìm kiếm..."
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
            
            {/* Spacer to push controls to the right */}
            <div className="flex-1" />
            
            {/* Controls moved to the right */}
            <div className="flex items-center gap-4">
              {/* Notification Button */}
              <Button variant="ghost" size="icon" className="relative hidden md:flex">
                <BellIcon className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-500">5</Badge>
              </Button>
              
              <ThemeSwitcher />
              <UserNav />
            </div>
          </header>
          <main className="container mx-auto py-6 px-4 pt-6 md:px-6 min-h-[calc(100vh-8rem)]">
            <div className="bg-background rounded-lg shadow-sm border p-6">
              {children}
            </div>
          </main>
          
          <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 Admin Dashboard. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  )
}
