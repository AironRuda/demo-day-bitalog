import { useField } from 'formik';
import { User } from '../../../model/user.model';

interface Props {
  name: string;
  workers: Pick<User, 'name' | 'id'>[];
  placeholder: string;
}
const SelectWorkers: React.FunctionComponent<Props> = ({
  name,
  workers,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  function removeItem(index: number) {
    Array.isArray(field.value) &&
      helpers.setValue(field.value.filter((item, i) => i !== index));
  }

  return (
    <div className='w-full'>
      <select
        role='listbox'
        className='select w-full bg-white border-1 border-primary text-slate-700'
        name={field.name}
        onChange={(e) =>
          Array.isArray(field.value) &&
          !field.value.find((item) => item === e.target.value) &&
          helpers.setValue([...field.value, e.target.value])
        }
        onClick={() => helpers.setTouched(true)}
      >
        <option value=''>{placeholder}</option>
        {workers &&
          workers.map((e, index) => (
            <option key={index} value={e.id} role='item'>
              {e.name}
            </option>
          ))}
      </select>
      {meta.touched && meta.error ? (
        <div className='text-red-500 pl-2'>{meta.error}</div>
      ) : null}
      <ul
        role='list'
        className='my-7 w-11-12 [&>*:nth-child(odd)]:bg-slate-100'
      >
        {Array.isArray(field.value) &&
          field.value.map((item, index) => (
            <li
              key={item}
              className='text-slate-800 w-full flex justify-between items-center px-2 py-2'
            >
              <span className='text-xs'>
                <b className='mr-1'>Nombre: </b>
                {workers.find((worker) => worker.id === item)?.name ?? item}
              </span>
              <span
                onClick={() => removeItem(index)}
                className='text-lg text-red-500 cursor-pointer'
              >
                ❌
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SelectWorkers;
