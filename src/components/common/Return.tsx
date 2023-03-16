import { useNavigate } from 'react-router-dom';
import { leftArrow } from '../../assets/icons';

const Return: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div
      className='absolute top-10 left-5 flex items-center cursor-pointer'
      id='return'
      onClick={() => navigate('/')}
    >
      <img src={leftArrow} className='w-12 ' />
      <span className='font-bold text-lg text-black'>Regresar</span>
    </div>
  );
};

export default Return;
