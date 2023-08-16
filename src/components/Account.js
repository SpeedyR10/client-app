import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import {Formik, Field, Form} from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'
import Grid from '@mui/material/Grid'
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded'
import { useDispatch, useSelector } from 'react-redux'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { getUserDetailsAsync, resetStatus, uploadPicture, userSelector } from '../features/User/userSlice'
import IconButton  from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'
import styles from './Account.module.css'

export default function Account() {

  const dispatch = useDispatch();
  // const history = useNavigate();
  const inputFile = useRef(null)
  const [image, setImage] = useState(null)
  const {status, error, userDetails, username} = useSelector(userSelector);

  useEffect(() => {
    dispatch(resetStatus())
    dispatch(getUserDetailsAsync())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFileChange = (e) => {
      const file = e.target.files[0]
      if(file){
          setImage(URL.createObjectURL(file))
      }
  }

  const accountSchema = Yup.object().shape({
    username: Yup.string().required('Obrigatório'),
    email: Yup.string().required('Obrigatório'),
    phone: Yup.string().required('Obrigatório')
  })

  return (
    <Box className={styles.container}>
        <Formik
            initialValues={{
                username: username,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
                phoneCountryCode: userDetails.phoneCountryCode,
                phone: userDetails.phone,
                street: userDetails.street,
                postalCode1: '',
                postalCode2: '',
                city: userDetails.city,
            }}
            validationSchema={accountSchema}
            onSubmit={(values, { setSubmitting }) => {
                // dispatch(registerAsync(values))
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
                            sx={{width: '150px', height: '150px', border: '2px solid black'}}
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
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{float: 'left'}}>
                          <a href='/passwordreset'>Mudar password?</a>
                        </div>
                    </Grid>
                </Grid>
                <br />
                <br />
                <div style={{ float: 'left' }}>
                    <label className={styles.sectionTitle}>Detalhes do utilizador</label>
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
                            disabled={true}
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
                    Guardar
                </Button>
            </Form>
        )}
        </Formik>
    </Box>
)
}
