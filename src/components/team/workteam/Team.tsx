import { useSelector } from 'react-redux';
import { getSelectedProject } from '../../../context/projectsSlice';
import { getCurrentProject } from '../../../context/selectors';
import { Project } from '../../../model/projects.model';
import SelectProjectMessage from '../../common/SelectProjectMessage';
import Member from './Member';

const Team: React.FunctionComponent = () => {
  const currentProjectId = useSelector(getSelectedProject);
  const currentProject = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getCurrentProject(state, currentProjectId)
  );
  const workerArray = currentProject?.workers;

  return (
    <main
      className={`flex items-center flex-col m-5 ${
        currentProject ? 'w-1/3' : 'w-full'
      }`}
    >
      {currentProject && (
        <h2 className='text-center text-3xl text-slate-700 font-bold mb-5'>
          Compañeros
        </h2>
      )}
      <ul className='flex flex-col gap-1'>
        {!currentProjectId && !workerArray ? (
          <SelectProjectMessage />
        ) : (
          workerArray?.map((worker) => (
            <Member key={worker} workerId={worker} />
          ))
        )}
      </ul>
    </main>
  );
};

export default Team;
