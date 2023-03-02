import { useField } from "formik";

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
    <>
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        {...field}
        className="input"
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

export default TextFieldFormik;
