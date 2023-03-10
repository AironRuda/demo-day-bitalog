import { FirebaseError } from 'firebase/app';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { store } from '../context/store';
import { db, inventoryCollection, noveltyCollection, projectsCollection } from '../firebase/config';
import { createProjectDTO, Project } from '../model/projects.model';

const createNewInventory = async () => {
  return await (
    await addDoc(inventoryCollection, {})
  ).id;
};
const createNewNovelty = async (projectId: string) => {
  await setDoc(doc(db, "novelty", projectId), { novelties: [] })
};

const createNewProject = async (project: Omit<Project, 'id'>) => {
  return await (
    await addDoc(projectsCollection, project)
  ).id;
};

export const handleCreateProject = async (
  values: createProjectDTO
): Promise<Project | string | undefined> => {
  try {
    const newInventoryId = await createNewInventory();

    const newProject: Omit<Project, 'id'> = {
      adminId: store.getState().user.id,
      inventoryId: newInventoryId,
      name: values.name,
      workers: values.workers,
      completed: false,
      activities: [],
    };

    const newProjectId = await createNewProject(newProject);

    await createNewNovelty(newProjectId)

    return { ...newProject, id: newProjectId };
  } catch (error) {
    if (error instanceof FirebaseError) return error.message;
  }
};
