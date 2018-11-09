import React from 'react';
import { connect } from 'react-redux'
import { Icon, Form } from 'semantic-ui-react'

import { createPatientSession, createTherapistSession } from '../../redux/actions/actions'

import ErrorMsg from '../ErrorMsg'

const LoginForm = ({ history,errors,role }) => {
	
	let email = React.createRef()
	let password = React.createRef()
	
	const handleLogin = () => {
		if (role === 'therapist') {
			createTherapistSession({ email,password })
		} else if (role === 'patient') {
			createPatientSession({ email, password})
		}
	}

	return (
		<div className='login-msg-container'>
			<div className="login-as-div">
				<div className='login-centered-div'>
					<div className="icon-holder">
						<Icon enabled name="chevron left large" className="back-icon" onClick={() => history.push('/login')} />
					</div>
					<div className="error-div">
						{!!errors ? <ErrorMsg errors={errors} /> : null}
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

const mapStateToProps = (state) => {
	return {
		role: state.sessionReducer.role,
		errors: state.sessionReducer.errors
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	if (ownProps.role === 'therapist') {
		return { 
			createTherapistSession: ({ email, password }) => dispatch(createTherapistSession({ email, password }))
		}
	} else if (ownProps.role === 'patient') {
		return {
			createPatientSession: ({ email, password }) => dispatch(createPatientSession({ email, password }))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
