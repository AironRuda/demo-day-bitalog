import { useSelector } from "react-redux";
import { getSelectedProject } from "../../context/projectsSlice";
import { getCurrentProject } from "../../context/selectors";
import { Project } from "../../model/projects.model";
import SelectProjectMessage from "../common/SelectProjectMessage";

const Team: React.FunctionComponent = () => {
  const currentProjectId = useSelector(getSelectedProject);
  const currentProject = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getCurrentProject(state, currentProjectId)
  );
  const workerArray = currentProject?.workers;

  return (
    <main className="flex items-center flex-col m-5">
      <h1 className="text-center text-4xl text-slate-700 font-bold">
        EQUIPO DE TRABAJO
      </h1>
      <ul>
        {!currentProjectId && !workerArray ? (
          <SelectProjectMessage />
        ) : (
          workerArray?.map((worker) => (
            <li
              key={worker}
              className="flex flex-col items-center p-2 m-2 rounded-xl bg-primary"
            >
              <img
                src={`https://api.dicebear.com/5.x/lorelei/svg?seed=${worker}`}
                alt=""
                className="w-24 h-24 mb-3 rounded-full shadow-lg bg-white"
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
