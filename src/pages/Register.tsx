import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Return from '../components/common/Return';
import { selectUser } from '../context/selectors';
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
