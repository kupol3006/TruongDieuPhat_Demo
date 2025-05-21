"use client"

import { useState } from "react"
import { SettingsForm } from "@/components/settings/settings-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="border-b px-6">
          <div className="flex flex-wrap gap-4">
            <Button 
              variant={activeTab === "profile" ? "default" : "ghost"}
              onClick={() => setActiveTab("profile")}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              data-state={activeTab === "profile" ? "active" : "inactive"}
            >
              Profile
            </Button>
            <Button 
              variant={activeTab === "appearance" ? "default" : "ghost"}
              onClick={() => setActiveTab("appearance")}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              data-state={activeTab === "appearance" ? "active" : "inactive"}
            >
              Appearance
            </Button>
            <Button 
              variant={activeTab === "notifications" ? "default" : "ghost"}
              onClick={() => setActiveTab("notifications")}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              data-state={activeTab === "notifications" ? "active" : "inactive"}
            >
              Notifications
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {activeTab === "profile" && (
            <SettingsForm />
          )}
          {activeTab === "appearance" && (
            <div className="space-y-4">
              <CardTitle className="text-xl">Appearance Settings</CardTitle>
              <p className="text-muted-foreground">Customize the appearance of your dashboard.</p>
              <div className="flex items-center gap-4 mt-4">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="flex-1 justify-center"
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light Mode
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="flex-1 justify-center"
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark Mode
                </Button>
              </div>
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              <CardTitle className="text-xl">Notification Settings</CardTitle>
              <p className="text-muted-foreground">Configure how and when you receive notifications.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
