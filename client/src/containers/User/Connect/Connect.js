import React, { Component } from "react";
import "./Connect.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dashboard } from "../../../actions/UserActions";
import { getUsers, requestConnection, getPendingConnections } from '../../../actions/ConnectionActions';
import ConnectComp from "../../../components/UI/User/ConnectComp/ConnectComp";
import Loader from "../../../components/UI/Enhancements/Loader";
import { withAlert } from "react-alert";

class Connect extends Component {
  componentDidMount() {
    // * Temp fix for error caused on reload to /connect with user state not populating
    this.props.getUsers();
    this.props.getPendingConnections();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.flashMessage !== this.props.flashMessage) {
  //     this.props.alert.show(this.props.flashMessage);
  //     this.props.getPendingConnections();
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevProps.pendingConnections !== this.props.pendingConnections){
  //     this.props.getPendingConnections()
  //     this.props.alert.show(this.props.flashMessage);
  //   }
  // }
  

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props.pendingConnections !== nextProps.pendingConnections || this.props.flashMessage !== nextProps.flashMessage;
  // }
  

  requestConnection = requestedUser => {
    this.props.requestConnection(requestedUser);
  };

  renderConnectionList = () => {
    const { getUsers, pendingConnections, user, users } = this.props;
    // * Temp fix for error caused on reload to /connect with user state not populating
    if (user === null || pendingConnections === null) {
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
        getUsers={getUsers}
        pendingConnections={pendingConnections}
        requestConnection={this.requestConnection}
        user={user}
        users={users}
      />
    );
  };

  render() {
    console.log("PROPS", this.props);
    return (
      <div className="container connect-container columns is-centered">
        {this.renderConnectionList()}
      </div>
    );
  }
}

const mapStateToProps = ({ User, Connection, UI }) => {
  // console.log("STATE", User);
  return {
    users: Connection.users,
    user: User.user,
    pendingConnections: Connection.pendingConnections,
    flashMessage: UI.flashMessage
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getUsers, requestConnection, dashboard, getPendingConnections },
    dispatch
  );
};

Connect = withAlert(Connect);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connect);
