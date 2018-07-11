import React from "react";
import Errors from "./Errors";
import "./FormBuilder.css";

const FormBuilder = props => {
  const fields = props.fields.map(field => {
    return (
      <React.Fragment>
        <div className="field">
          <p className="control has-icons-left">
            <label>
              {field.label}:
              <input
                type={field.type}
                name={field.name}
                onChange={props.handleChange}
                value={props.currentState[field.name]}
                className={
                  props.errors[field.name] ? "input is-danger" : "input"
                }
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </label>
          </p>
        </div>
      </React.Fragment>
    );
  });

  return (
    <form className="Form">
      <p className="error">{props.error}</p>

      {fields}
      <Errors errors={props.errors} />

      {/* <button type="submit">{props.buttonText}</button> */}
      <div className="field is-grouped">
        <p className="control">
          <button onClick={props.handleSubmit} className="button is-primary">
            {props.buttonText}
          </button>
        </p>
        <p className="control">
          <button onClick={props.clearForm} className="button is-light">
            Clear
          </button>
        </p>
      </div>
    </form>
  );
};

export default FormBuilder;
