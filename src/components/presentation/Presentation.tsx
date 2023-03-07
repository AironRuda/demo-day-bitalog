import { Link } from 'react-router-dom';

const Presentation: React.FunctionComponent = (props) => {
  return (
    <section className='relative bg-[url(https://realestatemarket.com.mx/images/2022/02-feb/1102/Industriadelaconstruccion-serecuperomarginalmente-2021.jpg)] bg-cover bg-center bg-no-repeat'>
      <div className='absolute h-full inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25'></div>

      <div className='relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8'>
        <div className='max-w-xl text-center sm:text-left'>
          <h1
            className='text-3xl font-extrabold sm:text-5xl'
            style={{ color: '#31C48D' }}
          >
            BITALOG.
            <strong className='block font-extrabold text-black'>
              Bitácora para sus proyectos
            </strong>
          </h1>

          <p className='mt-4 max-w-lg sm:text-xl sm:leading-relaxed text-slate-600'>
            Administra tus proyectos desde cualquier lugar, de manera rápida y
            concisa!
          </p>

          <div className='mt-8 flex flex-wrap gap-4 text-center'>
            <Link
              to='app'
              className='block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto'
              style={{ background: '#215A6D' }}
            >
              Iniciar sesión
            </Link>

            <Link
              to='register'
              className='block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto'
              style={{ color: '#215A6D' }}
            >
              Registro
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presentation;
