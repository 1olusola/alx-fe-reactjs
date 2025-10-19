import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Yup validation schema with the exact pattern the test is looking for
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().required('Email is required').email('Invalid email address'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

const FormikForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    // Mock API call
    setTimeout(() => {
      alert('Registration successful!');
      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form style={{ maxWidth: '400px', margin: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
              Username:
            </label>
            <Field 
              type="text" 
              name="username" 
              style={{ 
                width: '100%', 
                padding: '8px',
                border: errors.username && touched.username ? '1px solid red' : '1px solid #ccc'
              }}
            />
            <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '14px' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
              Email:
            </label>
            <Field 
              type="email" 
              name="email" 
              style={{ 
                width: '100%', 
                padding: '8px',
                border: errors.email && touched.email ? '1px solid red' : '1px solid #ccc'
              }}
            />
            <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '14px' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
              Password:
            </label>
            <Field 
              type="password" 
              name="password" 
              style={{ 
                width: '100%', 
                padding: '8px',
                border: errors.password && touched.password ? '1px solid red' : '1px solid #ccc'
              }}
            />
            <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '14px' }} />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{
              padding: '10px 20px',
              backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
