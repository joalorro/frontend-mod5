import React from 'react';
import { connect } from 'react-redux'

import LogoutMsg from './login-components/LogoutMsg'
import LoginAs from './login-components/LoginAs'
import LoginForm from './login-components/LoginForm'

import '../stylesheets/login.css'

const Login = ({ user, history, model }) => {

	const renderLogout = () => {
		return ( 
			<LogoutMsg history={history} /> 
		)
	}

	const renderLoginAs = () => {
		return <LoginAs history={history} />
	}

	if (!model) {
		return (
			<div className="login-content-container">
				{user ? renderLogout() : renderLoginAs()}
			</div>
		);
	} else {
		return (
			<div className="login-content-container" >
				<LoginForm history={history} />
			</div>
		)
	}
}

const mapStateToProps = ({ sessionReducer }) => {
	const user = sessionReducer && sessionReducer.therapist ? sessionReducer.therapist : sessionReducer.patient 
	if (user) return { user }
	return { model: sessionReducer.model }
}

export default connect(mapStateToProps)(Login);
