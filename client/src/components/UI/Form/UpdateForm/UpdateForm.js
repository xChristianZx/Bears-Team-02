import React from "react";
import "../FormBuilder.css";
import { reduxForm, Field, Form } from "redux-form";
import formFieldRender from "../formFieldRender";

let errorFields = [];

const UpdateFormBuilder = props => {
  const { handleSubmit, closeForm, pristine, reset, submitting } = props;
  const fields = props.fields.map(field => {
    errorFields.push(field);
    return (
      <Field
        key={field.name}
        label={field.label}
        name={field.name}
        type={field.type}
        component={formFieldRender}
      />
    );
  });

  return (
      <Form className="Form" onSubmit={handleSubmit}>
          <h1 className="title">Update Form</h1>
          {fields}
          <div className="level">
              <div className="level-left">
                  <button className="button is-success" type="submit" disabled={pristine || submitting}>
                      Update Profile
        </button>
                  <button className="button is-small" type="reset" onClick={reset} disabled={pristine || submitting}>Reset Form</button>
              </div>
              <div className="level-right">
                  <button className="button is-small is-text is-pulled-right" onClick={closeForm}>Back</button>
              </div>
          </div>
          {props.errors}
      </Form>
  );
};

// const validate = values => {
//   const errors = {};

//   errorFields.map(field => {
//     let thisField = field.name;

//     if (!values[thisField]) {
//       errors[thisField] = field.errorMsg;
//     }
//     if (
//       thisField === "confirmPassword" &&
//       values.confirmPassword !== values.password
//     ) {
//       errors[thisField] = "Passwords do not match";
//     }
//     return errors; //Replacing for now to clear out warning message
//   });
//   return errors;
// };

export default reduxForm({
  form: "update",
//   validate
})(UpdateFormBuilder);
