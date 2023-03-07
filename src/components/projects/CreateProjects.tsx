import { getDocs } from 'firebase/firestore';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../context/projectsSlice';
import { searchWorkers } from '../../firebase/queries';
import { handleCreateProject } from '../../handlers/handleCreateProject';
import { createProjectDTO } from '../../model/projects.model';
import { CREATE_PROJECT_VALIDATION_SCHEMA } from '../../utilities/formValidations';
import SelectFormik from '../form/SelectFormik';
import TextFieldFormik from '../form/TextFieldFormik';

const INITIAL_VALUES: createProjectDTO = {
  name: '',
  workers: [],
};

const CreateProjects: React.FunctionComponent = (props) => {
  const [avalaibleWorkers, setAvalaibleWorkers] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getDocs(searchWorkers).then((res) => {
      const workers = res.docs.map((doc) => doc.id);
      setAvalaibleWorkers(workers);
    });
  }, []);

  const handleSubmit = async (
    values: createProjectDTO,
    helpers: FormikHelpers<createProjectDTO>
  ) => {
    const newProject = await handleCreateProject(values);
    if (typeof newProject === 'string') helpers.setStatus(newProject);
    else if (newProject) {
      helpers.resetForm();
      dispatch(addProject(newProject));
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={CREATE_PROJECT_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ status }) => (
        <Form>
          <TextFieldFormik name='name' placeholder='Project Name' />
          <SelectFormik
            name='workers'
            options={avalaibleWorkers}
            placeholder='Selecciona a los encargados'
            renderList
          />
          <button type='submit' className='btn'>
            Create
          </button>
          {!!status && <div>{status}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default CreateProjects;
