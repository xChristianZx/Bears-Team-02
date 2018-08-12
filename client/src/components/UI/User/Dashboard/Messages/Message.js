import React, { Fragment } from 'react';

// const Message = ({ message, user, markAsRead }) => {
const Message = ({ message, markAsRead }) => {
	const { _id, messageBody, read } = message;
	return (
		<Fragment>
			<p key={_id}>Thread: {messageBody}</p>
	 		<p>Status: {read ? 'Read' : 'UNREAD'} </p>

			{markAsRead ? (
				<button hidden={read} onClick={() => markAsRead(_id)}>
					ICON FOR MARK AS READ?
				</button>
			) : null}
		</Fragment>
	);
}; 

export default Message;
