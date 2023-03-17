import { useDispatch } from 'react-redux';
import { logout } from '../../assets/icons';
import { clearNovelties } from '../../context/noveltiesSlice';
import { clearProjects } from '../../context/projectsSlice';
import { clearUser } from '../../context/userSlice';
import { clearWorkers } from '../../context/workersSlice';

const Logout: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();

  return (
    <div
      className='absolute right-5 top-5 flex flex-col items-center justify-center cursor-pointer'
      onClick={() => {
        dispatch(clearUser());
        dispatch(clearProjects());
        dispatch(clearNovelties());
        dispatch(clearWorkers());
      }}
    >
      <img className='w-10' src={logout} />
    </div>
  );
};

export default Logout;
