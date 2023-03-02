import { useField } from "formik";
interface Props {
  name: string;
  options: string[];
  placeholder: string;
}
const SelectFormik: React.FunctionComponent<Props> = ({
  name,
  options,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div>
      <select
        className="select w-full max-w-xs"
        name={field.name}
        onChange={(e) => helpers.setValue([...field.value, e.target.value])}
        onClick={() => helpers.setTouched(true)}
      >
        <option value="">{placeholder}</option>
        {options
          ? options.map((e, index) => (
              <option key={index} value={e}>
                {e}
              </option>
            ))
          : null}
      </select>
      <ul className="badgets d-flex flex-wrap mt-3 gap-2">
        {Array.isArray(field.value) &&
          field.value.map((item) => <li key={item}>{item}</li>)}
      </ul>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

export default SelectFormik;