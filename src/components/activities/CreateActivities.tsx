import { doc, getDoc } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { createActivitiesDTO } from '../../model/activity.model';
import { Material } from '../../model/material.model';
import SelectPriority from './form/SelectPriority';
import TextFieldFormik from '../form/TextFieldFormik';
import SelectMaterials from './form/SelectMaterials';
import { CREATE_ACTIVITY_VALIDATION_SCHEMA } from '../../utilities/formValidations';

const INITIAL_VALUES: createActivitiesDTO = {
  activityName: '',
  materials: [],
  priority: 3,
};

const CreateActivities: React.FunctionComponent = (props) => {
  const [materials, setMaterial] = useState<Material[]>([]);
  useEffect(() => {
    getDoc(doc(db, 'inventory', 'basic')).then((response) => {
      const materialsData = response.data() as { materials: Material[] };
      if (materialsData) setMaterial([...materialsData.materials]);
    });
  }, []);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={CREATE_ACTIVITY_VALIDATION_SCHEMA}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <TextFieldFormik
            name='activityName'
            placeholder='Nombre de la actividad'
          ></TextFieldFormik>
          <SelectPriority />
          <SelectMaterials
            name='materials'
            options={materials}
            placeholder='Seleccione los materiales'
          />
          <button type='submit'>Generar tarea</button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateActivities;
