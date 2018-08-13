import React, { Fragment } from 'react';
import './Message.css';

// const Message = ({ message, user, markAsRead }) => {
const Message = ({ user, message, markAsRead }) => {
	const { _id, sendingUser, messageBody, read } = message;
	const floatClass = user.username === sendingUser.username ? 'Left' : 'Right'
	return (
		<div className='Message'>
		<div className={['Body', floatClass].join(' ')}>
			<p key={_id}>Thread: {messageBody}</p>
			<p className='Sender' > ({sendingUser.firstName})</p>
	 		<p className='Status' >Status: {read ? 'Read' : 'UNREAD'} </p>
		</div>

			{/* {markAsRead ? (
				<button hidden={read} onClick={() => markAsRead(_id)}>
					Mark as Read
				</button>
			) : null} */}
		</div>
	);
}; 

export default Message;
