import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface IAppProps {}

const ActivityContainer: React.FunctionComponent<IAppProps> = (props) => {
  const navigate = useNavigate();
  return (
    <main>
      <h1>Actividades</h1>
      <menu className="btn-group">
        <button className="btn btn-active" onClick={() => navigate("")}>
          Ver lista de Actividades
        </button>
        <button className="btn" onClick={() => navigate("create-activities")}>
          Crear actividad
        </button>
      </menu>
      <Outlet />
    </main>
  );
};

export default ActivityContainer;
