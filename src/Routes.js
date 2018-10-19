import Home from './Home';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Fragment } from 'react'
import Navbar from './generalviews/Navbar'
import Login from './generalviews/Login'
// import NotFound from './react/components/NotFound'
import Signup from './generalviews/Signup'
import PatientSignup from './patientviews/components/PatientSignup'
import TherapistSignup from './therapistviews/components/TherapistSignup'
import ExerciseContainerForPatient from './patientviews/containers/ExerciseContainerForPatient'
import PatientsContainer from './therapistviews/containers/PatientsContainer'


const Routes = () => {
	return (
		<Fragment>
			<Router>
				<Fragment>
					<Navbar />
					<Switch>
						<Route exact path="/:slug/exercises" render={(routeProps) => <ExerciseContainerForPatient {...routeProps} />} />
						<Route exact path="/:slug/patients" render={(routeProps) => <PatientsContainer {...routeProps} />} />
						<Route exact path="/login" render={(routeProps) => <Login {...routeProps} />}/>
						<Route exact path="/signup" render={(routeProps) => <Signup {...routeProps} />} />
						<Route path="/signup/patient" render={(routeProps) => <PatientSignup {...routeProps} />} />
						<Route path="/signup/therapist" render={(routeProps) => <TherapistSignup {...routeProps} />} />
						<Route exact path="/" render={(routeProps) => <Home {...routeProps} />} />
						{/* <Route component={NotFound} /> */}
					</Switch>
				</Fragment>
			</Router>
		</Fragment>
	);
}

export default Routes;
