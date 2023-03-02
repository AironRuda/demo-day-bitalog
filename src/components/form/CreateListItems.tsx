import { useField } from 'formik';
import { useRef, useState } from 'react';

interface IAppProps {
  name: string;
}

const CreateListItems: React.FunctionComponent<IAppProps> = ({ name }) => {
  const [{ value }, meta, helpers] = useField(name);
  const [worker, setWorker] = useState('');
  const inputRef = useRef(null);
  return (
    <>
      <div className='btn-group'>
        <input
          type='text'
          className='rounded-l-lg'
          defaultValue={worker}
          onChange={(workerName) => {
            setWorker(workerName.target.value);
          }}
          ref={inputRef}
        />
        <button
          type='button'
          className='btn'
          onClick={() => {
            Array.isArray(value) && helpers.setValue([...value, worker]);
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {Array.isArray(value) &&
          value.map((item) => <li key={item}>{item}</li>)}
      </ul>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

export default CreateListItems;
