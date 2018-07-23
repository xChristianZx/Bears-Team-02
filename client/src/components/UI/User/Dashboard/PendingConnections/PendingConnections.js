import React from "react";

const PendingConnections = ({ pendingConnections, userId }) => {
  return pendingConnections.map((connection, i) => {
    const { requestedUser, requestingUser } = connection;
    const { firstName, lastName } = requestedUser;
    return (
      // Using requestedUser Id as unique key iterable
      <div key={requestedUser._id}>
        <p>Name: {`${firstName} ${lastName}`}</p>
        <button onClick={() => console.log('Need to add handler!')}>
          {connection.requestingUser._id === userId ? "Pending Response" : "Accept"}
        </button>
      </div>
    );
  });
};

export default PendingConnections;
