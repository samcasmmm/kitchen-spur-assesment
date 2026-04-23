import { create } from 'zustand'
import { AuthState } from '@/types/common'

export const useAuth = create<AuthState>((set) => ({
   token: null,
   user: null,
   isAuth: false,

   signIn: (token, user) => {
      localStorage.setItem('AUTH_TOKEN', token)
      set({ token, user, isAuth: true })
   },

   signOut: () => {
      localStorage.removeItem('AUTH_TOKEN')
      set({ token: null, user: null, isAuth: false })
   },

   initialize: () => {
      const token = localStorage.getItem('AUTH_TOKEN')
      if (token) {
         set({ token, isAuth: true })
      }
   }
}))