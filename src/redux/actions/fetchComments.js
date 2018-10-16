import { API_ROOT,HEADERS } from '../../constants'

export function fetchComments(exerciseIds){
	return (dispatch) => {
		return fetch(API_ROOT + 'get_comments/', {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify({
				exercise_ids: exerciseIds
			})

		})
		.then(res => res.json())
		.then(comments => dispatch({
			type: "FETCH_COMMENTS",
			comments
		}))
	}
}