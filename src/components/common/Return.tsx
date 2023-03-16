import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { leftArrow } from '../../assets/icons';
import { filterWhite } from './customStyles';

const Return: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div
      className='return absolute top-10 left-5 flex items-center cursor-pointer'
      onClick={() => navigate('/')}
    >
      <img src={leftArrow} className='w-12 ' />
      <span className='font-bold text-lg'>Regresar</span>
    </div>
  );
};

export default Return;
