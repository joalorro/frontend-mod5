export const commentReducer = (state = {comments: []}, action) => {
	switch(action.type){
		case "FETCH_COMMENTS":
			console.log('action from commentReducer: ', action)
			return {
				comments: action.comments
			}
		default:
			return state
	}
}