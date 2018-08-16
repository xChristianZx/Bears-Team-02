import React, { Component } from "react";
import { reduxForm, Form, Field } from "redux-form";
import { connect } from "react-redux";
/* 
  * CURRENTLY INACTIVE - SAVING FOR FUTURE REFACTOR 
*/
class ProfileForm extends Component {
  handleSubmit = (e, values) => {
    e.preventDefault();
    console.log("VALUES", values);
  };

  render() {
    const { profileInfo, initialValues, onSubmitProfile } = this.props;
    // console.log("PROFILEINFO", profileInfo);
    console.log("PROPS", this.props);
    return (
      <div className="container">
        <Form onSubmit={e => onSubmitProfile(e)}>
          <h1 className="title">Update Profile</h1>
          {/* Headline */}
          <div className="field">
            <label className="label">Headline</label>
            <div className="control">
              <Field
                className="textarea"
                name="profileInfo.headline"
                type="textarea"
                component="textarea"
              />
            </div>
          </div>
          <div className="field">
            {/* Current Role */}
            <label className="label">Current Role</label>
            <div className="control">
              <Field
                className="input"
                name="profileInfo.currentRole"
                type="input"
                component="input"
              />
            </div>
          </div>
          <div className="field">
            {/* Sector Experience */}
            <label className="label">Sector Experience</label>
            <div className="control">
              <Field
                className="input"
                name="profileInfo.sectorExperience"
                type="input"
                component="input"
              />
            </div>
          </div>
          <div className="field">
            {/* Looking For */}
            <label className="label">Looking For...</label>
            <div className="control">
              <Field
                className="input"
                name="profileInfo.lookingFor"
                type="input"
                component="input"
              />
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
