import { Outlet } from "react-router-dom";

interface IAppProps {}

const ProjectContainer: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <main>
      <h1>PROJECTS</h1>
      <menu className="btn-group">
        <button className="btn btn-active">Ver lista de proyectos</button>
        <button className="btn">Crear proyecto</button>
      </menu>
      <Outlet />
    </main>
  );
};

export default ProjectContainer;
