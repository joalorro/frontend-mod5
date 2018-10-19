import React from 'react';
import { Link } from 'react-router-dom'
import Signup from './generalviews/Signup'
import AppAdapter from './adapters/AppAdapter'

const Home = () => {
	return (
		<div>
			Home Page!
			<Link to="/login" exact component={Signup}>  
				<button className="button signup" > Log-in </button>
			</Link>
			<button onClick={() => AppAdapter.sortExercises()} >test</button>
		</div>
	);
}

export default Home;
