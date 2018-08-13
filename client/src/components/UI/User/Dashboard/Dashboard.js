import React from 'react';
import './Dashboard.css';
import Connections from './Connections/Connections';
import PendingConnections from './PendingConnections/PendingConnections';
import Profile from './Profile/Profile';
import Loader from '../../Enhancements/Loader';
import classNames from "classnames";
import Conversations from './Messages/Conversations';

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
	conversations,
	messageButton,
	markAsRead
}) => {
	
	const tabStyle = tabName => {
		return classNames({
			"link": true,
			"is-active": (tabName === displayingSection ? true : false),
		})
	}
	
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
						<p className="stat-val">{user.unreadMessages ? user.unreadMessages.length : 0}</p>
						<p className="stat-key">Messages</p>
					</div>
				</div>
				<div className="profile-options is-fullwidth">
					<div className="tabs is-fullwidth is-medium">
						<ul>
							<li className={tabStyle("Connections")} onClick={() => toggleSection('Connections')}>
								<a>
									<span className="icon">
										<i className="fas fa-users" />
									</span>
									<span>Connections</span>
								</a>
							</li>
							<li className={tabStyle("Messages")} onClick={() => toggleSection('Messages')}>
								<a>
									<span className="icon">
										<i className="fas fa-envelope" />
									</span>
									<span>Messages</span>
								</a>
							</li>
							<li className={tabStyle("Profile")} onClick={() => toggleSection('Profile')}>
								<a>
									<span className="icon">
										<i className="fas fa-list-alt" />
									</span>
									<span>Profile</span>
								</a>
							</li>
							<li className={tabStyle("Pending")} onClick={() => toggleSection('Pending')}>
								<a>
									<span className="icon">
										<i className="fas fa-user-friends" />
									</span>
									<span>Pending</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="box" style={{ borderRadius: '0px' }} />
			</div>

			<div className="section display-section-wrapper" >
				<div className="container is-fluid display-section" hidden={displayingSection !== 'Pending'}>
					{pendingConnections ? (
						<PendingConnections
							pendingConnections={pendingConnections}
							pendingConnectionResponse={pendingConnectionResponse}
						/>
					) : (
						<p>No Pending Connections</p>
					)}
				</div>

				<div className="container is-fluid display-section" hidden={displayingSection !== 'Connections'}>
					<Connections connections={connections} blockConnection={blockConnection} messageButton={messageButton} />
				</div>

				<div className="container is-fluid display-section" hidden={displayingSection !== 'Messages'}>
					{conversations && conversations.started || conversations.received ? <Conversations conversations={conversations} connections={connections} markAsRead={markAsRead} /> : <p>No Messages</p>}
				</div>

				<div className="container is-fluid display-section" hidden={displayingSection !== 'Profile'}>{user ? <Profile user={user} /> : <Loader />}</div>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
