"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSettingsStore } from "@/lib/store"
import { Avatar } from "@/components/ui/avatar"
import { LucideUpload, Check, Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    })
    .or(z.string().length(0)),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export function SettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const { name, email, setName, setEmail, setSettings } = useSettingsStore()
  const [avatar, setAvatar] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "Admin User",
      email: email || "admin@example.com",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values) {
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setSettings({
        name: values.name,
        email: values.email,
      })
      setSuccess(true)
      setIsSubmitting(false)
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    }, 1000)
  }

  const simulateAvatarUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setAvatar(true)
    }, 1500)
  }

  return (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <div className="flex items-start gap-6 flex-col sm:flex-row">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-24 w-24 border-4 border-background shadow">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-medium">
              {form.watch("name").split(" ").map(word => word[0]).join("").toUpperCase().substring(0, 2)}
            </div>
          </Avatar>
          <div className="flex gap-2 mt-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="h-8 text-xs"
              onClick={simulateAvatarUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Uploading...
                </>
              ) : avatar ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Updated
                </>
              ) : (
                <>
                  <LucideUpload className="h-3 w-3 mr-1" />
                  Change
                </>
              )}
            </Button>
            {avatar && (
              <Button type="button" variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setAvatar(null)}>
                Remove
              </Button>
            )}
          </div>
        </div>
        
        <div className="space-y-2 flex-1 w-full">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your name"
                  {...form.register("name")} 
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com"
                  {...form.register("email")} 
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Change Password</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    {...form.register("password")} 
                  />
                  {form.formState.errors.password && (
                    <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••"
                    {...form.register("confirmPassword")} 
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-xs text-red-500">{form.formState.errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>              <p className="text-xs text-muted-foreground mt-2">
                Leave password fields empty if you don&apos;t want to change it.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-24">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
            
            {success && (
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 p-3 text-sm text-green-800 dark:text-green-300 rounded-lg">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                Profile information saved successfully!
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Connected Accounts */}
      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium mb-4">Connected Accounts</h3>
        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <svg className="h-5 w-5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium">Google</h4>
                <p className="text-xs text-muted-foreground">Sign in with Google</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs">Connect</Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <svg className="h-5 w-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium">Facebook</h4>
                <p className="text-xs text-muted-foreground">Sign in with Facebook</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs">Connect</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
