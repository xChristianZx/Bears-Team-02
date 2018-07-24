import React, { Component } from "react";
import "./Connect.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../actions/UserActions";
import ConnectComp from "../../../components/UI/User/ConnectComp/ConnectComp";
import Loader from '../../../components/UI/Enhancements/Loader';

class Connect extends Component {
  componentDidMount() {
    this.props.actions.getUsers();
  }

  addConnection = (requestedUser) => {
    this.props.actions.addConnection(requestedUser)
  }

  renderConnectionList = () => {

    const { users } = this.props;
    if (users === null || users === undefined) {
      return <Loader />
    }
    return <ConnectComp users={users} addConnection={this.addConnection} />;
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
  return { users: state.User.users };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Object.assign(userActions), dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connect);
