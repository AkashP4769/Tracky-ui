type MessageHandler = (payload: any) => void

export class MessageClient {
  private socket: WebSocket
  private handlers = new Map<string, MessageHandler[]>()
  private pendingTopics = new Set<string>()

  constructor() {
    const url = import.meta.env.VITE_WS_URL || 'ws://localhost:45623'
    this.socket = new WebSocket(url)

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
    this.socket.send(
      JSON.stringify({
        action: 'subscribe',
        topic,
      })
    )
  }

  publish(topic: string, payload: any) {
    if (this.socket.readyState !== WebSocket.OPEN) return

    this.socket.send(
      JSON.stringify({
        action: 'publish',
        topic,
        payload,
      })
    )
  }

  close() {
    this.socket.close()
  }
}
