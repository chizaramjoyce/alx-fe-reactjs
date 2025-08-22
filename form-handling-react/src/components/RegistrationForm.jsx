import React, { useState } from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {
  const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
     .min(8, 'Too Short!')
     .required('Required'),
  });

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
      }}
      validationSchema={RegistrationSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field
              type="text"
              id="username"
              name="username"
            />
          </div>
          <ErrorMessage name="username" component="div" className="error" />
          <div>
            <label htmlFor="email">Email:</label>
            <Field
              type="email"
              id="email"
              name="email"
            />
          </div>
          <ErrorMessage name="email" component="div" className="error" />
          <div>
            <label htmlFor="password">Password:</label>
            <Field
              type="password"
              id="password"
              name="password"
            />
          </div>
          <ErrorMessage name="password" component="div" className="error" />
          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;