import { Form, Formik, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { getWorkers } from '../../../context/selectors';
import { createProjectDTO } from '../../../model/projects.model';
import { CREATE_PROJECT_VALIDATION_SCHEMA } from '../../../utilities/formValidations';
import SelectWorkers from './SelectWorkers';
import TextFieldFormik from '../../common/TextFieldFormik';

interface Props {
  INITIAL_VALUES: createProjectDTO;
  handleSubmit: (
    values: createProjectDTO,
    helpers: FormikHelpers<createProjectDTO> | any
  ) => Promise<void>;
}

const CreateProjectForm: React.FunctionComponent<Props> = ({
  INITIAL_VALUES,
  handleSubmit,
}) => {
  const workers = useSelector(getWorkers);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={CREATE_PROJECT_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ status }) => (
        <Form className='h-11/12 md:w-1/3 mx-2 flex flex-col items-center p-10 '>
          <div className='w-full flex flex-col gap-5'>
            <TextFieldFormik name='name' placeholder='Nombre del proyecto' />
            <SelectWorkers
              name='workers'
              workers={workers}
              placeholder='Selecciona a los encargados'
            />
          </div>
          <button type='submit' className='btn btn-primary text-white w-full'>
            Crear
          </button>
          {!!status && <div className='text-red-500 pl-2'>{status}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default CreateProjectForm;
