import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchAllProjectsAdmin } from '../../context/userSlice';

interface IAppProps {}

const ProjectContainer: React.FunctionComponent<IAppProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchAllProjectsAdmin());
  }, []);

  return (
    <main>
      <h1>PROJECTS</h1>
      <menu className='btn-group'>
        <button className='btn btn-active' onClick={() => navigate('')}>
          Ver lista de proyectos
        </button>
        <button className='btn' onClick={() => navigate('create-project')}>
          Crear proyecto
        </button>
      </menu>
      <Outlet />
    </main>
  );
};

export default ProjectContainer;