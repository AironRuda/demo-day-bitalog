import { Activity } from "./activity.model";

export interface Project {
    id: string;
    name: string;
    adminId: string;
    workers: string[];
    activities: Activity[];
    inventoryId: string;
    completed: boolean;
}

export type createProjectDTO = Omit<Project, "id" | "adminId" | "activities" | "inventoryId" | "completed">