import React from 'react';
import { NavLink } from 'react-router-dom'
import '../stylesheets/navbar.css'

const Navbar = () => {

	return (
		<div className="navbar">
			<NavLink
			to='/'
			>
			Home
			</NavLink>
			<NavLink
			to="/login"
			>
			{localStorage.getItem('token') ? "Logout" : "Login"}
			</NavLink>
		</div>
	);
}

export default Navbar;
