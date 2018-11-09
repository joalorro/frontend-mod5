import React from 'react';
import { connect } from 'react-redux'
import { createTherapistSession } from '../../redux/actions/actions'

const TherapistLogin = () => {
	return (
		<div>
			
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		createTherapistSession: (therapist) => {
			return dispatch(createTherapistSession(therapist))
		}
	}
}

export default connect(null,mapDispatchToProps)(TherapistLogin);
