import React from 'react';

const Message = ({ message, user, markAsRead }) => {
  const { _id, messageBody, read } = message;
  const { firstName, lastName } = user;
	return (
		<div key={_id}>
			<p>
				From: {firstName} {lastName}
			</p>
			<p>Message: {messageBody}</p>
			<p>Status: {read ? 'Read' : 'UNREAD'} </p>
			<button hidden={read} onClick={() => markAsRead(_id)}>
				ICON FOR MARK AS READ?
			</button>
			<button>REPLY</button>
		</div>
	);
};

export default Message;
