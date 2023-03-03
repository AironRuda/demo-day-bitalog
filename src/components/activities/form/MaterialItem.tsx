import { FieldHelperProps } from 'formik';
import { useEffect, useState } from 'react';
import { Material } from '../../../model/material.model';

interface IMaterialInputProps {
  selectedMaterials: Material[];
  currentMaterial: Material;
  helpers: FieldHelperProps<any>;
  index: number;
}

const MaterialItem: React.FunctionComponent<IMaterialInputProps> = ({
  selectedMaterials,
  currentMaterial,
  helpers,
  index,
}) => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const selected = [...selectedMaterials];
    selected[index].amount = amount;
    helpers.setValue(selectedMaterials);
  }, [amount]);

  return (
    <li>
      <span>{currentMaterial.material}</span>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <span>{currentMaterial.unit}</span>
    </li>
  );
};

export default MaterialItem;
