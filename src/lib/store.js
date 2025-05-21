"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useSettingsStore = create(
  persist(
    (set) => ({
      name: "",
      email: "",
      darkMode: false,
      notifications: true,
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setNotifications: (notifications) => set({ notifications }),
      setSettings: (settings) => set(settings),
    }),
    {
      name: "settings-store",
    }
  )
)
