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
      return (
        <li className="list-container" key={connection._id}>
          <div className="media">
            <div className="media-left">
              <figure className="image is-96x96">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder"
                />
              </figure>
            </div>
            <div className="media-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">
                    {`${connection.firstName} ${connection.lastName}`}
                  </p>
                  <p className="subtitle is-6">
                    Username: {connection.username}
                  </p>
                </div>
              </div>
            </div>
            <div className="media-right">
              <button className="button is-primary">CONNECT</button>
            </div>
          </div>
        </li>
      );
    });
    return <ul className="">{list}</ul>;
  };

  render() {
    return (
      <div className="container connections-container columns is-centered">
        <div className="column is-three-quarters">
          <h1 className="title has-text-centered">Connections</h1>
          {this.renderList()}
        </div>
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
