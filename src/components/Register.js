import React, { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import styles from './Register.module.css'
import { Formik, Form, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { TextField } from "formik-mui";
import Button from '@mui/material/Button';
import { registerAsync, userSelector, uploadPicture, resetStatus, isUsernameUnique, isEmailUnique } from '../features/User/userSlice'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton'
import * as Yup from 'yup'


export default function Register() {
    const dispatch = useDispatch()
    const {authed, status, error} = useSelector(userSelector)
    const inputFile = useRef(null)
    const [image, setImage] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [usernameUnique, setUsernameUnique] = useState(true)
    const [emailUnique, setEmailUnique] = useState(true)
    const history = useNavigate();
    
    useEffect(() => {
        dispatch(resetStatus())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(authed){
            dispatch(uploadPicture(image))
            history('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authed, history])


    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setImage(URL.createObjectURL(file))
        }
    }

    const handlePasswordVisibility = () =>{
        setPasswordVisible(!passwordVisible)
    }

    const registerSchema = Yup.object().shape({
        username: Yup.string()
            .required('Obrigatório')
            .test('checkUsernameUnique', 'Nome de utilizador já existe',
                () => usernameUnique),
        email: Yup.string()
            .required('Obrigatório')
            .email('Email inválido')
            .test('checkEmailUnique', 'Email já existe',
                async (value) => {
                    try{
                        const { payload } = await dispatch(isEmailUnique(value))
                        return payload
                    }
                    catch(e){
                        return false
                    }
                }),
        password: Yup.string().required('Obrigatório').min(8, 'Mínimo 8 caracteres'),
        repeatPassword: Yup.string().required('Obrigatório').oneOf([Yup.ref('password'), null], 'As passwords não são iguais'),
    })

    return (
        <Box className={styles.container}>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    repeatPassword: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneCountryCode: '',
                    phone: '',
                    address: '',
                    postalCode1: '',
                    postalCode2: '',
                    city: '',
                }}
                validationSchema={registerSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(registerAsync(values))
                    setSubmitting(false);
                }}
            >
            {({ submitForm, isSubmitting, validateForm }) => (
                <Form >
                    <div className={styles.avatar}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={ <CameraAltRoundedIcon /> }
                        >
                            <Avatar 
                                sx={{width: '200px', height: '200px', border: '2px solid black'}}
                                src={image}
                                onClick={() => inputFile.current.click()}
                            />
                            <input type='file' id='file' accept='image/jpeg, image/jpg, image/png' ref={inputFile} onChange={handleFileChange} style={{display: 'none'}} />
                        </Badge>
                    </div>
                    <div>
                        <label className={styles.sectionTitle}>Conta</label>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Field 
                                component={TextField}
                                name="username"
                                type="text"
                                label="Nome de utilizador"
                                fullWidth
                                onBlur={async (e) => {
                                    const { payload } = await dispatch(isUsernameUnique(e.target.value))
                                    setUsernameUnique(payload)
                                }}
                            />
                        </Grid>
                        <Grid item xs={9}>
                        </Grid>
                        <Grid item xs={4}>
                            <Field 
                                component={TextField}
                                name="password"
                                type= {passwordVisible ? "text" : "password"}
                                label="Password"
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton onClick={handlePasswordVisibility} edge="end">
                                            {passwordVisible ? <VisibilityOffIcon/> : <VisibilityIcon />}
                                        </IconButton>
                                      </InputAdornment>
                                    )
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={8}>
                        </Grid>
                        <Grid item xs={4}>
                            <Field 
                                component={TextField}
                                name="repeatPassword"
                                label="Repetir password"
                                type="password"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <div style={{ float: 'left' }}>
                        <label className={styles.sectionTitle}>Dados Pessoais</label>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Field
                                component={TextField}
                                name="firstName"
                                type="text"
                                label="Nome"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Field
                                component={TextField}
                                name="lastName"
                                type="text"
                                label="Apelido"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Field
                                component={TextField}
                                name="email"
                                type="text"
                                label="Email"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={5}>
                        </Grid>
                        <Grid item xs={2}>
                            <Field
                                component={TextField}
                                name="phoneCountryCode"
                                type="text"
                                label="Código do país"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Field
                                component={TextField}
                                name="phone"
                                type="text"
                                label="Telefone"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ float: 'left' }}>
                        <label className={styles.section}>Morada</label>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <Field
                                component={TextField}
                                name="street"
                                type="text"
                                label="Rua"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4}> 
                        </Grid>
                        <Grid item xs={1.5}>
                            <Field
                                component={TextField}
                                name="postalCode1"
                                type="text"
                                label="Código Postal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={0.2}>
                            <label className={styles.postalCode}>-</label>
                        </Grid>
                        <Grid item xs={1.2}>
                            <Field
                                component={TextField}
                                name="postalCode2"
                                type="text"
                                label=""
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={3.05}>
                            <Field
                                component={TextField}
                                name="city"
                                type="text"
                                label="Localidade"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <br/>
                    <br/>
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
                        style={{borderRadius : '20px', backgroundColor: '#2d2400'}}
                        className={styles.btnRegister}
                    >
                        Registar
                    </Button>
                </Form>
            )}
            </Formik>
        </Box>
  )
}
