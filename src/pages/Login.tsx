import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../context/selectors';
import { useEffect } from 'react';
import Return from '../components/common/Return';
import hero from '../assets/bg/hero.jpg';
import LoginForm from '../components/login/LoginForm';

const Login: React.FunctionComponent = (props) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.id !== '') navigate('dashboard');
  }, [user]);

  return (
    <div
      className={`w-full h-full bg-no-repeat bg-cover flex flex-col items-center justify-center`}
      style={{ backgroundImage: `url(${hero})` }}
    >
      <Return />
      <div className='lg:w-1/2 w-full lg:h-1/2 h-2/3 flex flex-col items-center justify-center'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
