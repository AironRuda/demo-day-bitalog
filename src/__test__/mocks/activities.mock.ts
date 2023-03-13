import { Activity } from '../../model/activity.model';

export const unorderedActivities: Activity[] = [
  {
    activityName: 'tarea 1',
    completed: false,
    id: '121dasd1a',
    materials: [],
    priority: 1,
    updatedAt: '',
  },
  {
    activityName: 'tarea 3',
    completed: true,
    id: '121dasd1a',
    materials: [],
    priority: 3,
    updatedAt: '',
  },
  {
    activityName: 'tarea 2',
    completed: false,
    id: '121dasd1a',
    materials: [],
    priority: 2,
    updatedAt: '',
  },
];

export const orderedActivitiesFirstPending: Activity[] = [
  {
    activityName: 'tarea 2',
    completed: false,
    id: '121dasd1a',
    materials: [],
    priority: 2,
    updatedAt: '',
  },
  {
    activityName: 'tarea 1',
    completed: false,
    id: '121dasd1a',
    materials: [],
    priority: 1,
    updatedAt: '',
  },
  {
    activityName: 'tarea 3',
    completed: true,
    id: '121dasd1a',
    materials: [],
    priority: 3,
    updatedAt: '',
  },
];

export const orderedActivitiesFirstDone: Activity[] = [
  {
    activityName: 'tarea 3',
    completed: true,
    id: '121dasd1a',
    materials: [],
    priority: 3,
    updatedAt: '',
  },
  {
    activityName: 'tarea 2',
    completed: false,
    id: '121dasd1a',
    materials: [],
    priority: 2,
    updatedAt: '',
  },
  {
    activityName: 'tarea 1',
    completed: false,
    id: '121dasd1a',
    materials: [],
    priority: 1,
    updatedAt: '',
  },
];
