import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import AppAdapter from '../../adapters/AppAdapter'

import {createPatientSession,createTherapistSession} from '../../redux/actions/actions'

class Login extends Component {
	
	state = {
		email: '',
		password: '',
		model: "patient",
		chosen: false,
		submitted: false
	}

	handleChooseLogin = e => {
		this.setState({
			model: e.target.value
		}, () => console.log(this.state))
	}

	handleLoginAs = e => {
		e.preventDefault()
		this.setState({
			chosen: true
		})
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmitLogin = e => {
		e.preventDefault()
		AppAdapter.login({
			body: {
				email: this.state.email,
				password: this.state.password,
				model: this.state.model
			}
		}).then(res => {
			// if (res.status === 200){
				return res.json()
			// }
		})
		.then(response => {
			if (!response.error){
				if (this.state.model === 'patient'){
					this.props.createPatientSession(response)
				} else {
					this.props.createTherapistSession(response)
				}
				
				this.setState({
					submitted: true
				})
			}
		})
	}

	renderNextPage = () => {
		let slug
		let route 
		if (this.state.model === 'patient' ) {
			let patient = this.props.session.patient
			slug = `/${patient.last_name}-${patient.first_name}`
			route = '/exercises'
		} else {
			let therapist = this.props.session.therapist 
			slug = `/${therapist.last_name}-${therapist.first_name}`
			route = '/patients'
		}
		return <Redirect to={slug + route} />
	}
	
	render() {
		console.log(this.state)
		if (!this.state.chosen){
			return (
				<form onSubmit={this.handleLoginAs}>
					<label>Login as a: </label> <br />
					<select onChange={this.handleChooseLogin}>
						<option value="patient">Patient</option>
						<option value="therapist">Therapist</option>
					</select>
					<input type="submit" value="Next" />
				</form>
			)
		} else if (this.state.submitted) {
			return this.renderNextPage()
		} else {

			return (
				<div>
					<div className="form-container">
						<form onSubmit={this.handleSubmitLogin}>
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
}

const mapStateToProps = state => {
	return {
		session: state.session
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createPatientSession: (patient) => {
			return dispatch(createPatientSession(patient))
		},
		createTherapistSession: (therapist) => {
			return dispatch(createTherapistSession(therapist))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
