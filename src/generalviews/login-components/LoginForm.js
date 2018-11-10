import React from 'react';
import { connect } from 'react-redux'
import { Icon, Form } from 'semantic-ui-react'
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
		debugger
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
			<div className="login-as-div">
				<div className='login-centered-div'>
					<div className="icon-holder">
						<Icon enabled name="chevron left large" className="back-icon" onClick={ handleClickBack } />
					</div>
					<div className="error-div">
						{!!error ? <ErrorMsg error={error} /> : null}
					</div>
					<div className="form-container">
						<Form onSubmit={handleLogin} >
							<input type="text" ref={email} placeholder="Enter your email" /> <br />
							<input type="password" ref={password} placeholder="Enter your password" /> <br />
							
							<div className="btn-container" >
								<button
									className='ui icon right labeled button login-as-btn right'
								>
									<i aria-hidden='true' class='right chevron icon' />
									<span className="btn-text-next">
										Next
									</span>
								</button>
							</div>
						</Form>
					</div>
				</div>
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
