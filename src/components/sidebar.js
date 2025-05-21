// File: src/components/sidebar.js
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  PackageCheck, 
  CalendarClock, 
  MessageSquare, 
  Users,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Gauge,
  Bell,
  HelpCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Management",
    icon: Gauge,
    children: [
      {
        title: "Pending Suppliers",
        href: "/dashboard/suppliers",
        icon: PackageCheck,
        badge: {
          text: "4",
          variant: "info"
        }
      },
      {
        title: "Pending Events",
        href: "/dashboard/events",
        icon: CalendarClock,
        badge: {
          text: "3",
          variant: "info"
        }
      },
      {
        title: "Moderate Posts",
        href: "/dashboard/posts",
        icon: MessageSquare,
        badge: {
          text: "19",
          variant: "destructive"
        }
      },
      {
        title: "User Management",
        href: "/dashboard/users",
        icon: Users,
        badge: null
      },
    ]
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null
  },
]

export function Sidebar({ className }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedGroup, setExpandedGroup] = useState(null)
  
  // Expand the group that contains the current path
  useEffect(() => {
    navItems.forEach((item, index) => {
      if (item.children) {
        const childActive = item.children.some(child => pathname === child.href)
        if (childActive) {
          setExpandedGroup(index)
        }
      }
    })
  }, [pathname])

  const toggleGroup = (index) => {
    setExpandedGroup(expandedGroup === index ? null : index)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-md bg-primary text-primary-foreground shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 flex h-full w-[260px] flex-col border-r bg-card px-3 py-4 transition-transform shadow-md",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        <div className="mb-8 flex items-center px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">A</div>
            <h1 className="text-xl font-bold">Admin Portal</h1>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 px-2">
          {navItems.map((item, index) => {
            // If the item has children, render as an expandable group
            if (item.children) {
              const isExpanded = expandedGroup === index
              return (
                <div key={index} className="space-y-1">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isExpanded ? "bg-accent/50 text-accent-foreground" : "text-muted-foreground"
                    )}
                    onClick={() => toggleGroup(index)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-4 pl-3 border-l-2 border-muted space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                            "hover:bg-accent hover:text-accent-foreground",
                            pathname === child.href 
                              ? "bg-accent text-accent-foreground" 
                              : "text-muted-foreground"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <child.icon className="h-4 w-4" />
                            <span>{child.title}</span>
                          </div>
                          {child.badge && (
                            <Badge variant={child.badge.variant} className="ml-auto">
                              {child.badge.text}
                            </Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            
            // Regular menu item without children
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href 
                    ? "bg-accent text-accent-foreground" 
                    : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
                {item.badge && (
                  <Badge variant={item.badge.variant} className="ml-auto">
                    {item.badge.text}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
        
        {/* Bottom section */}
        <div className="mt-auto border-t pt-4 px-2 space-y-1">
          <Link
            href="#notifications"
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {/* <div className="flex items-center gap-3">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </div>
            <Badge className="bg-red-500 text-white">5</Badge> */}
          </Link>
          <Link
            href="#help"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help & Support</span>
          </Link>
        </div>
      </aside>    
    </>
  )
}
