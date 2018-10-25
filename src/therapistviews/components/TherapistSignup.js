import React, { Component } from 'react';
import AppAdapter from '../../adapters/AppAdapter'
import ErrorMsg from '../../generalviews/ErrorMsg'
import { createTherapistSession } from '../../redux/actions/actions'
import { connect } from 'react-redux'
import '../../stylesheets/signup.css'

class TherapistSignup extends Component {

	state = {
		firstName: '',
		lasatName: '',
		license: '',
		degree: '',
		certifications: '',
		email: '',
		email_confirmation: '',
		password: '',
		password_confirmation: '',
		errors: []
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}, () => console.log(this.state))
	}

	handleSubmit = e => {
		e.preventDefault()
		this.completeSignup()
	}

	completeSignup = () => {
		const body = {
			therapist: {
				first_name: this.state.firstName,
				last_name: this.state.lastName,
				license: this.state.license,
				degree: this.state.degree,
				certifications: this.state.certifications,
				email: this.state.email,
				email_confirmation: this.state.email_confirmation,
				password: this.state.password,
				password_confirmation: this.state.password_confirmation
			}
		}
		AppAdapter.signUp({
			body, model: 'therapists'
		})
		.then(response => {
			console.log(response)
			if (!response.errors && !response.error) {
				let slug 
				let lastName 
				let firstName 
				if (this.state.lastName.split(' ').length > 1 || this.state.firstName.split(' ') > 1 ){
					lastName = this.state.lastName.split(' ').join('-')
					firstName = this.state.firstName.split(' ').join('-')
				} else {
					lastName = this.state.lastName 
					firstName = this.state.firstName
				}
				slug = `/${lastName}-${firstName}/patients`
				this.props.createTherapistSession(response)
				localStorage.setItem('token', response.therapist.token)
				this.props.history.push(slug)
			} else {
				this.setState({erorrs: []})
				response.errors.forEach(e => this.addError(e))
			}
		})
		
	}

	addError = (error) => {
		this.setState(prevState => ({errors: prevState.errors.concat(error)}))
	}

	renderErrors = () => {
		let i = 0
		return this.state.errors.map(e => {
			return <ErrorMsg key={++i} error={e} />
		})
	}

	render() {
		return (
			<div>
				<div className="form-container">
					<form onSubmit={this.handleSubmit}>
						<input onChange={this.handleChange} type="text" name="firstName" placeholder="First Name"/> <br />
						<input onChange={this.handleChange} type="text" name="lastName" placeholder="Last Name"/> <br />

						<input onChange={this.handleChange} type="text" name="license" placeholder="License #" /> <br />
						<select onChange={this.handleChange} name="degree">
							<option selected="selected">Degree</option>
							<option value="Bachelor's">Bachelor's</option>
							<option value="MSPT">MSPT</option>
							<option value="DPT">DPT</option>
						</select> <br />


						<input onChange={this.handleChange} type="text" name="certifications" placeholder="Certifications" /> <br />

						<input onChange={this.handleChange} type="text" name="email" placeholder="Email e.g. email@example.com"/> <br />
						<input onChange={this.handleChange} type="text" name="email_confirmation" placeholder="Confirm Email"/> <br /> <br/>
						
						<input onChange={this.handleChange} type="password" name="password" placeholder="Create Password"/> <br />
						<input onChange={this.handleChange} type="password" name="password_confirmation" placeholder="Confirm Password"/> <br />
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
		createTherapistSession: (therapist) => dispatch(createTherapistSession(therapist))
	}
}

export default connect(null,mapDispatchToProps)(TherapistSignup);
