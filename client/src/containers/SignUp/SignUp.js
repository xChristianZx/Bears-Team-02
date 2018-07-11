import React, { Component } from 'react';
import { UserConsumer, UserProvider } from '../../Providers/UserProvider';
import './SignUp.css';
import FormBuilder from '../../components/UI/FormBuilder';

// TODO: clear the context for inputs on load, so they don't persist.
const fields = [
	{ label: 'First Name', name: 'firstName', type: 'text' },
	{ label: 'Last Name', name: 'lastName', type: 'text' },
	{ label: 'Username', name: 'username', type: 'text' },
	{ label: 'Email', name: 'email', type: 'text' },
	{ label: 'Password', name: 'password', type: 'password' },
];
 
class SignUp extends Component {
	render() {
		return (
			<div>
				<h1>Sign Up</h1>
				<UserConsumer>
					{context => (
							<FormBuilder
								fields={fields}
                handleChange={context.handleChange}
                handleSubmit={context.handleSignUp}
								currentState={context.state}
								clearForm={context.clearForm}
								errors={context.state.errors}
								error={context.state.error}
								buttonText="Sign Up"
							/>
					)}
				</UserConsumer>
			</div>
		);
	}
}

export default SignUp;
