import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

export function Home({ sessionUser, history }){
	const { therapist, patient } = sessionUser

	const checkIfLoggedThenRenderLink = () => {
		let link 
		if ( patient || therapist ) {
			let btnMsg
			if (patient || therapist) {
				btnMsg = `Go to your ${patient ? `Exercise` : `Patient`} Index`
			}
			
			link = (
				<button className='ui inverted button hvr-sweep-to-right welcome-btn'
				onClick={renderNextPageForUser}
				>
					{btnMsg}
				</button>
			)
		} else {
			link = (
				<Link to='/login' >
					<button className='ui inverted button hvr-sweep-to-right login-btn' onClick={() => document.documentElement.scrollTop = 0}>
						Log in/Sign up
					</button>
				</Link>
			)
		}

		return <div className='welcome-content'>
			{link}
		</div>
	}

	const renderWelcomeMsg = () => {
		let msg = 'Welcome'
		if (therapist) msg += ', ' + therapist.first_name
		else if (patient) msg += ', ' + patient.first_name

		return <h5 className='welcome-msg'>{msg}</h5>
	}

	const renderNextPageForUser = () => {
		let model = Object.keys(sessionUser)[0]
		let slug =  '/' + sessionUser[model].last_name + '-' + sessionUser[model].first_name + (model === 'therapist' ? '/patients' : '/exercises')
		document.body.scrollTop = document.documentElement.scrollTop = 0
		history.push(slug)
	}

	const scrollOnClick = () => {
		document.querySelector('.welcome-content').scrollIntoView({
			behavior: 'smooth'
		})
	}

	return (
		<div id='home'>
			<section id='upper'>
				<div id='foreground' >
					<h1 id='home-caption'>
						Continue your journey towards rehabilitation with 
					</h1>
					<h1 id='title'>HomeEx Helper</h1>
				</div>
			</section>
			<section id='lower'>
				{	window.innerWidth > 600
					?
					(<div id='downarrow-div'>
						<Icon className='arrow down large arrow-down' onClick={scrollOnClick}/>
					</div>) : 
					null
				}
				<div id='welcome-outline'>
					<div id='welcome-container'>
						{!!Object.keys(sessionUser) ? renderWelcomeMsg() : null}
						{checkIfLoggedThenRenderLink()}
					</div>
				</div>
			</section>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		sessionUser: state.sessionReducer
	}
}

export default connect(mapStateToProps)(Home);
