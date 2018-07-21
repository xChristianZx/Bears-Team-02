import React, { Component } from 'react'
import { Provider as AlertProvider } from 'react-alert'
 
class FlashMessageTemplate extends Component {
  render () {
    // the style contains only the margin given as offset
    // options contains all alert given options
    // message is the alert message...
    // close is a function that closes the alert
    const { options, message, close } = this.props
 
    return (
      // <div style={style}>
      //   {options.type === 'info' && '!'}
      //   {options.type === 'success' && ':)'}
      //   {options.type === 'error' && ':('}
      //   {message}
      //   <button onClick={close}>X</button>
      // </div>

      <div className="notification is-danger">
        {options.type === 'info' && '!'}
        {options.type === 'success' && ':)'}
        {options.type === 'error' && ':('}
        {message}
        <button className="delete" onClick={close}></button>
      </div>
    )
  }
}

export default FlashMessageTemplate