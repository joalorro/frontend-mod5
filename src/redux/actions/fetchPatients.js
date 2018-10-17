import { API_ROOT } from '../../constants'

export function fetchPatients(therapistId){
	return (dispatch) => {
		return fetch(API_ROOT + 'therapists/' + therapistId + '/patients')
			.then(res => res.json())
			.then(patients => dispatch({
				type: 'FETCH_PATIENTS',
				patients
			}))
	}
}