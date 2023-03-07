import { useSelector } from 'react-redux';
import { getSelectedProject } from '../../context/projectsSlice';
import { getCurrentProject } from '../../context/selectors';
import { Project } from '../../model/projects.model';
import ActivityItem from './ActivityItem';

const ActivitiesList: React.FunctionComponent = () => {
  const selectedProjectId = useSelector(getSelectedProject);
  const currentProject = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getCurrentProject(state, selectedProjectId)
  );

  return (
    <main>
      <h1>Lista tareas</h1>
      <ul>
        {currentProject && !!currentProject.activities.length ? (
          currentProject.activities
            .filter((item) => item)
            .sort((a, b) => {
              if (!a.completed) return -1;
              if (a.completed) return 1;
              return 0;
            })
            .map((activity) => (
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
