import { create } from "zustand";
import { App } from "../models/app";

export interface AppsStore {
  apps: {[key: string]: App}
  setApps: (apps: {[key: string]: App}) => void
}

export const useAppsStore = create<AppsStore>((set) => ({
  apps: {},
  setApps: (apps) => set({ apps: apps }),
}))
