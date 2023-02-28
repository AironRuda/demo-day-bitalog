import * as yup from "yup"

const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
    email: yup.string().email("No es un email").required("Campo requerido"),
    password: yup.string().min(6, "contraseña muy corta").required("Campo requerido")
})

export { LOGIN_VALIDATION_SCHEMA }