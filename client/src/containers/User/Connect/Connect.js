import React, { Component } from "react";
import "./Connect.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getUsers,
  addConnection,
  dashboard,
  getPendingConnections
} from "../../../actions/UserActions";
import ConnectComp from "../../../components/UI/User/ConnectComp/ConnectComp";
import Loader from "../../../components/UI/Enhancements/Loader";

class Connect extends Component {
  componentDidMount() {
    // * Temp fix for error caused on reload to /connect with user state not populating
    // this.props.getUsers();
  }

  addConnection = requestedUser => {
    this.props.addConnection(requestedUser);
  };

  renderConnectionList = () => {
    const { users, user } = this.props;
    // * Temp fix for error caused on reload to /connect with user state not populating
    if (user === null) {
      this.props.dashboard();
      this.props.getPendingConnections();
      return <Loader />;
    }

    if (users === null) {
      this.props.getUsers();
      return <Loader />;
    }
    return (
      <ConnectComp
        pendingConnections={this.props.pendingConnections}
        user={this.props.user}
        users={users}
        addConnection={this.addConnection}
      />
    );
  };

  render() {
    return (
      <div className="container connect-container columns is-centered">
        {this.renderConnectionList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('STATE', state)
  return {
    users: state.User.users,
    user: state.User.user,
    pendingConnections: state.User.pendingConnections
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getUsers, addConnection, dashboard, getPendingConnections },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connect);
