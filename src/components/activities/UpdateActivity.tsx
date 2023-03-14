import { Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSelectedProject } from '../../context/projectsSlice';
import { updateActivity } from '../../context/projectsSlice';
import { getActivityById, getCurrentProject } from '../../context/selectors';
import { handleUpdateActivity } from '../../handlers/handleActivity';
import { createActivitiesDTO } from '../../model/activity.model';
import { Project } from '../../model/projects.model';
import { ACTIVITY_VALIDATION_SCHEMA } from '../../utilities/formValidations';
import FormActivity from './form/FormActivity';
import Swal from 'sweetalert2';
import { updateInventory } from '../../services/inventory.service';

const EMPTY_VALUES: createActivitiesDTO = {
  activityName: '',
  materials: [],
  priority: 3,
  completed: false,
};

const UpdateActivity: React.FunctionComponent = (props) => {
  const { id } = useParams();

  const currentProjectId = useSelector(getSelectedProject);
  const currentActivity = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getActivityById(state, currentProjectId, id ?? '')
  );
  const currentProject = useSelector(
    (state: { projects: { projects: Project[] } }) =>
      getCurrentProject(state, currentProjectId)
  );

  const dispatch = useDispatch();

  const INITIAL_VALUES = currentActivity
    ? {
        priority: currentActivity.priority,
        materials: [...currentActivity.materials],
        activityName: currentActivity.activityName,
        completed: currentActivity.completed,
      }
    : EMPTY_VALUES;

  async function handleSubmit(
    values: createActivitiesDTO,
    helpers: FormikHelpers<createActivitiesDTO>
  ) {
    if (currentProject) {
      const response = await handleUpdateActivity(
        values,
        id ?? '',
        currentProject
      );
      if (INITIAL_VALUES.completed !== values.completed) {
        await updateInventory(
          currentProject.inventoryId,
          INITIAL_VALUES.materials,
          values.completed ? false : true
        );
      }
      if (typeof response === 'string') helpers.setStatus(response);
      else if (response) {
        dispatch(updateActivity(response));
        Swal.fire({
          icon: 'success',
          text: 'La actividad se ha actualizado correctamente 😃',
        });
      }
    }
  }

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={ACTIVITY_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ status, values }) => (
        <FormActivity
          buttonText='Actualizar'
          status={status}
          defaultPriority={values.priority}
          statusField={values.completed}
        />
      )}
    </Formik>
  );
};

export default UpdateActivity;
