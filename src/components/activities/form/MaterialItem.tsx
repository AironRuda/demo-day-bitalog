import { FieldHelperProps } from 'formik';
import { useEffect, useRef, useState } from 'react';
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
  const [amount, setAmount] = useState(currentMaterial.amount || 0);

  useEffect(() => {
    const selected = selectedMaterials.map((material) => {
      return {
        material: material.material,
        amount: material.amount,
        unit: material.unit,
      };
    });
    selected[index].amount = amount;
    helpers.setValue(selected);
  }, [amount]);

  function deleteMaterial() {
    helpers.setValue(
      selectedMaterials.filter(
        (item) => item.material !== currentMaterial.material
      )
    );
  }

  return (
    <li>
      <span>{currentMaterial.material}</span>
      <input
        type='number'
        value={amount}
        onChange={(e) => {
          setAmount(
            !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : 0
          );
        }}
      />
      <span>{currentMaterial.unit}</span>
      <span onClick={deleteMaterial}>x</span>
    </li>
  );
};

export default MaterialItem;
