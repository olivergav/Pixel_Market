import React, {useContext, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useFormik} from "formik";

import AuthContext from "../../context/AuthProvider";
import TitleChangeContext from "../../context/TItleChangeProvider";
import axios from "../../api/axios";
import "./Login.scss";

const LOGIN_URL = "/login";

export default function Login() {
    const {setAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const {setTitle} = useContext(TitleChangeContext);

    useEffect(() => {
      setTitle('Login')
    }, []);

    const from = location.state?.from?.pathname || "/";

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },
        onSubmit: async (values) => {
            try {
                const response = await axios.post(LOGIN_URL, JSON.stringify(values));
                const accessToken = response?.data?.accessToken;

                setAuth({accessToken});
                navigate(from, {replace: true});
            } catch (error) {
                if (!error?.response) {
                    console.error("No server response");
                } else if (error.response?.status === 400) {
                    console.error("Cannot find user");
                } else if (error.response?.status === 401) {
                    console.error("Unauthorized");
                } else {
                    console.error("Login failed");
                }
            }
        },
    });

    return (
        <form className="login" onSubmit={formik.handleSubmit}>
            <h1>Login</h1>
            <div className="login__box">
                <label className="login__lbl" htmlFor="email">
                    Email Address:
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
            </div>
            <div className="login__box">
                <label className="login__lbl" htmlFor="password">
                    Password:
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
            </div>
            <div className="login__box login__box--inline">
                <input
                    data-cy="remember"
                    className="login__input"
                    id="remember"
                    name="remember"
                    type="checkbox"
                    onChange={formik.handleChange}
                    value={formik.values.remember}
                />
                <label className="login__lbl" htmlFor="remember">
                    Remember me
                </label>
            </div>

            <button data-cy="submit" type="submit">
                Login
            </button>
        </form>
    );
}
