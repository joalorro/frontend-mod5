import App from './App';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Fragment } from 'react'
import Navbar from './generalviews/Navbar'
import Login from './generalviews/Login'
// import NotFound from './react/components/NotFound'
import Signup from './generalviews/Signup'
import PatientSignup from './patientviews/components/PatientSignup'
import TherapistSignup from './therapistviews/components/TherapistSignup'
// import PatientPage from './react/components/PatientPage'
import PatientExercisesContainer from './patientviews/containers/PatientExercisesContainer'
import PatientsContainer from './therapistviews/containers/PatientsContainer'


const Routes = () => {
	return (
		<Fragment>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path="/:slug/exercises" component={PatientExercisesContainer} />
					<Route exact path="/:slug/patients" component={PatientsContainer} />
					<Route exact path="/login" component={Login}/>
					<Route exact path="/signup" component={Signup} />
					<Route path="/signup/patient" component={PatientSignup} />
					<Route path="/signup/therapist" component={TherapistSignup} />
					<Route exact path="/" component={App} />
					{/* <Route component={NotFound} /> */}
				</Fragment>
			</Router>
		</Fragment>
	);
}

export default Routes;
