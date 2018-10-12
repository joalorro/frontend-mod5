import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Signup extends Component {

	state = {
		redirectSignup: false,
		slug: '/signup/patient'
	}

	handleSubmit = event => {
		event.preventDefault()
		this.setState({
			redirectSignup: true
		})
	}

	handleChange = event => {
		this.setState({
			slug: '/signup/' + event.target.value
		}, () => console.log(this.state))
	}

	render() {
		if (this.state.redirectSignup){
			return <Redirect to={this.state.slug} />
		}
		return (
			<div>
				Sign up as a: 
				<form onSubmit={this.handleSubmit}>
					<select onChange={this.handleChange}>
						<option value="patient" >Patient</option>
						<option value="therapist" >Physical Therapist</option>
					</select>
					<input type='submit' value="Next"/>
				</form>
			</div>
		);
	}
}

export default Signup;
