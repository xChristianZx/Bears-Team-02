import axios from 'axios';

import { GET_MESSAGES, FLASH_MESSAGE } from './types';

export function getMessages() {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios
			.get(`/auth/messages`, { headers: { Authorization: `Bearer ${token}` } })
			.then(response => {
				dispatch({ type: GET_MESSAGES, payload: response.data });
			})
			.catch(error => {
				dispatch({ type: FLASH_MESSAGE, payload: 'Request failed. Please try again.' });
			});
	};
}

export function sendMessage({ receivingUser, messageBody }) {
	console.log('SUBMITTED', { receivingUser, messageBody })
	return dispatch => {
		let token = localStorage.getItem('token');
		axios
			.post(`/auth/sendmessage`, { receivingUser, messageBody }, { headers: { Authorization: `Bearer ${token}` } })
			.then(response => console.log('Spongebob', response))
			.catch(error => console.log(error))
	};
}
