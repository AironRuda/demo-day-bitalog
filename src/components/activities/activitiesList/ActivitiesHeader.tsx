interface Props {
  filter: boolean;
  handleFilter: () => void;
}

const ActivitiesHeader: React.FunctionComponent<Props> = ({
  filter,
  handleFilter,
}) => {
  return (
    <thead>
      <tr className='[&>*]:bg-primary [&>*]:text-white border-6'>
        <th className='md:pl-5 pl-2 cursor-pointer' onClick={handleFilter}>
          {filter ? '❕' : '✔️'}
        </th>
        <th className=''>Actividad</th>
        <th className='text-center'>
          <span className='md:hidden block'>Pr</span>
          <span className='md:block hidden'>Prioridad</span>
        </th>
        <th>Materiales</th>
        <th className='text-center'>
          <span className='md:hidden block'>Act</span>
          <span className='md:block hidden'>Acciones</span>
        </th>
      </tr>
    </thead>
  );
};

export default ActivitiesHeader;
