import React, { Component } from "react";
import "./Navigation.css";
import { connect } from "react-redux";
import NavigationComp from "../../components/UI/Navigation/Navigation";
import * as connectionActions from "../../actions/ConnectionActions"
import { bindActionCreators } from 'redux';

const linksIn = [
  { name: "Connect", url: "/connect", class: "navbar-item" },
  { name: "Dashboard", url: "/dashboard", class: "navbar-item" },
  { name: "Log Out", url: "/logout", class: "navbar-item" },
  { name: "Notifications", url: "#", class: "navbar-item" }
];
const linksOut = [
  { name: "Sign Up", url: "/signup", class: "navbar-item" },
  { name: "Log In", url: "/login", class: "navbar-item" }
];

class Navigation extends Component {
  state = { toggleBurger: false };

  componentDidUpdate(prevProps) {
		if(prevProps.pendingRequests !== this.props.pendingRequests){
			this.props.actions.getPendingConnections()
		}
  }
  
  handleBurgerClick = () => {
    this.setState(prevState => ({ toggleBurger: !prevState.toggleBurger }));
  };

  render() {
    return (
      <div>
        <NavigationComp
        handleBurgerClick={this.handleBurgerClick}
        toggleBurger={this.state.toggleBurger}
        authenticated={this.props.authenticated}
        linksIn={linksIn}
        linksOut={linksOut}
        pendingRequests={this.props.pendingRequests}
      />
      {this.props.pendingRequests}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    authenticated: state.User.authenticated,
    pendingRequests: state.User.pendingRequests
   };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign(connectionActions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: true }
)(Navigation);
