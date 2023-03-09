import { Project as IProject } from '../../../model/projects.model';
import Project from './Project';

interface IRenderProjectsProps {
  projects: IProject[];
  filter: string;
}

const RenderProjects: React.FunctionComponent<IRenderProjectsProps> = ({
  projects,
  filter,
}) => {
  return (
    <>
      {projects
        .filter((project) =>
          filter === ''
            ? project
            : filter === 'new'
            ? project.completed && !project.activities.length
            : filter === 'pending'
            ? !project.completed
            : project.completed && project.activities.length
        )
        .sort((a, b) => {
          if (!a.completed || !a.activities.length) return -1;
          if (a.completed) return 1;
          return 0;
        })
        .map((project) => (
          <Project key={project.id} project={project} />
        ))}
    </>
  );
};

export default RenderProjects;
