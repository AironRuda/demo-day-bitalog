import { filterProjects } from '../../../model/projects.model';

interface Props {
  filter: string;
  setFilter: (filter: filterProjects) => void;
}

const Filter: React.FunctionComponent<Props> = ({ filter, setFilter }) => {
  return (
    <menu className='flex md:gap-10 gap-3 [&>*]:md:text-2xl [&>*]:font-bold cursor-pointer hover:[&>*]:text-primary'>
      <li
        className={`${filter === '' ? 'text-primary' : 'text-slate-600'}`}
        onClick={() => setFilter('')}
      >
        Todos
      </li>
      <li
        className={`${filter === 'new' ? 'text-primary' : 'text-slate-600'} border-b-4 border-primary`}
        onClick={() => setFilter('new')}
      >
        Nuevos
      </li>
      <li
        className={`${
          filter === 'pending' ? 'text-primary' : 'text-slate-600'
        } border-b-4 border-[#3A80BF]`}
        onClick={() => setFilter('pending')}
      >
        Pendientes
      </li>
      <li
        className={`${filter === 'done' ? 'text-primary' : 'text-slate-600'} border-b-4 border-slate-300`}
        onClick={() => setFilter('done')}
      >
        Completos
      </li>
    </menu>
  );
};

export default Filter;
