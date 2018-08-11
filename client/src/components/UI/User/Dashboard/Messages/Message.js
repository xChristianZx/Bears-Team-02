import React from 'react';

const Message = ({ message, user, markAsRead }) => {
	const { _id, messageBody, read } = message;
	const { firstName, lastName } = user;
	return (
		<div key={_id}>
			<p>
				Name: {firstName} {lastName}
			</p>
			<p>Message: {messageBody}</p>
			<p>Status: {read ? 'Read' : 'UNREAD'} </p>
			{markAsRead ? (
				<button hidden={read} onClick={() => markAsRead(_id)}>
					ICON FOR MARK AS READ?
				</button>
			) : null}
			<button>REPLY</button>
		</div>
	);
};

export default Message;
