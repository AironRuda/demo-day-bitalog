import { useSelector } from 'react-redux';
import { getSelectedProject } from '../../../context/projectsSlice';
import CreateNotification from './CreateNotification';
import Notifications from './Notifications';

const NotificationField: React.FunctionComponent = (props) => {
  const currentProjectId = useSelector(getSelectedProject);
  return (
    <>
      {currentProjectId && (
        <main className='flex items-center flex-col m-5 md:w-2/3 w-full'>
          <>
            <h2 className='text-center self-center text-3xl text-slate-700 font-bold mb-5'>
              Novedades
            </h2>
            <CreateNotification />
            <div className='w-11/12 mt-5'>
              <Notifications />
            </div>
          </>
        </main>
      )}
    </>
  );
};

export default NotificationField;
