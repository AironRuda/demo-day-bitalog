import { FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../context/projectsSlice';
import { handleCreateProject } from '../../../handlers/handleProject';
import { createProjectDTO } from '../../../model/projects.model';
import CreateProjectForm from './CreateProjectForm';
import { successAlert } from '../../../utilities/alert';

const INITIAL_VALUES: createProjectDTO = {
  name: '',
  workers: [],
};

const CreateProjects: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: createProjectDTO,
    helpers: FormikHelpers<createProjectDTO>
  ) => {
    const newProject = await handleCreateProject(values);
    if (typeof newProject === 'string') helpers.setStatus(newProject);
    else if (newProject) {
      helpers.resetForm();
      dispatch(addProject(newProject));
      successAlert('Se ha creado el proyecto de forma exitosa 😀');
    }
  };

  return (
    <CreateProjectForm
      INITIAL_VALUES={INITIAL_VALUES}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateProjects;
