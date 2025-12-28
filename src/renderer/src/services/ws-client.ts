type MessageHandler = (payload: any) => void

export class MessageClient {
  private socket: WebSocket | null = null
  private connected = false

  private handlers = new Map<string, MessageHandler[]>()
  private pendingTopics = new Set<string>()

  connect() {
    if (this.connected) return
    
    const url = import.meta.env.VITE_WS_URL || 'ws://localhost:45623'
    this.socket = new WebSocket(url)
    this.connected = true

    this.socket.onopen = () => {
      console.log('WS connected')

      // 🔥 send all pending subscriptions
      this.pendingTopics.forEach((topic) => {
        this.sendSubscribe(topic)
      })
      this.pendingTopics.clear()
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('WS message received:', data)

      const handlers = this.handlers.get(data.topic) || []
      handlers.forEach((cb) => cb(data.payload))
    }

    this.socket.onclose = () => {
      console.log('WS closed')
    }
  }


  subscribe(topic: string, callback: MessageHandler) {
    if (!this.connected || !this.socket) {
      throw new Error('WebSocket is not connected. Call connect() first.')
    }

    this.handlers.set(topic, [
      ...(this.handlers.get(topic) || []),
      callback,
    ])

    if (this.socket.readyState === WebSocket.OPEN) {
      this.sendSubscribe(topic)
    } else {
      // 👈 queue until open
      this.pendingTopics.add(topic)
    }
  }

  private sendSubscribe(topic: string) {
    if (!this.socket) return

    this.socket.send(
      JSON.stringify({
        action: 'subscribe',
        topic,
      })
    )
  }

  publish(topic: string, payload: any): boolean {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return false

    this.socket.send(
      JSON.stringify({
        action: 'publish',
        topic,
        payload,
      })
    )

    return true
  }

  close() {
    if (!this.socket) return
    this.socket.close()
  }
}
