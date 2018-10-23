import React from 'react';
import { Link } from 'react-router-dom'
import Signup from './Signup'
import { connect } from 'react-redux'
import '../stylesheets/home.css'
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
			<div id="login-button-div">
				<Link to="/login" exact component={Signup}>  
					<button className="button" > Log in/Sign up  </button>
				</Link>
			</div>
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
		<div id="home">
			{/* <div id="left-div"></div> */}
			<div id="background-container">
				<div id="content-container-home">
					<h1 id="home-title">Continue your journey towards rehabilitation with "App" </h1>
				</div>
			</div>
			{/* <div id='right-div'></div> */}
			<div id="bottom-div">
				{checkIfLoggedThenRenderLink()}
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		sessionUser: state.sessionReducer
	}
}

export default connect(mapStateToProps)(Home);
