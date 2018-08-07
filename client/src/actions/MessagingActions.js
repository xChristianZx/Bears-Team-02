import axios from 'axios'

import { GET_MESSAGES, FLASH_MESSAGE } from './types'

export function getMessages() {
	return dispatch => {
		let token = localStorage.getItem('token');
		console.log('token', token)
		axios.get(`/auth/messages`, { headers: { Authorization: `Bearer ${token}`}}).then(response => {
			console.log('DATAw', response.data.messages)
			dispatch({ type: GET_MESSAGES, payload: response.data })
		}).catch(error => {
			dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again.'})			
		})
	}
}