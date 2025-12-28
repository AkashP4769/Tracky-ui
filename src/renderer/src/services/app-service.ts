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
        try {
            const response = await axios.put<App>(`${this.backendUrl}/apps/`, app);

            const published = this.wsClient.publish('update', {"action": "app_update"});
            return published;
        } catch (error) {
            console.error('Error updating app:', error);
            return false;
        }

    }

    async createApp(app: App) {
        // Placeholder for creating app logic
        try {
            const response = await axios.post<App>(`${this.backendUrl}/apps/`, app);

            const published = this.wsClient.publish('update', {"action": "app_update"});
            return published;
        } catch (error) {
            console.error('Error creating app:', error);
            return false;
        }
    }

}

export default AppService