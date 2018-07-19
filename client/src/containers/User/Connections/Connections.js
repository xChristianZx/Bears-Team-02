import React, { Component } from "react";
import "./Connections.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../actions/UserActions";

class Connections extends Component {
  componentDidMount() {
    this.props.actions.getConnections();
  }

  renderList = () => {
    const { connections } = this.props;
    if (connections === null || connections === undefined) {
      return <div>Loading...</div>;
    }

    const list = connections.map(connection => {
      return <li key={connection._id}>Username: {connection.username}</li>;
    });
    return <ul className="container">{list}</ul>;
  };

  render() {
    return (
      <div className="container connections-container">
        <h1 className="title">Connections</h1>
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { connections: state.User.connections };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Object.assign(userActions), dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Connections);
