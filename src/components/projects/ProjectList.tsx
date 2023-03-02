import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../context/userSlice';

const ProjectList: React.FunctionComponent = (props) => {
  const projects = useSelector(selectProjects);

  return (
    <div>
      <h1>Proyectos</h1>
      <ul>
        {!!projects ? (
          projects.map((project) => <li>{project.name}</li>)
        ) : (
          <div>En el momento no hay proyectos disponibles :c</div>
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
