import { useField } from 'formik';
import { useEffect, useState } from 'react';

interface Props {
  status: boolean;
}

const SelectStatus: React.FunctionComponent<Props> = ({ status }) => {
  const [field, meta, helpers] = useField('completed');
  const [completed, setCompleted] = useState(status);

  useEffect(() => {
    helpers.setValue(completed);
  }, [completed]);

  return (
    <>
      <label className='text-slate-600 -mb-4' htmlFor='priority'>
        Selecciona el estado de la tarea
      </label>
      <div className='btn-group w-full' id='priority'>
        <input
          type='button'
          value='Pendiente'
          className={`w-1/2 btn border-primary bg-white hover:text-white hover:border-0 hover:bg-primary text-primary  ${
            !status && 'btn-primary btn-active'
          }`}
          onClick={() => {
            setCompleted(false);
          }}
        />
        <input
          type='button'
          value='Finalizada'
          className={`w-1/2 btn border-primary bg-white hover:text-white hover:border-0 hover:bg-primary text-primary  ${
            status && 'btn-primary btn-active'
          }`}
          onClick={() => setCompleted(true)}
        />
      </div>
    </>
  );
};

export default SelectStatus;
