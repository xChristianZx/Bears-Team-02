import React from "react";
import "../FormBuilder.css";
import { reduxForm, Field, Form } from "redux-form";
import formFieldRender from "../formFieldRender";
import { Link } from "react-router-dom";

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
    <div className="columns is-mobile">
      <div className="column">
        <Form className="Form box" onSubmit={handleSubmit}>
          <h1 className="title">Update Information</h1>
          <hr />
          {fields}
          <div className="level">
            {/* May need to readress this if it is the best way to handle Bulma styling for button group - Mix of level and is-pulls */}
            {/* <div className="level-left"> */}
            <div className="field is-grouped is-pulled-left">
              <div className="control">
                <button
                  className="button is-success"
                  type="submit"
                  disabled={pristine || submitting}
                >
                  Update User Info
                </button>
              </div>
              <div className="control">
                <button
                  className="button"
                  type="reset"
                  onClick={reset}
                  disabled={pristine || submitting}
                >
                  Reset Form
                </button>
              </div>
            </div>
            {/* </div> */}
            {/* <div className="level-right"> */}
            <div className="control is-pulled-right">
              <button className="button is-small is-text " onClick={closeForm}>
                Back
              </button>
            </div>
          </div>
          {/* </div> */}
          {props.errors}
        </Form>
        <div className="Form">
          <div className="box">
            <h5 className="title is-5">Delete your Account</h5>
            <h5 className="subtitle is-6">(Are you sure you want to this?)</h5>
            <Link to="/delete" className="button is-danger">
              Delete Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "update"
  //   validate
})(UpdateFormBuilder);

// TODO - update validation function to handle current fields
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
