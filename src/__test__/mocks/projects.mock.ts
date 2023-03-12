import { Project } from '../model/projects.model';
import { unorderedActivities } from './activities.mock';

export const unorderedProjects: Project[] = [
  {
    id: '1xd1d1',
    activities: [unorderedActivities[1]],
    adminId: '21qrqw',
    completed: true,
    inventoryId: 'asddassad',
    name: 'Actividad',
    workers: [],
  },
  {
    id: '1xd1d1',
    activities: [],
    adminId: '21qrqw',
    completed: false,
    inventoryId: 'asddassad',
    name: 'Actividad',
    workers: [],
  },
  {
    id: '1xd1d1',
    activities: [...unorderedActivities],
    adminId: '21qrqw',
    completed: false,
    inventoryId: 'asddassad',
    name: 'Actividad',
    workers: [],
  },
];

export const orderedProjects = [
  {
    id: '1xd1d1',
    activities: [],
    adminId: '21qrqw',
    completed: false,
    inventoryId: 'asddassad',
    name: 'Actividad',
    workers: [],
  },
  {
    id: '1xd1d1',
    activities: [...unorderedActivities],
    adminId: '21qrqw',
    completed: false,
    inventoryId: 'asddassad',
    name: 'Actividad',
    workers: [],
  },
  {
    id: '1xd1d1',
    activities: [unorderedActivities[1]],
    adminId: '21qrqw',
    completed: true,
    inventoryId: 'asddassad',
    name: 'Actividad',
    workers: [],
  },
];
