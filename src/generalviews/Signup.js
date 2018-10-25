import React, { Component } from 'react';
import '../stylesheets/signup.css'

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
			<div className="signup-content-container">
				<div className="signup-msg-container" >
					<div className="signup-as-div">
						Sign up as a: 
					</div>
					<div className="signup-as-div select-container" >
						<form onSubmit={this.handleSubmit}>
							<select onChange={this.handleChange}
								className="full-width"
							>
								<option value="patient" >Patient</option>
								<option value="therapist" >Physical Therapist</option>
							</select>
							<div className="btn-container" > 
								<button 
									className="ui icon left labeled button login-as-btn left"
									onClick={this.handleClickBack}
								>
									<i aria-hidden='true' class='left chevron icon' />
									<span className="btn-text-back">Back</span>
								</button>
								<button 
									className='ui icon right labeled button login-as-btn right'
								>
									<i aria-hidden='true' class='right chevron icon' />
									<span className="btn-text-next">
										Next
									</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;
