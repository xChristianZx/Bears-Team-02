import axios from 'axios'
import history from '../hoc/history'

import { GET_USERS, USER_DASHBOARD, GET_CONNECTIONS, FLASH_MESSAGE} from './types'

export function getUsers(filterParams) {
  return dispatch => {
    let token = localStorage.getItem('token');
    axios.get(`/founders`, { params:{ isTechnical : filterParams || "all" }, headers: { Authorization: `Bearer ${token}` } }).then(response => {
      dispatch({ type: GET_USERS, payload: response.data })
    }).catch(error => {
        dispatch({ type: FLASH_MESSAGE, payload: 'Failed to load users'})
    })
  };
}

export function requestConnection(requestedUser) {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.post(`/auth/connectionrequest`, { requestedUser }, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Connected request sent' })
			history.push('/connect')
		}).catch(error => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again.'})
	})
	}
}

export function blockConnection(blockedUserId) {
	return dispatch => {
		console.log(`blockConnection Action ${blockedUserId}`)
		let token = localStorage.getItem('token');
		axios.post(`/auth/blockconnection`, { blockedUserId }, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
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
		axios.get(`/auth/pendingconnections`, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
			dispatch({ type: GET_CONNECTIONS, payload: response.data })
		}).catch(error => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again.'})			
		})
	}
}

export function pendingConnectionResponse({ connectionRequest, action }) {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios.post(`/auth/pendingconnectionresponse`, { connectionRequest, action }, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
			dispatch({ type: FLASH_MESSAGE, payload: response.data.message  })
			history.push('/dashboard')
		}).catch(error => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again' })
		})
	}
}