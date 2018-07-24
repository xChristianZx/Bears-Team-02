import axios from 'axios';
import history from '../hoc/history';

import { SIGN_UP, LOG_IN, USER_DASHBOARD, LOGGED_OUT, GET_USERS, FLASH_MESSAGE, GET_CONNECTIONS } from './types';
import chalk from '../../../node_modules/chalk';

const ROOT_URL = 'http://localhost:5000';

export function signUp({ firstName, lastName, username, email, password }) {
	return dispatch => {
		axios
			.post(`${ROOT_URL}/auth/register`, { firstName, lastName, username, email, password })
			.then(response => {
				if (response.status === 200) {
					localStorage.setItem('token', response.data.token);
					dispatch({ type: SIGN_UP, payload: response.data });
					console.log(chalk.red(response.data))
					dispatch({ type: FLASH_MESSAGE, payload: response.data.message })
					history.push('/');
				} else {
					console.log('DATA', response.data)
					// dispatch({ type: ERROR, payload: response.data.message });
					dispatch({ type: FLASH_MESSAGE, payload: response.data.message })
					history.push('/signup');
				}
			})
			.catch(error => {
				console.log('DATA2', error.response.data)
				dispatch({ type: FLASH_MESSAGE, payload: error.response.data.message })
				history.push('/signup');
			});
	};
}

export function login({ username, password }) {
	return dispatch => {
		axios
			.post(`${ROOT_URL}/auth/login`, { username, password })
			.then(response => {
				if (response.status === 200) {
					localStorage.setItem('token', response.data.token);
					dispatch({ type: LOG_IN, payload: response.data });
					dispatch({ type: FLASH_MESSAGE, payload: response.data.message })
					history.push('/dashboard');
				}
			})
			.catch(error => {
				const err = 'Username or Password incorrect';
				dispatch({ type: FLASH_MESSAGE, payload: err })
				history.push('/login');
			});
	};
}

export function dashboard() {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.get(`${ROOT_URL}/auth/dashboard`, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
			console.log('dispatch', response.data)

			dispatch({ type: USER_DASHBOARD, payload: response.data });
		});
	};
}

export function logout() {
	return dispatch => {
		localStorage.removeItem('token');
		dispatch({ type: LOGGED_OUT })
		dispatch({ type: FLASH_MESSAGE, payload: 'Successfully Logged Out' })
		history.push('/');
	};
}

export function getUsers() {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.get(`${ROOT_URL}/founders`, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
			dispatch({ type: GET_USERS, payload: response.data })
		}).catch(error => {
			console.log('error', error)
		})
	};
}

export function getConnections() {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.get(`${ROOT_URL}/founders/`, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
			dispatch({ type: GET_USERS, payload: response.data })
		}).catch(error => {
				// TODO! Improve errors here. See what is returned from server and use action type ERROR.
		})
	}
}

export function toggleTechnical(isTechnical) {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.get(`${ROOT_URL}/auth/istechnical`, { headers: { Authorization: `Bearer ${token}`} }).then(response => {
			dispatch({ type: USER_DASHBOARD, payload: response.data });
		}).catch(error => {
			console.log('toggleTechnical:error', error) // TODO ERRORS
		})
	}
}

export function addConnection(requestedUser) {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.post(`${ROOT_URL}/auth/addconnection`, { requestedUser }, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
			console.log('AddConnection', response)
			dispatch({ type: FLASH_MESSAGE, payload: 'Connected Added - first/last name' })
		})
	}
}

export function getPendingConnections() {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.get(`${ROOT_URL}/auth/pendingconnections`, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
			console.log('pendingConnections', response.data.pendingRequests) 
			dispatch({ type: GET_CONNECTIONS, payload: response.data })
			// dispatch({ type: FLASH_MESSAGE, payload: 'Connected Added - first/last name' })
		})
	}
}
