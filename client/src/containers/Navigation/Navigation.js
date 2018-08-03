import React, { Component } from "react";
import "./Navigation.css";
import { connect } from "react-redux";
import NavigationComp from "../../components/UI/Navigation/Navigation";

const linksIn = [
  { name: "Connect", url: "/connect", class: "navbar-item" },
  { name: "Dashboard", url: "/dashboard", class: "navbar-item" },
  { name: "Log Out", url: "/logout", class: "navbar-item" }
];
const linksOut = [
  { name: "Sign Up", url: "/signup", class: "navbar-item" },
  { name: "Log In", url: "/login", class: "navbar-item" }
];

class Navigation extends Component {
  state = { toggleBurger: false };

  handleBurgerClick = () => {
    this.setState(prevState => ({ toggleBurger: !prevState.toggleBurger }));
  };

  render() {
    return (
      <NavigationComp
        handleBurgerClick={this.handleBurgerClick}
        toggleBurger={this.state.toggleBurger}
        authenticated={this.props.authenticated}
        linksIn={linksIn}
        linksOut={linksOut}
      />
    );
  }
}

const mapStateToProps = state => {
  return { authenticated: state.User.authenticated };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: true }
)(Navigation);
