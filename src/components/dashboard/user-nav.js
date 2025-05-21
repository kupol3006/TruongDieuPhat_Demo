"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BellIcon, LogOut, Settings, User, ExternalLink, HelpCircle, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSettingsStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { name, email } = useSettingsStore()
  const router = useRouter()
    // Generate initials from user name or default to "AD"
  const initials = name 
    ? name.split(" ").map(word => word[0]).join("").toUpperCase().substring(0, 2)
    : "AD"
  
  // Display name: prioritize name from store or default to "Admin"
  const displayName = name || "Admin"
  
  // Display email: prioritize email from store or default to admin@example.com
  const displayEmail = email || "admin@example.com"
  
  // Count active notifications from the store
  const { notificationPreferences } = useSettingsStore()
  const notificationCount = notificationPreferences ? 
    Object.values(notificationPreferences).filter(v => 
      typeof v === 'boolean' && v === true
    ).length : 0
  
  const goToSettings = () => {
    router.push('/settings')
    setIsOpen(false)
  }
  
  return (
    <div className="relative">      <div className="flex items-center gap-4">        <Button variant="ghost" size="icon" className="relative md:hidden">
          <BellIcon className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-500">
            {notificationCount}
          </Badge>
        </Button>
          <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="group relative flex items-center gap-3 rounded-full border border-transparent bg-gradient-to-r from-background to-background/90 px-3 py-1.5 shadow-sm hover:border-primary/20 hover:from-primary/5 hover:to-background hover:shadow-md active:scale-[0.98] transition-all duration-200"
        >
          <Avatar className="ring-2 ring-primary/20 ring-offset-1 ring-offset-background transition-all group-hover:ring-primary/30">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs font-medium">
              {initials}
            </div>
          </Avatar>
          <div className="hidden md:block transition-all">
            <span className="text-sm font-medium leading-none">{displayName}</span>
            <span className="text-xs text-muted-foreground/80 block mt-0.5">{notificationCount} notifications</span>
          </div>
          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary ml-0.5 hidden md:flex transition-all group-hover:bg-primary/20">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:rotate-180"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </button>
      </div>
        {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-lg border bg-popover p-3 shadow-md">
            <div className="border-b border-border/40 pb-3 mb-2">
              <div className="flex items-center gap-3">                <Avatar>
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                    {initials}
                  </div>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-muted-foreground">{displayEmail}</p>
                  <div className="mt-1">
                    <Badge className="bg-green-500 text-white rounded-sm font-normal text-[10px] px-1.5">Administrator</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">                <Button variant="outline" size="sm" className="h-8 text-xs rounded-md">
                  <User className="h-3 w-3 mr-1.5" /> View Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs rounded-md"
                  onClick={goToSettings}
                >
                  <Settings className="h-3 w-3 mr-1.5" /> Settings
                </Button>
              </div>
            </div>
            <nav className="flex flex-col space-y-1">              <Button variant="ghost" className="justify-start text-xs h-8 px-2 rounded-md" onClick={() => setIsOpen(false)}>
                <Mail className="mr-2 h-4 w-4" />
                Messages
                <Badge className="ml-auto bg-primary/90 hover:bg-primary text-[10px] rounded-sm">{notificationCount}</Badge>
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start text-xs h-8 px-2 rounded-md" 
                onClick={goToSettings}
              >
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-8 px-2 rounded-md" onClick={() => setIsOpen(false)}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-8 px-2 text-red-500 hover:text-red-500 hover:bg-red-50/10 rounded-md" onClick={() => setIsOpen(false)}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
            <div className="border-t border-border/40 mt-2 pt-2">
              <Button variant="secondary" size="sm" className="w-full justify-center text-xs h-8 mt-1 rounded-md" onClick={() => setIsOpen(false)}>
                <ExternalLink className="mr-2 h-3 w-3" />
                Go to Homepage
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
