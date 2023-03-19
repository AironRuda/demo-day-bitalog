import { useDispatch, useSelector } from 'react-redux';
import {
  deleteActivity,
  updateStatusActivity,
} from '../../../context/projectsSlice';
import { getActivityById } from '../../../context/selectors';
import {
  handleDeleteActivity,
  handleStatusActivity,
} from '../../../handlers/handleActivity';
import { Activity } from '../../../model/activity.model';
import { Project, ProjectContext } from '../../../model/projects.model';
import { errorAlert, successAlert } from '../../../utilities/alert';
import ActivityOptions from './ActivityOptions';

interface IActivityItemProps {
  activity: Activity;
  currentProject: Project;
}

const ActivityItem: React.FunctionComponent<IActivityItemProps> = ({
  activity,
  currentProject,
}) => {
  const dispatch = useDispatch();
  const currentActivity = useSelector((state: { projects: ProjectContext }) =>
    getActivityById(state, activity.id)
  );

  async function confirmDelete() {
    const response = await handleDeleteActivity(activity.id, currentProject);
    if (typeof response === 'string')
      errorAlert('Hubo un error al eliminar la actividad 😟');
    else if (!response) {
      dispatch(deleteActivity(activity.id));
      successAlert('La actividad se ha eliminado correctamente 😀');
    }
  }

  async function confirmChangeStatus() {
    const response = await handleStatusActivity(
      activity.id,
      currentProject,
      false
    );
    if (typeof response === 'string')
      errorAlert('Hubo un error al cambiar el estado de la actividad 😟');
    else if (!response) {
      dispatch(updateStatusActivity(activity.id));
      successAlert('La actividad ha finalizado correctamente 😀');
    }
  }

  return (
    <tr
      className={`w-full [&>*]:bg-slate-100 [&>*]:text-black [&>*]:border-b-2 [&>*]:border-white`}
    >
      <td className='md:pl-5 pl-2 w-10'>{activity.completed ? '✔️' : '❕'}</td>
      <td className='max-w-0 overflow-x-auto'>{activity.activityName}</td>
      <td className='text-center'>
        {activity.priority === 1
          ? 'Baja'
          : activity.priority === 2
          ? 'Media'
          : 'Alta'}
      </td>
      <td className='flex flex-col overflow-x-hidden min-h-12'>
        {activity.materials.map((material, index) => (
          <>
            <span className='md:w-full w-10'>{material.material}</span>
            <span
              className={
                activity.materials.length - 1 !== index
                  ? 'border-b-2 border-white'
                  : ''
              }
            >
              {material.amount} {material.unit}
            </span>
          </>
        ))}
      </td>
      <td>
        {currentActivity && (
          <ActivityOptions
            currentActivity={currentActivity}
            confirmDelete={confirmDelete}
            confirmChangeStatus={confirmChangeStatus}
          />
        )}
      </td>
    </tr>
  );
};

export default ActivityItem;
