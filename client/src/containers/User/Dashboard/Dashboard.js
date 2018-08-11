import React, { Component, Fragment } from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import diff from 'object-diff';
import { withAlert } from 'react-alert';
import * as userActions from '../../../actions/UserActions';
import * as connectionActions from '../../../actions/ConnectionActions';
import * as messagingActions from '../../../actions/MessagingActions';
import UpdateForm from '../../../components/UI/Form/UpdateForm/UpdateForm';
import updateFields from '../../../misc/userUpdateFields';
import DashboardComp from '../../../components/UI/User/Dashboard/Dashboard';
import Loader from '../../../components/UI/Enhancements/Loader';
import Modal from 'react-modal';
import SendMessage from '../../Message/SendMessage';

Modal.setAppElement('#root')
class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editProfile: false,
			displayingSection: 'Connections',
      modalIsOpen: false,
      receivingUser: null
		};
	}

	componentDidMount() {
		this.props.actions.dashboard();
		this.props.actions.getPendingConnections();
		this.props.actions.getMessages();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.flashMessage !== this.props.flashMessage) {
			this.props.alert.show(this.props.flashMessage);
			this.props.actions.getPendingConnections();
			if (this.props.user) {
				console.log('ERE');
				this.props.actions.getMessages();
			}
		}
	}

	handleSubmit = async values => {
		const { initialValues } = await this.props;
		const objDiff = await diff(initialValues, values);
		// console.log("objDiff", objDiff);
		this.props.actions.updateUser(objDiff);
	};

	toggleTechnical = e => {
		e.preventDefault();
		this.props.actions.toggleTechnical();
	};

	toggleSection = section => {
		this.setState({ displayingSection: section });
	};

	pendingConnectionResponse = (connectionRequest, action) => {
		this.props.actions.pendingConnectionResponse(connectionRequest, action);
	};

	markAsRead = (messageId) => {
		this.props.actions.markAsRead({messageId})
	}

	render() {
		if (this.state.editProfile) {
			return (
				<UpdateForm
					fields={updateFields}
					initialValues={this.props.initialValues}
					onSubmit={this.handleSubmit}
					closeForm={() => this.setState({ editProfile: false })}
				/>
			);
		}

		if (this.props.user && this.props.connections) {
			return (
				<Fragment>
					<Modal
						isOpen={this.state.modalIsOpen}
						onRequestClose={() => this.setState({ modalIsOpen: false })}
            className='Modal'
            overlayClassName='Overlay'
						contentLabel="Message"
					>
						<button onClick={() => this.setState({ modalIsOpen: false })}>close</button>
						<SendMessage receivingUser={this.state.receivingUser} />
					</Modal>
					<DashboardComp
						user={this.props.user}
						toggleEditProfile={() => this.setState({ editProfile: true })}
						connections={this.props.connections}
						pendingConnections={this.props.pendingConnections}
						pendingRequests={this.props.pendingRequests}
						pendingConnectionResponse={this.pendingConnectionResponse}
            messages={this.props.messages}
						messageButton={(_id) => this.setState({ modalIsOpen: true, receivingUser: _id })}
						markAsRead={(messageId) => this.markAsRead(messageId)}
						toggleTechnical={this.toggleTechnical}
						toggleSection={this.toggleSection}
						displayingSection={this.state.displayingSection}
						acceptConnection={this.acceptConnection}
						blockConnection={this.props.actions.blockConnection}
					/>
				</Fragment>
			);
		}

		return <Loader />;
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
		flashMessage: User.flashMessage,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(Object.assign(userActions, connectionActions, messagingActions), dispatch),
	};
};

Dashboard = withAlert(Dashboard);

export default (Dashboard = connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard));
