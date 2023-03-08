import { Formik, Form } from 'formik';
import TextFieldFormik from '../components/form/TextFieldFormik';
import { handleLogin } from '../handlers/loginHandle';
import LoginValues from '../model/login.model';
import { LOGIN_VALIDATION_SCHEMA } from '../utilities/formValidations';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../context/thunks';
import { selectUser } from '../context/selectors';
import { useEffect } from 'react';
import { leftArrow } from '../assets/icons';

const INITIAL_VALUES: LoginValues = {
  email: '',
  password: '',
};

const Login: React.FunctionComponent = (props) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.id !== '') navigate('dashboard');
  }, [user]);

  return (
    <div className='w-full h-full flex items-center justify-center bg-secondary'>
      <div
        className='absolute top-10 left-5 flex items-center cursor-pointer'
        onClick={() => navigate('/')}
      >
        <img
          src={leftArrow}
          style={{
            filter:
              'invert(100%) sepia(94%) saturate(0%) hue-rotate(248deg) brightness(106%) contrast(106%)',
          }}
          className='w-12 '
        />
        <span className='text-white font-bold text-lg'>Regresar</span>
      </div>
      <div className='lg:w-1/2 w-full lg:h-1/2 h-2/3 flex flex-col items-center justify-center'>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={async (values, helpers) => {
            const response = await handleLogin(values);
            if (typeof response === 'string') {
              helpers.setStatus(response);
            } else if (response) {
              dispatch(fetchUser(response.user.uid));
            }
          }}
          validationSchema={LOGIN_VALIDATION_SCHEMA}
        >
          {({ status }) => (
            <Form className='lg:w-1/2 md:w-2/3 w-full flex flex-col justify-center px-10 py-40 rounded gap-5 bg-white h-full'>
              <h1 className='self-center text-center font-bold text-4xl text-slate-600 mb-5'>
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
              {!!status && <div>{status}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
