import React, { Fragment } from 'react';

// const Message = ({ message, user, markAsRead }) => {
const Message = ({ message, markAsRead }) => {
	const { _id, sendingUser, messageBody, read } = message;
	return (
		<Fragment>
			<p key={_id}>Thread: {messageBody}</p>
			<p>Sender: {sendingUser.firstName}</p>
	 		<p>Status: {read ? 'Read' : 'UNREAD'} </p>

			{markAsRead ? (
				<button hidden={read} onClick={() => markAsRead(_id)}>
					Mark as Read
				</button>
			) : null}
			<hr/>
		</Fragment>
	);
}; 

export default Message;
