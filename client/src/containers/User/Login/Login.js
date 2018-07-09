import React, { Component } from 'react'
import { UserConsumer } from '../../../Providers/UserProvider'
import Errors from '../../../components/UI/Errors'

  class Login extends Component {
    render() {
      return (
        <div>
          <h1>Log In</h1>

          <UserConsumer>
            {context => (
              <form onSubmit={context.handleLogin}>
                <p className='error'>{context.state.error}</p>

                <label>
                  Username:
                  <input 
                    type="text"
                    name="username"
                    onChange={context.handleChange}
                    value={context.state.username}
                  />
                  </label>

                  <label>
                  Password:
                  <input 
                    type="password"
                    name="password"
                    onChange={context.handleChange}
                    value={context.state.password}
                  />
                  </label>
                  <Errors errors={context.state.errors} />
                  <button type="submit">Log In</button>
              </form>
            )}
          </UserConsumer>
        </div>
      )
    }
  }

export default Login