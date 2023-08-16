import React from 'react'
import {Formik, Form, Field} from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'

export default function AddressForm() {
  return (
    <Formik
        initialValues={{
          addressName: '',
          street: '',
          postalCode1: '',
          postalCode2: '',
          city: '',
        }}
        validationSchema={Yup.object({
            addressName: Yup.string().required('Obrigatório'),
            street: Yup.string().required('Obrigatório'),
            postalCode1: Yup.number().required('Obrigatório'),
            postalCode2: Yup.number().required('Obrigatório'),
            city: Yup.string().required('Obrigatório'),
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
            }, 400)
        }}
    >
        {({ submitForm, isSubmitting }) => (
            <Form >
                <Field
                    component={TextField}
                    name="street"
                    type="text"
                    label="Rua"
                    fullWidth
                />
            </Form>
        )}
    </Formik>
  )
}
