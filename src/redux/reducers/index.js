import { exerciseReducer } from './exerciseReducer'
import { combineReducers } from 'redux'
import { sessionReducer } from './sessionReducer'
import { patientReducer } from './patientReducer'
import { commentReducer } from './commentReducer'
import { modalReducer } from './modalReducer'

const rootReducer = combineReducers({
	patientReducer,
	exerciseReducer,
	sessionReducer,
	commentReducer,
	modalReducer
})

export default rootReducer