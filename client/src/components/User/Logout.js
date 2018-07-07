import React, { Component } from 'react'
import contextWrapper from '../../hoc/contextWrapper';

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