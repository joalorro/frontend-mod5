import { API_ROOT } from '../../constants'

export function fetchExercises(patientId){
	return (dispatch) => {
		return fetch(API_ROOT + '/exercises')
			.then(res => res.json())
			.then(exercises => dispatch({
				type: 'FETCH_EXERCISES',
				exercises: exercises.filter(e => patientId === e.patient.id).map(e => ({
					id: e.id,
					name: e.name,
					desc: e.desc,
					flagged: e.flagged
				}))
			}))
	}
}