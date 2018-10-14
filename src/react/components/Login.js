import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Login extends Component {
	
	state = {
		email: '',
		password: ''
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		}, ()=> console.log(this.state))
	}

	handleSubmit = e => {
		e.preventDefault()
	}
	
	render() {
		return (
			<div>
				<div className="form-container">
					<form onSubmit={this.handleSubmit}>
						<input type="text" name="email" onChange={this.handleChange} placeholder="email e.g. email@example.com"/> <br />
						
						<input type="password" name="password" onChange={this.handleChange} placeholder="password"/> <br />
						<input type="submit" value="Log In" />
					</form> 
				</div>
				<br />
				<p>Not yet registered? <a href="/signup">Sign Up!</a> </p>
				{/* <Link to="/signup" >
					<button>dat sign up</button>
				</Link> */}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		
	}
}

export default connect(mapStateToProps)(Login);
