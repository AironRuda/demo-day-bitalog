import { FirebaseError, uuidv4 } from '@firebase/util';
import { format } from 'date-fns';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Activity, createActivitiesDTO } from '../model/activity.model';
import { Material } from '../model/material.model';
import { Project } from '../model/projects.model';
import { formatNewInventory } from '../utilities/formatInventory';

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

const updateInventory = async (inventoryId: string, materials: Material[]) => {
  try {
    const inventory = await (
      await getDoc(doc(db, 'inventory', inventoryId))
    ).data();
    if (inventory) {
      if (!inventory.materials) {
        await updateDoc(doc(db, 'inventory', inventoryId), {
          materials: materials.map((material) => {
            return {
              material: material.material,
              amount: material.amount,
              unit: material.unit,
            };
          }),
        });
      } else {
        const newInventory = formatNewInventory(inventory.materials, materials);
        await updateDoc(doc(db, 'inventory', inventoryId), {
          materials: newInventory.map((material) => {
            return {
              material: material.material,
              amount: material.amount,
              unit: material.unit,
            };
          }),
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

const updateActivity = async (project: Project, activityId: string) => {
  try {
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
      }) ?? []
    );
    const activities = project.activities.filter(
      (activity) => activity.id !== activityId
    );
    currentActivity.completed = !currentActivity.completed;
    activities.push(currentActivity as Activity);
    return await updateDoc(getRef(project.id), {
      activities: activities,
    });
  } catch (error) {
    throw error;
  }
};

export const handleStatusActivity = async (
  activityId: string,
  project: Project
) => {
  try {
    if (project.activities.find((activity) => activity.id === activityId)) {
      await updateActivity(project, activityId);
    } else {
      throw new Error('No hemos podido encontrar la actividad');
    }
  } catch (error) {
    if (error instanceof Error || error instanceof FirebaseError)
      return error.message;
  }
};
