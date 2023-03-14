import * as yup from 'yup';

const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email('No es un email').required('Campo requerido'),
  password: yup
    .string()
    .min(6, 'contraseña muy corta')
    .required('Campo requerido'),
});

const REGISTER_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email('No es un email').required('Campo requerido'),
  password: yup
    .string()
    .min(6, 'contraseña muy corta')
    .required('Campo requerido'),
  name: yup.string().required('Debe indicar un nombre de usuario'),
  rol: yup.string().required('Debe indicar el rol del usuario'),
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
          .required('Se requiere de una cantidad'),
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
  REGISTER_VALIDATION_SCHEMA,
};
