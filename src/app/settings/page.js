"use client"

import { useState } from "react"
import { SettingsForm } from "@/components/settings/settings-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export default function Settings() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
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
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  You can toggle between light and dark mode using the theme switcher in the header.
                </p>
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
