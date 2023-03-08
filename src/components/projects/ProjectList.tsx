import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "../../context/selectedProjectSlice";
import { selectProjects } from "../../context/userSelectors";
import { updateStatusProject } from "../../context/userSlice";

const ProjectList: React.FunctionComponent = (props) => {
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    projects.forEach((project) => {
      if (
        (project.activities.every((activity) => activity.completed === true) &&
          project.completed === false) ||
        (project.activities.some((activity) => activity.completed === false) &&
          project.completed === true)
      ) {
        dispatch(updateStatusProject(project.id));
      }
    });
  }, [projects]);

  return (
    <div>
      <h1>Proyectos</h1>
      <ul>
        {projects.length ? (
          projects
            .filter((item) => item)
            .sort((a, b) => {
              if (!a.completed) return -1;
              if (a.completed) return 1;
              return 0;
            })
            .map((project, index) => (
              <li
                key={index}
                onClick={() => {
                  dispatch(selectProject(project.id));
                }}
              >
                {project.name}
              </li>
            ))
        ) : (
          <div>
            En el momento no hay proyectos disponibles, crea alguno o contacta a
            tu encargado para que te asigne a alguno
          </div>
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
