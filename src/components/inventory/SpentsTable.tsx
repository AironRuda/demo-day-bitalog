import { Material } from '../../model/material.model';
import Spent from './Spent';

interface Props {
  inventory: Material[];
}

const SpentsTable: React.FunctionComponent<Props> = ({ inventory }) => {
  return (
    <div className='lg:w-1/2 w-screen h-full'>
      <table className='table table-compact mx-auto h-full'>
        <thead>
          <tr className='[&>*]:bg-primary [&>*]:text-white border-6'>
            <th className='w-10 z-0'></th>
            <th className='w-20 '>Material</th>
            <th className='w-10 '>Gasto</th>
            <th className='w-10 '>Unidad</th>
          </tr>
        </thead>
        <tbody>
          {inventory
            .sort((a, b) => {
              if (a.material > b.material) return 1;
              if (a.material < b.material) return -1;
              else return 0;
            })
            .map((spent, index) => (
              <Spent key={index} spent={spent} id={index} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpentsTable;
