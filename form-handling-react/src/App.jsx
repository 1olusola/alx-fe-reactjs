import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>React Form Handling Demo</h1>
      
      <div style={{ display: 'flex', gap: '50px', justifyContent: 'center' }}>
        <div>
          <h2>Controlled Components Form</h2>
          <RegistrationForm />
        </div>
        
        <div>
          <h2>Formik Form</h2>
          <FormikForm />
        </div>
      </div>
    </div>
  );
}

export default App;
