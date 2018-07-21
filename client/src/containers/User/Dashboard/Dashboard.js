import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/UserActions';
import { reduxForm, Field } from 'redux-form';

import './Dashboard.css';

import Fields from '../../../misc/signUpFields';
import formFieldRender from '../../../components/UI/Form/formFieldRender';
import DashboardComp from '../../../components/UI/User/Dashboard/Dashboard';
import Loader from '../../../components/UI/Enhancements/Loader';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editProfile: false,
		};
	}

	componentDidMount() {
		this.props.actions.dashboard();
	}

	onSubmit = values => {
		this.props.actions.updateProfile(values);
	};

	toggleTechnical = (e) => {
		e.preventDefault()
		this.props.actions.toggleTechnical()
	}

	render() {
		const fields = Fields.map(field => {
			return (
				<Field
					key={field.name}
					label={field.label}
					name={field.name}
					type={field.type}
					component={formFieldRender}
				/>
			);
		});

		if (this.state.editProfile) {
			return (
				<form className="Form">
					{fields}
					<button className="button is-success" type="submit">
						Update Profile
					</button>
					<button onClick={() => this.setState({ editProfile: false })}>Cancel Edit</button>
				</form>
			);
		}

		if (this.props.user) {
			return (
				<Fragment>
					<DashboardComp user={this.props.user} toggleEditProfile={() => this.setState({ editProfile: true })} connections={this.props.connections} toggleTechnical={this.toggleTechnical} />
				</Fragment>
			);
		}

		return (
			<Loader />
		);
	}
}

const mapStateToProps = state => {
	return { 
		user: state.User.user, 
		initialValues: state.User.user,
		connections: state.User.connections
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(Object.assign(userActions), dispatch),
	};
};

Dashboard = reduxForm({
	form: 'Update',
})(Dashboard);

export default (Dashboard = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard));
