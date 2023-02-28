import { Formik, Form } from "formik";
import * as React from "react";
import TextFieldFormik from "../components/form/TextFieldFormik";
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
      onSubmit={() => {}}
      validationSchema={LOGIN_VALIDATION_SCHEMA}
    >
      <Form>
        <TextFieldFormik name="email" placeholder="Email" type="email" />
        <TextFieldFormik
          name="password"
          placeholder="Password"
          type="password"
        />

        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default Login;
