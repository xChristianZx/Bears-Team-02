import React, { Component } from "react";
import Aux from "../../hoc/aux";
import { UserProvider, UserConsumer } from "../../Providers/UserProvider";

class SignUp extends Component {
  render() {
    return (
      //  {/* <UserProvider>
      //  <Aux> */}
      <div>
        <h1>Sign Up</h1>
        <UserConsumer>
          {context => (
            <form onSubmit={context.handleSubmit}>
              <label>
                Username:
                <input
                  name="username"
                  type="text"
                  onChange={context.handleChange}
                  value={context.state.username}
                />
              </label>

              <label>
                Password:
                <input
                  name="password"
                  type="password"
                  onChange={context.handleChange}
                  value={context.state.password}
                />
              </label>
              <p>I'm inside the consumer - {context.state.username}</p>
              <button type="submit">Sign Up</button>
            </form>
          )}
        </UserConsumer>
      </div>
      //  </Aux>
      //  </UserProvider>
    );
  }
}

export default SignUp;
