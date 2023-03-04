import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { selectUser } from '../context/userSliceSelectors';
import { User } from '../model/user.model';

interface IAppProps {}

const Dashboard: React.FunctionComponent<IAppProps> = (props) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === '') navigate('/app');
  }, [user]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
