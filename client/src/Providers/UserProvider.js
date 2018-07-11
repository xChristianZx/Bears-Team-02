import React, { createContext, Component } from 'react';
import Axios from 'axios';
import history from '../hoc/history';

const UserContext = createContext();
const ROOT_URL = 'http://localhost:5000';

class UserProvider extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password: '',
		error: '',
		errors: {},
		token: null,
		currentUser: {},
		currentTechnical: null,
		isLoggedIn: false,
	};

	handleChange = e => {
		let state = this.state;
		let name = e.target.name;
		state[name] = e.target.value;
		if (state[name] < 1) {
			state.errors[name] = 'field is required';
		} else {
			state.errors[name] = '';
		}
		this.setState({ state });
	};

	clearForm = e => {
		console.log('clear');
		e.preventDefault();
		const resetState = {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
		};
		this.setState({ ...resetState });
	};

	handleSignUp = e => {
		e.preventDefault();
		const { firstName, lastName, username, email, password } = this.state;
		Axios.post(`${ROOT_URL}/auth/register`, { firstName, lastName, username, email, password })
			.then(res => {
				console.log('UserProvider[handleSignUp axios.post] - res.data', res.data);
				// const { firstName, isTechnical } = res.data.user;
				this.setState({
					// TODO! Hashed password is returned with User. Fix this on server.
					// TODO this setState is getting a little verbose, look at managing it more succinct.
					firstName: '',
					lastName: '',
					username: '',
					email: '',
					password: '',
					currentUser: res.data.user,
					token: res.data.token,
					// currentTechnical: isTechnical,
					currentTechnical: false,
					isLoggedIn: true,
				});
				history.push('/user');
			})
			.catch(err => {
				let msg = err.response.data.message;
				console.log('err.msg', msg);
				this.setState({
					error: msg,
				});
				history.push('/signup');
			});
	};

	handleLogin = e => {
		e.preventDefault();
		console.log('HANDLE LOGIN');
		const { username, password } = this.state;
		Axios.post(`${ROOT_URL}/auth/login`, { username, password })
			.then(res => {
				this.setState({
					//  Hashed password is returned with User. Fix this on server.
					currentUser: res.data.user,
					token: res.data.token,
					// currentTechnical: isTechnical,
					currentTechnical: false,
					isLoggedIn: true,
					password: '',
				});
				history.push('/user');
			})
			.catch(err => {
				// TODO: Figure out how error messages are returned from server. - See signIn for reference.
				this.setState({
					error: 'Something went wrong',
				});
				history.push('/login');
			});
	};

	handleLogout = () => {
		localStorage.removeItem('token');
		this.setState({ isLoggedIn: false });
	};

	render() {
		return (
			<UserContext.Provider
				value={{
					state: this.state,
					isLoggedIn: this.state.isLoggedIn,
					handleChange: this.handleChange,
					handleSignUp: this.handleSignUp,
					handleLogin: this.handleLogin,
					handleLogout: this.handleLogout,
					clearForm: this.clearForm,
				}}
			>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
