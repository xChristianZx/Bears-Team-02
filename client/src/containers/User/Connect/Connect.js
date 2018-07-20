import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/UserActions';
import ConnectComp from '../../../components/ConnectComp/ConnectComp';

class Connect extends Component {
	componentDidMount() {
		this.props.actions.getUsers();
	}

	render() {
		if (!this.props.users) {
			return <div>Loading...</div>;
		}

		if(this.props.users) {
			return (
				<ConnectComp users={this.props.users} />
			)
		}
	}
}

const mapStateToProps = state => {
	return { users: state.User.users };
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(Object.assign(userActions), dispatch),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Connect);
