import React from 'react';
import { connect } from 'react-redux'

import { createPatientSession } from '../../redux/actions/actions'

const PatientLogin = () => {
	return (
		<div>
			
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		createPatientSession: (patient) => {
			return dispatch(createPatientSession(patient))
		}
	}
}

export default connect(null,mapDispatchToProps)(PatientLogin);
