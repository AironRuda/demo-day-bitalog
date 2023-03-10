import { Form, Formik, FormikHelpers } from 'formik';
import { createProjectDTO } from '../../../model/projects.model';
import { CREATE_PROJECT_VALIDATION_SCHEMA } from '../../../utilities/formValidations';
import SelectFormik from '../../common/form/SelectFormik';
import TextFieldFormik from '../../common/form/TextFieldFormik';

interface Props {
  INITIAL_VALUES: createProjectDTO;
  handleSubmit: (
    values: createProjectDTO,
    helpers: FormikHelpers<createProjectDTO> | any
  ) => Promise<void>;
  avalaibleWorkers: string[];
}

const CreateProjectForm: React.FunctionComponent<Props> = ({
  INITIAL_VALUES,
  handleSubmit,
  avalaibleWorkers,
}) => {
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={CREATE_PROJECT_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ status }) => (
        <Form className='h-11/12 md:w-1/3 mx-2 flex flex-col items-center gap-5 p-10 '>
          <TextFieldFormik name='name' placeholder='Nombre del proyecto' />
          <SelectFormik
            name='workers'
            options={avalaibleWorkers}
            placeholder='Selecciona a los encargados'
            renderList
          />
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
