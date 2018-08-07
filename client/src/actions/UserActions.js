import axios from 'axios';
import history from '../hoc/history';

import { SIGN_UP, LOG_IN, USER_DASHBOARD, LOGGED_OUT, GET_USERS, FLASH_MESSAGE, GET_CONNECTIONS, GET_MESSAGES } from './types';

const ROOT_URL = 'http://localhost:5000';

export function signUp({ firstName, lastName, username, email, password }) {
	return dispatch => {
		axios
			.post(`${ROOT_URL}/auth/register`, { firstName, lastName, username, email, password })
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
/* Populates /connect potential Connections list */
export function getUsers(filterParams) {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.get(`${ROOT_URL}/founders`, { params:{ isTechnical : filterParams || "all" }, headers: { Authorization: `Bearer ${token}` } }).then(response => {
			dispatch({ type: GET_USERS, payload: response.data })
		}).catch(error => {
				dispatch({ type: FLASH_MESSAGE, payload: 'Failed to load users'})
		})
	};
}

export function toggleTechnical() {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.get(`${ROOT_URL}/auth/istechnical`, { headers: { Authorization: `Bearer ${token}`} }).then(response => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Successfully updated'})
			dispatch({ type: USER_DASHBOARD, payload: response.data });
		}).catch(error => {
				dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again.'})
		})
	}
}

export function requestConnection(requestedUser) {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.post(`${ROOT_URL}/auth/connectionrequest`, { requestedUser }, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Connected request sent' })
			history.push('/connect')
		}).catch(error => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again.'})
	})
	}
}

/* Blocking a Connection */
export function blockConnection(blockedUserId) {
	return dispatch => {
		console.log(`blockConnection Action ${blockedUserId}`)
		let token = localStorage.getItem('token');
		axios.post(`${ROOT_URL}/auth/blockconnection`, { blockedUserId }, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
			dispatch({ type: FLASH_MESSAGE, payload: response.data.message })
			dispatch({ type: USER_DASHBOARD, payload: response.data })
			history.push('/dashboard')
		}).catch(error => {
			console.log("Blocked Connection Error", error)
			dispatch({ type: FLASH_MESSAGE, payload: 'Blocking of connection failed. Please try again.' })
		})
	}
}

export function getPendingConnections() {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.get(`${ROOT_URL}/auth/pendingconnections`, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
			dispatch({ type: GET_CONNECTIONS, payload: response.data })
		}).catch(error => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again.'})			
		})
	}
}

export function getMessages() {
	return dispatch => {
		let token = localStorage.getItem('token');
		console.log('token', token)
		axios.get(`${ROOT_URL}/auth/messages`, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
			console.log('DATAw', response.data.messages)
			dispatch({ type: GET_MESSAGES, payload: response.data })
		}).catch(error => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again.'})			
		})
	}
}

export function pendingConnectionResponse({ connectionRequest, action }) {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.post(`${ROOT_URL}/auth/pendingconnectionresponse`, { connectionRequest, action }, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
			dispatch({ type: FLASH_MESSAGE, payload: response.data.message  })
			history.push('/dashboard')
		}).catch(error => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again' })
		})
	}
}
