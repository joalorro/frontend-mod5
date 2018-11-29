import React from 'react';
import { connect } from 'react-redux'
import { Icon, Form, Button } from 'semantic-ui-react'
import AppAdapter from '../../adapters/AppAdapter'

import { createPatientSession, createTherapistSession, createError, setModel } from '../../redux/actions/actions'
import ErrorMsg from '../ErrorMsg'

const LoginForm = ({model,error = '',history,createPatientSession,createTherapistSession, createError, setModel}) => {
		
	let email = React.createRef()
	let password = React.createRef()

	
	const handleLogin = () => {
		let body = {
			email: email.current.value,
			password: password.current.value,
			model: model
		} 
		AppAdapter.login({ body })
			.then(user => {
				let createUserSession = model === 'patient' ? createPatientSession : createTherapistSession
				createUserSession(user)
				redirectToNextPage(user[model])
			})
			.catch( (err) => {
				console.log(err)
				createError('Invalid password or username')
			})
	}

	const redirectToNextPage = ({last_name, first_name, token}) => {
		let slug = '/' + last_name.split(' ').join('-') + '-' + first_name.split(' ').join('-')
		if (model === 'patient') {
			slug += '/exercises'
		} else if (model === 'therapist') {
			slug += '/patients'
		}
		localStorage.setItem("token", token)
		history.push(slug)
	}

	const handleClickBack = () => {
		setModel('')
		createError('')
	}

	return (
		<div className='login-msg-container'>
			<div className="login-form-div">
				{/* <div className='login-centered-div'> */}
					<div className="login-icon-holder">
						<Icon enabled name="chevron left large" className="back-icon" onClick={ handleClickBack } />
					</div>
					<div className="error-div">
						{!!error ? <ErrorMsg error={error} /> : null}
					</div>
					<div className="form-container">
						<Form onSubmit={handleLogin} id="login-form">
							<section id='login-info'>
								<label>Email</label>
								<input type="text" ref={email} placeholder="person@example.com" />
								<label>Password</label>
								<input type="password" ref={password} placeholder="Enter your password" />
							</section>
							<div className="login-btn-container" >
								<Button className="ui primary button" >
									Login
								</Button>
							</div>
						</Form>
					</div>
				{/* </div> */}
			</div>
			<br />
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		model: state.sessionReducer.model,
		error: state.sessionReducer.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createPatientSession: (patient) => dispatch(createPatientSession(patient)),
		createTherapistSession: (therapist) => dispatch(createTherapistSession(therapist)),
		createError: (error) => dispatch(createError(error)),
		setModel: (model) => dispatch(setModel(''))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
