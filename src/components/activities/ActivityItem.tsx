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
}

const ActivityItem: React.FunctionComponent<IActivityItemProps> = ({
  activity,
  currentProject,
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
    <li>
      <span>{activity.activityName}</span>
      {rol === 'admin' ? (
        <>
          <span onClick={() => navigate(`update-project/${activity.id}`)}>
            edit
          </span>
          <span onClick={handleClickDelete}>x</span>
        </>
      ) : (
        <>
          {!currentActivity?.completed && (
            <span onClick={handleClickStatus}>Cumplir actividad</span>
          )}
        </>
      )}
    </li>
  );
};

export default ActivityItem;
