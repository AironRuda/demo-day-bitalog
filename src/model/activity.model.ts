import { Material } from './material.model';

export interface Activity {
  id: string;
  activityName: string;
  completed: boolean;
  priority: 1 | 2 | 3;
  materials: Material[];
  updatedAt: string;
}

export interface createActivitiesDTO
  extends Pick<Activity, 'activityName' | 'priority' | 'materials'> {
  completed?: boolean;
}
