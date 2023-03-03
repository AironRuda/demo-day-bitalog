import * as React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectedProject } from '../../context/selectedProjectSlice';

interface IAppProps {}

const ActivityContainer: React.FunctionComponent<IAppProps> = (props) => {
  const currentProject = useSelector(selectedProject);
  const navigate = useNavigate();
  return (
    <main>
      <h1>Actividades</h1>
      {!!currentProject ? (
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
          <Outlet />
        </>
      ) : (
        <div>
          Selecciona un proyecto o habla con tu encargado para que te asigne a
          alguno
        </div>
      )}
    </main>
  );
};

export default ActivityContainer;
