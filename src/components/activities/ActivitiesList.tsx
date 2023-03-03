import { useSelector } from 'react-redux';
import { selectedProject } from '../../context/selectedProjectSlice';
import { getCurrentProject } from '../../context/userSlice';
import { Project } from '../../model/projects.model';

const ActivitiesList: React.FunctionComponent = (props) => {
  const selectedProjectId = useSelector(selectedProject);
  const currentProject = useSelector(
    (state: { user: { projects: Project[] } }) =>
      getCurrentProject(state, selectedProjectId)
  );

  return (
    <main>
      <h1>Lista tareas</h1>
      <ul>
        {currentProject && !!currentProject.activities.length ? (
          currentProject.activities.map((activity) => (
            <li key={activity.id}>
              <h1>{activity.activityName}</h1>
            </li>
          ))
        ) : (
          <div>En el momento no hay tareas disponibles :c</div>
        )}
      </ul>
    </main>
  );
};

export default ActivitiesList;
