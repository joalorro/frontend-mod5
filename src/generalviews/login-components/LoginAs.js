import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Form } from 'semantic-ui-react'
import { chooseModel } from '../../redux/actions/actions'

class LoginAs extends Component {
	
	state = {
		model: '',
		error: ''
	}

	handleLoginAs = () => {
		if ( this.state.model ){
			this.props.history.location.pathname = '/login/' + this.state.model
			this.props.chooseModel(this.state.model)
		} else {
			this.setState({ error: 'You must choose a role before logging in.'})
		}
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
		return "model-btn hvr-fade2 " + (this.state.model === buttonModel ? 'active' : '')
	}

	render(){
		const { history } = this.props
		let { error } = this.state.model
		return (
			<div className="login-msg-container">
				<div className="login-as-div">
					<Form id="login-as-form" onSubmit={this.handleLoginAs}>
						<label>Login as a: </label> <br />
	
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
							{ error === '' ? null : this.renderErrorMsg() }
						</div>
						
						<div className="login-as-btn-div">
							<button className="ui icon left labeled button login-as-btn"
								onClick={() => history.push('/')}
							>
								<i aria-hidden='true' class='left chevron icon' />
								<span className="btn-text-back">Back</span>
							</button >
							<button className='ui icon right labeled button login-as-btn'>
								<i aria-hidden='true' class='right chevron icon' />
								<span className="btn-text-next">
									Next
								</span>
							</button>
						</div>
					</Form>
				</div>
				<div className="register-msg">
					<p>Don't have an account yet? Register <span onClick={() => history.push('/signup')} id='signup-link' >here</span>. </p>
				</div>
			</div> 
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		chooseModel: (model) => dispatch(chooseModel(model))
	}
}

export default connect(null, mapDispatchToProps)(LoginAs);
