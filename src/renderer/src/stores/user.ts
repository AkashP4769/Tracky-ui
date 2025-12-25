import { create } from 'zustand'

export interface ActiveUserStore {
  id: number
  name: string
  is_active: boolean
  setUser: (id: number, name: string, is_active: boolean) => void
}

export const useActiveUserStore = create<ActiveUserStore>((set) => ({
  id: 0,
  name: '',
  is_active: false,
  setUser: (id, name, is_active) => set({ id, name, is_active }),
}))