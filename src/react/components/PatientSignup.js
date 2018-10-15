import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import AppAdapter from '../../adapters/AppAdapter';

class PatientSignup extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		identifier: '',
		signedUp: false
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		},() => console.log(this.state))
	}

	handleSubmit = e => {
		e.preventDefault()
		let body = {
			patient: {
				first_name: this.state.firstName,
				last_name: this.state.lastName,
				email: this.state.email,
				password: this.state.password,
				identifier: this.state.identifier
			}
		}
		
		AppAdapter.signUp({body, model: 'patients'}).then(response => console.log(response))
		this.setState({
			signedUp: true
		})
	}
	
	render() {
		if (this.state.signedUp){
			let slug = `/${this.state.lastName}-${this.state.firstName}`
			return <Redirect to={slug + '/exercises'} />
		}

		return (
			<div>
				<div className="form-container">
					<form onSubmit={this.handleSubmit}>
						<input onChange={this.handleChange} type="text" name="firstName" placeholder="First Name" /> <br />
						<input onChange={this.handleChange} type="text" name="lastName" placeholder="Last Name" /> <br />
						<input type="text" name="email" onChange={this.handleChange} placeholder="Enter Email e.g. email@example.com"/> <br />
						<input type="text" placeholder="Confirm Email"/> <br />

						<input onChange={this.handleChange} type="text" name="identifier" placeholder="PT Identifier" /> <br />

						<input type="password" name="password" onChange={this.handleChange} placeholder="Enter Password"/> <br />
						<input type="password" placeholder="Confirm Password"/> <br />
						<input type="submit" value="Log In" />
					</form> 
				</div>
			</div>
		);
	}
}

export default PatientSignup;
