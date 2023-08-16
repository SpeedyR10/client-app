import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import styles from './OrderDetails.module.css'
import { Formik } from 'formik'

export default function OrderDetails() {
  return (
    <Box className={styles.container}>
      <Formik
        initialValues={{
          address: '',
          postalCode1: '',
          postalCode2: '',
          city: '',
        }}
        >
        <Grid container spacing={2}>
          <Grid item xs={6} className={styles.addressContainer}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label>A</label>
                </Grid>
              </Grid>
          </Grid>
          <Grid item xs={6}>
              <label>B</label>
          </Grid>
        </Grid>
      </Formik>
    </Box>
  )
}
