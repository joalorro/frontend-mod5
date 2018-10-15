import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import  rootReducer from './redux/reducers/index'
import Routes from './Routes'

import * as serviceWorker from './serviceWorker';

const store = createStore(
	rootReducer, 
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

const Root = (store) => (
	<Provider store={store} >
		<Routes />
	</Provider>
)

ReactDOM.render(Root(store), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
