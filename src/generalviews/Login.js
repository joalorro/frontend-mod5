import React from 'react';
import { connect } from 'react-redux'

import LogoutMsg from './login-components/LogoutMsg'
import LoginAs from './login-components/LoginAs'
import LoginForm from './login-components/LoginForm'

const Login = ({ user, history, model }) => {

	const renderLogout = () => {
		return ( 
			<LogoutMsg user={user} /> 
		)
	}

	const renderLoginAs = () => {
		return <LoginAs history={history} />
	}

	if (!model) {
		return (
			<div>
				{user ? renderLogout() : renderLoginAs()}
			</div>
		);
	} else {
		return <LoginForm history={history} />
	}
}

const mapStateToProps = ({ sessionReducer }) => {
	const user = sessionReducer && sessionReducer.therapist ? sessionReducer.therapist : sessionReducer.patient 
	if (user) return { user }
	return { model: sessionReducer.model }
}

export default connect(mapStateToProps)(Login);
