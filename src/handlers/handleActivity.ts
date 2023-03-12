import { FirebaseError, uuidv4 } from '@firebase/util';
import { format } from 'date-fns';
import { updateDoc } from 'firebase/firestore';
import { projectsRef } from '../firebase/config';
import { Activity, createActivitiesDTO } from '../model/activity.model';
import { Material } from '../model/material.model';
import { Project } from '../model/projects.model';
import { updateInventory } from './handleInventory';

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
    await updateDoc(projectsRef(currentProject.id), {
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
        updatedAt: format(new Date(), 'dd/MM/yyyy'),
      };
      await updateDoc(projectsRef(currentProject.id), {
        activities: activities,
      });
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
    await updateDoc(projectsRef(project.id), {
      activities: filteredActivities,
    });
  } catch (error) {
    if (error instanceof FirebaseError) return error.message;
  }
};

const updateStatusActivity = async (
  project: Project,
  currentActivity: Activity
) => {
  const otherActivities = project.activities.filter(
    (activity) => activity.id !== currentActivity.id
  );
  currentActivity.completed = !currentActivity.completed;
  return await updateDoc(projectsRef(project.id), {
    activities: [...otherActivities, currentActivity],
  });
};

export const handleStatusActivity = async (
  activityId: string,
  project: Project,
  reduceInventory: boolean
) => {
  try {
    if (project.activities.find((activity) => activity.id === activityId)) {
      const currentActivity = {
        ...project.activities.find((activity) => activity.id === activityId),
      };
      await updateInventory(
        project.inventoryId,
        currentActivity.materials?.map((material: Material) => {
          return {
            amount: material.amount,
            material: material.material,
            unit: material.unit,
          };
        }) ?? [],
        reduceInventory
      );
      await updateStatusActivity(project, currentActivity as Activity);
    } else {
      throw new Error('No hemos encontrado la actividad');
    }
  } catch (error) {
    if (error instanceof Error || error instanceof FirebaseError)
      return error.message;
  }
};
