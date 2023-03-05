import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteActivity, updateStatusActivity } from '../../context/userSlice';
import { selectRol } from '../../context/userSelectors';
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

//TODO proponer manejar el inventario de gastos al momento de cerrar el proyecto.

const ActivityItem: React.FunctionComponent<IActivityItemProps> = ({
  activity,
  currentProject,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rol = useSelector(selectRol);

  async function handleClickDelete() {
    const response = await handleDeleteActivity(activity.id, currentProject);
    if (typeof response === 'string') console.log('hubo un error');
    else if (!response)
      dispatch(
        deleteActivity({
          activityId: activity.id,
          projectId: currentProject.id,
        })
      );
  }

  async function handleClickStatus() {
    const response = await handleStatusActivity(activity.id, currentProject);
    if (typeof response === 'string') console.log('hubo un error');
    else if (!response)
      dispatch(
        updateStatusActivity({
          activityId: activity.id,
          projectId: currentProject.id,
        })
      );
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
        <span onClick={handleClickStatus}>Cumplir actividad</span>
      )}
    </li>
  );
};

export default ActivityItem;
