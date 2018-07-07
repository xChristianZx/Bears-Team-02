// Higher Order Component : Takes a component and wrap it inside a UserConsumer, it then 
// passes the current Context as props

import React from 'react'
import { UserConsumer } from '../Providers/UserProvider';

const ContextWrapper = Comp => props => (
  <UserConsumer>
    {context => <Comp context={context} />}
  </UserConsumer>
)

export default ContextWrapper