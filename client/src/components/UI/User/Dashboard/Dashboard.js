import React from 'react';
import './Dashboard.css';
import Connections from './Connections/Connections';
import PendingConnections from './PendingConnections/PendingConnections';
import Profile from './Profile/Profile';
import Loader from '../../Enhancements/Loader';
import classNames from "classnames";
import Conversations from './Messages/Conversations';
import Capitalize from '../../Enhancements/Capitalize';

const Dashboard = ({
	user,
	initialValues,
	onSubmitProfile,
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
					<div className="column is-2-tablet is-6-mobile">
						<figure className="image is-rounded">
							<img className="is-rounded" src={user.userPhotoURL || "http://placehold.it/250x250"} alt={user.firstName} />
						</figure>
					</div>
					<div className="column is-4-tablet is-12-mobile name">
						<div>
							<h1 className="title is-bold">
								{Capitalize(user.firstName)} {Capitalize(user.lastName)}
							</h1>

							{user.profileInfo.currentRole ? <h4 className="subtitle is-5">{user.profileInfo.currentRole}</h4> : null}


							{user.profileInfo.headline ? <h6 className="subtitle is-6"><em>{user.profileInfo.headline}</em></h6> : <p><em> Edit your profile to add your headline here</em></p>}

						</div>
						<br />
						<div>

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
						</div>
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
					{(conversations && conversations.started) || conversations.received ? <Conversations conversations={conversations} connections={connections} markAsRead={markAsRead} /> : <p>No Messages</p>}
				</div>

				<div className="container is-fluid display-section" hidden={displayingSection !== 'Profile'}>{user ? <Profile user={user} initialValues={initialValues} onSubmitProfile={onSubmitProfile}/> : <Loader />}</div>
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
