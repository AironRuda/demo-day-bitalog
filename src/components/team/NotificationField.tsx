import * as React from "react";
import { useSelector } from "react-redux";
import { getSelectedProject } from "../../context/projectsSlice";
import CreateNotification from "./CreateNotification";
import Notifications from "./Notifications";

interface IAppProps {}

const NotificationField: React.FunctionComponent<IAppProps> = (props) => {
  const currentProjectId = useSelector(getSelectedProject);
  return (
    <main className="flex items-center flex-col m-5">
      <h1 className="items-center font-bold text-3xl">NotificationField</h1>
      {currentProjectId ? (
        <>
          <CreateNotification />
          <Notifications />
        </>
      ) : (
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          No se ha seleccionado un ptoyecto
        </h5>
      )}
    </main>
  );
};

export default NotificationField;
