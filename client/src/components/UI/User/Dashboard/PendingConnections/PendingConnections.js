import React from "react";
import Capitalize from "../../../Enhancements/Capitalize";

const PendingConnections = ({ pendingConnections, pendingConnectionResponse }) => {
  const { acceptable, pending } = pendingConnections;
  // console.log("acceptable", acceptable, "pending", pending);
  return (
    <div className="columns box">
      <div className="column container is-three-quarters">
        <div className="header-container has-text-centered">
          <h1 className="subtitle is-4">Pending Connections</h1>
        </div>
        <hr />
        {pending.length === 0 && acceptable.length === 0 ? (
          <p>No Pending Connections</p>
        ) : (
          <div>
            {pending.map((conn, i) => {
              const { requestedUser, _id } = conn;
              const {
                username,
                firstName,
                lastName,
                isTechnical,
                userPhotoURL,
                profileInfo
              } = requestedUser;
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
                          <p className="title is-4">{`${Capitalize(firstName)} ${Capitalize(
                            lastName
                          )}`}</p>
                          <p className="subtitle is-6">@{username}</p>
                          <p className="subtitle is-6">{profileInfo.currentRole}</p>
                          <p className="subtitle is-6">{profileInfo.headline}</p>
                          <p disabled className="subtitle is-6">
                            {isTechnical ? "Technical" : "Non-Technical"}
                          </p>
                          <button className="button is-info is-outlined" disabled>
                            Pending
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
            {acceptable.map(conn => {              
              const { requestingUser, _id } = conn; // Refers to connectionRequest model _id
              // console.log("ID", _id, "CONN", conn);
              const {
                username,
                firstName,
                lastName,
                isTechnical,
                userPhotoURL,
                profileInfo
              } = requestingUser;
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
                          <p className="title is-4">{`${firstName} ${lastName}`}</p>
                          <p className="subtitle is-6">@{username}</p>
                          <p className="subtitle is-6">{profileInfo.currentRole}</p>
                          <p className="subtitle is-6">{profileInfo.headline}</p>
                          <p disabled className="subtitle is-6">
                            {isTechnical ? "Technical" : "Non-Technical"}
                          </p>
                          <div className="buttons">
                            <button
                              className="button is-primary is-outlined"
                              onClick={() =>
                                pendingConnectionResponse({
                                  connectionRequest: _id,
                                  action: "Accepted"
                                })
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="button is-danger is-outlined"
                              onClick={() =>
                                pendingConnectionResponse({
                                  connectionRequest: _id,
                                  action: "Declined"
                                })
                              }
                            >
                              Decline
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingConnections;
