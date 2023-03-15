import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentProject } from '../../../context/selectors';
import { formatActivitiesList } from '../../../utilities/formatActivities';
import ActivityItem from './ActivityItem';
import { uuidv4 } from '@firebase/util';

const ActivitiesList: React.FunctionComponent = () => {
  const currentProject = useSelector(getCurrentProject);
  const [filter, setFilter] = useState(true);

  console.log(currentProject);

  return (
    <div className='h-4/5 lg:w-4/5 w-11/12'>
      {currentProject && !!currentProject.activities.length ? (
        <div className='h-full w-full mt-12'>
          <table className='table table-compact w-full'>
            <thead>
              <tr className='[&>*]:bg-primary [&>*]:text-white border-6'>
                <th
                  className='md:pl-5 pl-2 w-10 cursor-pointer'
                  onClick={() => setFilter((prev) => !prev)}
                >
                  {filter ? '❕' : '✔️'}
                </th>
                <th>Actividad</th>
                <th>
                  <span className='md:hidden block'>Pr</span>
                  <span className='md:block hidden'>Prioridad</span>
                </th>
                <th>Materiales</th>
                <th className='text-center sm:w-10'>
                  <span className='md:hidden block'>Act</span>
                  <span className='md:block hidden'>Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {formatActivitiesList(currentProject.activities, filter).map(
                (activity, index) => (
                  <ActivityItem
                    key={uuidv4()}
                    activity={activity}
                    currentProject={currentProject}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-3xl text-center px-20 text-secondary mt-10'>
          En el momento no hay actividades disponibles... <br />
          Asigna alguna o contacta con tu encargado 🧐
        </div>
      )}
    </div>
  );
};

export default ActivitiesList;
