import React, { Component } from "react";
import "./Navigation.css";
import { connect } from "react-redux";
import NavigationComp from "../../components/UI/Navigation/Navigation";
import * as connectionActions from "../../actions/ConnectionActions";
import * as messageActions from "../../actions/MessagingActions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

const linksIn = [
  { name: "Connect", url: "/connect", class: "navbar-item" },
  { name: "Dashboard", url: "/dashboard", class: "navbar-item" },
  { name: "Log Out", url: "/logout", class: "navbar-item" }
];

/* Handles SignUp button styling based on responsiveness  */
const linksOut = toggleBurgerState => {
  return [
    {
      name: "Sign Up",
      url: "/signup",
      class: toggleBurgerState ? "navbar-item" : "button is-primary"
    },
    { name: "Log In", url: "/login", class: "navbar-item" }
  ];
};

class Navigation extends Component {
  state = { toggleBurger: false };

  componentDidUpdate(prevProps) {
    if (prevProps.pendingRequests !== this.props.pendingRequests) {
      this.props.actions.getPendingConnections();
    }
    if (prevProps.messages === this.props.messages) {
      this.props.actions.getMessages();
    }
  }

  handleBurgerClick = () => {
    this.setState(prevState => ({ toggleBurger: !prevState.toggleBurger }));
  };

  render() {
    let messageCount = 0;
    if (this.props.user && this.props.user.unreadMessages) {
      messageCount = this.props.user.unreadMessages.length;
    }
    return (
      <div>
        <NavigationComp
          authenticated={this.props.authenticated}
          handleBurgerClick={this.handleBurgerClick}
          linksIn={linksIn}
          linksOut={linksOut(this.state.toggleBurger)}
          location={this.props.location}
          notifications={
            this.props.user && this.props.user.unreadMessages
              ? this.props.notifications + messageCount
              : 0
          }
          toggleBurger={this.state.toggleBurger}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.User.authenticated,
    notifications: state.Connection.pendingRequests,
    pendingRequests: state.Connection.pendingRequests,
    user: state.User.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Object.assign(connectionActions, messageActions), dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: true }
  )(Navigation)
);
