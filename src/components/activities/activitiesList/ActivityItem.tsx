import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
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
      Swal.fire({
        text: 'Hubo un error al eliminar la actividad',
        icon: 'error',
        confirmButtonColor: '#31C48D',
      });
    else if (!response) {
      dispatch(deleteActivity(activity.id));
      Swal.fire({
        text: 'La actividad se ha eliminado correctamente',
        icon: 'success',
        confirmButtonColor: '#31C48D',
      });
    }
  }

  async function confirmChangeStatus() {
    const response = await handleStatusActivity(
      activity.id,
      currentProject,
      false
    );
    if (typeof response === 'string')
      Swal.fire({
        text: 'Hubo un error al cambiar el estado de la actividad',
        icon: 'error',
        confirmButtonColor: '#31C48D',
      });
    else if (!response) {
      dispatch(updateStatusActivity(activity.id));
      Swal.fire({
        text: 'La actividad ha finalizado correctamente',
        icon: 'success',
        confirmButtonColor: '#31C48D',
      });
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
      <td className='flex flex-col overflow-x-hidden'>
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
