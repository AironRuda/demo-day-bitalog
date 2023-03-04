import { Formik, FormikHelpers } from 'formik';
import { createActivitiesDTO } from '../../model/activity.model';
import { ACTIVITY_VALIDATION_SCHEMA } from '../../utilities/formValidations';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../../context/userSlice';
import { getCurrentProject } from '../../context/userSliceSelectors';
import { Project } from '../../model/projects.model';
import { selectedProject } from '../../context/selectedProjectSlice';
import { handleCreateActivity } from '../../handlers/handleCreateActivity';
import FormActivity from './form/FormActivity';

const INITIAL_VALUES: createActivitiesDTO = {
  activityName: '',
  materials: [],
  priority: 3,
};

const CreateActivities: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();
  const selectedProjectId = useSelector(selectedProject);
  const currentProject = useSelector(
    (state: { user: { projects: Project[] } }) =>
      getCurrentProject(state, selectedProjectId)
  );

  const handleSubmit = async (
    values: createActivitiesDTO,
    helpers: FormikHelpers<createActivitiesDTO>
  ) => {
    if (currentProject) {
      const response = await handleCreateActivity(values, currentProject);
      if (typeof response === 'string') helpers.setStatus(response);
      else if (response) {
        helpers.resetForm();
        dispatch(addActivity(response));
      }
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={ACTIVITY_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ status }) => (
        <FormActivity status={status} buttonText='Crear tarea' />
      )}
    </Formik>
  );
};

export default CreateActivities;
