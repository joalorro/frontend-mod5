import React from 'react';
import { NavLink } from 'react-router-dom'
import '../../stylesheets/navbar.css'

const Navbar = () => {
	return (
		<div className="navbar">
			<NavLink
			to='/'
			>
			(nav bar)
			</NavLink>
		</div>
	);
}

export default Navbar;
