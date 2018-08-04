import React from 'react';

const Messages = ({ messages }) => {
	
  console.log('messages', messages)
  let listMessages = messages.messages.map(message => {
    return (
      <div>
        {message.messageBody}
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
