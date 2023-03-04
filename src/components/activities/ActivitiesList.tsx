import { useSelector } from 'react-redux';
import { selectedProject } from '../../context/selectedProjectSlice';
import { getCurrentProject } from '../../context/userSliceSelectors';
import { Project } from '../../model/projects.model';
import ActivityItem from './ActivityItem';

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
            <ActivityItem
              key={activity.id}
              activity={activity}
              currentProject={currentProject}
            />
          ))
        ) : (
          <div>En el momento no hay tareas disponibles :c</div>
        )}
      </ul>
    </main>
  );
};

export default ActivitiesList;
