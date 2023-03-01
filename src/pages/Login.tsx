import { Formik, Form } from "formik";
import TextFieldFormik from "../components/form/TextFieldFormik";
import { handleLogin } from "../handlers/loginHandle";
import LoginValues from "../model/login.model";
import { LOGIN_VALIDATION_SCHEMA } from "../utilities/formValidations";

import { useDispatch, useSelector } from "react-redux/es/exports";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchUser, selectUser } from "../context/userSlice";
import { useEffect } from "react";
import { User } from "../model/user.model";

const INITIAL_VALUES: LoginValues = {
  email: "",
  password: "",
};

const Login: React.FunctionComponent = (props) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user.id !== "") navigate("dashboard");
  }, [user]);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={async (values, helpers) => {
        const error = await handleLogin(values);
        if (typeof error === "string") {
          helpers.setStatus(error);
        } else if (error) {
          dispatch(fetchUser(error.user.uid));
        }
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
