import { exerciseReducer } from './exerciseReducer'
import { combineReducers } from 'redux'
import { sessionReducer } from './sessionReducer'

const rootReducer = combineReducers({
	exercises: exerciseReducer,
	session: sessionReducer
})

export default rootReducer