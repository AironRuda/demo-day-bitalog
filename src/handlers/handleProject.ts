import { FirebaseError } from 'firebase/app';
import { store } from '../context/store';
import { createProjectDTO, Project } from '../model/projects.model';
import {
  createNewInventory,
  createNewNovelty,
  createNewProject,
} from '../services/project.service';

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
    await createNewNovelty(newProjectId);
    return { ...newProject, id: newProjectId };
  } catch (error) {
    if (error instanceof FirebaseError) return error.message;
  }
};
