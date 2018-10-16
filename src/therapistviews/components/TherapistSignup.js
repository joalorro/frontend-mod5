import React, { Component } from 'react';
import AppAdapter from '../../adapters/AppAdapter'
import { Redirect } from 'react-router-dom'

class TherapistSignup extends Component {

	state = {
		firstName: '',
		lasatName: '',
		license: '',
		degree: '',
		certifications: '',
		email: '',
		password: '',
		submitted: false
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}, () => console.log(this.state))
	}

	handleSubmit = e => {
		e.preventDefault()
		const body = {
			therapist: {
				first_name: this.state.firstName,
				last_name: this.state.lastName,
				license: this.state.license,
				degree: this.state.degree,
				certifications: this.state.certifications,
				email: this.state.email,
				password: this.state.password
			}
		}
		AppAdapter.signUp({body, model: 'therapists'}).then(response => console.log(response))
		this.setState({
			submitted: true
		})
	}

	render() {
		if (this.state.submitted){
			return <Redirect to={"/" + this.state.lastName + "-" + this.state.firstName + "/patients"} />
		}

		return (
			<div>
				dat PT signup doe
				<div className="form-container">
					<form onSubmit={this.handleSubmit}>
						<input onChange={this.handleChange} type="text" name="firstName" placeholder="First Name"/> <br />
						<input onChange={this.handleChange} type="text" name="lastName" placeholder="Last Name"/> <br />

						<input onChange={this.handleChange} type="text" name="license" placeholder="License #" /> <br />
						<input onChange={this.handleChange} type="text" name="degree" placeholder="degree" /> <br />
						<input onChange={this.handleChange} type="text" name="certifications" placeholder="certifications" /> <br />

						<input type="text" name="email" onChange={this.handleChange} placeholder="email e.g. email@example.com"/> <br />
						<input type="text" name="email" placeholder="confirm email"/> <br /> <br/>
						
						<input type="password" name="password" onChange={this.handleChange} placeholder="create password"/> <br />
						<input type="password" name="password" placeholder="confirm password"/> <br />
						<input type="submit" value="Sign Up" />
					</form> 
				</div>
			</div>
		);
	}
}

export default TherapistSignup;
