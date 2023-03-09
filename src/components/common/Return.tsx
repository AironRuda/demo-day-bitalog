import { useNavigate } from 'react-router-dom';
import { leftArrow } from '../../assets/icons';

const Return: React.FunctionComponent = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className='absolute top-10 left-5 flex items-center cursor-pointer'
      onClick={() => navigate('/')}
    >
      <img
        src={leftArrow}
        style={{
          filter:
            'invert(100%) sepia(94%) saturate(0%) hue-rotate(248deg) brightness(106%) contrast(106%)',
        }}
        className='w-12 '
      />
      <span className='text-white font-bold text-lg'>Regresar</span>
    </div>
  );
};

export default Return;
