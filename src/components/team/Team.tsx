import { useSelector } from "react-redux";
import { teamUserLogo } from "../../assets/icons";
import { getSelectedProject } from "../../context/projectsSlice";
import { getCurrentProject } from "../../context/selectors";
import { Project } from "../../model/projects.model";

const Team: React.FunctionComponent = () => {
  const currentProjectId = useSelector(getSelectedProject);
  const currentProject = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getCurrentProject(state, currentProjectId)
  );
  const workerArray = currentProject?.workers;

  return (
    <main className="flex items-center flex-col m-5">
      <h1 className="items-center font-bold text-3xl ">
        Lista de trabajadores
      </h1>
      <ul>
        {!!!currentProjectId && !!!workerArray ? (
          <li className="flex flex-col items-center p-2 m-2 rounded-xl">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              No se ha seleccionado un ptoyecto
            </h5>
          </li>
        ) : (
          workerArray?.map((worker) => (
            <li
              key={worker}
              className="flex flex-col items-center p-2 m-2 rounded-xl"
              style={{ background: "#31C48D" }}
            >
              <img
                src={teamUserLogo}
                alt=""
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                style={{ background: "white" }}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Trabajador
              </h5>
              <span className="text-sm text-black">{worker}</span>
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default Team;
