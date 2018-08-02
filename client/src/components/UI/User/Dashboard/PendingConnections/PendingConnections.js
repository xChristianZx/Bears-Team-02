import React from 'react';
import List from '../../../../../misc/list';

const PendingConnections = ({ pendingConnections, pendingConnectionResponse }) => {
	return (
		<div className="container connect-container is-centered">
			<h1>Pending Connections</h1>

			{pendingConnections.pending.map((conn, i) => {
				const { requestedUser, _id } = conn;
				const { username, firstName, lastName, isTechnical } = requestedUser;
				const buttons = [
					(<button className="button is-info is-outlined" disabled>
						Pending
					</button>),
				];
				return (
					<List user={conn.requestedUser} componentThis="PendingConnections" />
					// <li className="list-item-container" key={i}>
					// 	<div className="media">
					// 		<div className="media-left">
					// 			<figure className="image is-96x96">
					// 				<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
					// 			</figure>
					// 		</div>
					// 		<div className="media-content">
					// 			<div className="media">
					// 				<div className="media-content">
					// 					<p className="title is-4">{`${firstName} ${lastName}`}</p>
					// 					<p className="subtitle is-6">@{username}</p>
					// 					<p disabled className="subtitle is-6">
					// 						{isTechnical ? 'Technical' : 'Non-Technical'}
					// 					</p>
					// 					<button
					//             className='button is-info is-outlined'
					// 						disabled
					// 					>
					// 						Pending
					// 					</button>
					// 				</div>
					// 			</div>
					// 		</div>
					// 	</div>
					// </li>
				);
			})}
			{pendingConnections.acceptable.map(conn => {
				const { requestingUser, _id } = conn;
				const { username, firstName, lastName, isTechnical } = requestingUser;
				return (
					<List user={conn.requestingUser} componentThis="PendingConnections" />

					// <li className="list-item-container" key={_id}>
					// 	<div className="media">
					// 		<div className="media-left">
					// 			<figure className="image is-96x96">
					// 				<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
					// 			</figure>
					// 		</div>
					// 		<div className="media-content">
					// 			<div className="media">
					// 				<div className="media-content">
					// 					<p className="title is-4">{`${firstName} ${lastName}`}</p>
					// 					<p className="subtitle is-6">@{username}</p>
					// 					<p disabled className="subtitle is-6">
					// 						{isTechnical ? 'Technical' : 'Non-Technical'}
					// 					</p>
					// 					<button
					//             className='button is-primary is-outlined'
					// 						onClick={() =>
					// 							pendingConnectionResponse({
					// 								connectionRequest: _id,
					// 								action: 'Accepted',
					//               })
					// 						}
					// 					>
					// 						Accept
					// 					</button>
					// 					<button
					//             className='button is-danger is-outlined'
					// 						onClick={() =>
					// 							pendingConnectionResponse({
					// 								connectionRequest: _id,
					// 								action: 'Declined',
					//               })
					// 						}
					// 					>
					// 						Decline
					// 					</button>
					// 				</div>
					// 			</div>
					// 		</div>
					// 	</div>
					// </li>
				);
			})}
		</div>
	);
};

export default PendingConnections;
