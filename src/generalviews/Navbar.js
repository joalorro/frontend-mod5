import React from 'react';
// import { NavLink } from 'react-router-dom'
import '../stylesheets/menus.css'

const Navbar = () => {

	return (
		<div id="navbar">
			<ul className='ui pointing secondary menu'>
				<li>
					<a className='item' href="/">Home</a>
				</li>
				<li className="right menu">
					<a className='item' href='/login'>Logout</a>
				</li>

			</ul>
		</div>
	);
}

export default Navbar;
