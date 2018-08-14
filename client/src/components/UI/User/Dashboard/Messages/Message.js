import React, { Fragment } from 'react';
import './Message.css';

// const Message = ({ message, user, markAsRead }) => {
const Message = ({ user, message, markAsRead }) => {
	const { _id, sendingUser, messageBody, read } = message;
	const floatClass = user.username === sendingUser.username ? 'Left' : 'Right';
	return (
		<div key={_id} className="Message">
			<div className={['Body', floatClass].join(' ')}>
				<p>Thread: {messageBody}</p>
				<p className="Sender"> ({sendingUser.username === user.username ? sendingUser.firstName : 'You'})</p>
				<p className="Status">Status: {read ? 'Read' : 'UNREAD'} </p>
				{sendingUser.username === user.username ? (
					<button hidden={read} onClick={() => markAsRead(_id)}>
						Mark as Read
					</button>
				) : null}
			</div>
		</div>
	);
};

export default Message;
