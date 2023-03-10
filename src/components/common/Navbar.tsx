import { NavLink, useLocation } from 'react-router-dom';
import { clipboard, folder, group, spreadsheet } from '../../assets/icons';

const Navbar: React.FunctionComponent = (props) => {
  const location = useLocation().pathname;

  const iconBase = {
    filter:
      'invert(100%) sepia(94%) saturate(0%) hue-rotate(248deg) brightness(106%) contrast(106%)',
  };
  const iconSelected = {
    filter:
      'invert(20%) sepia(11%) saturate(1907%) hue-rotate(176deg) brightness(93%) contrast(81%)',
  };
  const link = 'flex flex-col justify-center items-center cursor-pointer ';

  return (
    <div className='w-full flex bg-primary py-3 px-5 fixed bottom-0'>
      <nav className='w-full flex flex-row md:justify-evenly justify-between'>
        <NavLink
          className={`${link} ${
            location === '/app/dashboard' ? 'text-slate-700' : 'text-white'
          }`}
          to=''
        >
          <img
            style={location === '/app/dashboard' ? iconSelected : iconBase}
            className='w-10'
            src={folder}
          />
          <b className=''>Proyectos</b>
        </NavLink>

        <NavLink
          className={`${link} ${
            location.includes('activities') ? 'text-slate-700' : ' text-white'
          }`}
          to='activities'
        >
          <img
            style={location.includes('activities') ? iconSelected : iconBase}
            className='w-10'
            src={clipboard}
          />
          <b className=''>Actividades</b>
        </NavLink>

        <NavLink
          className={`${link} ${
            location.includes('team') ? 'text-slate-700' : ' text-white'
          }`}
          to='team'
        >
          <img
            style={location.includes('team') ? iconSelected : iconBase}
            className='w-10'
            src={group}
          />
          <b className=''>Equipo</b>
        </NavLink>

        <NavLink
          className={`${link} ${
            location.includes('inventory') ? 'text-slate-700' : ' text-white'
          }`}
          to='inventory'
        >
          <img
            style={location.includes('inventory') ? iconSelected : iconBase}
            className='w-10'
            src={spreadsheet}
          />
          <b className=''>Inventario</b>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
