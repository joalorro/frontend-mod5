import React, { Component } from 'react';

class Signup extends Component {

	state = {
		slug: '/signup/patient'
	}

	handleClickBack = () => {
		this.props.history.push('/login')
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.history.push(this.state.slug)
	}

	handleChange = event => {
		this.setState({
			slug: '/signup/' + event.target.value
		}, () => console.log(this.state))
	}

	render() {
		return (
			<div>
				Sign up as a: 
				<form onSubmit={this.handleSubmit}>
					<select onChange={this.handleChange}>
						<option value="patient" >Patient</option>
						<option value="therapist" >Physical Therapist</option>
					</select>
					<button onClick={this.handleClickBack}>Back</button>
					<input type='submit' value="Next"/>
				</form>
			</div>
		);
	}
}

export default Signup;
