import { useSelector } from 'react-redux';
import { getSelectedProject } from '../../context/projectsSlice';
import { getCurrentProject } from '../../context/selectors';
import { Activity } from '../../model/activity.model';
import { Project } from '../../model/projects.model';
import ActivityItem from './ActivityItem';

const ActivitiesList: React.FunctionComponent = () => {
  const selectedProjectId = useSelector(getSelectedProject);
  const currentProject = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getCurrentProject(state, selectedProjectId)
  );

  function sortByPriority(activities: Activity[]) {
    return activities.sort((a, b) => {
      if (a.priority > b.priority) return 1;
      if (a.priority < b.priority) return -1;
      return 0;
    });
  }

  function formatActivitiesList(activities: Activity[]) {
    const pending = activities.filter((activity) => !activity.completed);
    const done = activities.filter((activity) => activity.completed);
    console.log(pending);
    console.log(done);
    return [...sortByPriority(pending), ...sortByPriority(done)];
  }

  return (
    <div className='h-4/5 w-full'>
      {currentProject && !!currentProject.activities.length ? (
        <div className='h-full overflow-auto w-full'>
          <table className='table table-compact w-full '>
            <thead>
              <tr className='[&>*]:bg-primary [&>*]:text-white border-6'>
                <th></th>
                <th>Actividad</th>
                <th>
                  <span className='md:hidden block'>Pr</span>
                  <span className='md:block hidden'>Prioridad</span>
                </th>
                <th>Materiales</th>
                <th className='text-center'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {formatActivitiesList(currentProject.activities).map(
                (activity, index) => (
                  <ActivityItem
                    key={activity.id}
                    index={index}
                    activity={activity}
                    currentProject={currentProject}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-3xl text-center px-20 text-secondary'>
          En el momento no hay tareas disponibles :c
        </div>
      )}
    </div>
  );
};

export default ActivitiesList;

/* <thead>
<tr>
  <th></th>
  <th>Name</th>
  <th>Job</th>
  <th>Favorite Color</th>
</tr>
</thead> */
