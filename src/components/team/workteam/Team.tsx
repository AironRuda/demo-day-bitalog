import { useSelector } from 'react-redux';
import {
  getCurrentProject,
  getSelectedProject,
  getWorkers,
} from '../../../context/selectors';
import { IWorker } from '../../../model/user.model';
import SelectProjectMessage from '../../common/SelectProjectMessage';
import Member from './Member';

const Team: React.FunctionComponent = () => {
  const currentProjectId = useSelector(getSelectedProject);
  const currentProject = useSelector(getCurrentProject);
  const workerArray = currentProject?.workers;
  const workers = useSelector(getWorkers).filter((worker: IWorker) => {
    const exist = workerArray?.find((item) => item === worker.id);
    if (exist) return { id: worker.id, name: worker.name };
  });

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
          workers.map((worker) => <Member key={worker.id} worker={worker} />)
        )}
      </ul>
    </main>
  );
};

export default Team;
