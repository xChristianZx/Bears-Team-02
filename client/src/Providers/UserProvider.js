import React, { createContext, Component } from 'react';
import Axios from 'axios';

const UserContext = createContext();
const ROOT_URL = 'http://localhost:5000';

class UserProvider extends Component {
	state = {
		register: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
		},
		error: '',
		errors: {},
		token: null,
		currentUser: '',
		currentTechnical: null,
		isLoggedIn: false,
	};

	handleChange = e => {
		let state = this.state;
		let name = e.target.name;
		state.register[name] = e.target.value;
		if (state.register[name] < 1) {
			state.errors[name] = 'field is required';
		} else {
			state.errors[name] = '';
		}
		this.setState({ state });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { firstName, lastName, username, email, password } = this.state.register;
		Axios.post(`${ROOT_URL}/auth/register`, { firstName, lastName, username, email, password })
			.then(res => {
				console.log('UserProvider[handleSubmit axios.post] - res.data', res.data);
				// const { firstName, isTechnical } = res.data.user;
				this.setState({
					//  Hashed password is returned with User. Fix this on server.
					currentUser: res.data.user,
					token: res.data.token,
					// currentTechnical: isTechnical,
					currentTechnical: false,
					isLoggedIn: true,
				});
			})
			.catch(err => {
				let msg = err.response.data.message;
				console.log('err.msg', msg);
				this.setState({
					error: msg,
				});
			});
	};

	render() {
		return (
			<UserContext.Provider
				value={{
					state: this.state,
					isLoggedIn: this.state.isLoggedIn,
					handleChange: this.handleChange,
					handleSubmit: this.handleSubmit,
				}}
			>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
