import { FirebaseError, uuidv4 } from '@firebase/util';
import { format } from 'date-fns';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Activity, createActivitiesDTO } from '../model/activity.model';
import { Project } from '../model/projects.model';

export const handleCreateActivity = async (
  values: createActivitiesDTO,
  currentProject: Project
) => {
  try {
    const projectRef = doc(db, 'projects', currentProject.id);
    const activities = currentProject.activities;
    const newActivity: Activity = {
      ...values,
      id: uuidv4(),
      completed: false,
      updatedAt: format(new Date(), 'dd/MM/yyyy'),
    };
    await updateDoc(projectRef, { activities: [...activities, newActivity] });
    return { projectId: currentProject.id, activity: newActivity };
  } catch (error) {
    if (error instanceof FirebaseError) return error.message;
  }
};
