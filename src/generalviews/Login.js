import React from 'react';
import { connect } from 'react-redux'

import LogoutMsg from './components/LogoutMsg'
import LoginAs from './components/LoginAs'
import LoginForm from './components/LoginForm'

const Login = ({ user, history, role }) => {

	const renderLogout = () => {
		return ( 
			<LogoutMsg user={user} /> 
		)
	}

	const renderLoginAs = () => {
		return <LoginAs history={history} />
	}

	if (!role) {
		return (
			<div>
				{user ? renderLogout() : renderLoginAs()}
			</div>
		);
	} else {
		return <LoginForm />
	}
}

const mapStateToProps = state => {
	const user = state.sessionReducer && state.sessionReducer.therapist ? state.sessionReducer.therapist : state.sessionReducer.patient 
	if (user) return user
	return {
		role: state.sessionReducer.role
	}
}

export default connect(mapStateToProps)(Login);
