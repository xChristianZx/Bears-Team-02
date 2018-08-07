import React from 'react';

const Messages = ({ messages }) => {
	
  console.log('messages', messages)
  let listMessages = messages.messages.map(message => {
    return (
      <div>
        <p>From: {message.sendingUser.firstName} {message.sendingUser.lastName}</p>
        <p>Message: {message.messageBody}</p>
        <p>Status: {message.read ? 'Read' : 'UNREAD'} </p>
        <button>ICON FOR MARK AS READ?</button>
        <button>REPLY</button>
      </div>
    )
  })
  
  return (
		<div className="container connect-container is-centered">
			<h1>Messages</h1>
			{listMessages}
		</div>
	);
};

export default Messages;
