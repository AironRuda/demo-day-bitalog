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
      {currentProjectId && (
        <>
          <h1 className="text-center text-4xl text-slate-700 font-bold">
            NOVEDADES
          </h1>
          <div className="flex flex-col">
            <CreateNotification />
            <Notifications />
          </div>
        </>
      )}
    </main>
  );
};

export default NotificationField;
