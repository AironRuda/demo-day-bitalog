import { FirebaseError } from 'firebase/app';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { createActivitiesDTO } from '../model/activity.model';
import { Project } from '../model/projects.model';

export const handleUpdate = async (
  values: createActivitiesDTO,
  activityId: string,
  currentProject: Project
) => {
  try {
    const projectRef = doc(db, 'projects', currentProject.id);
    const activities = [...currentProject.activities];
    const activityIndex = activities.findIndex(
      (activity) => activity.id === activityId
    );
    if (activityIndex >= 0) {
      activities[activityIndex] = {
        ...currentProject.activities[activityIndex],
        ...values,
      };
      await updateDoc(projectRef, { activities: activities });
      return activities[activityIndex];
    }
  } catch (error) {
    if (error instanceof FirebaseError) return error.message;
  }
};
