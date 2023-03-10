import { getDoc } from 'firebase/firestore';
import { Form } from 'formik';
import { useEffect, useState } from 'react';
import { basicInventoryRef } from '../../../firebase/config';
import { Material } from '../../../model/material.model';
import TextFieldFormik from '../../common/form/TextFieldFormik';
import SelectMaterials from './SelectMaterials';
import SelectPriority from './SelectPriority';
import SelectStatus from './SelectStatus';

interface IFormProps {
  status: any;
  buttonText: string;
  defaultPriority?: number;
  statusField?: boolean;
}

const FormActivity: React.FunctionComponent<IFormProps> = ({
  status,
  buttonText,
  defaultPriority,
  statusField,
}) => {
  const [materials, setMaterial] = useState<Material[]>([]);

  useEffect(() => {
    getDoc(basicInventoryRef).then((response) => {
      const materialsData = response.data();
      if (materialsData) setMaterial([...materialsData.materials]);
    });
  }, []);

  return (
    <Form className='h-11/12 md:w-1/3 w-full flex flex-col items-center gap-5 p-10'>
      <TextFieldFormik
        name='activityName'
        placeholder='Nombre de la actividad'
      />
      {statusField !== undefined && <SelectStatus status={statusField} />}
      <SelectPriority defaultPriority={defaultPriority} />
      <SelectMaterials
        name='materials'
        options={materials}
        placeholder='Seleccione los materiales'
      />
      <button type='submit' className='btn btn-primary text-white w-full'>
        {buttonText}
      </button>
      {!!status && <div className='text-red-500 pl-2'>{status}</div>}
    </Form>
  );
};

export default FormActivity;
