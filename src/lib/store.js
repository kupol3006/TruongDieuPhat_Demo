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
      // Extended notification preferences
      notificationPreferences: {
        email: true,
        browser: false,
        sms: false,
        newComments: {
          email: true,
          push: false
        },
        accountActivity: {
          email: true,
          push: true
        },
        mentions: {
          email: true,
          push: true
        }
      },
      // Display preferences
      displayDensity: "default", // "compact", "default", "comfortable"
      // Methods to update state
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setNotifications: (notifications) => set({ notifications }),
      setNotificationPreference: (key, value) => 
        set((state) => ({
          notificationPreferences: {
            ...state.notificationPreferences,
            [key]: value
          }
        })),
      setNestedNotificationPreference: (category, channel, value) => 
        set((state) => ({
          notificationPreferences: {
            ...state.notificationPreferences,
            [category]: {
              ...state.notificationPreferences[category],
              [channel]: value
            }
          }
        })),
      setDisplayDensity: (density) => set({ displayDensity: density }),
      setSettings: (settings) => set(settings),
    }),
    {
      name: "settings-store",
    }
  )
)
