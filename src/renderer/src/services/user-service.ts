import axios from "axios"
import BackendService from "./backend-service"
import { User } from "@renderer/models/user"

class UserService extends BackendService {
  constructor() {
    super()
  }

  async getActiveUser() : Promise<User | null> {
    const response = await axios.get(`${this.backendUrl}/users/active`)
    const user: User = response.data

    return user
  }
}

export default UserService