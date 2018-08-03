import React, { Component } from 'react'
// import { Provider as AlertProvider } from 'react-alert'
 
class FlashMessageTemplate extends Component {
  render () {
    const { options, message, close } = this.props
 
    return (
      <div className="notification is-primary">
        {message}
        {options.type === 'info' && '!'}
        {options.type === 'success' && ':)'}
        {options.type === 'error' && ':('}
        <button className="delete" onClick={close}></button>
      </div>
    )
  }
}

export default FlashMessageTemplate