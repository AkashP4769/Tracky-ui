

class BackendService {
  backendUrl: string

  constructor() {
    this.backendUrl = `${import.meta.env.VITE_URL}` // Example backend URL
  }
}

export default BackendService