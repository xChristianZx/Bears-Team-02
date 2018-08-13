import React from 'react';
import Conversation from './Conversation';
import './Conversations.css';

const Messages = ({ conversations, connections, markAsRead }) => {
	let listConversationsStarted = conversations.started.map(conversation => {
		let { _id, subject, messages, receivingUser } = conversation;
		if (_id !== undefined) {
			return (
				<Conversation 
					conversationId={_id} 
					subject={subject} 
					user={receivingUser} 
					messages={messages} 
				/>
			)
		}
	});


	let listConversationsReceived = conversations.received.map(conversation => {
		let { _id, subject, messages, sendingUser } = conversation;
		return (
			<article className='Conversation'>
				<Conversation
					conversationId={_id}
					subject={subject}
					user={sendingUser}
					messages={messages}
					markAsRead={markAsRead}
				/>
			</article>
		);
	});

	let filteredConnections = connections.filter(connection => connection.username === 'sackfield');

	return (
		<div>
			{/* <div>
				Testing filtering user for sending a message from here
				<p>Connections</p>
				<ul>
					{filteredConnections.map(connection => {
						return <li key={connection._id}>{connection.username}</li>;
					})}
				</ul>
			</div> */}
			<p>Conversations Started: {listConversationsStarted}</p>
			<hr />
			<p>Conversations Received: {listConversationsReceived}</p>
		</div>
	);
};
export default Messages;
