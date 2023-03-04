import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteActivity } from '../../context/userSlice';
import { handleDeleteActivity } from '../../handlers/handleDeleteActivity';
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

  return (
    <li>
      <span>{activity.activityName}</span>
      <span onClick={() => navigate(`update-project/${activity.id}`)}>
        edit
      </span>
      <span onClick={handleClickDelete}>x</span>
    </li>
  );
};

export default ActivityItem;
