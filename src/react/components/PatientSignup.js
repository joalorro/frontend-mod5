import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import AppAdapter from '../../adapters/AppAdapter';

class PatientSignup extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
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
				password: this.state.password
			}
		}
		// fetch('http://localhost:3000/patients', {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// 	body: JSON.stringify(body)
		// }).then(res => res.json()).then(response => console.log(response))
		
		AppAdapter.signUp({body, model: 'patients'}).then(response => console.log(response))

	}
	
	render() {
		if (this.state.signedUp){
			return <Redirect to="" />
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
