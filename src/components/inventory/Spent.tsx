import { Material } from '../../model/material.model';

interface SpentProps {
  spent: Material;
  id: number;
}

const Spent: React.FunctionComponent<SpentProps> = ({ spent, id }) => {
  return (
    <tr
      className={`[&>*]:bg-slate-100 [&>*]:text-black [&>*]:border-b-2 [&>*]:border-white`}
    >
      <th>{id + 1}</th>
      <td>{spent.material}</td>
      <td>{spent.amount}</td>
      <td className='text-center'>{spent.unit}</td>
    </tr>
  );
};

export default Spent;
