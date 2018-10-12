import App from './App';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Fragment } from 'react'
import Navbar from './react/nav/Navbar'
import Login from './react/components/Login'
import Signup from './react/components/Signup'
import PatientSignup from './react/components/PatientSignup'
import TherapistSignup from './react/components/TherapistSignup'

const Routes = () => {
	return (
		<Fragment>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path="/" component={App} />
					<Route exact path="/login" component={Login}/>
					<Route exact path="/signup" component={Signup} />
					<Route path="/signup/patient" component={PatientSignup} />
					<Route path="/signup/therapist" component={TherapistSignup} />
				</Fragment>
			</Router>
		</Fragment>
	);
}

export default Routes;
