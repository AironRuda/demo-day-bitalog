import { doc, setDoc } from 'firebase/firestore';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextFieldFormik from '../components/common/form/TextFieldFormik';
import Return from '../components/common/Return';
import { selectUser } from '../context/selectors';
import { fetchUser } from '../context/thunks';
import { db } from '../firebase/config';
import { registerHandle } from '../handlers/registerHandle';
import { RegisterDTO } from '../model/user.model';
import { REGISTER_VALIDATION_SCHEMA } from '../utilities/formValidations';
import hero from '../assets/bg/hero.jpg';
import RegisterForm from '../components/register/RegisterForm';

const Register: React.FunctionComponent = (props) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.id !== '') navigate('/app');
  }, [user]);

  return (
    <div
      className={`w-full h-full bg-no-repeat bg-cover flex flex-col items-center justify-center`}
      style={{ backgroundImage: `url(${hero})` }}
    >
      <Return />
      <div className='lg:w-1/2 w-full lg:h-1/2 h-2/3 flex flex-col items-center justify-center'>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
