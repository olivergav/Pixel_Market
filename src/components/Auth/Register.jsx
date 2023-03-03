import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import { handleDataFromAPI } from '../../helpers/api'
import TitleChangeContext from '../../context/TitleChangeProvider'
import './Register.scss'
import useAuth from '../../hooks/useAuth'

function Register() {
    const { setTitle } = useContext(TitleChangeContext)
    let navigate = useNavigate()
    const { auth } = useAuth()

    useEffect(() => {
        setTitle('Register')
    }, [])

    useEffect(() => {
        if (auth?.accessToken) {
            navigate('/')
        }
    }, [])

    const validate = (values) => {
        const errors = {}
        if (!values.email) {
            errors.email = 'Required'
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address'
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 8) {
            errors.password = 'Must be 8 characters or more'
        }

        if (values.password !== values.repeatPassword) {
            errors.password = 'Passwords are not the same!'
            errors.repeatPassword = 'Passwords are not the same!'
        }
        return errors
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        validate,
        onSubmit: (values) => {
            delete values.repeatPassword
            handleDataFromAPI({
                endpoint: 'users',
                method: 'post',
                body: values,
            }).then((data) => {
                if (data.response === 400) {
                    console.error('User already exist')
                }
                navigate('/login', {
                    replace: false,
                })
            })
        },
    })

    return (
        <>
            <form
                className="register"
                onSubmit={formik.handleSubmit}
                noValidate
            >
                <h1>Register</h1>
                <div className="register__box">
                    <label htmlFor="email" className="register__lbl">
                        E-mail
                    </label>
                    <input
                        data-cy="email"
                        className="register__input"
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? (
                        <div className="register__error">
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>

                <div className="register__box">
                    <label htmlFor="password" className="register__lbl">
                        Password
                    </label>
                    <input
                        data-cy="password"
                        className="register__input"
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? (
                        <div className="register__error">
                            {formik.errors.password}
                        </div>
                    ) : null}
                </div>

                <div className="register__box">
                    <label htmlFor="repeatPassword" className="register__lbl">
                        Repeat password
                    </label>
                    <input
                        data-cy="repeatPassword"
                        className="register__input"
                        id="repeatPassword"
                        name="repeatPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                    />
                    {formik.errors.repeatPassword ? (
                        <div
                            data-cy="validationRepeatPassword"
                            className="register__error"
                        >
                            {formik.errors.repeatPassword}
                        </div>
                    ) : null}
                </div>

                <button data-cy="submit" type="submit">
                    Submit
                </button>
            </form>
        </>
    )
}

export default Register
