import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../assets/icons';
import Navbar from '../components/Navbar';
import { selectUser } from '../context/selectors';
import { logOut } from '../context/userSlice';

const Dashboard: React.FunctionComponent = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === '') navigate('/app');
  }, [user]);

  return (
    <div className='container h-[100vh]'>
      <div
        className='absolute right-5 top-5 flex flex-col items-center justify-center cursor-pointer'
        onClick={() => dispatch(logOut())}
      >
        <img className='w-8' src={logout} alt='' />
      </div>
      <main className='py-10 w-full h-[80vh]'>
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Dashboard;
