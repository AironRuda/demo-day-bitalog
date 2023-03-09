interface Props {
  filter: string;
  setFilter: (filter: string) => void;
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
        className={`${filter === 'new' ? 'text-primary' : 'text-slate-600'}`}
        onClick={() => setFilter('new')}
      >
        Nuevos
      </li>
      <li
        className={`${
          filter === 'pending' ? 'text-primary' : 'text-slate-600'
        }`}
        onClick={() => setFilter('pending')}
      >
        Pendientes
      </li>
      <li
        className={`${filter === 'done' ? 'text-primary' : 'text-slate-600'}`}
        onClick={() => setFilter('done')}
      >
        Completos
      </li>
    </menu>
  );
};

export default Filter;
