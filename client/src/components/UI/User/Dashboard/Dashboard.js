import React from 'react';
import './Dashboard.css';


const Dashbaord = props => {
	console.log('propsuser', props.user)
	return (
		// <section className="section centered">
		// 	<div className="container">
		// 		<div className="Profile">
		// 			<img src="http://placehold.it/300x225" alt="" />
		// 			<div>
		// 				<h1 className="title">
		// 					{props.user.firstName} {props.user.lastName}
		// 				</h1>
		// 				<h1 className="title">Username: {props.user.username}</h1>
		// 				<button
		// 					className="button is-primary is-outlined"
		// 					onClick={props.toggleEditProfile}
		// 				>
		// 					Edit Profile
		// 				</button>
		// 				<button className='button is-primary is-outlined' onClick={props.toggleTechnical}>
		// 					{props.user.isTechnical ? 'Technical' : 'Non-Technical'}
		// 				</button>
		// 			</div>

		// 			<div>
		// 				{props.user.location ? 
		// 					(
		// 						<React.Fragment>
		// 							<div>Location - {props.user.location.city}, {props.user.location.state}, {props.user.location.countryCode}</div>
		// 							<div>Email - {props.user.email}</div>
		// 						</React.Fragment>
		// 					)
		// 				:
		// 					<div>Location - unspecified</div>
		// 				}
		// 			</div>
		// 		</div>

		// 		<div>Connections: {props.connections.length}</div>
		// 		<div>Pending Connections: {props.user.pendingConnectionRequests.length}</div>
		// 		<div>Messages: 0</div>

		// 		<div>
		// 			{
		// 				props.connections.map(connection => {
		// 					return (
		// 						<div>
		// 							<h1>Name: {connection.firstName} {connection.lastName}</h1>
		// 						<h2>@{connection.username}</h2>
		// 						<h2>Email: {connection.email}</h2>
		// 						</div>
		// 					)
		// 				})
		// 			}
		// 		</div>
		// 	</div>
		// </section>

		<div class="section profile-heading">
  <div class="columns is-mobile is-multiline">
    <div class="column is-2">
      <span class="header-icon user-profile-image">
        <img alt="" src="http://placehold.it/300x225" /></span>
    </div>
    <div class="column is-4-tablet is-10-mobile name">
      <p>
        <span class="title is-bold">{props.user.firstName}  {props.user.lastName}</span>
        <br />
        <a class="button is-primary is-outlined" style={{ margin: "5px 0" }} onClick={props.toggleEditProfile}>
          Edit Profile</a>
					<a className='button is-primary is-outlined' style={{ margin: "5px 0 5px 10px" }} onClick={props.toggleTechnical}>
							{props.user.isTechnical ? 'Technical' : 'Non-Technical'}
					</a>
        <br />
      </p>
      <p class="tagline">
        The users profile bio would go here, of course. It could be two lines or more or whatever. We should probably limit the amount of characters to ~500 at most though.
      </p>
    </div>
    <div class="column is-2-tablet is-4-mobile has-text-centered">
      <p class="stat-val">{props.connections.length}</p>
      <p class="stat-key">Connections</p>
    </div>
    <div class="column is-2-tablet is-4-mobile has-text-centered">
      <p class="stat-val">{props.user.pendingConnectionRequests.length}</p>
      <p class="stat-key">Pending Connections</p>
    </div>
    <div class="column is-2-tablet is-4-mobile has-text-centered">
      <p class="stat-val">0</p>
      <p class="stat-key">Messages</p>
    </div>
  </div>
  <div class="profile-options is-fullwidth">
    <div class="tabs is-fullwidth is-medium">
      <ul>
        <li class="link">
          <a>
            <span class="icon">
              <i class="fa fa-list"></i>
            </span>
            <span>Connections</span>
          </a>
        </li>
        <li class="link is-active">
          <a>
            <span class="icon">
              <i class="fa fa-thumbs-up"></i>
            </span>
            <span>Messages</span>
          </a>
        </li>
        <li class="link">
          <a>
            <span class="icon">
              <i class="fa fa-search"></i>
            </span>
            <span>Profile</span>
          </a>
        </li>
        <li class="link">
          <a>
            <span class="icon">
              <i class="fa fa-balance-scale"></i>
            </span>
            <span>Pending</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="box" style={{ borderRadius: "0px" }}></div>
</div>

	);
};

export default Dashbaord;
