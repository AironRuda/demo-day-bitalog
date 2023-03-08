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
    <div className='btn-group w-full'>
      <input
        type='button'
        value='1'
        className={`btn border-primary bg-white text-primary w-1/3 ${
          priority === 1 && 'btn-primary btn-active'
        }`}
        onClick={() => {
          setPriority(1);
        }}
      />
      <input
        type='button'
        value='2'
        className={`btn border-primary bg-white text-primary w-1/3 ${
          priority === 2 && 'btn-primary btn-active'
        }`}
        onClick={() => setPriority(2)}
      />
      <input
        type='button'
        value='3'
        className={`btn border-primary bg-white text-primary w-1/3 ${
          priority === 3 && 'btn-primary btn-active'
        }`}
        onClick={() => setPriority(3)}
      />
    </div>
  );
};

export default SelectPriority;
