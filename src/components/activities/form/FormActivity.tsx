import { getDoc } from 'firebase/firestore';
import { Form } from 'formik';
import { useEffect, useState } from 'react';
import { basicInventoryRef } from '../../../firebase/config';
import { Material } from '../../../model/material.model';
import TextFieldFormik from '../../form/TextFieldFormik';
import SelectMaterials from './SelectMaterials';
import SelectPriority from './SelectPriority';

interface IFormProps {
  status: any;
  buttonText: string;
  defaultPriority?: number;
}

const FormActivity: React.FunctionComponent<IFormProps> = ({
  status,
  buttonText,
  defaultPriority,
}) => {
  const [materials, setMaterial] = useState<Material[]>([]);

  useEffect(() => {
    getDoc(basicInventoryRef).then((response) => {
      const materialsData = response.data();
      if (materialsData) setMaterial([...materialsData.materials]);
    });
  }, []);

  return (
    <Form className='h-11/12 md:w-1/3 flex flex-col items-center gap-5 border-2 border-secondary p-10 overflow-auto'>
      <TextFieldFormik
        name='activityName'
        placeholder='Nombre de la actividad'
      />
      <SelectPriority defaultPriority={defaultPriority} />
      <SelectMaterials
        name='materials'
        options={materials}
        placeholder='Seleccione los materiales'
      />
      <button type='submit' className='btn btn-primary text-white w-full'>
        {buttonText}
      </button>
      {!!status && <div>{status}</div>}
    </Form>
  );
};

export default FormActivity;
