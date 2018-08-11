import React from 'react';
import SendMessage from '../../../../../containers/Message/SendMessage';

const Messages = ({ messages, connections, markAsRead }) => {
	let listMessagesReceived = messages.messages.received.map(message => {
		return (
			<div key={message._id}>
				<p>
					From: {message.sendingUser.firstName} {message.sendingUser.lastName}
				</p>
				<p>Message: {message.messageBody}</p>
				<p>Status: {message.read ? 'Read' : 'UNREAD'} </p>
				<button hidden={message.read} onClick={() => markAsRead(message._id)}>ICON FOR MARK AS READ?</button>
				<button>REPLY</button>
			</div>
		);
	});

	let listMessagesSent = messages.messages.sent.map(message => {
    const { receivingUser, messageBody } = message
		return (
			<div key={message._id}>
				<p>
					{/* To: {receivingUser.firstName} {receivingUser.lastName} */}
				</p>
				<p>Message: {messageBody}</p>
				<p>Status: {message.read ? 'Read' : 'UNREAD'} </p>
				<button>REPLY</button>
			</div>
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
