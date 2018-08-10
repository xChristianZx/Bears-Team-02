import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as messageActions from '../../actions/MessagingActions'

import FormBuilder from '../../components/UI/Form/FormBuilder';
import { withAlert } from 'react-alert'

const Fields = [
	{ label: 'Message', name: 'messageBody', type: 'text', errorMsg: 'Message is required' }
];

  class SendMessage extends Component {
    constructor(props) {
      super(props)

      this.state = {
        receivingUser: '',
        searchTerm: ''
      }
    }
    onSubmit = values => {
      let receivingUser = this.props.receivingUser
      let data = { ...values , receivingUser }
      this.props.actions.sendMessage(data)
    }

    componentDidUpdate(prevProps) {
      if(prevProps.flashMessage !== this.props.flashMessage){
        this.props.alert.show(this.props.flashMessage)
      }
    }
    
    filterConnections = (search) => {
      let users = this.props.connections.filter(connection => {
        let { username } = connection
          return username.includes(search)
      })
      
      if(users.length > 0) {
        return users[0].username
      }
      return null
    }

    handleChange = (e) => {
      this.setState({ searchTerm: e.target.value})
    }

    render() {
      return (
        <Fragment>
          {/* <p>Test: {this.filterConnections(this.state.searchTerm)}</p>
          <input type="text" onChange={this.handleChange} value={this.state.searchTerm} />
          <p>To: {this.state.receivingUser}</p> */}
          <FormBuilder fields={Fields} onSubmit={this.onSubmit} buttonText='Send Message' formTitle='Message' />
        </Fragment>
      )
    }
  }

  const mapStateToProps = (state) => {
    return { flashMessage: state.User.flashMessage }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(Object.assign(messageActions), dispatch)
    }
  }

  SendMessage = withAlert(SendMessage)

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage)