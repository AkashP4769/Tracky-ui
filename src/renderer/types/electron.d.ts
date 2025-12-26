// src/renderer/types/electron.d.ts
export {}

declare global {
  interface Window {
    electronAPI: {
      selectExe: () => Promise<{
        name: string
        path: string
        icon: string
      } | null>
    }
  }
}
