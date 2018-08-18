import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as messageActions from '../../actions/MessagingActions'

import FormBuilder from '../../components/UI/Form/FormBuilder';
import { withAlert } from 'react-alert'

const Fields = [
  { label: 'Subject', name: 'subject', type: 'text', errorMsg: 'Subject is required' },
	{ label: 'Message', name: 'messageBody', type: 'textarea', errorMsg: 'Message is required' }
];

  class StartConversation extends Component {
    constructor(props) {
      super(props)

      this.state = {
        receivingUser: '',
      }
    }
    onSubmit = values => {
      let receivingUserId = this.props.receivingUser
      let data = { ...values , receivingUserId }
      this.props.actions.startConversation(data)
    }

    componentDidUpdate(prevProps) {
      if(prevProps.flashMessage !== this.props.flashMessage){
        this.props.alert.show(this.props.flashMessage)
      }
    }
 
    render() {
      return (
        <Fragment>
          <FormBuilder fields={Fields} onSubmit={this.onSubmit} buttonText='Start Conversation' formTitle='Conversation' />
        </Fragment>
      )
    }
  }

  const mapStateToProps = ({ UI }) => {
    return { flashMessage: UI.flashMessage }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(Object.assign(messageActions), dispatch)
    }
  }

  StartConversation = withAlert(StartConversation)

export default connect(mapStateToProps, mapDispatchToProps)(StartConversation)