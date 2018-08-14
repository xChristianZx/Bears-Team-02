import React, { Component } from "react";
import { reduxForm, Form, Field } from "redux-form";

class ProfileForm extends Component {
  handleSubmit = values => {
    console.log("VALUES", values);
  };

  render() {
    const { profileInfo } = this.props;
    console.log("PROFILEINFO", profileInfo);

    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <h1 className="title">Update Profile</h1>
          {/* Headline */}
          <div className="field">
            <label className="label">Headline</label>
            <div className="control">
              <Field className="textarea" name="headline" type="textarea" component="textarea" />
            </div>
          </div>
          <div className="field">
            {/* Current Role */}
            <label className="label">Current Role</label>
            <div className="control">
              <Field className="input" name="currentRole" type="input" component="input" />
            </div>
          </div>
          <div className="field">
            {/* Sector Experience */}
            <label className="label">Sector Experience</label>
            <div className="control">
              <Field className="input" name="sectorExperience" type="input" component="input" />
            </div>
          </div>
          <div className="field">
            {/* Looking For */}
            <label className="label">Looking For...</label>
            <div className="control">
              <Field className="input" name="lookingFor" type="input" component="input" />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                Submit
              </button>
            </div>
            <div className="control">
              <button className="button is-text">Cancel</button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: "profile" })(ProfileForm);

// Short Bio/ Background/ Experience - 300 words - text input (Headline)

// Current Title/ Role

// Sector Experience

// Looking for...

// Prior Startup Experience
