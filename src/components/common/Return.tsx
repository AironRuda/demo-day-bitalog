import { useNavigate } from 'react-router-dom';
import { leftArrow } from '../../assets/icons';

const Return: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div
      className='absolute sm:top-5 top-1 left-5 flex items-center cursor-pointer'
      id='return'
      onClick={() => navigate('/')}
    >
      <img src={leftArrow} className='w-10' />
      <span className='font-bold text-2xl text-black mb-1'>Regresar</span>
    </div>
  );
};

export default Return;
