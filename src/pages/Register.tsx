import { doc, setDoc } from 'firebase/firestore';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextFieldFormik from '../components/form/TextFieldFormik';
import { selectUser } from '../context/selectors';
import { fetchUser } from '../context/thunks';
import { db } from '../firebase/config';
import { registerHandle } from '../handlers/registerHandle';
import { RegisterDTO } from '../model/user.model';
import { REGISTER_VALIDATION_SCHEMA } from '../utilities/formValidations';

const INITIAL_VALUES: RegisterDTO = {
  email: '',
  rol: '',
  password: '',
};

const Register: React.FunctionComponent = (props) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.id !== '') navigate('/app');
  }, [user]);

  const handleSubmit = async (
    values: RegisterDTO,
    helpers: FormikHelpers<RegisterDTO>
  ) => {
    const rol = values.rol;
    try {
      const response = await registerHandle(values);
      if (typeof response === 'string') {
        helpers.setStatus(response);
      } else if (response) {
        await setDoc(doc(db, 'users', response.user.uid), {
          rol,
        });
        dispatch(fetchUser(response.user.uid));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={REGISTER_VALIDATION_SCHEMA}
    >
      {({ status, values, handleChange, errors }) => (
        <Form>
          <h1>Register</h1>
          <TextFieldFormik name='email' placeholder='Email' type='email' />

          <select
            name='rol'
            value={values.rol}
            id='rol'
            onChange={handleChange}
          >
            <option value=''>Seleccione rol</option>
            <option value='admin'>Admin</option>
            <option value='worker'>worker</option>
          </select>
          {errors.rol && <div className='input-feedback'>{errors.rol}</div>}

          <TextFieldFormik
            name='password'
            placeholder='Password'
            type='password'
          />
          <button type='submit'>Login</button>

          {!!status && <div>{status}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default Register;
