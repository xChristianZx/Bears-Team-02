import axios from 'axios';
import history from '../hoc/history';

import { SIGN_UP, LOG_IN, USER_DASHBOARD, LOGGED_OUT, FLASH_MESSAGE } from './types';

export function signUp({ firstName, lastName, username, email, password }) {
	return dispatch => {
		axios
			.post(`/auth/register`, { firstName, lastName, username, email, password })
			.then(response => {
				if (response.status === 200) {
					localStorage.setItem('token', response.data.token);
					dispatch({ type: SIGN_UP, payload: response.data });
					dispatch({ type: FLASH_MESSAGE, payload: response.data.message })
					history.push('/');
				} else {
					// dispatch({ type: ERROR, payload: response.data.message });
					dispatch({ type: FLASH_MESSAGE, payload: response.data.message })
					history.push('/signup');
				}
			})
			.catch(error => {
				dispatch({ type: FLASH_MESSAGE, payload: error.response.data.message })
				history.push('/signup');
			});
	};
}

export function updateUser(update) {
	console.log("updateUser Action Creator",update)
	// return dispatch => {
	// 	axios
	// 		.post(`${ROOT_URL}/auth/register`, { firstName, lastName, username, email, password })
	// 		.then(response => {
	// 			if (response.status === 200) {
	// 				localStorage.setItem('token', response.data.token);
	// 				dispatch({ type: SIGN_UP, payload: response.data });
	// 				dispatch({ type: FLASH_MESSAGE, payload: response.data.message })
	// 				history.push('/');
	// 			} else {
	// 				// dispatch({ type: ERROR, payload: response.data.message });
	// 				dispatch({ type: FLASH_MESSAGE, payload: response.data.message })
	// 				history.push('/signup');
	// 			}
	// 		})
	// 		.catch(error => {
	// 			dispatch({ type: FLASH_MESSAGE, payload: error.response.data.message })
	// 			history.push('/signup');
	// 		});
	// };
}

export function login({ username, password }) {
	return dispatch => {
		axios
			.post(`/auth/login`, { username, password })
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
		axios.get(`/auth/dashboard`, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
			console.log('DATA', response.data)
			dispatch({ type: USER_DASHBOARD, payload: response.data });
		}).catch(error => {
			dispatch({ type: USER_DASHBOARD, payload: 'Failed to load Dashboard'})
	})
	};
}

export function logout() {
	return dispatch => {
		localStorage.removeItem('token');
		dispatch({ type: LOGGED_OUT })
		history.push('/');
	};
}

export function toggleTechnical() {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.get(`/auth/istechnical`, { headers: { Authorization: `Bearer ${token}`} }).then(response => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Successfully updated'})
			dispatch({ type: USER_DASHBOARD, payload: response.data });
		}).catch(error => {
				dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again.'})
		})
	}
}

