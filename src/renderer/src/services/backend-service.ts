import { MessageClient } from "./ws-client"

class BackendService {
  backendUrl: string
  wsClient: MessageClient

  constructor() {
    this.backendUrl = `${import.meta.env.VITE_URL}` // Example backend URL
    this.wsClient = new MessageClient()
  }
}

export default BackendService