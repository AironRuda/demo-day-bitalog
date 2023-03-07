import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getSelectedProject } from '../../context/projectsSlice';
import { selectRol } from '../../context/selectors';

const ActivityContainer: React.FunctionComponent = () => {
  const currentProject = useSelector(getSelectedProject);
  const rol = useSelector(selectRol);
  const navigate = useNavigate();
  return (
    <main>
      <h1>Actividades</h1>
      {!!currentProject ? (
        <>
          {rol === 'admin' && (
            <>
              <menu className='btn-group'>
                <button className='btn btn-active' onClick={() => navigate('')}>
                  Ver lista de Actividades
                </button>
                <button
                  className='btn'
                  onClick={() => navigate('create-activities')}
                >
                  Crear actividad
                </button>
              </menu>
            </>
          )}
          <Outlet />
        </>
      ) : (
        <div>
          Selecciona un proyecto o habla con tu encargado para que te asigne a
          alguno para poder visualizar tus actividades
        </div>
      )}
    </main>
  );
};

export default ActivityContainer;
