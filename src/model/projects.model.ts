import { Activity } from "./activity.model";

export interface Project {
    id: string;
    adminId: string;
    workers: string[];
    activities: Activity[];
    inventoryId: string;
    completed: boolean;
}