import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectedProject,
  selectProject,
} from "../context/selectedProjectSlice";
import { getCurrentProject } from "../context/userSlice";
import { Project } from "../model/projects.model";

interface IAppProps {}

const Team: React.FunctionComponent<IAppProps> = (props) => {
  const currentProjectId = useSelector(selectedProject);
  const currentProject = useSelector(
    // se crea un state, con el tipo requerido para el "getCurrentPRoject"
    (state: { user: { projects: Project[] } }) =>
      getCurrentProject(state, currentProjectId)
  );
  const workerArray = currentProject?.workers;

  useEffect(() => {
    // console.log(selectedProject);
    console.log("selected", currentProjectId);
    console.log(currentProject);
    console.log(workerArray);
  }, [selectProject]);
  return (
    <main>
      <h1>Lista de trabajadores</h1>
      {!!!currentProjectId && !!!workerArray ? (
        <h1>No se ha seleccionado un ptoyecto</h1>
      ) : (
        workerArray?.map((worker) => (
          <li key={worker}>
            <p>foto de trabajadaro</p>
            <h1>Id del trabajador: {worker}</h1>
          </li>
        ))
      )}
    </main>
  );
};

export default Team;
