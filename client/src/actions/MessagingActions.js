import axios from 'axios';

import { GET_MESSAGES, FLASH_MESSAGE, GET_CONVERSATIONS } from './types';

export function getMessages() {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios
			.get(`/auth/messages`, { headers: { Authorization: `Bearer ${token}` } })
			.then(response => {
				dispatch({ type: GET_MESSAGES, payload: response.data });
			})
			.catch(error => {
				dispatch({ type: FLASH_MESSAGE, payload: 'ERROR: getMessages' });
			});
	};
}
/* Currently Unused */
// export function sendMessage({ messageBody, receivingUser }) {
// 	return dispatch => {
// 		let token = localStorage.getItem('token');
// 		axios
// 			.post(`/auth/sendmessage`, { receivingUser, messageBody }, { headers: { Authorization: `Bearer ${token}` } })
// 			.then(response => {
// 				dispatch({ type: FLASH_MESSAGE, payload: 'Message Sent.' });
// 			})
// 			.catch(error => {
// 				dispatch({ type: FLASH_MESSAGE, payload: 'Message Failed to Send.' });
// 			})
// 	};
// }

export function markAsRead({ messageId }) {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios
			.post(`/message/readmessage`, { messageId }, { headers: { Authorization: `Bearer ${token}` } })
			.then(response => {
				dispatch({ type: FLASH_MESSAGE, payload: 'Message Read' })
			})
			.catch(error => {
				dispatch({ type: FLASH_MESSAGE, payload: 'Error: markAsRead' })
			})
	}
}

export function getConversations() {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios
			.get(`/message/conversations`, { headers: { Authorization: `Bearer ${token}` } })
			.then(response => {
				dispatch({ type: GET_CONVERSATIONS, payload: response.data.conversations });
			})
			.catch(error => {
				console.log(error)
			});
	};
}

export function startConversation({ 
	subject, 
	receivingUserId, 
	messageBody 
}) {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios
			.post(`/message/conversation`, { subject, receivingUserId, messageBody }, { headers: { Authorization: `Bearer ${token}`}})
			.then(response => {
				dispatch({ type: FLASH_MESSAGE, payload: 'Conversation Success' })
			})
			.catch(error => {
				dispatch({ type: FLASH_MESSAGE, payload: 'Conversation Error' })
			})
	}
}

export function reply({
	ConversationId,
	receivingUserId,
	messageBody
}) {
	return dispatch => {
		let token = localStorage.getItem('token');
		axios
			.post(`/message/reply`, { ConversationId, receivingUserId, messageBody }, { headers: { Authorization: `Bearer ${token}` }})
			.then(response => {
				console.log('response', response)
				dispatch(getConversations());
			})
			.catch(error => {
				console.log('error', error)
			})
	}
}
