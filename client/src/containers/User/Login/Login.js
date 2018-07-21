import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../../actions/UserActions'

import FormBuilder from '../../../components/UI/Form/FormBuilder';
import { withAlert } from 'react-alert'

const Fields = [
	{ label: 'Username', name: 'username', type: 'text', errorMsg: 'Username is required' },
	{ label: 'Password', name: 'password', type: 'password', errorMsg: 'Password is required' },
];

  class Login extends Component {
    onSubmit = values => {
      this.props.actions.login(values)
    }

    componentDidUpdate(prevProps) {
      if(prevProps.error !== this.props.error){
        //Perform some operation here
        this.props.alert.show(this.props.error)
      }
    }

    render() {
      return (
        <Fragment>
          <FormBuilder fields={Fields} onSubmit={this.onSubmit} buttonText='Log In' formTitle='Log In' />
        </Fragment>
      )
    }
  }

  const mapStateToProps = (state) => {
    return { error: state.User.error }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(Object.assign(userActions), dispatch)
    }
  }

  Login = withAlert(Login)

export default connect(mapStateToProps, mapDispatchToProps)(Login)