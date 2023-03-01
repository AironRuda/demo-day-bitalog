import * as React from "react";
import { Outlet } from "react-router-dom";

interface IAppProps {}

const ActivityContainer: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <main>
      <h1>Actividades</h1>
      <menu className="btn-group">
        <button className="btn btn-active">Ver lista de Actividades</button>
        <button className="btn">Crear actividad</button>
      </menu>
      <Outlet />
    </main>
  );
};

export default ActivityContainer;
