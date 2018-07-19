import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../../actions/UserActions'
import { reduxForm, Field, Form } from 'redux-form';

import FormBuilder from '../../../components/UI/User/FormBuilder';
import Fields from '../../../misc/signUpFields';

const formFieldRender = ({ input, label, type, meta: { touched, error }}) => (
	<div class="field">
		<label class="label">{label}</label>
		<div class="control">
			<input class="input" type={type} { ...input } />
		</div>
		<p class="help is-danger">{touched && ((error && <span>{error}</span> ))}</p>
	</div>
)

let initialValues;

  class Dashboard extends Component {
    componentDidMount(){
      this.props.actions.dashboard()
    }

    onSubmit = values => {
      this.props.actions.updateProfile(values)
    }

    

    render() {
      initialValues = this.props.initialValues
      const fields = Fields.map(field => {
        return (
          <Field
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            component={formFieldRender}
          />
        );
      })
      return (
        <div>
          {fields}
        </div>
      )

      // if (!this.props.user) {
      //   return <div>Loading...</div>
      // }

      // return (
      // <div>
      //   {this.props.user.username}

        
        
      //   <p style={{ color: 'red' }}>{this.props.error ? this.props.error.message : null}</p>
      // </div>
      // )
    }
  }

  const mapStateToProps = (state) => {
    return { user: state.User.user, initialValues: state.User.user }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(Object.assign(userActions), dispatch)
    }
  }

Dashboard = reduxForm({
  form: 'Update'
})(Dashboard)

export default Dashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)