import React from 'react';
import Message from './Message';
import ConversationReply from '../../../../../containers/Message/ConversationReply';

const Conversation = ({ conversationId, subject, messages, user, markAsRead }) => {
	let { firstName, lastName } = user;
	let messagesList = messages.map(message => {
		return <Message message={message} firstName={firstName} markAsRead={markAsRead || null} />;
	});
		return (
			<div key={conversationId}>
				<p>
					Name: {firstName} {lastName}
				</p>
				<p>Subject: {subject}</p>
				{messagesList}
					<ConversationReply receivingUser={user._id} conversationId={conversationId} />
				<button>Reply</button>
			</div>
		);
};

export default Conversation;
