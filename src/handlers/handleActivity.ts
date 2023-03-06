import { FirebaseError, uuidv4 } from '@firebase/util';
import { format } from 'date-fns';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Activity, createActivitiesDTO } from '../model/activity.model';
import { Project } from '../model/projects.model';

const getRef = (id: string) => doc(db, 'projects', id);

export const handleCreateActivity = async (
  values: createActivitiesDTO,
  currentProject: Project
) => {
  try {
    const activities = currentProject.activities;
    const newActivity: Activity = {
      ...values,
      id: uuidv4(),
      completed: false,
      updatedAt: format(new Date(), 'dd/MM/yyyy'),
    };
    await updateDoc(getRef(currentProject.id), {
      activities: [...activities, newActivity],
    });
    return { projectId: currentProject.id, activity: newActivity };
  } catch (error) {
    if (error instanceof FirebaseError) return error.message;
  }
};

export const handleUpdateActivity = async (
  values: createActivitiesDTO,
  activityId: string,
  currentProject: Project
) => {
  try {
    const activities = [...currentProject.activities];
    const activityIndex = activities.findIndex(
      (activity) => activity.id === activityId
    );
    if (activityIndex >= 0) {
      activities[activityIndex] = {
        ...currentProject.activities[activityIndex],
        ...values,
      };
      await updateDoc(getRef(currentProject.id), { activities: activities });
      return activities[activityIndex];
    }
  } catch (error) {
    if (error instanceof FirebaseError) return error.message;
  }
};

export const handleDeleteActivity = async (
  activityId: string,
  project: Project
) => {
  try {
    const filteredActivities = project.activities.filter(
      (activity) => activity.id !== activityId
    );
    await updateDoc(getRef(project.id), {
      activities: filteredActivities,
    });
  } catch (error) {
    if (error instanceof FirebaseError) return error.message;
  }
};

export const handleStatusActivity = async (
  activityId: string,
  project: Project
) => {
  try {
    if (project.activities.find((activity) => activity.id === activityId)) {
      const currentActivity = {
        ...project.activities.find((activity) => activity.id === activityId),
      };
      const activities = project.activities.filter(
        (activity) => activity.id !== activityId
      );
      currentActivity.completed = !currentActivity.completed;
      activities.push(currentActivity as Activity);
      await updateDoc(getRef(project.id), {
        activities: activities,
      });
    } else {
      throw new Error('No hemos podido encontrar la actividad');
    }
  } catch (error) {
    if (error instanceof Error || error instanceof FirebaseError)
      return error.message;
  }
};
