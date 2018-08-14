import React from 'react';
import Conversation from './Conversation';
import './Conversations.css';

const Conversations = ({ conversations, connections, markAsRead }) => {
	let listConversationsStarted = conversations.started.map(conversation => {
		let { _id, subject, messages, receivingUser } = conversation;
		if (_id !== undefined) {
			return (
				<Conversation 
					key={_id}
					conversationId={_id} 
					subject={subject} 
					user={receivingUser} 
					messages={messages} 
					markAsRead={markAsRead}
				/>
			)
		}
	});


	let listConversationsReceived = conversations.received.map(conversation => {
		let { _id, subject, messages, sendingUser } = conversation;
		return (
			<div key={_id} className='Conversation'>
				<Conversation
				key={_id}
					conversationId={_id}
					subject={subject}
					user={sendingUser}
					messages={messages}
					markAsRead={markAsRead}
				/>
			</div>
		);
	});

	let filteredConnections = connections.filter(connection => connection.username === 'sackfield');

	return (
		<div>
			<div>Conversations Started: {listConversationsStarted}</div>
			<hr />
			<div>Conversations Received: {listConversationsReceived}</div>
		</div>
	);
};
export default Conversations;
