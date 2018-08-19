import React from "react";
import "./Connections.css";
import Capitalize from "../../../Enhancements/Capitalize";
import { Link } from "react-router-dom";

const Connections = ({ connections, blockConnection, messageButton }) => {
  let userConnections = connections.map(connection => {
    const { _id, firstName, lastName, username, isTechnical, userPhotoURL } = connection;
    return (
      <li className="list-item-container" key={_id}>
        <div className="media">
          <div className="media-left">
            <figure className="image is-96x96">
              <img
                className="is-rounded"
                src={userPhotoURL || "https://bulma.io/images/placeholders/96x96.png"}
                alt="Placeholder"
              />
            </figure>
          </div>
          <div className="media-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{`${Capitalize(firstName)} ${Capitalize(lastName)}`}</p>
                <p className="subtitle is-6">@{username}</p>
                <p disabled className="subtitle is-6">
                  {isTechnical ? "Technical" : "Non-Technical"}
                </p>
                <div className="buttons">
                  <button
                    className="button is-primary is-outlined"
                    onClick={() => messageButton(_id)}
                  >
                    Message
                  </button>
                  <button
                    className="button is-danger is-outlined"
                    onClick={() => blockConnection(_id)}
                  >
                    Remove Connection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div className="container connect-container is-centered">
      <div className="header-container has-text-centered">
        <h3 className="subtitle is-4">Connections</h3>
      </div>
      <hr />
      {userConnections < 1 ? (
        <div className="has-text-centered">
          <p>None yet!</p>
          <Link to="/connect">Meet your future team</Link>
        </div>
      ) : (
        <ul>{userConnections}</ul>
      )}
    </div>
  );
};

export default Connections;
