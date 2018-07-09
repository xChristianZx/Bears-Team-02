import React, { Component } from 'react'
import contextWrapper from '../../hoc/contextWrapper';
// TODO: Move this file to containers. Also while there created User folder in container and move signUp inside.

  class Logout extends Component {
    componentWillMount() {
      this.props.context.logout()
    }
    render() {
      return(
        <div>Goodbye!</div>
      )
    }
  }

export default contextWrapper(Logout)