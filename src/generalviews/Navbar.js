import React from 'react';
import '../css/menus.css'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

const Navbar = ({ user }) => {

	const handleMouseOver = (e) => {
		e.target.classList.toggle('active')
	}

	const handleMouseOut = (e) => {
		e.target.classList.toggle('active')
	}
	
	const renderLinkToIndex = () => {
		let btnTxt
		let slug = '/'  
		if (user.therapist) {
			btnTxt = 'Patients'
			slug += user.therapist.last_name.split(' ').join('-') + user.therapist.first_name.split(' ').join('-') + '/patients'
		} else if (user.patient) {
			btnTxt = 'Exercises'
			slug += user.patient.last_name.split(' ').join('-') + user.patient.first_name.split(' ').join('-') + '/exercises'
		}
		return <a className='item' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} href={slug}>{btnTxt}</a>
	}

	return (
		<div id="navbar">
			<ul className='ui pointing secondary menu'>
				<li>
					<a className='item' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} href="/">Home</a>
				</li>
				<li className="right menu">
					{!isEmpty(user) ? renderLinkToIndex() : null}
					<a className='item' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} href='/login'> {!isEmpty(user) ? "Logout" : "Login"}</a>
				</li>
			</ul>
		</div>
	);
}

const mapStateToProps = ({ sessionReducer }) => {
	let user
	if (sessionReducer.therapist || sessionReducer.patient) user = sessionReducer
	return { user }
}

export default connect(mapStateToProps)(Navbar);
