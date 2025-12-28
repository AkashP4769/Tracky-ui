import { create } from 'zustand'
import { User } from '../models/user'

export interface ActiveUserStore {
  user: User
  setUser: (id: number, name: string, is_active: boolean) => void
}

export const useActiveUserStore = create<ActiveUserStore>((set) => ({
  user: { id: 0, name: '', is_active: false },
  setUser: (id, name, is_active) => set({ user: { id, name, is_active } }),
}))