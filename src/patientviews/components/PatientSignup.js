import React, { Component } from 'react';
import AppAdapter from '../../adapters/AppAdapter';
import ErrorMsg from '../../generalviews/ErrorMsg'
import { createPatientSession } from '../../redux/actions/actions'
import { connect } from 'react-redux'
import '../../stylesheets/signup.css'
import { Form, Button, Icon } from 'semantic-ui-react'

class PatientSignup extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		confirmEmail: '',
		password: '',
		confirmPassword: '',
		identifier: '',
		errors: []
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		},() => console.log(this.state))
	}

	handleSubmit = e => {
		e.preventDefault()
		this.completeSignup()
	}
	
	renderErrorMsg = () => {
		let errorString = ''
		this.state.errors.forEach(e => {
			errorString += e + '. \n'
		})
		alert(errorString)
	}

	completeSignup = () => {
		let body = {
			patient: {
				first_name: this.state.firstName,
				last_name: this.state.lastName,
				email: this.state.email,
				email_confirmation: this.state.confirmEmail,
				password: this.state.password,
				password_confirmation: this.state.confirmPassword,
				identifier: this.state.identifier
			}
		}

		AppAdapter.signUp({
				body, model: 'patients'
			})
			.then(response => {
				console.log('response', response)
				if (!response.errors && !response.error) {
					let slug
					if (this.state.lastName.split(' ').length > 1 || this.state.firstName.split(' ') > 1){
						let lastName = this.state.lastName.split(' ').join('-')
						let firstName = this.state.firstName.split(' ').join('-')
						slug = `/${lastName}-${firstName}/exercises`
					} else {
						slug = `/${this.state.lastName}-${this.state.firstName}/exercises`
					}
					this.props.createPatientSession(response)
					localStorage.setItem('token', response.patient.token)
					this.props.history.push(slug)
					document.body.scrollTop = document.documentElement.scrollTop = 0
				} else {
					this.setState({ errors: response.errors }, () => {
						this.setState({ errors: [] })
					})
				}
			})
	}

	renderErrors = () => {
		let i = 0
		return this.state.errors.map(e => {
			return <ErrorMsg key={++i} error={e} />
		})
	}

	render() {
		return (
			<div className="signup-content-container">
				<div id="patient-form-div" className="signup-msg-container" >
					<div className="signup-as-div">
						<div className="icon-holder">
							<Icon enabled name="chevron left large" className="back-icon" onClick={() => this.props.history.push('/signup')}/>
						</div>
						<Form id="patient-signup" onSubmit={this.handleSubmit}>

							<section>
								<label>First Name</label>
								<input onChange={this.handleChange} type="text" name="firstName" placeholder="Jane" /> 
								<label>Last Name</label>
								<input onChange={this.handleChange} type="text" name="lastName" placeholder="Doe" /> 
							</section>
							
							<section>
								<label>Email</label>
								<input onChange={this.handleChange} type="text" name="email" placeholder="jane@doe.com"/> 
								<label>Confirm Email</label>
								<input onChange={this.handleChange} type="text" name="confirmEmail" placeholder="jane@doe.com"/> 

								<label>Password</label>
								<input onChange={this.handleChange} type="password" name="password" placeholder="Enter Password"/> 
								<label>Confirm Password</label>
								<input onChange={this.handleChange} type="password" name="confirmPassword"  placeholder="Confirm Password"/> 
							</section>
							<div className='signup-btn-container'>
								<Button className="ui primary button">Sign Up</Button>
							</div>
						</Form> 
						{this.state.errors.length ? this.renderErrorMsg() : null}
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createPatientSession: (patient) => dispatch(createPatientSession(patient))
	}
}

export default connect(null, mapDispatchToProps)(PatientSignup);
