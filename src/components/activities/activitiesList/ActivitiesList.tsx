import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentProject } from '../../../context/selectors';
import { formatActivitiesList } from '../../../utilities/formatActivities';
import ActivityItem from './ActivityItem';
import ActivitiesHeader from './ActivitiesHeader';

const ActivitiesList: React.FunctionComponent = () => {
  const currentProject = useSelector(getCurrentProject);
  const [filter, setFilter] = useState(true);

  function handleFilter() {
    setFilter((prev) => !prev);
  }

  return (
    <div className='h-4/5 lg:w-4/5 w-11/12'>
      {currentProject && !!currentProject.activities.length ? (
        <div className='h-full w-full mt-12'>
          <table className='table table-compact w-full'>
            <ActivitiesHeader filter={filter} handleFilter={handleFilter} />
            <tbody>
              {formatActivitiesList(currentProject.activities, filter).map(
                (activity, index) => (
                  <ActivityItem
                    key={index}
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
