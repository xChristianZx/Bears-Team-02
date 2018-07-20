import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../actions/UserActions';
import { reduxForm, Field } from 'redux-form';

import './Dashboard.css';
import Fields from '../../../misc/signUpFields';

const formFieldRender = ({ input, label, type, meta: { touched, error } }) => (
	<div className="field">
		<label className="label">{label}</label>
		<div className="control">
			<input className="input" type={type} {...input} />
		</div>
		<p className="help is-danger">{touched && (error && <span>{error}</span>)}</p>
	</div>
);

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

    if(this.props.user) {
      return (
        <section className="section centered">
          <div className="container">
            <div className="Profile">
              <img src="http://placehold.it/300x225" alt=""/>
              <div>
                <h1 className="title">{this.props.user.firstName} {this.props.user.lastName}</h1>
                <h1 className="title">Username: {this.props.user.username}</h1>
                <button className="button is-primary is-outlined" onClick={() => this.setState({ editProfile: true })}>Edit Profile</button>
              </div>
            </div>

            <div>Connections: {this.props.user.connections.length}</div>
          </div>
        </section>
      );
    }

    return <div>Loading...</div>
		
	}
}

const mapStateToProps = state => {
	return { user: state.User.user, initialValues: state.User.user };
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
