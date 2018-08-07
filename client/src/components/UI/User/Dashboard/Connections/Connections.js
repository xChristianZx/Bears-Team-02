import React from "react";
import "./Connection.css";
import { blockConnection } from "../../../../../actions/UserActions";

const Connections = ({ connections, blockConnection }) => {
  let userConnections = connections.map(connection => {
    const { _id, firstName, lastName, username, isTechnical } = connection;
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
                <p className="subtitle is-6">@{username}</p>
                <p disabled className="subtitle is-6">
                  {isTechnical ? "Technical" : "Non-Technical"}
                </p>
                <button className="button is-primary is-outlined">
                  Message
                </button>
                <button
                  className="button is-danger is-outlined"
                  onClick={() => blockConnection(_id)}
                >
                  Remove Connection
                </button>
                {/* <p className="subtitle is-6">ID: (for testing): {_id}</p> */}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="container connect-container is-centered">
      <h1>Connections</h1>
      {userConnections}
    </div>
  );
};

export default Connections;
