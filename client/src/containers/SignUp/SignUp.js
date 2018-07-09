import React, { Component } from 'react'
import Aux from '../../hoc/aux'
import UserProvider, { UserContext } from '../../Providers/UserProvider';


  class SignUp extends Component {
    render() {
      return (
       <UserProvider>
        <Aux>
          <h1>Sign Up</h1>

          <UserContext.Consumer>
            {(context) => (
              <form onSubmit='test'>
                <label>
                  Username:
                  <input name="userName" type='text' onChange={context.handleChange} />
                </label>

                <label>
                  Password:
                  <input name="password" type="password" onChange={context.handleChange} />
                </label>
                    <p>I'm inside the consumer - {context.state.userName}</p>
                <button type="submit" onClick={context.handleSubmit} >Sign Up</button>
              </form>
            )}
          </UserContext.Consumer>
        </Aux>
       </UserProvider>
      )
    }
  }

export default SignUp