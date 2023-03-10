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
    <li className='flex w-full justify-between'>
      <div className='[&>*]:text-slate-700 flex justify-between items-center w-5/6'>
        <span>{currentMaterial.material}</span>
        <div className='flex gap-2'>
          <input
            className='w-10 border-2 border-primary text-center'
            type='number'
            value={amount}
            onChange={(e) => {
              setAmount(
                !isNaN(parseInt(e.target.value)) ? parseInt(e.target.value) : 0
              );
            }}
          />
          <span>{currentMaterial.unit}</span>
        </div>
      </div>
      <span onClick={deleteMaterial}>❌</span>
    </li>
  );
};

export default MaterialItem;
