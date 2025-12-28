import { createContext, useContext, useEffect, useRef } from 'react'
import { MessageClient } from '@renderer/services/ws-client'
import { useOnlineAppsStore } from '@renderer/stores/online-apps'
import { useAppsStore } from '@renderer/stores/apps'
import AppService from '@renderer/services/app-service'
import { useActiveUserStore } from '@renderer/stores/user'

const WSContext = createContext<MessageClient | null>(null)

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const clientRef = useRef<MessageClient | null>(null)
  const setOnlineApps = useOnlineAppsStore((s) => s.setOnlineApps)

  const setApps = useAppsStore((s) => s.setApps)
  const user = useActiveUserStore((s) => s.user)

  useEffect(() => {
    const client = new MessageClient()
    clientRef.current = client

    client.connect()

    client.subscribe('online_apps', (payload) => {
      console.log('Received:', payload)
      setOnlineApps(payload)
    })

    client.subscribe('update', async (payload) => {
      console.log('Received:', payload)
      if (payload.action === 'app_update') {
        const apps = {}

        const appService = new AppService()
        const applist = await appService.fetchApps(user.id)
        applist.forEach((app) => {
          apps[app.process_name] = app
        })

        console.log('Fetched updated apps:', apps)
        setApps(apps)
      }
    })

    return () => {
      client.close()
    }
  }, [])

  return (
    <WSContext.Provider value={clientRef.current}>
      {children}
    </WSContext.Provider>
  )
}

export const useWebSocket = () => {
  const ctx = useContext(WSContext)
  if (!ctx) throw new Error('useWebSocket must be used inside WebSocketProvider')
  return ctx
}
