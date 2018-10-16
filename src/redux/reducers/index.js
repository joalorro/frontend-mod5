import { exerciseReducer } from './exerciseReducer'
import { combineReducers } from 'redux'
import { sessionReducer } from './sessionReducer'
import { patientReducer } from './patientReducer'
import { commentsReducer } from './commentsReducer'

const rootReducer = combineReducers({
	patientReducer,
	exerciseReducer,
	sessionReducer,
	commentsReducer
})

export default rootReducer