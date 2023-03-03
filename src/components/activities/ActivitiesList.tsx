import { useSelector } from "react-redux";
import { selectedProject } from "../../context/selectedProjectSlice";
import { getActivities } from "../../context/userSlice";
import { Project } from "../../model/projects.model";

interface IAppProps {}

const AcityiesList: React.FunctionComponent<IAppProps> = (props) => {
  const selectedProjectId = useSelector(selectedProject);
  const activitiesList = useSelector(
    (state: { user: { projects: Project[] } }) =>
      getActivities(state, selectedProjectId)
  );

  return (
    <main>
      <h1>Lista tareas</h1>
      <ul>
        {activitiesList && !!activitiesList.activities.length ? (
          activitiesList.activities.map((activity) => (
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

export default AcityiesList;
