import { FirebaseError } from 'firebase/app';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Project } from '../model/projects.model';

export const handleDeleteActivity = async (
  activityId: string,
  project: Project
) => {
  try {
    const filteredActivities = project.activities.filter(
      (activity) => activity.id !== activityId
    );
    await updateDoc(doc(db, 'projects', project.id), {
      activities: filteredActivities,
    });
  } catch (error) {
    if (error instanceof FirebaseError) return error.message;
  }
};
