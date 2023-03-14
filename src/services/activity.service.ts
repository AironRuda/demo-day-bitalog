import { updateDoc } from '@firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { projectsRef } from '../firebase/config';
import { Activity, createActivitiesDTO } from '../model/activity.model';
import { format } from 'date-fns';

export const createActivity = async (
  id: string,
  otherActivities: Activity[],
  values: createActivitiesDTO
) => {
  try {
    const newActivity: Activity = {
      ...values,
      id: uuidv4(),
      completed: false,
      updatedAt: format(new Date(), 'dd/MM/yyyy'),
    };
    await updateDoc(projectsRef(id), {
      activities: [...otherActivities, newActivity],
    });
    return newActivity;
  } catch (error) {
    return error;
  }
};

export const updateActivity = async (
  activities: Activity[],
  activityIndex: number,
  newValues: createActivitiesDTO,
  projectId: string
) => {
  try {
    activities[activityIndex] = {
      ...activities[activityIndex],
      ...newValues,
      updatedAt: format(new Date(), 'dd/MM/yyyy'),
    };
    await updateDoc(projectsRef(projectId), {
      activities: activities,
    });
    return activities[activityIndex];
  } catch (error) {
    throw error;
  }
};

export const deleteActivity = async (
  activities: Activity[],
  activityId: string,
  projectId: string
) => {
  const filteredActivities = activities.filter(
    (activity) => activity.id !== activityId
  );
  return await updateDoc(projectsRef(projectId), {
    activities: filteredActivities,
  });
};

export const updateStatusActivity = async (
  activities: Activity[],
  currentActivity: Activity,
  projectId: string
) => {
  const otherActivities = activities.filter(
    (activity) => activity.id !== currentActivity.id
  );
  currentActivity.completed = !currentActivity.completed;
  return await updateDoc(projectsRef(projectId), {
    activities: [...otherActivities, currentActivity],
  });
};
