export const commentsReducer = (state = {comments: []}, action) => {
	switch(action.type){
		case "FETCH_COMMENTS":
			console.log('action from commentsReducer: ', action)
			debugger
			return {
				comments: action.comments
			}
		default:
			return state
	}
}