export const exerciseReducer = (state = {},action) => {
	console.log('action from exercise reducer: ', action)
	switch (action.type){
		case "SELECT_EXERCISE":
			return state
		case "FETCH_EXERCISES":
			return {
				...state,
				exercises: action.exercises
			}
		default:
			return state 
	}
}