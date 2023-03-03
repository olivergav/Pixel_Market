import { useFormik } from "formik";
import { handleDataFromAPI } from "../../helpers/api";
import { useNavigate } from "react-router-dom";

import "./Register.scss";

function Register() {
  let navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters or more";
    }

    if (values.password !== values.repeatPassword) {
      errors.password = "Passwords are not the same!";
      errors.repeatPassword = "Passwords are not the same!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validate,
    onSubmit: (values) => {
      delete values.repeatPassword;
      handleDataFromAPI({
        endpoint: "users",
        method: "post",
        body: values,
      }).then((data) => {
        navigate("/login", { replace: false });
      });
    },
  });

  return (
    <>
      <form className="login" onSubmit={formik.handleSubmit} noValidate>
        <div className="login__box">
          <label htmlFor="email" className="login__lbl">
            E-mail
          </label>
          <input
            data-cy="email"
            className="login__input"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>

        <div className="login__box">
          <label htmlFor="password" className="login__lbl">
            Password
          </label>
          <input
            data-cy="password"
            className="login__input"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>

        <div className="login__box">
          <label htmlFor="repeatPassword" className="login__lbl">
            Repeat password
          </label>
          <input
            data-cy="repeatPassword"
            className="login__input"
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
          />
          {formik.errors.repeatPassword ? (
            <div data-cy="validationRepeatPassword">
              {formik.errors.repeatPassword}
            </div>
          ) : null}
        </div>

        <button data-cy="submit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Register;
