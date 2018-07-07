import React, { Component } from "react";
import { UserConsumer } from "../../Providers/UserProvider";
import Errors from "../../components/UI/Errors";
import './SignUp.css'

class SignUp extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <UserConsumer>
          {context => (
            <form onSubmit={context.handleSubmit}>
              <p className='error'>{context.state.error}</p>
              <label>
                First Name:
                <input
                  name="firstName"
                  type="text"
                  onChange={context.handleChange}
                  value={context.state.register.firstName}
                />
              </label>

              <label>
                Last Name:
                <input
                  name="lastName"
                  type="text"
                  onChange={context.handleChange}
                  value={context.state.register.lastName}
                />
              </label>

              <label>
                Username:
                <input
                  name="username"
                  type="text"
                  onChange={context.handleChange}
                  value={context.state.register.username}
                />
              </label>

              <label>
                Email:
                <input
                  name="email"
                  type="text"
                  onChange={context.handleChange}
                  value={context.state.register.email}
                />
              </label>

              <label>
                Password:
                <input
                  name="password"
                  type="password"
                  onChange={context.handleChange}
                  value={context.state.register.password}
                />
              </label>
              <Errors errors={context.state.errors} />
              <button type="submit">Sign Up</button>
            </form>
          )}
        </UserConsumer>
      </div>
    );
  }
}

export default SignUp;
