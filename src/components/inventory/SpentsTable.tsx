import { useState } from 'react';
import { downArrow, upArrow } from '../../assets/icons';
import { InventoryFilter } from '../../model/inventory.model';
import { Material } from '../../model/material.model';
import { formatSpentsList } from '../../utilities/formatInventory';
import Spent from './Spent';

interface Props {
  inventory: Material[];
}

const SpentsTable: React.FunctionComponent<Props> = ({ inventory }) => {
  const [filter, setFilter] = useState<InventoryFilter>('');

  return (
    <div className='lg:w-2/3 w-screen h-full'>
      <table className='table table-compact lg:w-4/5 w-full mx-auto h-full'>
        <thead>
          <tr className='[&>*]:bg-primary [&>*]:text-white border-6'>
            <th className='w-10 z-0'></th>
            <th
              className='w-20 cursor-pointer'
              onClick={() =>
                setFilter((prev) => (prev === '' ? 'reverse' : ''))
              }
            >
              <span className='flex items-center'>
                Material{' '}
                <img
                  style={{
                    filter:
                      'invert(100%) sepia(94%) saturate(0%) hue-rotate(248deg) brightness(106%) contrast(106%)',
                  }}
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
              <span className='flex items-center'>
                Gasto{' '}
                <img
                  style={{
                    filter:
                      'invert(100%) sepia(94%) saturate(0%) hue-rotate(248deg) brightness(106%) contrast(106%)',
                  }}
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
