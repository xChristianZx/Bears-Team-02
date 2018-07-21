import React from 'react';

const Dashbaord = props => {
	console.log('propsuser', props.user)
	return (
		<section className="section centered">
			<div className="container">
				<div className="Profile">
					<img src="http://placehold.it/300x225" alt="" />
					<div>
						<h1 className="title">
							{props.user.firstName} {props.user.lastName}
						</h1>
						<h1 className="title">Username: {props.user.username}</h1>
						<button
							className="button is-primary is-outlined"
							onClick={props.toggleEditProfile}
						>
							Edit Profile
						</button>
						<button className='button is-primary is-outlined' onClick={props.toggleTechnical}>
							{props.user.isTechnical ? 'Technical' : 'Non-Technical'}
						</button>
					</div>

					<div>
						{props.user.location ? 
							(
								<React.Fragment>
									<div>Location - {props.user.location.city}, {props.user.location.state}, {props.user.location.countryCode}</div>
							<div>Email - {props.user.email}</div>
								</React.Fragment>
							)
						:
							<div>Location - unspecified</div>
						}
					</div>
				</div>

				<div>Connections: {props.connections.length}</div>

				<div>
					{
						props.connections.map(connection => {
							return (
								<div>
									<h1>Name: {connection.firstName} {connection.lastName}</h1>
								<h2>@{connection.username}</h2>
								<h2>Email: {connection.email}</h2>
								</div>
							)
						})
					}
				</div>
			</div>
		</section>
	);
};

export default Dashbaord;
