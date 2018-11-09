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

const mapStateToProps = state => {
	const user = state.sessionReducer && state.sessionReducer.therapist ? state.sessionReducer.therapist : state.sessionReducer.patient 
	if (user) return user
	return {
		model: state.sessionReducer.model
	}
}

export default connect(mapStateToProps)(Login);
