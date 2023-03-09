import { Project as IProject } from '../../../model/projects.model';
import { formatProjectsList } from '../../../utilities/formatProjects';
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
      {filter !== ''
        ? projects
            .filter((project) =>
              filter === 'new'
                ? project.completed && !project.activities.length
                : filter === 'pending'
                ? !project.completed
                : project.completed && project.activities.length
            )
            .map((project) => <Project key={project.id} project={project} />)
        : formatProjectsList(projects).map((project) => (
            <Project key={project.id} project={project} />
          ))}
    </>
  );
};

export default RenderProjects;
