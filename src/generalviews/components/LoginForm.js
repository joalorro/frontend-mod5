import React from 'react';
import { Icon, Form } from 'semantic-ui-react'
import ErrorMsg from '../ErrorMsg'

const LoginForm = () => {
	return (
		<div className='login-msg-container'>
					<div className="login-as-div">
						<div className='login-centered-div'>
							<div className="icon-holder">
								<Icon enabled name="chevron left large" className="back-icon" onClick={() => this.setState({chosen: false})}/>
							</div>
							<div className="error-div">
								{!!this.state.error ? <ErrorMsg error={this.state.error} /> : null}
							</div>
							<div className="form-container">
								<Form onSubmit={this.handleSubmitLogin} >
									<input type="text" name="email" onChange={this.handleChange} placeholder="Enter your email"/> <br />
									<input type="password" name="password" onChange={this.handleChange} placeholder="Enter your password"/> <br />
									
									<div className="btn-container" > 
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
					<br />
				</div>
	);
}

export default LoginForm;
