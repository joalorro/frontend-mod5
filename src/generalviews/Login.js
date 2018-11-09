import React, { Component } from 'react';
import { connect } from 'react-redux'
import AppAdapter from '../adapters/AppAdapter'

import ErrorMsg from './ErrorMsg'
import LogoutMsg from './components/LogoutMsg'

import '../stylesheets/login.css'
import { Form, Icon } from 'semantic-ui-react'

const Login = ({ user }) => {

	const renderLogout = () => {
		return ( 
			<LogoutMsg user={user} /> 
		)
	}

	const renderLoginAs = () => {
		return (
			<div>
				
			</div>
		)
	}

	return (
		<div>
			{ user ? renderLogout() : renderLoginAs()}
		</div>
	);
}

const mapStateToProps = state => {
	const user = state.sessionReducer && state.sessionReducer.therapist ? state.sessionReducer.therapist : state.sessionReducer.patient 
	return {
		user
	}
}

export default connect(mapStateToProps)(Login);
