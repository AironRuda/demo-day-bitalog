import { useDispatch, useSelector } from 'react-redux';
import { selectProject } from '../../context/selectedProjectSlice';
import { selectProjects } from '../../context/userSelectors';

const ProjectList: React.FunctionComponent = (props) => {
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Proyectos</h1>
      <ul>
        {projects.length ? (
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
