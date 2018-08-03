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
import { withAlert } from 'react-alert';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editProfile: false,
			displayingSection: 'Connections'
		};
	}

	componentDidMount() {
		this.props.actions.dashboard();
		this.props.actions.getPendingConnections()
	}

	componentDidUpdate(prevProps) {
		if(prevProps.flashMessage !== this.props.flashMessage){
			this.props.alert.show(this.props.flashMessage)
			this.props.actions.getPendingConnections()
		}
	}

	onSubmit = values => {
		this.props.actions.updateProfile(values);
	};

	toggleTechnical = (e) => {
		e.preventDefault()
		this.props.actions.toggleTechnical()
	}

	toggleSection = (section) => {
		this.setState({ displayingSection: section })
	}

	pendingConnectionResponse = (connectionRequest, action) => {
		this.props.actions.pendingConnectionResponse(connectionRequest, action)
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

		if (this.props.user && this.props.connections) {
			return (
				<Fragment>
					<DashboardComp 
					user={this.props.user} 
					toggleEditProfile={() => this.setState({ editProfile: true })} 
					connections={this.props.connections} 
					pendingConnections={this.props.pendingConnections} 
					pendingRequests={this.props.pendingRequests} 
					pendingConnectionResponse={this.pendingConnectionResponse}
					toggleTechnical={this.toggleTechnical} 
					toggleSection={this.toggleSection} 
					displayingSection={this.state.displayingSection} 
					acceptConnection={this.acceptConnection} />
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
		connections: state.User.connections,
		pendingConnections: state.User.pendingConnections,
		pendingRequests: state.User.pendingRequests,
    flashMessage: state.User.flashMessage
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(Object.assign(userActions), dispatch),
	};
};

Dashboard = withAlert(Dashboard)

Dashboard = reduxForm({
	form: 'Update',
})(Dashboard);

export default (Dashboard = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard));
