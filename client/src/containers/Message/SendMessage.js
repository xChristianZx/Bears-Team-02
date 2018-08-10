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
    onSubmit = values => {
      values.receivingUser = this.props.receivingUser
      this.props.actions.sendMessage(values)
    }

    componentDidUpdate(prevProps) {
      if(prevProps.flashMessage !== this.props.flashMessage){
        this.props.alert.show(this.props.flashMessage)
      }
    }

    render() {
      return (
        <Fragment>
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