import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "../../context/selectedProjectSlice";
import { selectProjects } from "../../context/userSlice";

const ProjectList: React.FunctionComponent = (props) => {
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Proyectos</h1>
      <ul>
        {!!projects ? (
          projects.map((project, index) => (
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
          <div>En el momento no hay proyectos disponibles :c</div>
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
