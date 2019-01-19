import React from 'react';
import { connect } from 'react-redux'

import LogoutMsg from './login-components/LogoutMsg'
import LoginAs from './login-components/LoginAs'
import LoginForm from './login-components/LoginForm'

const Login = ({ user, history, model }) => {

	let loginDisplay

	// if a model/role has not been chosen, that means they are already logged in
	// or the user needs to choose their role
	if (!model) {
		loginDisplay = user ? <LogoutMsg history={history} /> : <LoginAs history={history} />
	} else {
		loginDisplay = <LoginForm history={history} />
	}

	return (
		<div className='full-page'>
			<div id='login-container'>
				{loginDisplay}
			</div>
		</div>
	)
}

const mapStateToProps = ({ sessionReducer }) => {
	const user = sessionReducer && sessionReducer.therapist ? sessionReducer.therapist : sessionReducer.patient 
	if (user) return { user }
	return { 
		model: sessionReducer.model
	}
}

export default connect(mapStateToProps)(Login);
