import React, { Component } from 'react';
import { connect } from 'react-redux'
import AppAdapter from '../adapters/AppAdapter'
import ErrorMsg from './ErrorMsg'
import '../stylesheets/login.css'
import { Form, Icon } from 'semantic-ui-react'

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
		this.setState({chosen: false, error: ''})
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
			<div className="logged-in-content-container">
				<div className="login-msg-div">
					Logged in as: <br />
					<p className="logged-in-name">{session[model].first_name + ' ' + session[model].last_name} </p>
				</div>
				<div className="btn-container">
					<form onSubmit={this.handleLogout} >
						<button className="ui inverted button" >Log Out</button>
					</form>
				</div>
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
		let innerContent
		if (Object.keys(this.props.session).length){
			//Render content if user is logged in
			innerContent = (
				<div className="login-msg-container">
					{this.renderRedirectBtnIfLoggedIn()}
				</div>
			)
		} else if (!this.state.chosen){
			// 'login as' menu if user is not logged in
			innerContent = (
				<div className="login-msg-container">
					<div className="login-as-div">
						<Form onSubmit={this.handleLoginAs}>
							<label>Login as a: </label> <br />
							<select onChange={this.handleChooseLogin} className="select-bar">
								<option value="patient">Patient</option>
								<option value="therapist">Therapist</option>
							</select>
							<button className="ui icon left labeled button login-as-btn"
								onClick={() => this.props.history.push('/')}
							>
								<i aria-hidden='true' class='left chevron icon' />
								<span className="btn-text-back">Back</span>
							</button >
							<button className='ui icon right labeled button login-as-btn'>
								<i aria-hidden='true' class='right chevron icon' />
								<span className="btn-text-next">
									Next
								</span>
							</button>
						</Form>
					</div>
					<div className="register-msg">
						<p>Don't have an account yet? Register <span onClick={this.handleRedirectToSignup} id='signup-link' >here</span>. </p>
					</div>
				</div>
			)
		} else {
			//content if user has chosen which role to log in as
			
			innerContent = (
				<div className='login-msg-container'>
					<div className="login-as-div">
						<div className='login-centered-div'>
							<div className="icon-holder">
								<Icon enabled name="chevron left large" className="back-icon" onClick={() => this.setState({chosen: false})}/>
							</div>
							<div className="error-div">
								{!!this.state.error ? <ErrorMsg error={this.state.error} /> : null}
							</div>
							<div className="form-container">
								<Form onSubmit={this.handleSubmitLogin} >
									<input type="text" name="email" onChange={this.handleChange} placeholder="Enter your email"/> <br />
									<input type="password" name="password" onChange={this.handleChange} placeholder="Enter your password"/> <br />
									
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

		return (
			<div className="login-content-container">
				{innerContent}
			</div>
		)

	}
}

const mapStateToProps = state => {
	return {
		session: state.sessionReducer
	}
}

export default connect(mapStateToProps)(Login);
