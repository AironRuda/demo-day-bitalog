import TextFieldFormik from '../common/TextFieldFormik';
import { fetchUser } from '../../context/thunks';
import { Form, Formik, FormikHelpers } from 'formik';
import { handleLogin } from '../../handlers/handleLogin';
import { useDispatch } from 'react-redux';
import { LOGIN_VALIDATION_SCHEMA } from '../../utilities/formValidations';
import { LoginValues } from '../../model/login.model';
import { Link } from 'react-router-dom';

const INITIAL_VALUES: LoginValues = {
  email: '',
  password: '',
};

const LoginForm: React.FunctionComponent = (props) => {
  const dispatch = useDispatch<any>();

  const handleSubmit = async (
    values: LoginValues,
    helpers: FormikHelpers<LoginValues>
  ) => {
    const response = await handleLogin(values);
    if (typeof response === 'string') {
      helpers.setStatus(response);
    } else if (response) {
      dispatch(fetchUser(response.user.uid));
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={LOGIN_VALIDATION_SCHEMA}
    >
      {({ status }) => (
        <Form className='sm:w-4/6 w-full lg:px-14 md:px-10 px-10 py-16 rounded bg-white h-fit'>
          <div className='flex flex-col gap-5 justify-center h-full max-w-[350px] mx-auto'>
            <h1 className='text-center font-bold text-4xl text-slate-600 mb-5 '>
              Inicia Sesión
            </h1>
            <TextFieldFormik
              name='email'
              placeholder='Correo Electrónico'
              type='email'
            />
            <TextFieldFormik
              name='password'
              placeholder='Contraseña'
              type='password'
            />

            <button type='submit' className='btn btn-primary text-white mt-3'>
              Iniciar Sesión
            </button>
            {!!status && <div className='text-red-500 pl-2'>{status}</div>}
            <span className='text-slate-700 text-center'>
              ¿No tienes una cuenta? {'    '}
              <Link to='/app/register' className='text-primary font-bold'>
                Regístrate{' '}
              </Link>
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
