import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  deleteActivity,
  updateStatusActivity,
} from '../../context/projectsSlice';
import { getActivityById, selectRol } from '../../context/selectors';
import {
  handleDeleteActivity,
  handleStatusActivity,
} from '../../handlers/handleActivity';
import { Activity } from '../../model/activity.model';
import { Project } from '../../model/projects.model';

interface IActivityItemProps {
  activity: Activity;
  currentProject: Project;
  index: number;
}

const ActivityItem: React.FunctionComponent<IActivityItemProps> = ({
  activity,
  currentProject,
  index,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rol = useSelector(selectRol);
  const currentActivity = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getActivityById(state, currentProject.id, activity.id)
  );

  async function handleClickDelete() {
    Swal.fire({
      title: '¿Estás seguro de eliminar la actividad?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await handleDeleteActivity(
          activity.id,
          currentProject
        );
        if (typeof response === 'string')
          Swal.fire({
            text: 'Hubo un error al eliminar la actividad',
            icon: 'error',
          });
        else if (!response) {
          dispatch(deleteActivity(activity.id));
          Swal.fire({
            text: 'La actividad se ha eliminado correctamente',
            icon: 'success',
          });
        }
      }
    });
  }

  async function handleClickStatus() {
    const response = await handleStatusActivity(activity.id, currentProject);
    if (typeof response === 'string') console.log('hubo un error');
    else if (!response) dispatch(updateStatusActivity(activity.id));
  }

  return (
    <tr
      className={`[&>*]:bg-slate-100 [&>*]:text-black [&>*]:border-b-2 [&>*]:border-white`}
    >
      <td className='text-primary font-bold md:pl-5 pl-2'>
        {activity.completed ? '✔️' : index + 1}
      </td>
      <td>{activity.activityName}</td>
      <td>{activity.priority}</td>
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
        {rol === 'admin' ? (
          <div className='flex justify-around'>
            <span
              className='cursor-pointer text-secondary'
              onClick={() => navigate(`update-project/${activity.id}`)}
            >
              ✏️
            </span>
            <span
              className='cursor-pointer text-red-500'
              onClick={handleClickDelete}
            >
              ❌
            </span>
          </div>
        ) : (
          <div>
            {!currentActivity?.completed && (
              <span onClick={handleClickStatus}>Cumplir</span>
            )}
          </div>
        )}
      </td>
    </tr>
  );
};

export default ActivityItem;
