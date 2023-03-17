import { downArrow, upArrow } from '../../assets/icons';
import { filterWhite } from '../common/customStyles';

interface Props {
  filter: '' | 'reverse' | 'max' | 'min';
  handleFilter: (filterBySpent: boolean) => void;
}

const TableHeader: React.FunctionComponent<Props> = ({
  filter,
  handleFilter,
}) => {
  return (
    <thead>
      <tr className='[&>*]:bg-primary [&>*]:text-white border-6'>
        <th className='w-10 z-0'></th>
        <th
          className='w-20 overflow-hidden cursor-pointer'
          onClick={() => handleFilter(true)}
        >
          <span className='flex items-center'>
            Material{' '}
            <img
              style={filterWhite}
              src={filter === '' ? upArrow : downArrow}
            />
          </span>
        </th>
        <th className='w-10 cursor-pointer' onClick={() => handleFilter(false)}>
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
  );
};

export default TableHeader;
