import { createContext, useContext, useEffect, useRef } from 'react'
import { MessageClient } from '@renderer/services/ws-client'

const WSContext = createContext<MessageClient | null>(null)

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const clientRef = useRef<MessageClient | null>(null)

  useEffect(() => {
    const client = new MessageClient()
    clientRef.current = client

    client.subscribe('online_apps', (payload) => {
      console.log('Received:', payload)
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
