import React, { Component } from 'react';
import AppAdapter from '../../adapters/AppAdapter'
import ErrorMsg from '../../generalviews/ErrorMsg'
import { createTherapistSession } from '../../redux/actions/actions'
import { connect } from 'react-redux'
import '../../stylesheets/signup.css'
import { Form, Button, Icon } from 'semantic-ui-react'

class TherapistSignup extends Component {

	state = {
		firstName: '',
		lastName: '',
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

	renderErrorMsg = () => {
		let errorString = ''
		this.state.errors.forEach(e => {
			errorString += e + '. \n'
		})
		alert(errorString)
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
				document.body.scrollTop = document.documentElement.scrollTop = 0
			} else {
				this.setState({ errors: response.errors }, () => {
					this.setState({ erorrs: [] })
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
				<div id="therapist-form-div" className="signup-msg-container">
					<div className="signup-as-div">
						<div className="icon-holder">
							<Icon enabled name="chevron left large" className="back-icon" onClick={() => this.props.history.push('/signup')}/>
						</div>
						<Form id="therapist-signup" onSubmit={this.handleSubmit}>
							<section>
								<label>First Name</label>
								<input onChange={this.handleChange} type="text" name="firstName" placeholder="First Name"/> 

								<label>Last Name</label>
								<input onChange={this.handleChange} type="text" name="lastName" placeholder="Last Name"/> 
							</section>
							
							<section>
								<label>Email</label>
								<input onChange={this.handleChange} type="text" name="email" placeholder="Email e.g. email@example.com"/> 
								
								<label>Confirm Email</label>
								<input onChange={this.handleChange} type="text" name="email_confirmation" placeholder="Confirm Email"/> 

								<label>Password</label>
								<input onChange={this.handleChange} type="password" name="password" placeholder="Create Password"/> 
								<label>Confirm Password</label>
								<input onChange={this.handleChange} type="password" name="password_confirmation" placeholder="Confirm Password"/> 
							</section>
							
							<section>
								<label>License #</label>
								<input onChange={this.handleChange} type="text" name="license" placeholder="PT#00000000000" /> 
								<label>Certifications</label>
								<input onChange={this.handleChange} type="text" name="certifications" placeholder="i.e. CSCS, OCS, etc" /> 

								<label>Degree</label>
								<select onChange={this.handleChange} name="degree">
									<option selected="selected">Degree</option>
									<option value="Bachelor's">Bachelor's</option>
									<option value="MSPT">MSPT</option>
									<option value="DPT">DPT</option>
								</select>
							</section>

							<div className="signup-btn-container">
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
		createTherapistSession: (therapist) => dispatch(createTherapistSession(therapist))
	}
}

export default connect(null,mapDispatchToProps)(TherapistSignup);
