import { useSelector } from 'react-redux';
import { getSelectedProject } from '../../../context/projectsSlice';
import { getCurrentProject } from '../../../context/selectors';
import { Project } from '../../../model/projects.model';
import { formatActivitiesList } from '../../../utilities/formatActivities';
import ActivityItem from './ActivityItem';

const ActivitiesList: React.FunctionComponent = () => {
  const selectedProjectId = useSelector(getSelectedProject);
  const currentProject = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getCurrentProject(state, selectedProjectId)
  );

  return (
    <div className='h-4/5 w-full'>
      {currentProject && !!currentProject.activities.length ? (
        <div className='h-full w-full mt-12'>
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
        <div className='text-3xl text-center px-20 text-secondary mt-10'>
          En el momento no hay actividades disponibles... <br />
          Asigna alguna o contacta con tu encargado 🧐
        </div>
      )}
    </div>
  );
};

export default ActivitiesList;
