import { FieldHelperProps, FieldMetaProps } from 'formik';
import { useEffect } from 'react';
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
    <ul>
      {selectedMaterials.map((material, index) => (
        <div key={index}>
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
            <div>{meta.error[index]?.amount ?? null}</div>
          ) : null}
        </div>
      ))}
    </ul>
  );
};

export default SelectedMaterials;
