import { Material } from '../../model/material.model';

interface SpentProps {
  spent: Material;
}

const Spent: React.FunctionComponent<SpentProps> = ({ spent }) => {
  return (
    <li
      key={spent.material}
      className='flex flex-col items-center justify-center p-2 rounded-xl w-36 h-36'
      style={{ background: '#31C48D' }}
    >
      <h5 className='mb-1 text-xl font-medium text-white'>{spent.material}</h5>
      <span className='text-sm text-black'>
        <b>Gasto:</b> {spent.amount} {spent.unit}
      </span>
    </li>
  );
};

export default Spent;
