import { exerciseReducer } from './exerciseReducer'
import { combineReducers } from 'redux'
import { sessionReducer } from './sessionReducer'
import { patientReducer } from './patientReducer'

const rootReducer = combineReducers({
	patientReducer,
	exerciseReducer,
	sessionReducer
})

export default rootReducer