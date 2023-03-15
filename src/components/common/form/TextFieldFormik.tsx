import { useField } from 'formik';

interface IAppProps {
  placeholder: string;
  name: string;
  type?: string;
}

const TextFieldFormik: React.FunctionComponent<IAppProps> = ({
  name,
  placeholder,
  type,
}) => {
  const [field, meta] = useField(name);
  return (
    <div className='w-full'>
      <input
        role='textbox'
        type={type ?? 'text'}
        placeholder={placeholder}
        {...field}
        className='input input-primary w-full bg-white text-slate-600'
        autoComplete='on'
      />
      {meta.touched && meta.error ? (
        <div className='text-red-500 pl-2'>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextFieldFormik;
