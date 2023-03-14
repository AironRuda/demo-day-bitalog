import { useState } from 'react';
import { downArrow, upArrow } from '../../assets/icons';
import { InventoryFilter } from '../../model/inventory.model';
import { Material } from '../../model/material.model';
import { formatSpentsList } from '../../utilities/formatInventory';
import { filterWhite } from '../common/customStyles';
import Spent from './Spent';

interface Props {
  inventory: Material[];
}

const SpentsTable: React.FunctionComponent<Props> = ({ inventory }) => {
  const [filter, setFilter] = useState<InventoryFilter>('');

  return (
    <div className='lg:w-2/3 w-screen h-full'>
      <table className='table table-compact lg:w-4/5 w-11/12 mx-auto h-full'>
        <thead>
          <tr className='[&>*]:bg-primary [&>*]:text-white border-6'>
            <th className='w-10 z-0'></th>
            <th
              className='w-20 overflow-hidden cursor-pointer'
              onClick={() =>
                setFilter((prev) => (prev === '' ? 'reverse' : ''))
              }
            >
              <span className='flex items-center'>
                Material{' '}
                <img
                  style={filterWhite}
                  src={filter === '' ? upArrow : downArrow}
                />
              </span>
            </th>
            <th
              className='w-10 cursor-pointer'
              onClick={() =>
                setFilter((prev) => (prev === 'max' ? 'min' : 'max'))
              }
            >
              <span className='flex items-center mr-3'>
                Gasto{' '}
                <img
                  style={filterWhite}
                  src={filter === 'max' ? upArrow : downArrow}
                />
              </span>
            </th>
            <th className='w-10 text-center'>Unidad</th>
          </tr>
        </thead>
        <tbody>
          {formatSpentsList(inventory, filter).map((spent, index) => (
            <Spent key={index} spent={spent} id={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpentsTable;
