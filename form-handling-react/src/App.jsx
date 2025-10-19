import RegistrationForm from "./components/RegistrationForm";
import FormikForm      from "./components/formikForm";

function App() {
  return (
    <>
      <h2>Controlled Component</h2>
      <RegistrationForm />
      <hr />
      <h2>Formik Component</h2>
      <FormikForm />
    </>
  );
}
export default App;
