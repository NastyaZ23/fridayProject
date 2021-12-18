import React from 'react';
import SuperButton from "../TestComponents/components/c2-SuperButton/SuperButton";
import {useFormik} from "formik";
import SuperCheckbox from "../TestComponents/components/c3-SuperCheckbox/SuperCheckbox";
import Preloader from "../../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../store/store";
import {RequestStatusType} from "../../store/reducers/app-reducer";
import {loginTC} from "../../store/reducers/login-reducer";
import {Navigate, NavLink} from 'react-router-dom';
import styles from './Login.module.scss'
import {UniversalInput} from "../../common/components/Input/UniversalInput";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {

    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            }
            if (!values.password) {
                errors.password = "Required";
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()

        },
    })

    let status = useSelector<RootReducerType, RequestStatusType>(state => state.app.status)
    let isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)
    if (isLoggedIn) {
        return <Navigate to='/'/>
    }

    return (
        <div className={styles.wrapper}>
            {status === 'loading' && <Preloader/>}
            <h2>Welcome</h2>

            <form className={styles.form} onSubmit={(e) => {
                formik.handleSubmit(e)
            }}>
                <div className={styles.inputsWrapper}>
                    <UniversalInput validationErr={(formik.touched.email && formik.errors.email) || ''}
                                    formikProps={formik.getFieldProps('email')}/>
                    <UniversalInput validationErr={(formik.touched.password && formik.errors.password) || ''}
                                    formikProps={formik.getFieldProps('password')} type='password'
                                    isPassword={true}/>

                   {/* <div className={styles.inputWrapper}>
                        <SuperInputText
                            className={formik.touched.password &&formik.errors.password? styles.errInput :''}
                                        placeholder={(formik.touched.password && formik.errors.password) || 'Password'}
                                        type={passwordShown ? 'text' : 'password'} {...formik.getFieldProps('password')} />
                        <span className={styles.togglePassBtn} onClick={toggleShowPassword}></span>
                    </div>*/}
                </div>


                <div className={styles.row}>
                    <SuperCheckbox checked={formik.values.rememberMe}
                                   {...formik.getFieldProps('rememberMe')}>Remember Me</SuperCheckbox>
                    <NavLink to='/password-recovery'>Lost Password?</NavLink>
                </div>
                <SuperButton className={styles.submitBtn} type="submit">Login</SuperButton>
            </form>

            <NavLink className={styles.registerLink} to='/registration'>Register</NavLink>
        </div>
    )
}