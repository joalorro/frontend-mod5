import React from 'react';
import { Link } from 'react-router-dom'
import Signup from './generalviews/Signup'
import { connect } from 'react-redux'

const Home = ({ sessionUser, history }) => {
	
	const renderLinkForPatients = () => {
		console.log('patient in session: ', sessionUser)
		return (
			<div>
				Welcome, {sessionUser.patient.first_name}
				<br />
				<button onClick={renderNextPageForUser}>
					Go to your exercise index!
				</button>
			</div>
		)
	}

	const renderLinkForTherapists = () => {
		console.log('therapist in session: ', sessionUser)
		return (
			<div>
				Welcome, {sessionUser.therapist.first_name}
				<br />
				<button onClick={renderNextPageForUser} >
					Go to your patients index!
				</button>
			</div>
		)
	}

	const renderLoginButton = () => {
		console.log('no session detected')
		return (
			<Link to="/login" exact component={Signup}>  
				<button className="button signup" > Log-in </button>
			</Link>
		)
	}

	const checkIfLoggedThenRenderLink = () => {
		let link
		if (!!(sessionUser && sessionUser.therapist)) {
			link = renderLinkForTherapists()
		} else if (!!(sessionUser && sessionUser.patient)) {
			link = renderLinkForPatients()
		} else {
			link = renderLoginButton()
		}
		return link
	}

	const renderNextPageForUser = () => {
		let model = Object.keys(sessionUser)[0]
		let slug =  '/' + sessionUser[model].last_name + '-' + sessionUser[model].first_name + (model === 'therapist' ? '/patients' : '/exercises')
		history.push(slug)
	}
	
	return (
		<div>
			{checkIfLoggedThenRenderLink()}
		</div>
	);
}

const mapStateToProps = state => {
	return {
		sessionUser: state.sessionReducer
	}
}

export default connect(mapStateToProps)(Home);
