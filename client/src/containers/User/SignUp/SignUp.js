import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/UserActions';

import FormBuilder from '../../../components/UI/Form/FormBuilder';
import Fields from '../../../misc/signUpFields'
import { withAlert } from 'react-alert'

class SignUp extends Component {
	onSubmit = values => {
		this.props.actions.signUp(values)
	}

	componentDidUpdate(prevProps) {
		if(prevProps.flashMessage !== this.props.flashMessage){
			this.props.alert.show(this.props.flashMessage)
		}
	}

	render() {
		return (
			<Fragment>
				<FormBuilder fields={Fields} onSubmit={this.onSubmit} buttonText='Sign Up' formTitle='Sign Up' />
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return { flashMessage: state.User.flashMessage }
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Object.assign(userActions), dispatch)
	}
}

SignUp = withAlert(SignUp)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
