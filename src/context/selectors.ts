import { Project } from '../model/projects.model';
import { User } from '../model/user.model';

export const selectUser = (state: { user: User }) => state.user;

export const selectRol = (state: { user: User }) => state.user.rol;

export const selectProjects = (state: { projects: { projects: Project[] } }) =>
  state.projects.projects;

export const getCurrentProject = (
  state: { projects: { projects: Project[] } },
  projectId: string
) => {
  return state.projects.projects.find((projects) => projects.id === projectId);
};

export const getActivityById = (
  state: { projects: { projects: Project[] } },
  projectId: string,
  activityId: string
) => {
  const currentProject = getCurrentProject(state, projectId);
  if (currentProject)
    return currentProject.activities.find(
      (activity) => activity.id === activityId
    );
};
