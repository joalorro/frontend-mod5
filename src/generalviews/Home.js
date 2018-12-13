import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

export function Home({ sessionUser, history }){
	
	const renderLinkForPatients = () => {
		console.log('patient in session: ', sessionUser)
		return (
			<Fragment>
				<p className="welcome-msg">
					Welcome, {sessionUser.patient.first_name}
				</p>
				<br />
				<button className='ui inverted button hvr-sweep-to-right login-btn' onClick={renderNextPageForUser} >
					Go to your Exercise Index
				</button>
			</Fragment>
		)
	}

	const renderLinkForTherapists = () => {
		console.log('therapist in session: ', sessionUser)
		return (
			<Fragment>
				<h5 className="welcome-msg">Welcome, {sessionUser.therapist.first_name}</h5>
				<br />
					<div className="login-btn-container">
						<button className='ui inverted button hvr-sweep-to-right login-btn' onClick={renderNextPageForUser} >
							Go to your Patients Index
						</button>
					</div>
			</Fragment>	
		)
	}

	const renderLoginButton = () => {
		console.log('no session detected')
		return (
			<Fragment>
				<br />
				<h5 className="welcome-msg"> </h5>
				<br />
					<div className="login-btn-container">
						<Link to='/login'>
						<button className='ui inverted button hvr-sweep-to-right login-btn' onClick={() => document.body.scrollTop = document.documentElement.scrollTop = 0}>
								Log in/Sign up
							</button>
						</Link>
					</div>
			</Fragment>	
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
				<div className="welcome-content-container-outer">
					<div className="welcome-content-container">
						{link}
					</div>
				</div>
			</div>
		)
	}

	const renderNextPageForUser = () => {
		let model = Object.keys(sessionUser)[0]
		let slug =  '/' + sessionUser[model].last_name + '-' + sessionUser[model].first_name + (model === 'therapist' ? '/patients' : '/exercises')
		document.body.scrollTop = document.documentElement.scrollTop = 0
		history.push(slug)
	}

	const scrollOnClick = () => {
		document.querySelector('.btn-container').scrollIntoView({
			behavior: 'smooth'
		})
	}
	
	return (
		<div id="home">
			<div id="background-container">
				<div id="content-container-home">
					<div id="home-title-container">
						<h1 id="home-title">Continue your journey towards rehabilitation with HomeEx Helper </h1>
					</div>
				</div>
			</div>
			<div id="bottom-div">
				<div id="downarrow-div">
					<Icon className='arrow down large arrow-down' onClick={scrollOnClick}/>
				</div>
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
