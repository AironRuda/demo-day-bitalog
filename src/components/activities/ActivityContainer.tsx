import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getSelectedProject } from '../../context/projectsSlice';
import { selectRol } from '../../context/selectors';
import CurrentPageButtons from '../common/CurrentPageButtons';
import SelectProjectMessage from '../common/SelectProjectMessage';

const ActivityContainer: React.FunctionComponent = () => {
  const currentProject = useSelector(getSelectedProject);
  const rol = useSelector(selectRol);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='h-full w-full flex flex-col justify-center items-center gap-5'>
        <h1 className='text-center text-4xl text-slate-700 font-bold'>
          ACTIVIDADES
        </h1>
        {!!currentProject ? (
          <>
            {rol === 'admin' && (
              <CurrentPageButtons
                firstButtonText='Lista de actividades'
                secondButtonText='Crear actividad'
                firstPage=''
                secondPage='create-activities'
              />
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
