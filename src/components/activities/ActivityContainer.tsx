import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getSelectedProject } from '../../context/projectsSlice';
import { selectRol } from '../../context/selectors';
import SelectProjectMessage from '../common/SelectProjectMessage';

const ActivityContainer: React.FunctionComponent = () => {
  const [selectedButton, setSelectedButton] = useState('list');
  const currentProject = useSelector(getSelectedProject);
  const rol = useSelector(selectRol);
  const navigate = useNavigate();

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='h-full w-full flex flex-col justify-center items-center gap-5'>
        <h1 className='text-center text-4xl text-slate-700 font-bold'>
          ACTIVIDADES
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
          <SelectProjectMessage />
        )}
      </div>
    </div>
  );
};

export default ActivityContainer;
