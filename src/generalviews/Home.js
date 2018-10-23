import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import Signup from './Signup'
import { connect } from 'react-redux'
import '../stylesheets/home.css'
const Home = ({ sessionUser, history }) => {
	
	const renderLinkForPatients = () => {
		console.log('patient in session: ', sessionUser)
		return (
			<Fragment>
				<p className="welcome-msg">
					Welcome, {sessionUser.patient.first_name}
				</p>
				<br />
				<button onClick={renderNextPageForUser}>
					Go to your exercise index!
				</button>
			</Fragment>
		)
	}

	const renderLinkForTherapists = () => {
		console.log('therapist in session: ', sessionUser)
		return (
			<Fragment>
				<p>Welcome, {sessionUser.therapist.first_name}</p>
				<br />
				<button onClick={renderNextPageForUser} >
					Go to your patients index!
				</button>
			</Fragment>
		)
	}

	const renderLoginButton = () => {
		console.log('no session detected')
		return (
			<div id="login-button-div">
				<Link to="/login" exact component={Signup}>  
					<button className="ui button login-btn"> Log in/Sign up  </button>
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
		return (
			<div className="welcome-div">
				<div className="welcome-content-container">
					{link}
				</div>
			</div>
		)
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
					<div id="home-title-container">
						<h1 id="home-title">Continue your journey towards rehabilitation with "App" </h1>
					</div>
				</div>
			</div>
			{/* <div id='right-div'></div> */}
			<div id="bottom-div">
				<div id='bottom-div-content-container'>
					{checkIfLoggedThenRenderLink()}
				</div>
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
