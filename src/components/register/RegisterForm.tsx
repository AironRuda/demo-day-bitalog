import { doc, setDoc } from 'firebase/firestore';
import { Form, Formik, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../context/thunks';
import { db } from '../../firebase/config';
import { registerHandle } from '../../handlers/registerHandle';
import { RegisterDTO } from '../../model/user.model';
import { REGISTER_VALIDATION_SCHEMA } from '../../utilities/formValidations';
import TextFieldFormik from '../common/form/TextFieldFormik';

const INITIAL_VALUES: RegisterDTO = {
  email: '',
  rol: '',
  password: '',
};

const RegisterForm: React.FunctionComponent = (props) => {
  const dispatch = useDispatch<any>();

  const handleSubmit = async (
    values: RegisterDTO,
    helpers: FormikHelpers<RegisterDTO>
  ) => {
    const rol = values.rol;
    const response = await registerHandle(values);
    if (typeof response === 'string') {
      helpers.setStatus(response);
    } else if (response) {
      await setDoc(doc(db, 'users', response.user.uid), {
        rol,
      });
      dispatch(fetchUser(response.user.uid));
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={REGISTER_VALIDATION_SCHEMA}
    >
      {({ status, values, handleChange, errors }) => (
        <Form className='lg:w-1/2 md:w-2/3 w-full flex flex-col justify-center px-10 py-72 rounded gap-5 bg-white h-full'>
          <h1 className='self-center text-center font-bold text-4xl text-slate-600 mb-5'>
            Registrate
          </h1>
          <TextFieldFormik name='email' placeholder='Email' type='email' />

          <select
            className='select w-full bg-white border-1 border-primary text-slate-700'
            name='rol'
            value={values.rol}
            id='rol'
            onChange={handleChange}
          >
            <option value=''>Seleccione rol</option>
            <option value='admin'>Admin</option>
            <option value='worker'>worker</option>
          </select>
          {errors.rol && (
            <div className='text-red-500 pl-2 -mt-5'>{errors.rol}</div>
          )}

          <TextFieldFormik
            name='password'
            placeholder='Password'
            type='password'
          />
          <button type='submit' className='btn btn-primary text-white'>
            Registrarse
          </button>
          {!!status && <div className='text-red-500 pl-2'>{status}</div>}
          <span className='text-slate-700 text-center'>
            Ya tienes una cuenta? {'    '}
            <Link to='/app' className='text-primary font-bold'>
              Inicia Sesión{' '}
            </Link>
          </span>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
