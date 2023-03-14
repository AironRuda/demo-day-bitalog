import { folder } from '../../../assets/icons';
import { Project } from '../../../model/projects.model';

interface IProjectProps {
  project: Project;
  currentProject: string;
  handleClick(id: string): void;
}

const Project: React.FunctionComponent<IProjectProps> = ({
  project,
  currentProject,
  handleClick,
}) => {
  return (
    <li
      role='listitem'
      className={`flex flex-col md:w-40 w-36 h-36 justify-center items-center p-3 rounded cursor-pointer ${
        !project.completed && !project.activities.length
          ? 'text-white bg-primary'
          : !project.completed && project.activities.length
          ? 'bg-secondary text-white'
          : 'text-slate-600 bg-slate-300'
      } ${currentProject === project.id && 'border-4 border-slate-700'}`}
      onClick={() => handleClick(project.id)}
    >
      <img
        className='w-20'
        style={
          !project.completed || !project.activities.length
            ? {
                filter:
                  'invert(100%) sepia(94%) saturate(0%) hue-rotate(248deg) brightness(106%) contrast(106%)',
              }
            : {
                filter:
                  'invert(20%) sepia(11%) saturate(1907%) hue-rotate(176deg) brightness(93%) contrast(81%)',
              }
        }
        src={folder}
      />
      <b className='text-center'>{project.name}</b>
    </li>
  );
};

export default Project;
