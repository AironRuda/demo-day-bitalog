import { Project, ProjectContext } from '../model/projects.model';
import { User } from '../model/user.model';

export const selectUser = (state: { user: User }) => state.user;

export const selectRol = (state: { user: User }) => state.user.rol;

export const selectProjects = (state: { projects: { projects: Project[] } }) =>
  state.projects.projects;

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
