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
    <main>
      <h1>PROJECTS</h1>
      <menu className='btn-group'>
        {rol === 'admin' && (
          <>
            <button className='btn btn-active' onClick={() => navigate('')}>
              Ver lista de proyectos
            </button>
            <button className='btn' onClick={() => navigate('create-project')}>
              Crear proyecto
            </button>
          </>
        )}
      </menu>
      <Outlet />
    </main>
  );
};

export default ProjectContainer;
