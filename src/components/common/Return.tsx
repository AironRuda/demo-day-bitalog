import { useNavigate } from 'react-router-dom';
import { leftArrow } from '../../assets/icons';
import { filterWhite } from './customStyles';

const Return: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div
      className='absolute top-10 left-5 flex items-center cursor-pointer'
      onClick={() => navigate('/')}
    >
      <img src={leftArrow} style={filterWhite} className='w-12 ' />
      <span className='text-white font-bold text-lg'>Regresar</span>
    </div>
  );
};

export default Return;
