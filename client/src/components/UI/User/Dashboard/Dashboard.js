import React from 'react';
import './Dashboard.css';
import PendingConnections from './PendingConnections/PendingConnections';

const Dashbaord = ({ user, pendingRequests, toggleTechnical, toggleEditProfile, connections, toggleSection, displayingSection, pendingConnections }) => {
	return (
    <React.Fragment>

      <div class="section profile-heading">
        <div class="columns is-mobile is-multiline">
          <div class="column is-2">
            <span class="header-icon user-profile-image">
              <img alt="" src="http://placehold.it/300x225" />
            </span>
          </div>
          <div class="column is-4-tablet is-10-mobile name">
            <p>
              <span class="title is-bold">
                {user.firstName} {user.lastName}
              </span>
              <br />
              <a
                class="button is-primary is-outlined"
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
            <p class="tagline">
              The users profile bio would go here, of course. It could be two lines or more or whatever. We
              should probably limit the amount of characters to ~500 at most though.
            </p>
          </div>
          <div class="column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{connections.length}</p>
            <p class="stat-key">Connections</p>
          </div>
          <div class="column is-2-tablet is-4-mobile has-text-centered">
            <p class="stat-val">{pendingRequests}</p>
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
                    <i class="fa fa-list" />
                  </span>
                  <span onClick={() => toggleSection('Connections')}>Connections</span>
                </a>
              </li>
              <li class="link is-active">
                <a>
                  <span class="icon">
                    <i class="fa fa-thumbs-up" />
                  </span>
                  <span onClick={() => toggleSection('Messages')}>Messages</span>
                </a>
              </li>
              <li class="link">
                <a>
                  <span class="icon">
                    <i class="fa fa-search" />
                  </span>
                  <span onClick={() => toggleSection('Profile')}>Profile</span>
                </a>
              </li>
              <li class="link">
                <a>
                  <span class="icon">
                    <i class="fa fa-balance-scale" />
                  </span>
                  <span onClick={() => toggleSection('Pending')}>Pending</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="box" style={{ borderRadius: '0px' }} />
      </div>

      <div>
        <div hidden={displayingSection !== 'Pending'}>
         Pending
         {
           pendingConnections ? (
           <div>
            {
              pendingConnections.pending.map(conn => {
                console.log('conn - pending', conn.requestedUser.username)
                return (
                  <div>
                    {conn.requestedUser.username}
                    <button disabled>Pending</button>
                  </div>
                ) 
              })
            }
            {
              pendingConnections.acceptable.map(conn => {
                console.log('conn - acceptable', conn.requestingUser.username)
                return (
                  <div>
                    {conn.requestingUser.username}
                    <button>Accept</button>
                  </div>
                )
              })
            }
           </div>
           ) : <div>False</div>
         }
        </div>

        <div hidden={displayingSection !== 'Connections'}>
          Connections
        </div>

        <div hidden={displayingSection !== 'Messages'}>
          Messages
        </div>

        <div hidden={displayingSection !== 'Profile'}>
          Profile
        </div>
      </div>

    </React.Fragment>

	);
};

export default Dashbaord;
