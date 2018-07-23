import React from 'react'

const PendingConnections = ({ pendingConnections, userId }) => {
  return pendingConnections.map(connection => {
    return (
      <div>
        <p>Name: {connection.requestedUser.firstName} {connection.requestedUser.lastName}</p>
        <button>{connection.requestingUser._id === userId ? 'Pending' : 'Accept'}</button>
      </div>
    )
  })
}

export default PendingConnections