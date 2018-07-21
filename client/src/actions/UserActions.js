import axios from 'axios';
import history from '../hoc/history';

import { SIGN_UP, LOG_IN, USER_DASHBOARD, LOGGED_OUT, ERROR, GET_USERS } from './types';

const ROOT_URL = 'http://localhost:5000';

export function signUp({ firstName, lastName, username, email, password }) {
	return dispatch => {
		axios
			.post(`${ROOT_URL}/auth/register`, { firstName, lastName, username, email, password })
			.then(response => {
				if (response.status === 200) {
					localStorage.setItem('token', response.data.token);
					dispatch({ type: SIGN_UP, payload: response.data });
					history.push('/');
				} else {
					dispatch({ type: ERROR, payload: response.message });
					history.push('/signup');
				}
			})
			.catch(error => {
				dispatch({ type: ERROR, payload: error.response.data });
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
					history.push('/dashboard');
				}
			})
			.catch(error => {
				// TODO Improve error handling from server. Similar to signUp
				const err = 'Username or Password incorrect';
				dispatch({ type: ERROR, payload: err });
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
		dispatch({ type: LOGGED_OUT });
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
