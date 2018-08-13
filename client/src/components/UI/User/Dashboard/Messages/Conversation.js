import React from 'react';
import Message from './Message';
import ConversationReply from '../../../../../containers/Message/ConversationReply';
import './Conversation.css';

const Conversation = ({ conversationId, subject, messages, user, markAsRead }) => {
	let { firstName, lastName } = user;
	let messagesList = messages.map(message => {
		return <Message user={user} message={message} firstName={firstName} markAsRead={markAsRead || null} />;
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
			{/* <ConversationReply receivingUser={user._id} conversationId={conversationId} /> */}
			<button className='clearfix'>Reply</button>
		</div>

    <hr/>
    </React.Fragment>
    
	);
};

export default Conversation;
