// File: src/app/settings/layout.js
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function SettingsLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dashboard-theme">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 md:pl-[240px]">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="md:hidden w-8" />
            <div className="ml-auto flex items-center gap-4">
              <ThemeSwitcher />
            </div>
          </header>
          <main className="container mx-auto py-6 px-4 pt-16 md:pt-6 md:px-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
