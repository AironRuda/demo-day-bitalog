import { useField } from 'formik';
import { useEffect, useState } from 'react';

interface Props {
  defaultPriority?: number;
}

const SelectPriority: React.FunctionComponent<Props> = ({
  defaultPriority,
}) => {
  const [field, meta, helpers] = useField('priority');
  const [priority, setPriority] = useState(defaultPriority ?? 3);

  useEffect(() => {
    helpers.setValue(priority);
  }, [priority]);

  return (
    <>
      <label className='text-slate-600 -mb-4' htmlFor='priority'>Selecciona la prioridad</label>
      <div className='btn-group w-full' id='priority'>
        <input
          type='button'
          value='Baja'
          className={`btn border-primary bg-white hover:text-white hover:border-0 hover:bg-primary text-primary w-1/3 ${
            priority === 1 && 'btn-primary btn-active'
          }`}
          onClick={() => {
            setPriority(1);
          }}
        />
        <input
          type='button'
          value='Media'
          className={`btn border-primary bg-white hover:text-white hover:border-0 hover:bg-primary text-primary w-1/3 ${
            priority === 2 && 'btn-primary btn-active'
          }`}
          onClick={() => setPriority(2)}
        />
        <input
          type='button'
          value='Alta'
          className={`btn border-primary bg-white hover:text-white hover:border-0 hover:bg-primary text-primary w-1/3 ${
            priority === 3 && 'btn-primary btn-active'
          }`}
          onClick={() => setPriority(3)}
        />
      </div>
    </>
  );
};

export default SelectPriority;
