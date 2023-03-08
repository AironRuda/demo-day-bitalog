import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  fetchAllProjectsAdmin,
  fetchProjectsWorker,
} from '../../context/thunks';
import { selectRol } from '../../context/selectors';

const ProjectContainer: React.FunctionComponent = () => {
  const navigate = useNavigate();
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
        <menu className='btn-group '>
          {rol === 'admin' && (
            <>
              <button className='btn btn-active' onClick={() => navigate('')}>
                Ver lista de proyectos
              </button>
              <button
                className='btn btn-outline btn-primary'
                onClick={() => navigate('create-project')}
              >
                Crear proyecto
              </button>
            </>
          )}
        </menu>
      </div>
      <Outlet />
    </div>
  );
};

export default ProjectContainer;
