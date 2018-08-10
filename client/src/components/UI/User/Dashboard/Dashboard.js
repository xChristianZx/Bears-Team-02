import React from 'react';
import './Dashboard.css';
import Connections from './Connections/Connections';
import PendingConnections from './PendingConnections/PendingConnections';
import Profile from './Profile/Profile';
import Loader from '../../Enhancements/Loader';
import Messages from './Messages/Messages';

const Dashboard = ({
	user,
	pendingRequests,
	toggleTechnical,
	toggleEditProfile,
	connections,
	toggleSection,
	displayingSection,
	pendingConnections,
	pendingConnectionResponse,
	blockConnection,
	messages,
	messageButton
}) => {
	return (
		<React.Fragment>
			<div className="section profile-heading">
				<div className="columns is-mobile is-multiline">
					<div className="column is-2">
						<figure className="image is-rounded">
							<img className="is-rounded" src={user.userPhotoURL || "http://placehold.it/250x250"} alt={user.firstName}/>
						</figure>
					</div>
					<div className="column is-4-tablet is-10-mobile name">
						<p>
							<span className="title is-bold">
								{user.firstName} {user.lastName}
							</span>
							<br />
							<a
								className="button is-primary is-outlined"
								style={{ margin: '5px 0' }}
								onClick={toggleEditProfile}
							>
								Edit Profile
							</a>
							<a
								className="button is-primary is-outlined"
								style={{ margin: '5px 0 5px 10px' }}
								onClick={toggleTechnical}
							>
								{user.isTechnical ? 'Technical' : 'Non-Technical'}
							</a>
							<br />
						</p>
						<p className="tagline">
							The users profile bio would go here, of course. It could be two lines or more or whatever.
							We should probably limit the amount of characters to ~500 at most though.
						</p>
					</div>
					<div className="column is-2-tablet is-4-mobile has-text-centered">
						<p className="stat-val">{connections.length}</p>
						<p className="stat-key">Connections</p>
					</div>
					<div className="column is-2-tablet is-4-mobile has-text-centered">
						<p className="stat-val">{pendingRequests}</p>
						<p className="stat-key">Pending Connections</p>
					</div>
					<div className="column is-2-tablet is-4-mobile has-text-centered">
						<p className="stat-val">0</p>
						<p className="stat-key">Messages</p>
					</div>
				</div>
				<div className="profile-options is-fullwidth">
					<div className="tabs is-fullwidth is-medium">
						<ul>
							<li className="link">
								<a>
									<span className="icon">
										<i className="fas fa-users" />
									</span>
									<span onClick={() => toggleSection('Connections')}>Connections</span>
								</a>
							</li>
							<li className="link is-active">
								<a>
									<span className="icon">
										<i className="fas fa-envelope" />
									</span>
									<span onClick={() => toggleSection('Messages')}>Messages</span>
								</a>
							</li>
							<li className="link">
								<a>
									<span className="icon">
										<i className="fas fa-list-alt" />
									</span>
									<span onClick={() => toggleSection('Profile')}>Profile</span>
								</a>
							</li>
							<li className="link">
								<a>
									<span className="icon">
										<i className="fas fa-user-friends" />
									</span>
									<span onClick={() => toggleSection('Pending')}>Pending</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="box" style={{ borderRadius: '0px' }} />
			</div>

			<div>
				<div hidden={displayingSection !== 'Pending'}>
					{pendingConnections ? (
						<PendingConnections
							pendingConnections={pendingConnections}
							pendingConnectionResponse={pendingConnectionResponse}
						/>
					) : (
						<p>No Pending Connections</p>
					)}
				</div>


				<div hidden={displayingSection !== 'Connections'}>
					<Connections connections={connections} blockConnection={blockConnection} messageButton={messageButton} />
				</div>

				<div hidden={displayingSection !== 'Messages'}>
					Messages
          {console.log('mEsSags', messages)}
					{messages !== null ? <Messages messages={messages} /> : <p>No Messages</p>}
				</div>

				<div hidden={displayingSection !== 'Profile'}>{user ? <Profile user={user} /> : <Loader />}</div>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
