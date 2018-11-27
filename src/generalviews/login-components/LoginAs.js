import React from 'react';
import { connect } from 'react-redux'
import { chooseModel } from '../../redux/actions/actions'

import { Form } from 'semantic-ui-react'

import '../../stylesheets/login.css'


const LoginAs = ({ history, chooseModel, model }) => {
	
	// let model = React.createRef()

	const handleLoginAs = () => {
		history.location.pathname = '/login/' + model
	}
	
	const handleChooseModel = (e) => {
		e.preventDefault()
		console.log(e.target.name);
		chooseModel(e.target.name)		
	}

	return (
		<div className="login-msg-container">
			<div className="login-as-div">
				<Form onSubmit={handleLoginAs}>
					<label>Login as a: </label> <br />

					<div id="select-model" className="login-as-btn-div">
						<button 
							type="button"
							name="patient" 
							className={'model-btn hvr-fade2'.concat(model === 'patient' ? ' active' : '')}
							onClick={handleChooseModel}
						>
							Patient
						</button>

						<button 
							type="button" 
							name="therapist" 
							className={'model-btn hvr-fade2'.concat(model === 'patient' ? ' active' : '')}
							onClick={handleChooseModel}
						>
							Therapist
						</button>
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

const mapStateToProps = ({sessionReducer}) => {
	return {
		model: sessionReducer.model
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		chooseModel: (model) => dispatch(chooseModel(model))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAs);
