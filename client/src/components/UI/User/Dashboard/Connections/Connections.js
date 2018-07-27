import React from 'react'

const Connections = ({ connections }) => {
  console.log('connection', connections)
  let userConnections = connections.map(connection => {
    console.log('connection', connection)
    return (
      <div>
        <p>Name: {connection.firstName} {connection.lastName}</p>
        <p>Username: {connection.username}</p>
        <p>Email: {connection.email}</p>
        <p>Technical Founder: {connection.isTechnical ? 'Yes' : 'No'}</p>
      </div>
    )
  })
  return (
    <div>
      Connections

      {userConnections}
    </div>
  )
}

export default Connections