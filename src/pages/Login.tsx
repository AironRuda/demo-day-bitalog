import { Formik, Form } from "formik";
import * as React from "react";
import TextFieldFormik from "../components/form/TextFieldFormik";
import { handleLogin } from "../handlers/loginHandle";
import LoginValues from "../model/login.model";
import { LOGIN_VALIDATION_SCHEMA } from "../utilities/formValidations";

const INITIAL_VALUES: LoginValues = {
  email: "",
  password: "",
};

const Login: React.FunctionComponent = (props) => {
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={async (values, helpers) => {
        const error = await handleLogin(values);
        error ? helpers.setStatus(error) : helpers.resetForm();
      }}
      validationSchema={LOGIN_VALIDATION_SCHEMA}
    >
      {({ status }) => (
        <Form>
          <TextFieldFormik name="email" placeholder="Email" type="email" />
          <TextFieldFormik
            name="password"
            placeholder="Password"
            type="password"
          />

          <button type="submit">Login</button>
          {!!status && <div>{status}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default Login;
