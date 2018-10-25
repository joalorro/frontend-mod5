import React from 'react';
// import { NavLink } from 'react-router-dom'
import '../stylesheets/menus.css'
import { connect } from 'react-redux'

const Navbar = ({sessionPresent}) => {

	return (
		<div id="navbar">
			<ul className='ui pointing secondary menu'>
				<li>
					<a className='item' href="/">Home</a>
				</li>
				<li className="right menu">
					<a className='item' href='/login'> {sessionPresent ? "Logout" : "Login"}</a>
				</li>

			</ul>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		sessionPresent: !!(state.sessionReducer.therapist || state.sessionReducer.patient)
	}
}

export default connect(mapStateToProps)(Navbar);
