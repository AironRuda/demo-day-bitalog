import { Novelties } from '../model/novelties.model';
import { ProjectContext } from '../model/projects.model';
import { IWorker, User } from '../model/user.model';

export const selectUser = (state: { user: User }) => state.user;

export const selectRol = (state: { user: User }) => state.user.rol;

export const selectProjects = (state: { projects: ProjectContext }) =>
  state.projects.projects;

export const getSelectedProject = (state: { projects: ProjectContext }) =>
  state.projects.selectedProject;

export const getCurrentProject = (state: { projects: ProjectContext }) => {
  return state.projects.projects.find(
    (projects) => projects.id === state.projects.selectedProject
  );
};

export const getActivityById = (
  state: { projects: ProjectContext },
  activityId: string
) => {
  const currentProject = getCurrentProject(state);
  if (currentProject)
    return currentProject.activities.find(
      (activity) => activity.id === activityId
    );
};

export const getNovelties = (state: { novelties: Novelties }) =>
  state.novelties.novelties;

export const getWorkers = (state: { workers: { workers: IWorker[] } }) =>
  state.workers.workers;
