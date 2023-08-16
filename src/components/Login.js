import React, {useEffect} from 'react'
import { Formik, Form, Field } from "formik";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import {TextField, Checkbox} from "formik-mui";
import LoginLogo from '../assets/LoginLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync, resetStatus, userSelector } from '../features/User/userSlice'
import * as Yup from 'yup'


export default function Login(){
    const dispatch = useDispatch();
    const {status, error, authed} = useSelector(userSelector);
    const history = useNavigate();

    useEffect(() => {
        dispatch(resetStatus())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(authed){
            history('/')
        }
    }, [authed, history])

    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Obrigatório'),
        password: Yup.string().required('Obrigatório')
    })

    return(
        <Box className={styles.container}>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    rememberMe: false,
                }}
                validationSchema={loginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    dispatch(loginAsync(values))
                    // alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }}
            >
            {({ submitForm, isSubmitting }) => (
                <Form >
                    <img src={LoginLogo} alt='' width={140}/>
                    <br/>
                    <br/>
                    <Field
                        component={TextField}
                        name="username"
                        type="text"
                        label="Nome de utilizador"
                        fullWidth
                    />
                    <br />
                    <br />
                    <Field
                        component={TextField}
                        type="password"
                        label="Password"
                        name="password"
                        fullWidth
                    />
                    <Field name="rememberMe" type="checkbox" component={Checkbox} className={styles.rememberMeCheckBox}/>
                    <label className={styles.rememberMeLabel}>Lembrar-me?</label>
                    <br />
                    {status === 'loading' && <LinearProgress />}
                    <div className={styles.errorMessage}>
                        { status === 'rejected' && <label>{error}</label>}
                    </div>
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={status === 'loading'}
                        onClick={submitForm}
                        style={{borderRadius : '20px', backgroundColor: 'rgb(45 36 0)'}}
                        fullWidth
                    >
                        Iniciar Sessão
                    </Button>
                    <Link to="/register"><label className={styles.url}>Ainda não tenho conta</label></Link>
                </Form>
            )}
            </Formik>
        </Box>
    )
}