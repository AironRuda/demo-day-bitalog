import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {
  fetchAllProjectsAdmin,
  fetchProjectsWorker,
} from '../../context/thunks';
import { selectRol } from '../../context/selectors';
import CurrentPageButtons from '../common/CurrentPageButtons';

const ProjectContainer: React.FunctionComponent = () => {
  const dispatch = useDispatch<any>();
  const rol = useSelector(selectRol);

  useEffect(() => {
    if (rol === 'admin') dispatch(fetchAllProjectsAdmin());
    else if (rol === 'worker') dispatch(fetchProjectsWorker());
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-center justify-start'>
      <div className='flex flex-col gap-5 mb-10'>
        <h1 className='text-center text-4xl text-slate-700 font-bold'>
          PROYECTOS
        </h1>
        {rol === 'admin' && (
          <CurrentPageButtons
            firstButtonText='Lista de proyectos'
            firstPage=''
            secondButtonText='Crear proyectos'
            secondPage='create-project'
          />
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default ProjectContainer;
