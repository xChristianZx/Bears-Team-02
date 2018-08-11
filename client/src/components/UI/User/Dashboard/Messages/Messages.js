import React from 'react';
import SendMessage from '../../../../../containers/Message/SendMessage';
import Message from './Message';

const Messages = ({ messages, connections, markAsRead }) => {
	let listMessagesReceived = messages.messages.received.map(message => {
		return (
			<Message message={message} user={message.sendingUser} markAsRead={markAsRead} />
		);
	});

	let listMessagesSent = messages.messages.sent.map(message => {
		return (
			<Message message={message} user={message.receivingUser} />
		);
	});

	return (
		<div className="container connect-container is-centered">
			<div className="columns">
				<div className="column">
					<p style={{ textAlign: 'center' }}>Received</p>
					{listMessagesReceived}
				</div>
				<div className="column">
					<p style={{ textAlign: 'center' }}>Sent</p>
					{listMessagesSent}
				</div>
				<div className="column is-two-thirds">
					<p style={{ textAlign: 'center' }}>Send</p>
					<SendMessage connections={connections} />
				</div>
			</div>
		</div>
	);
};

export default Messages;
