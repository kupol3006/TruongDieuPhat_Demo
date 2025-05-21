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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative md:hidden">
          <BellIcon className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-500">5</Badge>
        </Button>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="relative flex items-center gap-2 rounded-full border p-1 hover:bg-accent cursor-pointer transition-colors"
        >
          <Avatar>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              AD
            </div>
          </Avatar>
          <span className="hidden md:block text-sm font-medium pr-1">Admin</span>
        </button>
      </div>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-md border bg-popover p-2 shadow-lg">
            <div className="border-b p-3 mb-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    AD
                  </div>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@example.com</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Badge className="bg-green-500 text-white">Administrator</Badge>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <User className="h-3 w-3 mr-1" /> Hồ sơ
                </Button>
              </div>
            </div>
            <nav className="flex flex-col space-y-1">
              <Button variant="ghost" className="justify-start text-xs" onClick={() => setIsOpen(false)}>
                <Mail className="mr-2 h-4 w-4" />
                Tin nhắn
                <Badge className="ml-auto">3</Badge>
              </Button>
              <Button variant="ghost" className="justify-start text-xs" onClick={() => setIsOpen(false)}>
                <Settings className="mr-2 h-4 w-4" />
                Cài đặt tài khoản
              </Button>
              <Button variant="ghost" className="justify-start text-xs" onClick={() => setIsOpen(false)}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Trợ giúp và hỗ trợ
              </Button>
              <Button variant="ghost" className="justify-start text-xs text-red-500 hover:text-red-500 hover:bg-red-50/10" onClick={() => setIsOpen(false)}>
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </Button>
            </nav>
            <div className="border-t mt-2 pt-2">
              <Button variant="outline" size="sm" className="w-full justify-center text-xs" onClick={() => setIsOpen(false)}>
                <ExternalLink className="mr-2 h-3 w-3" />
                Chuyển đến trang chủ
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
