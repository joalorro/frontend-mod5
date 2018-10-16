import { API_ROOT } from '../../constants'

export function fetchPatients(therapistId){
	return (dispatch) => {
		return fetch(API_ROOT + '/patients')
			.then(res => res.json())
			.then(patients => dispatch({
				type: 'FETCH_PATIENTS',
				patients: patients.filter(p => p.therapists.find( t => t.id === therapistId))
			}))
	}
}