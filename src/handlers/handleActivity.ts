import { FirebaseError } from '@firebase/util';
import { Activity, createActivitiesDTO } from '../model/activity.model';
import { Project } from '../model/projects.model';
import {
  createActivity,
  deleteActivity,
  updateActivity,
  updateStatusActivity,
} from '../services/activity.service';
import { updateInventory } from '../services/inventory.service';

export const handleCreateActivity = async (
  values: createActivitiesDTO,
  currentProject: Project
) => {
  try {
    const otherActivities = currentProject.activities;
    const newActivity = await createActivity(
      currentProject.id,
      otherActivities,
      values
    );
    return { projectId: currentProject.id, activity: newActivity };
  } catch (error) {
    if (error instanceof FirebaseError || error instanceof Error)
      return error.message;
  }
};

export const handleUpdateActivity = async (
  newValues: createActivitiesDTO,
  activityId: string,
  currentProject: Project
) => {
  try {
    const activities = [...currentProject.activities];
    const activityIndex = activities.findIndex(
      (activity) => activity.id === activityId
    );
    if (activityIndex >= 0) {
      return await updateActivity(
        activities,
        activityIndex,
        newValues,
        currentProject.id
      );
    }
  } catch (error) {
    if (error instanceof FirebaseError || error instanceof Error)
      return error.message;
  }
};

export const handleDeleteActivity = async (
  activityId: string,
  project: Project
) => {
  try {
    await deleteActivity(project.activities, activityId, project.id);
  } catch (error) {
    if (error instanceof FirebaseError || error instanceof Error)
      return error.message;
  }
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
      } as Activity;
      await updateInventory(
        project.inventoryId,
        currentActivity.materials,
        reduceInventory
      );
      await updateStatusActivity(
        project.activities,
        currentActivity,
        project.id
      );
    } else {
      throw new Error('No hemos encontrado la actividad');
    }
  } catch (error) {
    if (error instanceof Error || error instanceof FirebaseError)
      return error.message;
  }
};
