import { getDocs } from 'firebase/firestore';
import { FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../context/projectsSlice';
import { searchWorkers } from '../../../firebase/queries';
import { handleCreateProject } from '../../../handlers/handleProject';
import { createProjectDTO } from '../../../model/projects.model';
import CreateProjectForm from './CreateProjectForm';
import Swal from 'sweetalert2';

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
      Swal.fire({
        text: 'Se ha creado el proyecto de forma exitosa',
        icon: 'success',
        confirmButtonColor: '#31C48D',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <CreateProjectForm
      INITIAL_VALUES={INITIAL_VALUES}
      avalaibleWorkers={avalaibleWorkers}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateProjects;
