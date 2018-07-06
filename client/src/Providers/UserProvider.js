import React, { createContext, Component } from "react";
import Axios from "axios";

const UserContext = createContext();

class UserProvider extends Component {
  state = {
    username: "",
    password: "",
    currentUser: "",
    currentTechnical: null,
    isLoggedIn: false
  };

  handleChange = event => {
    if (event.target.name === "username") {
      this.setState({ username: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const { username, password } = this.state;
    Axios.post("/auth/login", { username, password })
      .then(res => {
        console.log(res.data);
        const { firstName, isTechnical } = res.data.user;
        this.setState({
          currentUser: firstName,
          currentTechnical: isTechnical,
          isLoggedIn: true
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          isLoggedIn: this.state.isLoggedIn,
          handleChange: this.handleChange,
          handleSubmit: this.handleSubmit
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
