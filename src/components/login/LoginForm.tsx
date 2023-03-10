import TextFieldFormik from '../common/form/TextFieldFormik';
import { fetchUser } from '../../context/thunks';
import { Form, Formik, FormikHelpers } from 'formik';
import { handleLogin } from '../../handlers/loginHandle';
import { useDispatch } from 'react-redux';
import { LOGIN_VALIDATION_SCHEMA } from '../../utilities/formValidations';
import LoginValues from '../../model/login.model';
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
        <Form className='lg:w-1/2 md:w-2/3 w-full flex flex-col justify-center px-10 py-60 rounded gap-5 bg-white h-2/3'>
          <h1 className='text-center font-bold text-4xl text-slate-600 mb-5 '>
            Inicia Sesión
          </h1>
          <TextFieldFormik name='email' placeholder='Email' type='email' />
          <TextFieldFormik
            name='password'
            placeholder='Password'
            type='password'
          />

          <button type='submit' className='btn btn-primary text-white'>
            Login
          </button>
          {!!status && <div className='text-red-500 pl-2'>{status}</div>}
          <span className='text-slate-700 text-center'>
            ¿No tienes una cuenta? {'    '}
            <Link to='/app/register' className='text-primary font-bold'>
              Regístrate{' '}
            </Link>
          </span>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
