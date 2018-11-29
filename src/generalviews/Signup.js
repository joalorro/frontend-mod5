import React, { Component } from 'react';
import { Form } from 'semantic-ui-react'
import '../stylesheets/signup.css'

class Signup extends Component {

	state = {
		model: '',
		error: '',
		slug: '/signup/'
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.history.push(this.state.slug + this.state.model)
	}

	handleChooseModel = (e) => {
		console.log(e.target.name)
		this.setState({
			model: e.target.name,
			error: ''
		})
	}

	renderErrorMsg = () => {
		return (
			<p className='err'>{this.state.error}</p>
		)
	}

	renderClassName = (buttonModel) => {
		return "model-btn hvr-fade-signup " + (this.state.model === buttonModel ? 'active' : '')
	}

	render() {
		let { error } = this.state.error
		return (
			<div className="signup-content-container">
				<div className="signup-msg-container" >
					<div className="signup-as-div select-container" >
						<Form onSubmit={this.handleSubmit}>
						<label>Sign up as a:</label> 
							<div id="select-model" className="login-as-btn-div">
								<button
									type="button"
									name="patient"
									className={this.renderClassName("patient")}
									onClick={this.handleChooseModel}
								>
									Patient
								</button>
									<button
										type="button"
										name="therapist"
										className={this.renderClassName("therapist")}
										onClick={this.handleChooseModel}
									>
										PT
								</button>
							</div>

							<div className="login-error-div">
								{error === '' ? null : this.renderErrorMsg()}
							</div>

							<div className="login-as-btn-div" > 
								<button 
									className="ui icon left labeled button login-as-btn left"
									onClick={() => this.props.history.push('/login')}
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
						</Form>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;
