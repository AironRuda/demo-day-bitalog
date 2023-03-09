import { Link } from 'react-router-dom';
import { clipboard, folder, group, spreadsheet } from '../../assets/icons';

const Navbar: React.FunctionComponent = (props) => {
  const icon = {
    filter:
      'invert(100%) sepia(94%) saturate(0%) hue-rotate(248deg) brightness(106%) contrast(106%)',
  };
  const link =
    'flex flex-col justify-center items-center cursor-pointer text-white';

  return (
    <div className='w-full flex bg-primary py-3 px-5 fixed bottom-0 '>
      <ul className='w-full flex flex-row md:justify-evenly justify-between'>
        <li className=''>
          <Link className={link} to=''>
            <img style={icon} className='w-10' src={folder} />
            <b className=''>Proyectos</b>
          </Link>
        </li>
        <li>
          <Link className={link} to='activities'>
            <img style={icon} className='w-10' src={clipboard} />
            <b className=''>Actividades</b>
          </Link>
        </li>
        <li>
          <Link className={link} to='team'>
            <img style={icon} className='w-10' src={group} />
            <b className=''>Equipo</b>
          </Link>
        </li>
        <li>
          <Link className={link} to='inventory'>
            <img style={icon} className='w-10' src={spreadsheet} />
            <b className=''>Inventario</b>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
