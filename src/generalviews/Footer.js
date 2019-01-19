import React from 'react';

const Footer = () => {
	return (
		<div id="footer">
			<div id="icon-container">
				<button className='ui facebook circular icon button'>
					<i aria-hidden='true' className='facebook icon' />
				</button>
				<button className='ui twitter circular icon button'>
					<i aria-hidden='true' className='twitter icon' />
				</button>
				<button className='ui linkedin circular icon button'>
					<i aria-hidden='true' className='linkedin icon' />
				</button>
			</div>

			<div id="divider" className='ui horizontal inverted divider'>Home Exercise Helper </div>
			
			<div id="footer-text-div">
				<p id="footer-text">Bringing therapists and patients together over the web since 2018</p>
			</div>
		</div>
	);
}

export default Footer;
