import { FieldHelperProps } from 'formik';
import { Material } from '../../../model/material.model';
import MaterialItem from './MaterialItem';

interface Props {
  selectedMaterials: Material[];
  helpers: FieldHelperProps<any>;
}

const SelectedMaterials: React.FunctionComponent<Props> = ({
  selectedMaterials,
  helpers,
}) => {
  return (
    <ul>
      {selectedMaterials.map((material, index) => (
        <MaterialItem
          key={index}
          index={index}
          currentMaterial={material}
          helpers={helpers}
          selectedMaterials={selectedMaterials}
        />
      ))}
    </ul>
  );
};

export default SelectedMaterials;
