import Return from '../components/common/Return';

const NotFound: React.FunctionComponent = (props) => {
  return (
    <div className='h-screen w-screen bg-secondary flex flex-col justify-center items-center'>
      <Return />
      <h1 className='text-5xl px-20 text-white font-bold'>Error 404</h1>
      <p className='text-3xl text-center px-20 text-white mt-10'>
        La página que buscas no ha sido encontrada, intenta navegar por medio de
        la interfaz que la plataforma te provee 😉
      </p>
    </div>
  );
};

export default NotFound;
