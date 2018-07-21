import React from "react";
import "./ConnectComp.css";

const ConnectComp = ({ users, addConnection }) => {
  /* Renders the list of potential connections */
  const connectionList = users.map(user => {
    const { _id, firstName, lastName, username } = user;
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
              </div>
            </div>
          </div>
          <div className="media-right">
            <button className="button is-primary" onClick={() => addConnection(_id)}>CONNECT</button>
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
