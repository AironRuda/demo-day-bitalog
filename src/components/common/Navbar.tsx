import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { clipboard, folder, group, spreadsheet } from '../../assets/icons';
import {
  selectRol,
  getNovelties,
  getSelectedProject,
} from '../../context/selectors';
import { filterSlate, filterWhite } from './customStyles';

const Navbar: React.FunctionComponent = () => {
  const location = useLocation().pathname;
  const rol = useSelector(selectRol);
  const novelties = useSelector(getNovelties);
  const currentProject = useSelector(getSelectedProject);

  const link = 'flex flex-col justify-center items-center cursor-pointer ';

  return (
    <div className='w-screen flex bg-primary py-3 sm:px-5 px-3 fixed bottom-0 z-50'>
      <nav className='w-full flex flex-row md:justify-evenly justify-between'>
        <NavLink
          className={`${link} ${
            location === '/app/dashboard' ? 'text-slate-700' : 'text-white'
          }`}
          to=''
        >
          <img
            style={location === '/app/dashboard' ? filterSlate : filterWhite}
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
            style={location.includes('activities') ? filterSlate : filterWhite}
            className='w-10'
            src={clipboard}
          />
          <b className=''>Actividades</b>
        </NavLink>

        <NavLink
          className={`relative ${link} ${
            location.includes('team') ? 'text-slate-700' : ' text-white'
          }`}
          to='team'
        >
          <img
            style={location.includes('team') ? filterSlate : filterWhite}
            className='w-10'
            src={group}
          />
          {!!novelties.length && !!currentProject && (
            <p className='bg-red-600 w-6 h-6 rounded-full p-1 absolute -right-1 -top-1 text-white flex items-center justify-center'>
              {novelties.length}
            </p>
          )}
          <b className=''>Equipo</b>
        </NavLink>

        {rol === 'admin' && (
          <NavLink
            className={`${link} ${
              location.includes('inventory') ? 'text-slate-700' : ' text-white'
            }`}
            to='inventory'
          >
            <img
              style={location.includes('inventory') ? filterSlate : filterWhite}
              className='w-10'
              src={spreadsheet}
            />
            <b className=''>Inventario</b>
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
