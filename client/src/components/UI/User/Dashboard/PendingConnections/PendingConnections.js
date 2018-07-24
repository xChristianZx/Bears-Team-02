import React from "react";

const PendingConnections = ({ pendingConnections, userId }) => {
  return pendingConnections.map((connection, i) => {
    const { requestedUser, requestingUser } = connection;
    const { firstName, lastName } = requestedUser;
    return (
      // Temp key fix; using requestedUser._id did not work
      <div key={i}>
        <p>Name: {`${firstName} ${lastName}`}</p>
        <button onClick={() => console.log('Need to add handler!')}>
          {connection.requestingUser._id === userId ? "Pending Response" : "Accept"}
        </button>
      </div>
    );
  });
};

export default PendingConnections;
