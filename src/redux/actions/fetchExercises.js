import { API_ROOT } from '../../constants'

//search exercises by patientId

// export function fetchExercises(patientId){
// 	return (dispatch) => {
// 		return fetch(API_ROOT + '/exercises')
// 			.then(res => res.json())
// 			.then(exercises => dispatch({
// 				type: 'FETCH_EXERCISES',
// 				exercises: exercises.filter(e => patientId === e.patient.id).map(e => ({
// 					id: e.id,
// 					name: e.name,
// 					desc: e.desc,
// 					flagged: e.flagged
// 				}))
// 			}))
// 	}
// }

//search exercises by therapistId

export function fetchExercisesByPT(therapistId){
	return (dispatch) => {
		return fetch(API_ROOT + '/exercises')
		.then(res => res.json())
		.then(exercises => dispatch({
			type: 'FETCH_EXERCISES',
			exercises: exercises.filter( e => e.therapist.id === therapistId).map(e => {
				return {
					id: e.id,
					name: e.name,
					desc: e.desc,
					flagged: e.flagged,
					patientId: e.patient.id
				}
			})
		}))
	}
}

export function fetchExercisesByPatient(patientId){
	return (dispatch) => {
		return fetch(API_ROOT + '/exercises')
		.then(res => res.json())
		.then(exercises => dispatch({
			type: 'FETCH_EXERCISES',
			exercises: exercises.filter( e => e.patient.id === patientId).map(e => {
				return {
					id: e.id,
					name: e.name,
					desc: e.desc,
					flagged: e.flagged
				}
			})
		}))
	}
}