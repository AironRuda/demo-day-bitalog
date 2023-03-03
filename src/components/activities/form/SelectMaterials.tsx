import { useField } from 'formik';
import { Material } from '../../../model/material.model';
import SelectedMaterials from './SelectedMaterials';
interface Props {
  name: string;
  options: Material[];
  placeholder: string;
}
const SelectMaterials: React.FunctionComponent<Props> = ({
  name,
  options,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMaterial = options.find(
      (item: Material) => item.material === e.target.value
    );
    if (
      Array.isArray(field.value) &&
      !field.value.find(
        (item: Material) => item.material === newMaterial?.material
      )
    ) {
      if (!!field.value.length) helpers.setValue([...field.value, newMaterial]);
      else helpers.setValue([newMaterial]);
    }
  };

  return (
    <div>
      <select
        className='select w-full max-w-xs'
        name={field.name}
        onChange={handleChange}
        onClick={() => helpers.setTouched(true)}
      >
        <option value=''>{placeholder}</option>
        {options
          ? options.map((e, index) => (
              <option key={index} value={e.material}>
                {e.material}
              </option>
            ))
          : null}
      </select>
      <SelectedMaterials
        meta={meta}
        helpers={helpers}
        selectedMaterials={field.value}
      />
      {meta.touched && meta.error && typeof meta.error === 'string' ? (
        <div>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectMaterials;
