import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/UserActions'

import FormBuilder from '../../components/UI/Form/FormBuilder';
import { withAlert } from 'react-alert'

const Fields = [
	{ label: 'Username', name: 'username', type: 'text', errorMsg: 'Username is required' },
	{ label: 'Password', name: 'password', type: 'password', errorMsg: 'Password is required' },
];

  class DeleteAccount extends Component {
    onSubmit = values => {
      this.props.actions.deleteAccount(values)
    }

    componentDidUpdate(prevProps) {
      if(prevProps.flashMessage !== this.props.flashMessage){
        //Perform some operation here
        this.props.alert.show(this.props.flashMessage)
      }
    }

    render() {
      return (
        <Fragment>
          <FormBuilder fields={Fields} onSubmit={this.onSubmit} buttonText='Delete Account' formTitle='Delete' />
        </Fragment>
      )
    }
  }

  const mapStateToProps = ({ UI }) => {
    return { flashMessage: UI.flashMessage };
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(Object.assign(userActions), dispatch)
    }
  }

  DeleteAccount = withAlert(DeleteAccount)

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount)