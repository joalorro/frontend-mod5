import React from 'react';
import '../css/style.css'

const ErrorMsg = ({error}) => {
	return <p className='err'>{error}</p>
}

export default ErrorMsg;
