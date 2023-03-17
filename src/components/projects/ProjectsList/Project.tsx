import { folder } from '../../../assets/icons';
import { Project } from '../../../model/projects.model';
import { filterSlate, filterWhite } from '../../common/customStyles';

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
          ? 'bg-[#3A80BF] text-white'
          : 'text-slate-700 bg-slate-300'
      } ${currentProject === project.id && 'border-4 border-slate-700'}`}
      onClick={() => handleClick(project.id)}
    >
      <img
        className='w-20'
        style={
          !project.completed || !project.activities.length
            ? filterWhite
            : filterSlate
        }
        src={folder}
      />
      <b className='text-center'>{project.name}</b>
    </li>
  );
};

export default Project;
