import { useSelector } from 'react-redux';
import { getSelectedProject } from '../context/projectsSlice';
import { getCurrentProject } from '../context/selectors';
import { Project } from '../model/projects.model';

const Team: React.FunctionComponent = () => {
  const currentProjectId = useSelector(getSelectedProject);
  const currentProject = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getCurrentProject(state, currentProjectId)
  );
  const workerArray = currentProject?.workers;

  return (
    <main>
      <h1>Lista de trabajadores</h1>
      <ul>
        {!!!currentProjectId && !!!workerArray ? (
          <li>
            <h1>No se ha seleccionado un ptoyecto</h1>
          </li>
        ) : (
          workerArray?.map((worker) => (
            <li key={worker}>
              <p>foto de trabajadaro</p>
              <h1>Id del trabajador: {worker}</h1>
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default Team;
