import { addDoc, setDoc } from '@firebase/firestore';
import {
  inventoryCollection,
  noveltyRef,
  projectsCollection,
} from '../firebase/config';
import { Project } from '../model/projects.model';

export const createNewInventory = async () => {
  return await (
    await addDoc(inventoryCollection, {})
  ).id;
};
export const createNewNovelty = async (projectId: string) => {
  await setDoc(noveltyRef(projectId), { novelties: [] });
};

export const createNewProject = async (project: Omit<Project, 'id'>) => {
  return await (
    await addDoc(projectsCollection, project)
  ).id;
};
