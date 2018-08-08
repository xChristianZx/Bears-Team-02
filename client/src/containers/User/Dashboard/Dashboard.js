import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/UserActions';
import * as connectionActions from '../../../actions/ConnectionActions';
import * as messagingActions from '../../../actions/MessagingActions';
import { reduxForm, Field } from 'redux-form';
import UpdateForm from "../../../components/UI/Form/UpdateForm/UpdateForm";
import diff from 'object-diff';

import './Dashboard.css';

import Fields from '../../../misc/userUpdateFields';
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
		this.props.actions.getMessages()
	}
	
	componentDidUpdate(prevProps) {
		if(prevProps.flashMessage !== this.props.flashMessage){
			this.props.alert.show(this.props.flashMessage)
			this.props.actions.getPendingConnections()
			if(this.props.user) {
				console.log('ERE')
				this.props.actions.getMessages()
			}
		}		
	}
	
	handleSubmit = async (values) => {			
		console.log("Submit Update", values);
		console.log("DIRTY", this.props);
		const { initialValues } = await this.props;
		const objDiff = await diff(initialValues, values);
		console.log("objDiff", objDiff);
		this.props.actions.updateUser(objDiff);
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
		console.log("FORM", this.props)
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
				<UpdateForm fields={Fields} initialValues={this.props.initialValues} onSubmit={this.handleSubmit} closeForm={() => this.setState({editProfile: false})}/>
				// <form className="Form" onSubmit={this.handleSubmit}>
				// 	{fields}
				// 	<button className="button is-success" type="submit">
				// 		Update Profile
				// 	</button>
				// 	<button onClick={() => this.setState({ editProfile: false })}>Cancel Edit</button>
				// </form>
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
					messages={this.props.messages}
					toggleTechnical={this.toggleTechnical} 
					toggleSection={this.toggleSection} 
					displayingSection={this.state.displayingSection} 
					acceptConnection={this.acceptConnection}
					blockConnection={this.props.actions.blockConnection}
					/>
				</Fragment>
			);
		}

		return (
			<Loader />
		);
	}
}

const mapStateToProps = ({ User, Connection, Message }) => {
	return { 
		user: User.user, 
		initialValues: User.user,
		connections: User.connections,
		pendingConnections: Connection.pendingConnections,
		pendingRequests: Connection.pendingRequests,
		messages: Message.messages,
    flashMessage: User.flashMessage
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(Object.assign(userActions, connectionActions, messagingActions), dispatch),
	};
};

Dashboard = withAlert(Dashboard)

// Dashboard = reduxForm({
// 	form: 'Update',
// })(Dashboard);

export default (Dashboard = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard));
