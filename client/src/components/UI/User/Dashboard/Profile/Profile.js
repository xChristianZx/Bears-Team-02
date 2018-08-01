import React from 'react';

const Profile = ({ user }) => {
	console.log('USER', user);
	const { firstName, lastName, username, email } = user;
	return (
		<div className="container connect-container is-centered">
			<div class="card">
				<h1>Profile</h1>
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<figure class="image is-48x48">
								<img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
							</figure>
						</div>
						<div class="media-content">
							<p class="title is-4">
								{firstName} {lastName}
							</p>
							<p class="subtitle is-6">@{username}</p>
						</div>
					</div>

					<div class="content">Write your bio here someday.</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
