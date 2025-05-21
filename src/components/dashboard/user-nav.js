"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BellIcon, LogOut, Settings, User, ExternalLink, HelpCircle, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      <div className="flex items-center gap-4">        <Button variant="ghost" size="icon" className="relative md:hidden">
          <BellIcon className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-500">5</Badge>
        </Button>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="relative flex items-center gap-2 rounded-lg border bg-background/80 px-3 py-1.5 hover:bg-accent hover:shadow-sm cursor-pointer transition-all"
        >
          <Avatar>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
              AD
            </div>
          </Avatar>
          <span className="hidden md:block text-sm font-medium">Admin</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-muted-foreground ml-0.5 hidden md:block"
          >
            <path
              d="M8 10.5L4 6.5H12L8 10.5Z"
              fill="currentColor"
            ></path>
          </svg>
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
              <div className="flex items-center gap-3">
                <Avatar>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                    AD
                  </div>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@example.com</p>
                  <div className="mt-1">
                    <Badge className="bg-green-500 text-white rounded-sm font-normal text-[10px] px-1.5">Administrator</Badge>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs rounded-md">
                  <User className="h-3 w-3 mr-1.5" /> View Profile
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs rounded-md">
                  <Settings className="h-3 w-3 mr-1.5" /> Settings
                </Button>
              </div>
            </div>
            <nav className="flex flex-col space-y-1">
              <Button variant="ghost" className="justify-start text-xs h-8 px-2 rounded-md" onClick={() => setIsOpen(false)}>
                <Mail className="mr-2 h-4 w-4" />
                Messages
                <Badge className="ml-auto bg-primary/90 hover:bg-primary text-[10px] rounded-sm">3</Badge>
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-8 px-2 rounded-md" onClick={() => setIsOpen(false)}>
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
