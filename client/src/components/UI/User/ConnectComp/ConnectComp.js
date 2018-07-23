import React from "react";
import "./ConnectComp.css";

const ConnectComp = ({ users, addConnection, user }) => {
  /* Renders the list of potential connections */
  console.log("user", user);
  const loggedInUserId = user._id;

  const connectionList = users.map(user => {
    const {
      _id,
      firstName,
      lastName,
      username,
      pendingConnectionRequests
    } = user;
    const { requestingUser } = pendingConnectionRequests;

    const renderConnectBtn = () => {
      // if pendingConnectionRequests.length > 0
      if (pendingConnectionRequests.length > 0) {
        // then filter and see if current request exists from logged in user
        if (
          pendingConnectionRequests.some(
            request =>
              request.requestingUser.toString() === loggedInUserId.toString()
          )
        ) {
          // if true - return pending btn
          return true;
        } else {
          // if false - render request btn
          return false;
        }
      } else {
        return false;
      }
    };

    return (
      <li className="list-item-container" key={_id}>
        <div className="media">
          <div className="media-left">
            <figure className="image is-96x96">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder"
              />
            </figure>
          </div>
          <div className="media-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{`${firstName} ${lastName}`}</p>
                <p className="subtitle is-6">Username: {username}</p>
                <p className="subtitle is-6">ID: {_id}</p>
              </div>
            </div>
          </div>
          <div className="media-right">
            {renderConnectBtn() ? (
              <button
                className="button is-info is-outlined"
                onClick={() => console.log("Connection Pending")}
              >
                PENDING
              </button>
            ) : (
              <button
                className="button is-primary"
                onClick={() => addConnection(_id)}
              >
                CONNECT
              </button>
            )}
          </div>
        </div>
      </li>
    );
  });
  // Returns both Header component and List
  return (
    <div className="column is-three-quarters">
      <div className="connect-header-container has-text-centered">
        <h1 className="title">Connect</h1>
        <p className="subtitle is-6">Make new connections</p>
      </div>
      <ul className="">{connectionList}</ul>
    </div>
  );
};

export default ConnectComp;
