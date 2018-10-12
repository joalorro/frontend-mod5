import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Sup from './Sup'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from './redux/reducers/index'

import * as serviceWorker from './serviceWorker';

const store = createStore(
	rootReducer, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const Root = ({store}) => (
	<Provider store={store} >
		<Router>
			<Fragment>
				<Route exact path="/" component={App} />
				<Route exact path="/sup" component={Sup} />
			</Fragment>
		</Router>
	</Provider>
)

ReactDOM.render(Root(store), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
