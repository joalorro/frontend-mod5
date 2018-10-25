const initialState = {
	exercises: []
}

export const exerciseReducer = (state = initialState, action) => {
	console.log('action from exercise reducer: ', action)
	switch (action.type){
		case "SELECT_EXERCISE":
			return state
		case "FETCH_EXERCISES":
			return {
				...state,
				exercises: action.exercises
			}
		case "UPDATE_EXERCISE":
			return {
				...state,
				exercise: action.exercise
			}
		default:
			return state 
	}
}