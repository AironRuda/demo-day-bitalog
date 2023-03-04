import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../context/userSlice';

const Navbar: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <ul>
        <li>
          <Link to=''>Projects</Link>{' '}
        </li>
        <li>
          <Link to='activities'>activities</Link>{' '}
        </li>
        <li>
          <Link to='team'>team</Link>{' '}
        </li>
        <li>
          <Link to='inventory'>inventory</Link>{' '}
        </li>
        <li>
          <button onClick={() => dispatch(logOut())}>logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
