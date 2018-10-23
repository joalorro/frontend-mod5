import React from 'react';

const Footer = () => {
	return (
		<div id="footer">
			<div id="footer-content-container">
				<div className="btn-container">
					<button className='ui facebook circular icon button'>
						<i aria-hidden='true' className='facebook icon' />
					</button>
					<button className='ui twitter circular icon button'>
						<i aria-hidden='true' className='twitter icon' />
					</button>
					<button className='ui linkedin circular icon button'>
						<i aria-hidden='true' className='linkedin icon' />
					</button>
					{/* <button className='ui google plus circular icon button'>
						<i aria-hidden='true' className='google plus icon' />
					</button> */}
				</div>

				<div id="divider" className='ui horizontal inverted divider'>Bruh </div>
				
				<div id="footer-text-div">
					<p id="footer-text">Come at me.</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;
