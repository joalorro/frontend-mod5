import React from 'react';
import { connect } from 'react-redux'

const LogoutMsg = ({history, user: {first_name, last_name}}) => {
	
	const handleLogout = (e) => {
		window.location.reload()
		localStorage.removeItem('token')
		history.push('/')
	}	
	return (
		<div className="logged-in-content-container">
			<div className="login-msg-container">
				<div className="login-msg-div">
					<p>Logged in as: </p>
					<h3 className="logged-in-name">{first_name + ' ' + last_name} </h3>
				</div>
				<div className="btn-container">
					<form onSubmit={handleLogout} >
						<button className="ui inverted button" >Log Out</button>
					</form>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = ({ sessionReducer }) => {
	const user = sessionReducer && sessionReducer.therapist ? sessionReducer.therapist : sessionReducer.patient 
	return { user }
}

export default connect(mapStateToProps)(LogoutMsg);
