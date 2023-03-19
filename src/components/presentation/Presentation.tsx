import { Link } from 'react-router-dom';
import { hero } from '../../assets/bg';

const Presentation: React.FunctionComponent = () => {
  return (
    <section
      className='relative bg-cover bg-center bg-no-repeat w-screen'
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className='absolute h-full inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/0'></div>

      <div className='relative mx-auto max-w-screen-xl px-4 sm:ml-20 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8'>
        <div className='max-w-xl text-center sm:text-left'>
          <h1
            className='text-3xl font-extrabold sm:text-5xl'
            style={{ color: '#31C48D' }}
          >
            BITALOG
            <strong className='block font-extrabold text-slate-800'>
              Bitácora para tus proyectos
            </strong>
          </h1>

          <p className='mt-4 max-w-lg sm:text-xl sm:leading-relaxed text-slate-800 font-medium'>
            Administra tus proyectos desde cualquier lugar, de manera rápida y
            concisa!
          </p>

          <div className='mt-8 flex flex-wrap gap-4 sm:justify-start justify-center'>
            <Link className='text-white' to='app'>
              <button className='btn btn-primary w-40 text-white rounded-sm'>
                Iniciar sesión
              </button>
            </Link>
            <Link to='app/register'>
              <button className='btn bg-white w-40 border-0 rounded-sm text-slate-700 hover:bg-slate-100'>
                Registro
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presentation;
