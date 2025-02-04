"use client"
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import bcrypt from 'bcryptjs'

type AuthStore = {
  isAuthenticated: boolean
  expiresAt: number | null
  login: (password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      expiresAt: null,
      login: async (password) => {
        try {
          const storedHash = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH

          if (!storedHash) {
            console.error('Admin password hash not configured')
            return false
          }

          const isValid = await bcrypt.compare(password, storedHash)
          
          if (isValid) {
            const expiresAt = Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
            set({ isAuthenticated: true, expiresAt })
          }
          return isValid
        } catch (error) {
          console.error('Login error:', error)
          return false
        }
      },
      logout: () => set({ isAuthenticated: false, expiresAt: null })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.expiresAt && Date.now() > state.expiresAt) {
          state.logout()
        }
      }
    }
  )
)
