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
    <div className='btn-group'>
      <input
        type='button'
        value='1'
        className={`btn ${priority === 1 && 'bg-primary'}`}
        onClick={() => {
          setPriority(1);
        }}
      />
      <input
        type='button'
        value='2'
        className={`btn ${priority === 2 && 'bg-primary'}`}
        onClick={() => setPriority(2)}
      />
      <input
        type='button'
        value='3'
        className={`btn ${priority === 3 && 'bg-primary'}`}
        onClick={() => setPriority(3)}
      />
    </div>
  );
};

export default SelectPriority;
