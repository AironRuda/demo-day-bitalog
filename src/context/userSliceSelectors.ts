import { Project } from '../model/projects.model';
import { User } from '../model/user.model';

export const selectUser = (state: { user: User }) => state.user;
export const selectProjects = (state: { user: User }) => state.user.projects;
export const getCurrentProject = (
  state: { user: { projects: Project[] } },
  projectId: string
) => {
  return state.user.projects.find((projects) => projects.id === projectId);
};
export const getActivityById = (
  state: { user: User },
  projectId: string,
  activityId: string
) => {
  const currentProject = getCurrentProject(state, projectId);
  if (currentProject)
    return currentProject.activities.find(
      (activity) => activity.id === activityId
    );
};
