import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/index'
import { SSL_OP_SINGLE_DH_USE } from 'constants';

export const store = createStore(
	rootReducer,
	compose (
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()		
	)
)


