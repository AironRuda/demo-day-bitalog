import * as yup from 'yup';

const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email('No es un email').required('Campo requerido'),
  password: yup
    .string()
    .min(6, 'contraseña muy corta')
    .required('Campo requerido'),
});

const CREATE_PROJECT_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required('Campo requerido'),
  workers: yup
    .array()
    .min(1, 'Debe haber al menos un encargado')
    .required('Campo requerido'),
});

const ACTIVITY_VALIDATION_SCHEMA = yup.object().shape({
  activityName: yup.string().required('Campo requerido'),
  materials: yup
    .array(
      yup.object({
        unit: yup.string().required(),
        material: yup.string().required(),
        amount: yup
          .number()
          .positive('La cantidad debe ser mayor a cero')
          .required(),
      })
    )
    .min(1, 'Debe haber al menos un material')
    .required('Campo requerido'),
  priority: yup.number().required('Campo requerido'),
});

export {
  LOGIN_VALIDATION_SCHEMA,
  CREATE_PROJECT_VALIDATION_SCHEMA,
  ACTIVITY_VALIDATION_SCHEMA,
};
