import { exerciseReducer } from './exerciseReducer'
import { combineReducers } from 'redux'
import { sessionReducer } from './sessionReducer'
import { patientReducer } from './patientReducer'
import { commentReducer } from './commentReducer'

const rootReducer = combineReducers({
	patientReducer,
	exerciseReducer,
	sessionReducer,
	commentReducer
})

export default rootReducer