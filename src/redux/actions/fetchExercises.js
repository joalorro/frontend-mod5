import { API_ROOT } from '../../constants'

export function fetchExercises(id,model){
	return (dispatch) => {
		return fetch(`${API_ROOT}/${model}s/${id}/exercises`)
			.then(res => res.json() )
			.then(exercises => {
				debugger
				return dispatch({
					type: "FETCH_EXERCISES",
					exercises					
				})
			})
	}
}
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
					url: e.url,
					flagged: e.flagged,
					patientId: e.patient.id,
					comments: e.comments
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
					url: e.url,
					flagged: e.flagged,
					comments: e.comments
				}
			})
		}))
	}
}