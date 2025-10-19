import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  username: Yup.string().required("Required"),
  email:    Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(4, "Too short").required("Required")
});

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={schema}
      onSubmit={(vals, { resetForm }) => {
        alert("Registered (Formik): " + JSON.stringify(vals, null, 2));
        resetForm();
      }}
    >
      <Form>
        <Field name="username" placeholder="Username" />
        <ErrorMessage name="username" component="div" style={{ color: "red" }} />

        <Field name="email" placeholder="Email" />
        <ErrorMessage name="email" component="div" style={{ color: "red" }} />

        <Field name="password" placeholder="Password" type="password" />
        <ErrorMessage name="password" component="div" style={{ color: "red" }} />

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
