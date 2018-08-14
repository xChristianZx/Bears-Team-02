import React from 'react';
import Message from './Message';
import ConversationReply from '../../../../../containers/Message/ConversationReply';
import './Conversation.css';

const Conversation = ({ conversationId, subject, messages, user, markAsRead }) => {
	let { _id, firstName, lastName } = user;
	let messagesList = messages.map(message => {
		return <Message user={user} message={message} firstName={firstName} markAsRead={markAsRead} />;
	});
	return (
		<React.Fragment>
      <div key={conversationId} className="Conversation clearfix">
			<header>
				<h1>
					Name: {firstName} {lastName}
				</h1>
				<h2>Subject: {subject}</h2>
			</header>
			{messagesList}
		</div>
			<ConversationReply receivingUser={_id} conversationId={conversationId} />
    </React.Fragment>
    
	);
};

export default Conversation;
