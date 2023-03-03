import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { createActivitiesDTO } from '../model/activity.model';
import { Project } from '../model/projects.model';

export const handleCreateActivity = async (
  values: createActivitiesDTO,
  currentProject: Project
) => {
  const projectRef = doc(db, 'projects', currentProject.id);
  console.log(currentProject.activities);
  console.log(values);
};
