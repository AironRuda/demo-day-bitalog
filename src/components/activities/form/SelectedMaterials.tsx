import { FieldHelperProps, FieldMetaProps } from 'formik';
import { Material } from '../../../model/material.model';
import MaterialItem from './MaterialItem';

interface Props {
  selectedMaterials: Material[];
  helpers: FieldHelperProps<any>;
  meta: FieldMetaProps<any>;
}

const SelectedMaterials: React.FunctionComponent<Props> = ({
  selectedMaterials,
  helpers,
  meta,
}) => {
  return (
    <ul className='h-30 my-5 overflow-auto'>
      {selectedMaterials?.map((material, index) => (
        <div className='mb-5 border-b-2 pb-2 border-slate-100' key={index}>
          <MaterialItem
            index={index}
            currentMaterial={material}
            helpers={helpers}
            selectedMaterials={selectedMaterials}
          />
          {meta.touched &&
          meta.error &&
          Array.isArray(meta.error) &&
          meta.error.length ? (
            <div className='text-red-500 pl-2'>
              {meta.error[index]?.amount ?? null}
            </div>
          ) : null}
        </div>
      ))}
    </ul>
  );
};

export default SelectedMaterials;
