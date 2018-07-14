// import React, { Component } from 'react';
// import { UserConsumer, UserProvider } from '../../Providers/UserProvider';
// import './SignUp.css';
// import FormBuilder from '../../components/UI/FormBuilder';

// // TODO: clear the context for inputs on load, so they don't persist.
// const fields = [
// 	{ label: 'First Name', name: 'firstName', type: 'text' },
// 	{ label: 'Last Name', name: 'lastName', type: 'text' },
// 	{ label: 'Username', name: 'username', type: 'text' },
// 	{ label: 'Email', name: 'email', type: 'text' },
// 	{ label: 'Password', name: 'password', type: 'password' },
// ];

// class SignUp extends Component {
// 	render() {
// 		return (
// 			<div>
// 				<h1>Sign Up</h1>
// 				<UserConsumer>
// 					{context => (
// 							<FormBuilder
// 								fields={fields}
//                 handleChange={context.handleChange}
//                 handleSubmit={context.handleSignUp}
// 								currentState={context.state}
// 								clearForm={context.clearForm}
// 								errors={context.state.errors}
// 								error={context.state.error}
// 								buttonText="Sign Up"
// 							/>
// 					)}
// 				</UserConsumer>
// 			</div>
// 		);
// 	}
// }

// export default SignUp;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/UserActions';
// import * as errorActions from '../../actions/ErrorActions'

import FormBuilder from '../../components/UI/User/FormBuilder';
import Fields from '../../misc/signUpFields'

class SignUp extends Component {
	onSubmit = values => {
		this.props.actions.signUp(values)
	}

	render() {
		return (
			<div>
				<FormBuilder fields={Fields} onSubmit={this.onSubmit} buttonText='Sign Up' formTitle='Sign Up' />

				<p style={{ color: 'red' }}>{this.props.error}</p>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return { error: state.User.error }
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Object.assign(userActions), dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
