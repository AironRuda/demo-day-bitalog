import { Activity } from './activity.model';

export interface Project {
  id: string;
  name: string;
  adminId: string;
  workers: string[];
  activities: Activity[];
  inventoryId: string;
  completed: boolean;
}

export type createProjectDTO = Pick<Project, 'name' | 'workers'>;
