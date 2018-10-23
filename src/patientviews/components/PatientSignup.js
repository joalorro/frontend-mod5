import React, { Component } from 'react';
import AppAdapter from '../../adapters/AppAdapter';
import ErrorMsg from '../../generalviews/ErrorMsg'
import { createPatientSession } from '../../redux/actions/actions'
import { connect } from 'react-redux'

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
				body,
				model: 'patients'
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
				} else {
					this.setState({errors: []})
					response.errors.forEach(e => this.addError(e))
				}
			})
	}

	addError = error => {
		this.setState(prevState => ({errors: prevState.errors.concat(error)}))
	}

	renderErrors = () => {
		return this.state.errors.map( e => <ErrorMsg key={e} error={e} />)
	}
	
	render() {
		return (
			<div>
				<div className="form-container">
					<form onSubmit={this.handleSubmit}>
						<input onChange={this.handleChange} type="text" name="firstName" placeholder="First Name" /> <br />
						<input onChange={this.handleChange} type="text" name="lastName" placeholder="Last Name" /> <br />
						<input onChange={this.handleChange} type="text" name="email" placeholder="Enter Email e.g. email@example.com"/> <br />
						<input onChange={this.handleChange} type="text" name="confirmEmail" placeholder="Confirm Email"/> <br />

						<input onChange={this.handleChange} type="text" name="identifier" placeholder="PT Identifier" /> <br />

						<input onChange={this.handleChange} type="password" name="password" placeholder="Enter Password"/> <br />
						<input onChange={this.handleChange} type="password" name="confirmPassword"  placeholder="Confirm Password"/> <br />
						<input type="submit" value="Sign Up" />
					</form> 
					<div className='error-div'>
						{this.state.errors ? this.renderErrors() : null}
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
