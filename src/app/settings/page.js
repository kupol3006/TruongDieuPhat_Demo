"use client"

import { useState } from "react"
import { SettingsForm } from "@/components/settings/settings-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { UserRound, Palette, Bell, Shield, Globe, Mail, CreditCard, MonitorSmartphone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and settings</p>
        </div>
        <Badge variant="outline" className="px-3 py-1 bg-primary/5 border-primary/20">
          Admin Account
        </Badge>
      </div>
      
      <div className="grid md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar Navigation */}
        <div className="flex flex-col md:h-[calc(100vh-16rem)] md:sticky md:top-24 space-y-1 rounded-lg border p-1">
          <Button 
            variant="ghost"
            onClick={() => setActiveTab("profile")}
            className={`justify-start gap-2 px-3 ${activeTab === "profile" ? "bg-muted" : ""}`}
          >
            <UserRound className="h-5 w-5" />
            <span>Profile</span>
          </Button>          <Button 
            variant="ghost"
            onClick={() => setActiveTab("appearance")}
            className={`justify-start gap-2 px-3 ${activeTab === "appearance" ? "bg-muted" : ""}`}
          >
            <Palette className="h-5 w-5" />
            <span>Appearance</span>
          </Button>
          <Button 
            variant="ghost"
            onClick={() => setActiveTab("notifications")}
            className={`justify-start gap-2 px-3 ${activeTab === "notifications" ? "bg-muted" : ""}`}
          >
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            <Badge className="ml-auto bg-primary px-1.5 h-5">New</Badge>
          </Button>
          <Button 
            variant="ghost"
            onClick={() => setActiveTab("security")}
            className={`justify-start gap-2 px-3 ${activeTab === "security" ? "bg-muted" : ""}`}
          >
            <Shield className="h-5 w-5" />
            <span>Security</span>
          </Button>
          <hr className="my-2" />
          <Button 
            variant="ghost"
            onClick={() => setActiveTab("account")}
            className={`justify-start gap-2 px-3 ${activeTab === "account" ? "bg-muted" : ""}`}
          >
            <Mail className="h-5 w-5" />
            <span>Email</span>
          </Button>
          <Button 
            variant="ghost"
            onClick={() => setActiveTab("billing")}
            className={`justify-start gap-2 px-3 ${activeTab === "billing" ? "bg-muted" : ""}`}
          >
            <CreditCard className="h-5 w-5" />
            <span>Billing</span>
          </Button>
        </div>
        
        {/* Content Area */}
        <div className="space-y-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <UserRound className="h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and profile information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingsForm />
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              <Card>                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    Appearance Settings
                  </CardTitle>
                  <CardDescription>
                    Customize how the dashboard looks and feels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Theme Preference</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card className={`cursor-pointer border-2 overflow-hidden ${theme === "light" ? "border-primary" : "border-muted"}`}
                          onClick={() => setTheme("light")}>
                        <div className="bg-white p-2 text-center text-black text-sm font-medium">Light</div>
                        <div className="h-24 bg-[#f8fafc] border-t"></div>
                      </Card>
                      
                      <Card className={`cursor-pointer border-2 overflow-hidden ${theme === "dark" ? "border-primary" : "border-muted"}`}
                          onClick={() => setTheme("dark")}>
                        <div className="bg-[#1e293b] p-2 text-center text-white text-sm font-medium">Dark</div>
                        <div className="h-24 bg-[#0f172a] border-t border-gray-700"></div>
                      </Card>
                      
                      <Card className={`cursor-pointer border-2 overflow-hidden ${theme === "system" ? "border-primary" : "border-muted"}`}
                          onClick={() => setTheme("system")}>
                        <div className="bg-gradient-to-r from-white to-[#1e293b] p-2 text-center text-sm font-medium">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-white">System</span>
                        </div>
                        <div className="h-24 bg-gradient-to-r from-[#f8fafc] to-[#0f172a] border-t"></div>
                      </Card>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Select your preferred theme mode. System theme will automatically match your device settings.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Display Density</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button variant="outline" className="h-auto flex-col py-4 px-4 border-2 border-muted">
                        <MonitorSmartphone className="h-5 w-5 mb-2" />
                        <span className="font-medium">Compact</span>
                        <span className="text-xs text-muted-foreground mt-1">Tighter spacing</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto flex-col py-4 px-4 border-2 border-primary">
                        <MonitorSmartphone className="h-5 w-5 mb-2" />
                        <span className="font-medium">Default</span>
                        <span className="text-xs text-muted-foreground mt-1">Standard layout</span>
                      </Button>
                      
                      <Button variant="outline" className="h-auto flex-col py-4 px-4 border-2 border-muted">
                        <MonitorSmartphone className="h-5 w-5 mb-2" />
                        <span className="font-medium">Comfortable</span>
                        <span className="text-xs text-muted-foreground mt-1">More whitespace</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Configure when and how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-6">
                      <div className="flex items-start justify-between space-x-4 rounded-lg border p-4">
                        <div>
                          <h4 className="font-semibold">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">Get notified about important updates via email</p>
                        </div>
                        <div className="ml-auto">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="w-20 bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400">
                              Enabled
                            </Button>
                          </div>
                        </div>
                      </div>
                        <div className="flex items-start justify-between space-x-4 rounded-lg border p-4">
                        <div>
                          <h4 className="font-semibold">Browser Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive desktop notifications when you&apos;re online</p>
                        </div>
                        <div className="ml-auto">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="w-20">
                              Disabled
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start justify-between space-x-4 rounded-lg border p-4">
                        <div>
                          <h4 className="font-semibold">SMS Notifications</h4>
                          <p className="text-sm text-muted-foreground">Get important alerts via text message</p>
                        </div>
                        <div className="ml-auto">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="w-20">
                              Disabled
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Activity Notifications</CardTitle>
                  <CardDescription>Select which activities you want to be notified about</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">New Comments</h4>
                        <p className="text-sm text-muted-foreground">When someone comments on your content</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                          <Mail className="h-3 w-3" />
                          Email
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs bg-muted">
                          <Bell className="h-3 w-3" />
                          Push
                        </Button>
                      </div>
                    </div>
                      <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Account Activity</h4>
                        <p className="text-sm text-muted-foreground">When there&apos;s activity on your account</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs bg-muted">
                          <Mail className="h-3 w-3" />
                          Email
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs bg-muted">
                          <Bell className="h-3 w-3" />
                          Push
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Mentions</h4>
                        <p className="text-sm text-muted-foreground">When someone mentions you in a comment</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs bg-muted">
                          <Mail className="h-3 w-3" />
                          Email
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                          <Bell className="h-3 w-3" />
                          Push
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {(activeTab === "security" || activeTab === "account" || activeTab === "billing") && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Globe className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  This section is under development and will be available in a future update.
                  Check back soon for more features!
                </p>
                <Button className="mt-6" onClick={() => setActiveTab("profile")}>
                  Go back to Profile
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
