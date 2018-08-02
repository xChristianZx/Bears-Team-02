import React from 'react';

const List = ({ user, componentThis }) => {
	const { _id, firstName, lastName, username, isTechnical } = user;
	return (
		<li className="list-item-container" key={_id}>
			<div className="media">
				<div className="media-left">
					<figure className="image is-96x96">
						<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
					</figure>
				</div>
				<div className="media-content">
					<div className="media">
						<div className="media-content">
							<p className="title is-4">{`${firstName} ${lastName}`}</p>
							<p className="subtitle is-6">@{username}</p>
							<p disabled className="subtitle is-6">
								{isTechnical ? 'Technical' : 'Non-Technical'}
							</p>
							<button hidden={componentThis !== "PendingConnections"} className="button is-info is-outlined" disabled>
								Pending
							</button>
							<button className="button is-primary is-outlined">Message</button>
							<button className="button is-danger is-outlined">Remove Connection</button>
							{/* <p className="subtitle is-6">ID: (for testing): {_id}</p> */}
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};

export default List;
