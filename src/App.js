import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Signup from './react/components/Signup'

import './stylesheets/buttons.css'

import AppAdapter from './adapters/AppAdapter'

class App extends Component {
	render() {
		return (
		<div className="App">
			<Link to="/login" exact component={Signup}>  
				<button className="button signup" > Log-in </button>
			</Link>
			<button onClick={() => AppAdapter.sortExercises()} >test</button>
		</div>
		);
	}
}

export default connect(null,null)(App);
