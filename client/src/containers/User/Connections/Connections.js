import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../../actions/UserActions'

  class Connections extends Component {
    componentDidMount() {
      this.props.actions.getConnections()
    }


    render() {
      let connections = null;
      if(this.props.connections) {
        connections = this.props.connections.map(connection => {
          return (
            <div key={connection._id}>
              Username: {connection.username}
            </div>
          )
        })
      }

      return (
        <div>
          <h1>Connections</h1>

          {connections}
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return { connections: state.User.connections }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(Object.assign(userActions), dispatch)
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Connections)