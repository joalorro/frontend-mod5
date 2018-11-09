import React from 'react';
import { connect } from 'react-redux'
import { chooseModel } from '../../redux/actions/actions'

import { Form } from 'semantic-ui-react'

import '../../stylesheets/login.css'


const LoginAs = ({ history, chooseModel }) => {
	
	let model = React.createRef()

	const handleLoginAs = () => {
		chooseModel(model.current.value)
	}
	
	return (
		<div className="login-msg-container">
			<div className="login-as-div">
				<Form onSubmit={handleLoginAs}>
					<label>Login as a: </label> <br />
					
					<select ref={model} className="select-bar">
						<option value="patient">Patient</option>
						<option value="therapist">Therapist</option>
					</select>
					
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
				</Form>
			</div>
			<div className="register-msg">
				<p>Don't have an account yet? Register <span onClick={() => history.push('/signup')} id='signup-link' >here</span>. </p>
			</div>
		</div> 
	)
}

const mapDispatchToProps = dispatch => {
	return {
		chooseModel: (model) => dispatch(chooseModel(model))
	}
}

export default connect(null, mapDispatchToProps)(LoginAs);
