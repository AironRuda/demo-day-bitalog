import { Form, Formik, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../context/thunks';
import { registerHandle } from '../../handlers/handleRegister';
import { RegisterDTO } from '../../model/user.model';
import { REGISTER_VALIDATION_SCHEMA } from '../../utilities/formValidations';
import TextFieldFormik from '../common/TextFieldFormik';

const INITIAL_VALUES: RegisterDTO = {
  email: '',
  rol: '',
  password: '',
  name: '',
};

const RegisterForm: React.FunctionComponent = (props) => {
  const dispatch = useDispatch<any>();

  const handleSubmit = async (
    values: RegisterDTO,
    helpers: FormikHelpers<RegisterDTO>
  ) => {
    const response = await registerHandle(values);
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
      validationSchema={REGISTER_VALIDATION_SCHEMA}
    >
      {({ status, values, handleChange, errors }) => (
        <Form className='md:w-5/6 w-full md:px-16 px-7 flex flex-col justify-center sm:py-14 py-28 rounded gap-5 bg-white sm:h-fit h-screen'>
          <h1 className='self-center text-center font-bold text-4xl text-slate-600 mb-3'>
            Regístrate
          </h1>
          <div className='w-full flex sm:flex-row flex-col sm:gap-5 gap-2 mb-2'>
            <div className='sm:w-1/2 w-full flex flex-col gap-2'>
              <h2 className='text-lg text-slate-600 font-medium'>Datos de usuario</h2>
              <TextFieldFormik name='name' placeholder='Nombre de usuario' />
              <select
                className='select w-full bg-white border-1 border-primary text-slate-700'
                name='rol'
                value={values.rol}
                id='rol'
                onChange={handleChange}
              >
                <option value=''>Seleccione rol</option>
                <option value='admin'>Administrador</option>
                <option value='worker'>Trabajador</option>
              </select>
              {errors.rol && (
                <div className='text-red-500 pl-2 w-full -mt-2'>
                  {errors.rol}
                </div>
              )}
            </div>
            <div className='sm:w-1/2 w-full flex flex-col gap-2'>
              <h2 className='text-lg text-slate-600 font-medium'>Credenciales</h2>
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
            </div>
          </div>
          <button type='submit' className='btn btn-primary text-white'>
            Registrarse
          </button>
          {!!status && <div className='text-red-500 pl-2'>{status}</div>}
          <span className='text-slate-700 text-center'>
            ¿Ya tienes una cuenta? {'    '}
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
