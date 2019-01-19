import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Icon, Form, Button } from 'semantic-ui-react'
import AppAdapter from '../../adapters/AppAdapter'

import { createPatientSession, createTherapistSession, createError, chooseModel } from '../../redux/actions/actions'
import ErrorMsg from '../ErrorMsg'

const LoginForm = ({ model, error = '', history, createPatientSession, createTherapistSession, createError, chooseModel }) => {
		
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
		chooseModel('')
		createError('')
	}

	return (
		<Fragment>
			<div className="login-icon-holder">
				<Icon enabled name="chevron left large" id="back-icon" onClick={ handleClickBack } />
			</div>

			<div className="error-div">
				{!!error ? <ErrorMsg error={error} /> : null}
			</div>
			<Form onSubmit={handleLogin} id="login-form">

				<label>Email</label>
				<input type="text" ref={email} placeholder="person@example.com" />

				<label>Password</label>
				<input type="password" ref={password} placeholder="Enter your password" />
				
				<Button className="ui primary button" >
					Login
				</Button>
			</Form>
		</Fragment>

	);
}

const mapStateToProps = ({sessionReducer}) => {
	return {
		model: sessionReducer.model,
		error: sessionReducer.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createPatientSession: (patient) => dispatch(createPatientSession(patient)),
		createTherapistSession: (therapist) => dispatch(createTherapistSession(therapist)),
		createError: (error) => dispatch(createError(error)),
		chooseModel: (model) => dispatch(chooseModel(model))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
