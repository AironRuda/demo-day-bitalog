import { Project } from '../model/projects.model';

export const formatProjectsList = (projects: Project[]) => {
  const newProjects = projects.filter((project) => !project.activities.length);
  const pendingProjects = projects.filter(
    (project) => !project.completed && project.activities.length
  );
  const doneProjects = projects.filter(
    (project) => project.completed && project.activities.length
  );
  return [...newProjects, ...pendingProjects, ...doneProjects];
};
