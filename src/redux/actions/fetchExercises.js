import { API_ROOT } from '../../constants'

export function fetchExercises(id,model){
	return (dispatch) => {
		return fetch(`${API_ROOT}/${model}s/${id}/exercises`)
			.then(res => res.json() )
			.then(exercises => {
				return dispatch({
					type: "FETCH_EXERCISES",
					exercises					
				})
			})
	}
}