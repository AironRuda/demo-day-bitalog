import { useSelector } from 'react-redux';
import { selectedProject } from '../context/selectedProjectSlice';
import { getCurrentProject } from '../context/userSelectors';
import { Project } from '../model/projects.model';

interface IAppProps {}

const Team: React.FunctionComponent<IAppProps> = (props) => {
  const currentProjectId = useSelector(selectedProject);
  const currentProject = useSelector(
    // se crea un state, con el tipo requerido para el "getCurrentPRoject"
    (state: { user: { projects: Project[] } }) =>
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
