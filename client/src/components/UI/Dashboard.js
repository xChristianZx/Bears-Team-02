import React from 'react'
import { UserConsumer } from '../../Providers/UserProvider';


const Dashboard = () => {
  return (
    <UserConsumer>
      {context => (
        <div>
          <h1>Name: {context.state.currentUser.firstName} {context.state.currentUser.lastName}</h1>
          <h1>Email: {context.state.currentUser.email}</h1>
          <h1>Username: {context.state.currentUser.username}</h1>
        </div>
      )}
    </UserConsumer>
  )
}

export default Dashboard