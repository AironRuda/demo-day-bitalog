import { getDocs } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../context/userSlice';
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

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={CREATE_PROJECT_VALIDATION_SCHEMA}
      onSubmit={async (values, helpers) => {
        const newProject = await handleCreateProject(values);
        if (typeof newProject === 'string') helpers.setStatus(newProject);
        else if (newProject) {
          helpers.resetForm();
          dispatch(addProject(newProject));
        }
      }}
    >
      {({ status }) => (
        <Form>
          <TextFieldFormik name='name' placeholder='Project Name' />
          <SelectFormik
            name='workers'
            options={avalaibleWorkers}
            placeholder='Selecciona a los encargados'
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
