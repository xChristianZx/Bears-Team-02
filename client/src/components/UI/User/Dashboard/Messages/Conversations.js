import React from 'react';
import SendMessage from '../../../../../containers/Message/SendMessage';
import Message from './Message';
import Conversation from './Conversation';

const Messages = ({ conversations, connections, markAsRead }) => {
	let listConversationsStarted = conversations.started.map(conversation => {
		let { _id, subject, messages, receivingUser } = conversation;
		return <Conversation id={_id} subject={subject} user={receivingUser} messages={messages} />;
	});
 
	let listConversationsReceived = conversations.received.map(conversation => {
		let { _id, subject, messages, sendingUser } = conversation;
		return (
			<Conversation id={_id} subject={subject} user={sendingUser} messages={messages} markAsRead={markAsRead} />
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
			<p>Started: {listConversationsStarted}</p>
			<hr/>
			<p>Received: {listConversationsReceived}</p>
		</div>
	);

	// let listMessagesReceived = messages.messages.received.map(message => {
	// 	return (
	// 		<Message message={message} user={message.sendingUser} markAsRead={markAsRead} />
	// 	);
	// });

	// let listMessagesSent = messages.messages.sent.map(message => {
	// 	return (
	// 		<Message message={message} user={message.receivingUser} />
	// 	);
	// });

	// return (
	// 	<div className="container connect-container is-centered">
	// 		<div className="columns">
	// 			<div className="column">
	// 				<p style={{ textAlign: 'center' }}>Received</p>
	// 				{listMessagesReceived}
	// 			</div>
	// 			<div className="column">
	// 				<p style={{ textAlign: 'center' }}>Sent</p>
	// 				{listMessagesSent}
	// 			</div>
	// 			<div className="column is-two-thirds">
	// 				<p style={{ textAlign: 'center' }}>Send</p>
	// 				<SendMessage connections={connections} />
	// 			</div>
	// 		</div>
	// 	</div>
	// );
};

export default Messages;
