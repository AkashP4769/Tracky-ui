import BackendService from "./backend-service";
import axios from "axios";
import { App } from "@renderer/models/app";

class AppService extends BackendService {
    constructor() {
        super()
    }

    async fetchApps(userId: number) {
        // Placeholder for fetching apps logic
        const response = await axios.get<App[]>(`${this.backendUrl}/apps?user_id=${userId}`);
        return response.data;
    }

    async updateApp(app: App) {
        // Placeholder for updating app logic

        const response = await axios.put<App>(`${this.backendUrl}/apps/`, app);
        return response.data;
    }

}

export default AppService