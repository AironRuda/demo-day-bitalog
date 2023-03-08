import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getSelectedProject } from '../../context/projectsSlice';
import { selectRol } from '../../context/selectors';

const ActivityContainer: React.FunctionComponent = () => {
  const [selectedButton, setSelectedButton] = useState('list');
  const currentProject = useSelector(getSelectedProject);
  const rol = useSelector(selectRol);
  const navigate = useNavigate();

  return (
    <div className='mt-10 w-full h-full flex flex-col items-center justify-center'>
      <div className='h-full w-11/12 flex flex-col justify-center items-center gap-5 mb-10'>
        <h1 className='text-center text-4xl text-slate-700 font-bold'>
          Actividades
        </h1>
        {!!currentProject ? (
          <>
            {rol === 'admin' && (
              <>
                <menu className='btn-group mt-5'>
                  <button
                    className={`btn md:w-64 ${
                      selectedButton === 'list'
                        ? 'btn-active'
                        : 'btn-outline btn-primary'
                    }`}
                    onClick={() => {
                      setSelectedButton('list');
                      navigate('');
                    }}
                  >
                    Ver lista de Actividades
                  </button>
                  <button
                    className={`btn md:w-64 ${
                      selectedButton !== 'list'
                        ? 'btn-active'
                        : 'btn-outline btn-primary'
                    }`}
                    onClick={() => {
                      setSelectedButton('form');
                      navigate('create-activities');
                    }}
                  >
                    Crear actividad
                  </button>
                </menu>
              </>
            )}
            <Outlet />
          </>
        ) : (
          <div className='text-3xl text-center px-20 text-secondary'>
            Selecciona un proyecto o habla con tu encargado para que te asigne a
            alguno para poder visualizar tus actividades
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityContainer;
