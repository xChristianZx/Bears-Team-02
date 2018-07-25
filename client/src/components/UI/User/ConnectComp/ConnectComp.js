import React from "react";
import "./ConnectComp.css";

const ConnectComp = ({ users, pendingConnections, addConnection, user }) => {
  /* Renders the list of potential connections */
  console.log("ConnectComp, pendingConnections", pendingConnections);

  const loggedInUserId = user._id;

  const connectionList = users.map((user, i) => {
    console.log(`USER ${i}`);
    const { _id, firstName, lastName, username } = user;
    const renderConnectBtn = () => {
      if (pendingConnections.pending.length > 0) {
        // then filter and see if current request exists from logged in user
        if (
          pendingConnections.pending.some(request => {
            console.log(`Here i am ${i} ${request.requestingUser}`);
            return (
              request.requestingUser.toString() === loggedInUserId.toString() &&
              request.requestedUser._id === _id
            );
          })
        ) {
          // if true - return pending btn
          // return <div>Pending Button</div>;
          return true;
        } else {
          // if false - render request btn
          // return <div>Request Button</div>;
          return false;
        }
      } else {
        //Return 'Send Connect request button'
        // return <div>Request Button</div>;
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
                <p className="subtitle is-6">ID: (for testing): {_id}</p>
              </div>
            </div>
          </div>
          <div className="media-right">
            {/* {renderConnectBtn()} */}
            {renderConnectBtn() ? (
              <div className="button-container">
                <span className="button is-info is-inverted is-static">
                  Pending Response
                </span>
                <button
                  className="button is-danger"
                  onClick={() => console.log("Remove Request")}
                >
                  Remove request
                </button>
              </div>
            ) : (
              <button
                className="button is-primary"
                onClick={() => addConnection(_id)}
              >
                CONNECT
              </button>
            )}
            {/* <button
                className="button is-primary"
                onClick={() => addConnection(_id)}
              >
                CONNECT
              </button> */}
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
      <div className="level">
        <div className="level-left">
          <p className="level-item subtitle">{users.length} Founders</p>
        </div>
        <div className="level-right">
          <p className="level-item">
            <a>All</a>
          </p>
          <p className="level-item">
            <a>Technical</a>
          </p>
          <p className="level-item ">
            <a>Non-Technical</a>
          </p>
        </div>
      </div>
      <ul className="">{connectionList}</ul>
    </div>
  );
};

export default ConnectComp;

/* 
const renderConnectBtn = () => {
  if (
    pendingConnections.pending.length > 0 ||
    pendingConnections.acceptable.length > 0
  ) {
    // then filter and see if current request exists from logged in user
    if (
      pendingConnections.pending.some(request => request.requestingUser.toString() === loggedInUserId.toString())
    ) {
      // if true - return pending btn
      // return <div>Pending Button</div>;
      return true;
    } else if (
      pendingConnections.acceptable.some(request => request.requestingUser.toString() === loggedInUserId.toString())
    ) {
      //return accept button
      // return <div>Accept Button</div>;
      return true;
    } else {
      // if false - render request btn
      // return <div>Request Button</div>;
      return false;
    }
  } else {
    //Return 'Send Connect request button'
    // return <div>Request Button</div>;
    return false;
  }
}; */
