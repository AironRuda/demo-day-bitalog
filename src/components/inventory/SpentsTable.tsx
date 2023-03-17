import { useState } from 'react';
import { InventoryFilter } from '../../model/inventory.model';
import { Material } from '../../model/material.model';
import { formatSpentsList } from '../../utilities/formatInventory';
import Spent from './Spent';
import SpentsHeader from './SpentsHeader';

interface Props {
  inventory: Material[];
}

const SpentsTable: React.FunctionComponent<Props> = ({ inventory }) => {
  const [filter, setFilter] = useState<InventoryFilter>('');

  function handleFilter(filterBySpent: boolean) {
    setFilter((prev) =>
      filterBySpent
        ? prev === ''
          ? 'reverse'
          : ''
        : prev === 'max'
        ? 'min'
        : 'max'
    );
  }

  return (
    <div className='lg:w-2/3 w-screen h-full'>
      <table className='table table-compact lg:w-4/5 w-11/12 mx-auto h-full'>
        <SpentsHeader filter={filter} handleFilter={handleFilter} />
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
