import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectedProject } from '../../context/selectedProjectSlice';
import { getCurrentProject } from '../../context/userSelectors';
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
