"use client"
import { create } from 'zustand'
import bcrypt from 'bcryptjs'

type AuthStore = {
  isAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  login: async (password) => {
    try {
      const storedHash = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HASH

      if (!storedHash) {
        console.error('Admin password hash not configured')
        return false
      }

      const isValid = await bcrypt.compare(password, storedHash)
      console.log('Is password valid?', isValid);
      
      if (isValid) {
        set({ isAuthenticated: true })
      }
      return isValid
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  },
  logout: () => set({ isAuthenticated: false })
}))