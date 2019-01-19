import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

import Error from '../notifications/Error'

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

	renderErrorMsg = () => (
		<p className='err'>{this.state.error}</p>
	)

	renderClassName = (buttonModel) => {
		return "model-btn hvr-fade " + (this.state.model === buttonModel ? 'active' : '')
	}

	render(){
		const { history } = this.props
		let { error } = this.state.model
		return (
			<Fragment>
				{error === '' ? null : this.renderErrorMsg()}
				<Form id="login-as-form" onSubmit={this.handleLoginAs}>
					<label>Login as a: </label> <br />

					<section className="login-as-btn-container"
					>
						<button 
							type='button'
							name="patient" 
							className={this.renderClassName("patient")}
							onClick={this.handleChooseModel}
						>
							Patient
						</button>
						<button 
							type='button'
							name="therapist" 
							className={this.renderClassName("therapist")}
							onClick={this.handleChooseModel}
						>
							PT
						</button>
					</section>

					<section className="login-as-btn-container">
						<button className="ui icon left labeled button next-btn"
							onClick={() => history.push('/')}
						>
							<i aria-hidden='true' class='left chevron icon' />
							<span className="back">Back</span>
						</button >
						<button className='ui icon right labeled button back-btn'>
							<i aria-hidden='true' class='right chevron icon' />
							<span className="next">
								Next
							</span>
						</button>
					</section>
				</Form>
				<p id='register-msg'>Don't have an account yet? 	Register <span 
				onClick={() => history.push('/signup')} 
				id='signup-link' >
						here
					</span>. 
				</p>
			</Fragment> 
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		chooseModel: (model) => dispatch(chooseModel(model))
	}
}

export default connect(null, mapDispatchToProps)(LoginAs);
