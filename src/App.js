import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Signup from './react/components/Signup'

import './stylesheets/buttons.css'

class App extends Component {
	render() {
		return (
		<div className="App">
			<Link to="/signup" exact component={Signup}>  
				<button className="button signup" > Log-in/Sign-up </button>
			</Link>
		</div>
		);
	}
}

export default connect(null,null)(App);
