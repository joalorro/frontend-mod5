import React, { Component } from 'react';
import { connect } from 'react-redux'
import AppAdapter from '../adapters/AppAdapter'
import ErrorMsg from './ErrorMsg'
import '../stylesheets/login.css'

import {createPatientSession,createTherapistSession} from '../redux/actions/actions'

class Login extends Component {
	
	state = {
		email: '',
		password: '',
		model: "patient",
		chosen: false,
		error: ''
	}

	handleChooseLogin = e => {
		this.setState({
			model: e.target.value
		}, () => console.log(this.state))
	}

	handleClickBackToHome = () => {
		this.props.history.push('/')
	}

	handleClickBackToLoginAs = () => {
		this.setState({chosen: false})
	}

	handleLoginAs = e => {
		e.preventDefault()
		this.setState({
			chosen: true
		})
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmitLogin = e => {
		e.preventDefault()
		AppAdapter.login({
			body: {
				email: this.state.email,
				password: this.state.password,
				model: this.state.model
			}
		})
		.then(response => {
			console.log('login response: ', response)
			if (!response.error){
				if (response.patient) {
					this.props.createPatientSession(response)
				} else {
					this.props.createTherapistSession(response)
				}
				let model = Object.keys(response)[0]
				localStorage.setItem("token", response[model].token)
				this.setState({
					submitted: true
				}, () => this.renderNextPage())
			} else {
				this.setState({error: response.error})
			}
		})
	}

	handleLogout = () => {
		localStorage.removeItem('token')
	}

	handleRedirectToSignup = () =>{
		this.props.history.push('/signup')
	}

	renderRedirectBtnIfLoggedIn = () => {
		let session = this.props.session
		let model = Object.keys(session)[0]
		return (
			<div className="login-component">
				Logged in as: {session[model].first_name + ' ' + session[model].last_name} <br />
				<form onSubmit={this.handleLogout}>
					<button >Log Out</button>
				</form>

			</div>

		)
	}

	renderNextPage = () => {
		let slug
		let route 
		if (this.state.model === 'patient' ) {
			let patient = this.props.session.patient
			slug = `/${patient.last_name}-${patient.first_name}`
			route = '/exercises'
		} else {
			let therapist = this.props.session.therapist 
			slug = `/${therapist.last_name}-${therapist.first_name}`
			route = '/patients'
		}
		this.props.history.push(slug + route)
	}

	render() {
		console.log(this.state)
		if (Object.keys(this.props.session).length){
			return (
				<div>
					{this.renderRedirectBtnIfLoggedIn()}
				</div>
			)
		} else if (!this.state.chosen){
			return (
				<div className="login-component">
					<form onSubmit={this.handleLoginAs}>
						<label>Login as a: </label> <br />
						<select onChange={this.handleChooseLogin}>
							<option value="patient">Patient</option>
							<option value="therapist">Therapist</option>
						</select>
						<input type="submit" value="Next" />
					</form>
						<button onClick={this.handleClickBackToHome}>Back</button>
					<p>Don't have an account yet? Register <span onClick={this.handleRedirectToSignup} id='signup-link' >here</span>. </p>
				</div>
			)
		} else {
			return (
				<div className='login-component'>
					<div className="form-container">
						<div className="error-div" >
							{!!this.state.error ? <ErrorMsg error={this.state.error} /> : null}
						</div>
						<form onSubmit={this.handleSubmitLogin}>
							<input type="text" name="email" onChange={this.handleChange} placeholder="email e.g. email@example.com"/> <br />
							
							<input type="password" name="password" onChange={this.handleChange} placeholder="password"/> <br />
							<input type="submit" value="Log In" />
						</form> 
							<button onClick={this.handleClickBackToLoginAs}>Back!</button>
					</div>
					<br />
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		session: state.sessionReducer
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createPatientSession: (patient) => {
			return dispatch(createPatientSession(patient))
		},
		createTherapistSession: (therapist) => {
			return dispatch(createTherapistSession(therapist))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
