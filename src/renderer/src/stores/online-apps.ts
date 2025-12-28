import { create } from 'zustand'
import { OnlineApp } from '../models/online-app'

export interface OnlineAppsStore {
  onlineApps: {[key: string]: OnlineApp}
  setOnlineApps: (apps: {[key: string]: OnlineApp}) => void
}

export const useOnlineAppsStore = create<OnlineAppsStore>((set) => ({
  onlineApps: {},
  setOnlineApps: (apps) => set({ onlineApps: apps }),
}))