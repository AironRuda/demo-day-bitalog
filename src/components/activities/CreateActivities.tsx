import { Formik, FormikHelpers } from 'formik';
import { Activity, createActivitiesDTO } from '../../model/activity.model';
import { ACTIVITY_VALIDATION_SCHEMA } from '../../utilities/formValidations';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../../context/projectsSlice';
import { getCurrentProject } from '../../context/selectors';
import { handleCreateActivity } from '../../handlers/handleActivity';
import FormActivity from './form/FormActivity';
import { successAlert } from '../../utilities/alert';

const INITIAL_VALUES: createActivitiesDTO = {
  activityName: '',
  materials: [],
  priority: 3,
};

const CreateActivities: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();
  const currentProject = useSelector(getCurrentProject);

  const handleSubmit = async (
    values: createActivitiesDTO,
    helpers: FormikHelpers<createActivitiesDTO>
  ) => {
    console.log(values);
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
