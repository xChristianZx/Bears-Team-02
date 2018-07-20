import React, { Component } from 'react';
import Links from '../../components/UI/Links';
import './Navigation.css';
import { connect } from 'react-redux';

const linksIn = [
	{ name: 'LOGO', url: '/', class: 'Logo' },
	{ name: 'Log Out', url: '/logout', class: 'Item' },
	{ name: 'Dashboard', url: '/dashboard', class: 'Item' },
];
const linksOut = [
	{ name: 'LOGO', url: '/', class: 'Logo' },
	{ name: 'Sign Up', url: '/signup', class: 'Item' },
	{ name: 'Log In', url: '/login', class: 'Item' },
];

class Navigation extends Component {
	componentDidMount() {
		console.log('CWM', this.props);
	}

	render() {
		return (
			<nav className="Nav">
				{this.props.authenticated ? <Links links={linksIn} /> : <Links links={linksOut} />}
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return { authenticated: state.User.authenticated };
};

export default connect(
	mapStateToProps,
	null,
	null,
	{ pure: true }
)(Navigation);
