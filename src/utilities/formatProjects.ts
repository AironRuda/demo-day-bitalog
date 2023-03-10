import { Project } from '../model/projects.model';
import { capitalizeFirstLetter } from './formatString';

export const sortAlphabetically = (projects: Project[]) => {
  return projects.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
};

const getCondition = (project: Project, filter: string) => {
  return filter === 'new'
    ? !project.activities.length
    : filter === 'pending'
    ? !project.completed && project.activities.length
    : project.completed && project.activities.length;
};

const getProjectsByCondition = (projects: Project[], filter: string) => {
  return sortAlphabetically(
    projects
      .filter((project) => getCondition(project, filter))
      .map((project) => {
        return { ...project, name: capitalizeFirstLetter(project.name) };
      })
  );
};

export const formatProjectsList = (projects: Project[], filter: string) => {
  if (filter === 'new') return getProjectsByCondition(projects, 'new');
  if (filter === 'pending') return getProjectsByCondition(projects, 'pending');
  if (filter === 'done') return getProjectsByCondition(projects, 'done');
  return [
    ...getProjectsByCondition(projects, 'new'),
    ...getProjectsByCondition(projects, 'pending'),
    ...getProjectsByCondition(projects, 'done'),
  ];
};
