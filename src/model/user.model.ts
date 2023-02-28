import { Project } from "./projects.model";

export interface User {
    id: string,
    rol: "admin" | "worker",
    projects: Project[]
}
